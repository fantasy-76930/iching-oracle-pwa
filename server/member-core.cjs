const crypto = require("crypto");

const ECPAY_ACTIONS = {
  production: "https://payment.ecpay.com.tw/Cashier/AioCheckOut/V5",
  stage: "https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5"
};

function jsonHeaders(origin = "*") {
  return {
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Content-Type": "application/json; charset=utf-8",
    "Vary": "Origin"
  };
}

function parsePayload(payload) {
  if (!payload) return {};
  if (typeof payload === "object") return payload;
  const raw = String(payload);
  try {
    return JSON.parse(raw);
  } catch {
    return Object.fromEntries(new URLSearchParams(raw));
  }
}

function cleanText(value, max = 160) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, max);
}

function cleanMemberId(value) {
  const cleaned = String(value || "").replace(/[^a-zA-Z0-9_.:-]/g, "").slice(0, 80);
  return cleaned || `member-${Date.now().toString(36)}`;
}

function cleanEmail(value) {
  return cleanText(value, 120).toLowerCase();
}

function taipeiDate(offsetDays = 0) {
  const date = new Date(Date.now() + offsetDays * 86400000);
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date);
  const get = (type) => parts.find((part) => part.type === type)?.value;
  return `${get("year")}-${get("month")}-${get("day")}`;
}

function taipeiTradeDate() {
  const parts = new Intl.DateTimeFormat("zh-TW", {
    timeZone: "Asia/Taipei",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).formatToParts(new Date());
  const get = (type) => parts.find((part) => part.type === type)?.value;
  return `${get("year")}/${get("month")}/${get("day")} ${get("hour")}:${get("minute")}:${get("second")}`;
}

function appBaseUrl() {
  return (process.env.PUBLIC_SITE_URL || process.env.SITE_URL || "https://iching-oracle-pwa.vercel.app").replace(/\/$/, "");
}

function apiBaseUrl() {
  return (process.env.PUBLIC_API_BASE_URL || process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}` || appBaseUrl()).replace(/\/$/, "");
}

function dbConfigured() {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

async function redisPipeline(commands) {
  if (!dbConfigured()) throw new Error("MEMBER_DB_NOT_CONFIGURED");
  const response = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(commands)
  });
  if (!response.ok) throw new Error(`MEMBER_DB_ERROR:${response.status}`);
  return response.json();
}

async function getMember(memberId) {
  const results = await redisPipeline([["GET", `member:${cleanMemberId(memberId)}`]]);
  const raw = results?.[0]?.result;
  return raw ? JSON.parse(raw) : null;
}

async function saveMember(member) {
  const commands = [
    ["SET", `member:${member.id}`, JSON.stringify(member)],
    ["SADD", "members:all", member.id]
  ];
  if (member.email) commands.push(["SET", `member-email:${member.email}`, member.id]);
  if (member.latestTradeNo) commands.push(["SET", `trade:${member.latestTradeNo}`, member.id]);
  await redisPipeline(commands);
}

function ecpayConfigured() {
  return Boolean(
    process.env.ECPAY_MERCHANT_ID &&
    process.env.ECPAY_HASH_KEY &&
    process.env.ECPAY_HASH_IV &&
    process.env.MEMBERSHIP_MONTHLY_AMOUNT
  );
}

function merchantTradeNo() {
  const stamp = Date.now().toString(36).toUpperCase();
  const random = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `IC${stamp}${random}`.slice(0, 20);
}

function ecpayEncode(value) {
  return encodeURIComponent(value)
    .toLowerCase()
    .replace(/%20/g, "+")
    .replace(/%21/g, "!")
    .replace(/%28/g, "(")
    .replace(/%29/g, ")")
    .replace(/%2a/g, "*")
    .replace(/%2d/g, "-")
    .replace(/%2e/g, ".")
    .replace(/%5f/g, "_");
}

function checkMacValue(params) {
  const hashKey = process.env.ECPAY_HASH_KEY;
  const hashIv = process.env.ECPAY_HASH_IV;
  const sorted = Object.entries(params)
    .filter(([key]) => key !== "CheckMacValue")
    .sort(([a], [b]) => a.localeCompare(b, "en"));
  const raw = `HashKey=${hashKey}&${sorted.map(([key, value]) => `${key}=${value}`).join("&")}&HashIV=${hashIv}`;
  return crypto.createHash("sha256").update(ecpayEncode(raw)).digest("hex").toUpperCase();
}

function verifyEcpayPayload(payload) {
  if (!payload.CheckMacValue) return false;
  return checkMacValue(payload) === String(payload.CheckMacValue).toUpperCase();
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderPaymentForm(action, params) {
  const inputs = Object.entries(params)
    .map(([name, value]) => `<input type="hidden" name="${escapeHtml(name)}" value="${escapeHtml(value)}" />`)
    .join("\n");
  return `<!doctype html>
<html lang="zh-Hant">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>前往付款</title>
  <style>
    body { min-height: 100vh; display: grid; place-items: center; margin: 0; color: #f8e8b4; background: #06110f; font-family: system-ui, sans-serif; }
    main { width: min(92vw, 420px); padding: 28px; border: 1px solid rgba(232,189,98,.28); border-radius: 12px; background: rgba(0,0,0,.26); text-align: center; }
    button { min-height: 48px; padding: 0 18px; border: 1px solid rgba(232,189,98,.5); border-radius: 8px; color: #fff8dc; background: #0a6c58; font-weight: 900; }
  </style>
</head>
<body>
  <main>
    <h1>正在前往綠界付款</h1>
    <p>若沒有自動跳轉，請按下方按鈕。</p>
    <form id="payForm" method="post" action="${escapeHtml(action)}">
      ${inputs}
      <button type="submit">前往付款</button>
    </form>
  </main>
  <script>document.getElementById("payForm").submit();</script>
</body>
</html>`;
}

function checkoutUnavailablePage(message) {
  return `<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>付款尚未開通</title></head><body style="font-family:system-ui,sans-serif;background:#06110f;color:#f8e8b4;display:grid;place-items:center;min-height:100vh;margin:0"><main style="width:min(92vw,460px);padding:28px;border:1px solid rgba(232,189,98,.3);border-radius:12px;background:rgba(0,0,0,.25)"><h1>線上付款尚未開通</h1><p>${escapeHtml(message)}</p><p><a style="color:#8ee8c2" href="${appBaseUrl()}">回到易策玄占</a></p></main></body></html>`;
}

async function handleMemberCheckout(rawPayload) {
  const payload = parsePayload(rawPayload);
  if (!dbConfigured()) {
    return {
      status: 503,
      html: checkoutUnavailablePage("會員資料庫尚未設定。請站主先設定 Upstash Redis。")
    };
  }
  if (!ecpayConfigured()) {
    return {
      status: 503,
      html: checkoutUnavailablePage("綠界金流尚未設定完成。請站主先設定商店代號、HashKey、HashIV 與月費金額。")
    };
  }

  const memberId = cleanMemberId(payload.memberId);
  const email = cleanEmail(payload.email);
  const lineName = cleanText(payload.lineName, 80);
  if (!email || !email.includes("@")) {
    return { status: 400, html: checkoutUnavailablePage("請回上一頁填寫有效 Email。") };
  }

  const amount = Number(process.env.MEMBERSHIP_MONTHLY_AMOUNT);
  if (!Number.isInteger(amount) || amount <= 0) {
    return { status: 503, html: checkoutUnavailablePage("月費金額尚未正確設定。") };
  }

  const tradeNo = merchantTradeNo();
  const now = new Date().toISOString();
  const existing = await getMember(memberId).catch(() => null);
  const member = {
    ...(existing || {}),
    id: memberId,
    email,
    lineName,
    plan: existing?.plan || "free",
    status: existing?.status || "pending_payment",
    latestTradeNo: tradeNo,
    updatedAt: now,
    createdAt: existing?.createdAt || now
  };
  await saveMember(member);

  const base = apiBaseUrl();
  const execTimes = Number(process.env.MEMBERSHIP_EXEC_TIMES || 12);
  const params = {
    MerchantID: process.env.ECPAY_MERCHANT_ID,
    MerchantTradeNo: tradeNo,
    MerchantTradeDate: taipeiTradeDate(),
    PaymentType: "aio",
    TotalAmount: amount,
    TradeDesc: "易策玄占月費會員",
    ItemName: `易策玄占月費會員 ${amount} 元/月`,
    ReturnURL: `${base}/api/ecpay-return`,
    ChoosePayment: "Credit",
    ClientBackURL: `${appBaseUrl()}?member_checkout=back`,
    OrderResultURL: `${base}/api/ecpay-result`,
    NeedExtraPaidInfo: "N",
    EncryptType: 1,
    CustomField1: memberId,
    CustomField2: email.slice(0, 100),
    PeriodAmount: amount,
    PeriodType: "M",
    Frequency: 1,
    ExecTimes: Number.isInteger(execTimes) && execTimes > 0 ? execTimes : 12,
    PeriodReturnURL: `${base}/api/ecpay-return`
  };
  params.CheckMacValue = checkMacValue(params);

  const env = process.env.ECPAY_ENV === "production" ? "production" : "stage";
  return {
    status: 200,
    html: renderPaymentForm(ECPAY_ACTIONS[env], params)
  };
}

async function activateMemberFromPayment(payload) {
  if (!verifyEcpayPayload(payload)) {
    return { ok: false, message: "CheckMacValue failed" };
  }

  const tradeNo = cleanText(payload.MerchantTradeNo, 30);
  const tradeResult = await redisPipeline([["GET", `trade:${tradeNo}`]]);
  const memberId = tradeResult?.[0]?.result || payload.CustomField1;
  const member = await getMember(memberId);
  if (!member) return { ok: false, message: "Member not found" };

  const paid = String(payload.RtnCode || payload.PeriodType || "") === "1" || String(payload.RtnMsg || "").toLowerCase().includes("succeeded");
  const now = new Date().toISOString();
  if (paid) {
    member.plan = "vip";
    member.status = "active";
    member.activeUntil = taipeiDate(35);
    member.lastPaymentAt = now;
    member.lastPayment = {
      tradeNo,
      amount: Number(payload.TradeAmt || payload.amount || process.env.MEMBERSHIP_MONTHLY_AMOUNT || 0),
      rtnCode: payload.RtnCode || null,
      paymentDate: payload.PaymentDate || null
    };
  } else {
    member.status = "payment_failed";
    member.lastPaymentError = payload.RtnMsg || "Payment failed";
  }
  member.updatedAt = now;
  await saveMember(member);
  await notifyLineOwner(`${paid ? "會員付款成功" : "會員付款未完成"}\n會員：${member.email}\n會員編號：${member.id}\n交易：${tradeNo}`);

  return { ok: true, paid, member };
}

async function notifyLineOwner(text) {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  const to = process.env.LINE_NOTIFY_USER_ID;
  if (!token || !to) return;
  await fetch("https://api.line.me/v2/bot/message/push", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      to,
      messages: [{ type: "text", text: cleanText(text, 900) }]
    })
  }).catch((error) => console.error("LINE notification failed", error));
}

async function handleMemberStatus(memberId) {
  if (!dbConfigured()) {
    return { status: 503, body: { error: "MEMBER_DB_NOT_CONFIGURED" } };
  }
  const member = await getMember(memberId);
  if (!member) {
    return { status: 404, body: { error: "MEMBER_NOT_FOUND", plan: "free" } };
  }
  const active = member.status === "active" && (!member.activeUntil || member.activeUntil >= taipeiDate());
  return {
    status: 200,
    body: {
      id: member.id,
      email: member.email,
      plan: active ? "vip" : "free",
      status: member.status,
      activeUntil: member.activeUntil || null
    }
  };
}

function renderPaymentResultPage() {
  return `<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>付款結果</title><meta http-equiv="refresh" content="3;url=${appBaseUrl()}?member_checkout=complete"></head><body style="font-family:system-ui,sans-serif;background:#06110f;color:#f8e8b4;display:grid;place-items:center;min-height:100vh;margin:0"><main style="width:min(92vw,460px);padding:28px;border:1px solid rgba(232,189,98,.3);border-radius:12px;background:rgba(0,0,0,.25)"><h1>付款結果已送出</h1><p>系統正在確認會員狀態，稍後回到網站即可看到方案。</p><p><a style="color:#8ee8c2" href="${appBaseUrl()}?member_checkout=complete">回到易策玄占</a></p></main></body></html>`;
}

module.exports = {
  activateMemberFromPayment,
  handleMemberCheckout,
  handleMemberStatus,
  jsonHeaders,
  parsePayload,
  renderPaymentResultPage
};

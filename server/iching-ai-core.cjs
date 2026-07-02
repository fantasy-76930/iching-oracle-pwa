const DEFAULT_MODEL = "gpt-4.1-mini";
const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY_ITEMS = 8;
const DEFAULT_FREE_DAILY_LIMIT = 3;

function corsHeaders(origin) {
  const configured = process.env.ALLOWED_ORIGIN || process.env.AI_ALLOWED_ORIGIN || "*";
  const allowed = configured.split(",").map((item) => item.trim()).filter(Boolean);
  const allowOrigin = allowed.includes("*") || !origin
    ? "*"
    : allowed.includes(origin)
      ? origin
      : allowed[0];

  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json; charset=utf-8",
    "Vary": "Origin"
  };
}

function parsePayload(payload) {
  if (typeof payload === "string") {
    return JSON.parse(payload || "{}");
  }
  return payload || {};
}

function clampText(text, max = MAX_MESSAGE_LENGTH) {
  return String(text || "").replace(/\s+/g, " ").trim().slice(0, max);
}

function cleanList(items) {
  return Array.isArray(items) ? items.map((item) => clampText(item, 80)).filter(Boolean).slice(0, 8) : [];
}

function normalizeReading(reading) {
  if (!reading || typeof reading !== "object") return null;
  const primary = reading.primary || {};
  const changed = reading.changed || {};
  const domain = reading.domain || {};

  return {
    question: clampText(reading.question, 220),
    domain: {
      label: clampText(domain.label, 20),
      scope: clampText(domain.scope, 80),
      lineFocus: clampText(domain.lineFocus, 80)
    },
    primary: {
      no: Number(primary.no) || null,
      name: clampText(primary.name, 20),
      theme: clampText(primary.theme, 40),
      summary: clampText(primary.summary, 180),
      action: clampText(primary.action, 100),
      caution: clampText(primary.caution, 100),
      keywords: cleanList(primary.keywords)
    },
    changed: {
      no: Number(changed.no) || null,
      name: clampText(changed.name, 20),
      theme: clampText(changed.theme, 40),
      summary: clampText(changed.summary, 180)
    },
    moving: cleanList(reading.moving),
    lineValues: cleanList(reading.lineValues),
    trigram: clampText(reading.trigram, 80)
  };
}

function normalizeConversation(conversation) {
  if (!Array.isArray(conversation)) return [];
  return conversation.slice(-MAX_HISTORY_ITEMS).map((item) => ({
    role: item.role === "assistant" ? "assistant" : "user",
    content: clampText(item.content, 260)
  })).filter((item) => item.content);
}

function modelConfigured() {
  return Boolean(process.env.OPENAI_API_KEY || process.env.LLM_API_KEY);
}

function quotaStoreConfigured() {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

function taipeiDateKey() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: process.env.QUOTA_TIME_ZONE || "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date());
}

function quotaIdentity(payload, meta) {
  const raw = payload?.member?.id || meta?.ip || "anonymous";
  return String(raw).replace(/[^a-zA-Z0-9_.:-]/g, "").slice(0, 80) || "anonymous";
}

async function redisPipeline(commands) {
  const response = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(commands)
  });
  if (!response.ok) throw new Error(`Quota store failed: ${response.status}`);
  return response.json();
}

async function enforceDailyQuota(payload, meta) {
  const plan = payload?.member?.plan || "free";
  if (plan !== "free" || !quotaStoreConfigured()) {
    return { allowed: true };
  }

  const limit = Number(process.env.FREE_DAILY_AI_LIMIT || DEFAULT_FREE_DAILY_LIMIT);
  const key = `iching-ai:${taipeiDateKey()}:${quotaIdentity(payload, meta)}`;
  const results = await redisPipeline([
    ["INCR", key],
    ["EXPIRE", key, 172800]
  ]);
  const used = Number(results?.[0]?.result || 0);

  return {
    allowed: used <= limit,
    used,
    remaining: Math.max(limit - used, 0),
    limit
  };
}

function buildPrompts(payload) {
  const phase = payload.phase === "casting" ? "casting" : "reading";
  const message = clampText(payload.message);
  const reading = normalizeReading(payload.reading);
  const conversation = normalizeConversation(payload.conversation);

  const system = [
    "你是「易策玄占」的 AI 解卦老師，只使用繁體中文回答。",
    "你不重新起卦、不改變卦象、不宣稱必然預言，只依提供的本卦、變卦、動爻和問事方向解讀。",
    "回答要安定、清楚、可行，像一位有禮貌的老師，避免恐嚇和絕對化。",
    "若涉及健康、法律、投資、醫療等高風險內容，要提醒使用者找專業協助，並給出保守行動。",
    "每次回覆 3 到 5 段短句，最後給一個可執行的小步驟。"
  ].join("\n");

  const readingText = reading
    ? [
      `原問題：${reading.question || "未填"}`,
      `問事方向：${reading.domain.label || "未指定"}；重點：${reading.domain.lineFocus || "未指定"}`,
      `本卦：第 ${reading.primary.no || "?"} 卦 ${reading.primary.name}，${reading.primary.theme}`,
      `本卦摘要：${reading.primary.summary}`,
      `宜行：${reading.primary.action}`,
      `宜避：${reading.primary.caution}`,
      `變卦：第 ${reading.changed.no || "?"} 卦 ${reading.changed.name}，${reading.changed.theme}`,
      `動爻：${reading.moving.length ? reading.moving.join("、") : "無動爻"}`,
      `上下卦：${reading.trigram || "未提供"}`
    ].join("\n")
    : "卦象尚未完成。";

  const historyText = conversation.length
    ? conversation.map((item) => `${item.role === "assistant" ? "AI" : "使用者"}：${item.content}`).join("\n")
    : "尚無對話。";

  const user = [
    `目前階段：${phase === "casting" ? "籌策運算中" : "卦象已完成"}`,
    `使用者追問：${message}`,
    "",
    "卦象資料：",
    readingText,
    "",
    "最近對話：",
    historyText,
    "",
    phase === "casting"
      ? "卦象尚未完成時，先回應已收到補充，請使用者稍候，並說明卦成後會合併參照。不要假裝已有卦象。"
      : "請直接依同一卦回答追問，避免重新占卜。"
  ].join("\n");

  return { system, user, message };
}

function extractOutputText(data) {
  if (typeof data.output_text === "string" && data.output_text.trim()) return data.output_text.trim();
  if (Array.isArray(data.output)) {
    const text = data.output
      .flatMap((item) => Array.isArray(item.content) ? item.content : [])
      .map((content) => content.text || content.output_text || "")
      .join("")
      .trim();
    if (text) return text;
  }
  const chatText = data.choices?.[0]?.message?.content;
  if (typeof chatText === "string" && chatText.trim()) return chatText.trim();
  return "";
}

async function callModel(system, user) {
  const apiKey = process.env.OPENAI_API_KEY || process.env.LLM_API_KEY;
  if (!apiKey) {
    return {
      status: 503,
      body: {
        error: "AI_BACKEND_NOT_CONFIGURED",
        reply: "AI 追問尚未開通，先用卦典摘要回覆。"
      }
    };
  }

  const endpoint = process.env.OPENAI_RESPONSES_URL || process.env.LLM_API_URL || "https://api.openai.com/v1/responses";
  const model = process.env.OPENAI_MODEL || process.env.LLM_MODEL || DEFAULT_MODEL;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      instructions: system,
      input: user,
      max_output_tokens: Number(process.env.OPENAI_MAX_OUTPUT_TOKENS || 700)
    })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const errorInfo = data?.error || {};
    console.error("OpenAI request failed", {
      status: response.status,
      type: errorInfo.type || null,
      code: errorInfo.code || null
    });

    const isQuotaOrBilling = response.status === 429 || errorInfo.code === "insufficient_quota";
    const reply = response.status === 401 || response.status === 403
      ? "AI 金鑰無法使用，請確認 OpenAI API key 是否正確，且帳號有 API 權限。"
      : isQuotaOrBilling
        ? "AI 帳務或額度尚未開通，先用卦典摘要回覆。等 OpenAI 付款額度可用後，再重新啟用線上 AI。"
        : response.status === 400
          ? "AI 模型設定或請求格式被拒絕，請稍後再試。"
          : "AI 模型端暫時沒有接通，請稍後再問一次。";

    return {
      status: response.status,
      body: {
        error: isQuotaOrBilling ? "AI_BILLING_NOT_READY" : "AI_MODEL_ERROR",
        reply
      }
    };
  }

  const reply = extractOutputText(data);
  return {
    status: 200,
    body: {
      reply: reply || "我收到你的問題，但這次模型沒有回傳內容，請再問一次。"
    }
  };
}

async function handleAiRequest(rawPayload, meta = {}) {
  const payload = parsePayload(rawPayload);
  const { system, user, message } = buildPrompts(payload);
  if (!message) {
    return {
      status: 400,
      body: {
        error: "EMPTY_MESSAGE",
        reply: "請先輸入想追問的內容。"
      }
    };
  }
  if (modelConfigured()) {
    const quota = await enforceDailyQuota(payload, meta);
    if (!quota.allowed) {
      return {
        status: 429,
        body: {
          error: "DAILY_LIMIT_REACHED",
          reply: "今日免費 AI 追問已用完。可以先看本卦、動爻與變卦，或等明天再繼續追問。",
          quota
        }
      };
    }
  }
  return callModel(system, user);
}

module.exports = {
  corsHeaders,
  handleAiRequest
};

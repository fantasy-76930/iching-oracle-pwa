const { handleMemberCheckout } = require("../server/member-core.cjs");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).setHeader("Content-Type", "text/html; charset=utf-8").end("Method Not Allowed");
    return;
  }

  try {
    const result = await handleMemberCheckout(req.body);
    res.status(result.status).setHeader("Content-Type", "text/html; charset=utf-8").end(result.html);
  } catch (error) {
    console.error("Member checkout failed", error);
    res.status(500).setHeader("Content-Type", "text/html; charset=utf-8").end("會員付款流程暫時無法啟動。");
  }
};

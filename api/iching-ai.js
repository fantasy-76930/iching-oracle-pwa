const { corsHeaders, handleAiRequest } = require("../server/iching-ai-core.cjs");

module.exports = async function handler(req, res) {
  const headers = corsHeaders(req.headers.origin);
  Object.entries(headers).forEach(([key, value]) => res.setHeader(key, value));

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "METHOD_NOT_ALLOWED", reply: "請使用 POST 呼叫 AI 解卦。" });
    return;
  }

  try {
    const result = await handleAiRequest(req.body);
    res.status(result.status).json(result.body);
  } catch (error) {
    console.error("AI handler failed", error);
    res.status(500).json({ error: "AI_SERVER_ERROR", reply: "AI 服務暫時無法回應，請稍後再試。" });
  }
};

const { corsHeaders, handleAiRequest } = require("../../server/iching-ai-core.cjs");

exports.handler = async (event) => {
  const headers = corsHeaders(event.headers.origin);

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers,
      body: ""
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "METHOD_NOT_ALLOWED", reply: "請使用 POST 呼叫 AI 解卦。" })
    };
  }

  try {
    const result = await handleAiRequest(event.body);
    return {
      statusCode: result.status,
      headers,
      body: JSON.stringify(result.body)
    };
  } catch (error) {
    console.error("AI handler failed", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "AI_SERVER_ERROR", reply: "AI 服務暫時無法回應，請稍後再試。" })
    };
  }
};

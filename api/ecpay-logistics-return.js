const { handleLogisticsReturn, parsePayload } = require("../server/member-core.cjs");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).setHeader("Content-Type", "text/plain; charset=utf-8").end("0|METHOD_NOT_ALLOWED");
    return;
  }

  try {
    const result = await handleLogisticsReturn(parsePayload(req.body));
    res
      .status(result.ok ? 200 : 400)
      .setHeader("Content-Type", "text/plain; charset=utf-8")
      .end(result.ok ? "1|OK" : `0|${result.message}`);
  } catch (error) {
    console.error("ECPay logistics return failed", error);
    res.status(500).setHeader("Content-Type", "text/plain; charset=utf-8").end("0|SERVER_ERROR");
  }
};

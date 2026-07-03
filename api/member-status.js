const { handleMemberStatus, jsonHeaders } = require("../server/member-core.cjs");

module.exports = async function handler(req, res) {
  const headers = jsonHeaders(req.headers.origin);
  Object.entries(headers).forEach(([key, value]) => res.setHeader(key, value));

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "GET") {
    res.status(405).json({ error: "METHOD_NOT_ALLOWED" });
    return;
  }

  try {
    const result = await handleMemberStatus(req.query.memberId);
    res.status(result.status).json(result.body);
  } catch (error) {
    console.error("Member status failed", error);
    res.status(500).json({ error: "MEMBER_STATUS_ERROR" });
  }
};

const { renderPaymentResultPage } = require("../server/member-core.cjs");

module.exports = async function handler(req, res) {
  res.status(200).setHeader("Content-Type", "text/html; charset=utf-8").end(renderPaymentResultPage());
};

# 奇幻線上易經卜卦

PWA 線上易經卜卦網站，包含籌策起卦、64 卦解析、AI 追問、結果圖片分享、每日貼文產生，以及實體商品付款流程。

## 網站內容

- 線上易經起卦與問事分類解析
- AI 易經追問與每日免費次數控管
- 不規則切面轉運串珠手鏈商品頁
- 手鏈售價 NT$499，購買後附贈 50 則 AI 易經諮詢
- 綠界付款串接
- 綠界宅配物流建單準備

## 主要檔案

- `index.html`
- `styles.css`
- `app.js`
- `manifest.webmanifest`
- `sw.js`
- `api/`
- `server/`
- `assets/`

## Vercel 環境變數

AI 解卦：

- `OPENAI_API_KEY`
- `OPENAI_MODEL`，可選

客戶與訂單資料庫，使用 Upstash Redis REST：

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

綠界金流：

- `ECPAY_ENV`，`stage` 或 `production`
- `ECPAY_MERCHANT_ID`
- `ECPAY_HASH_KEY`
- `ECPAY_HASH_IV`
- `ECPAY_CHOOSE_PAYMENT`，可選；手鏈商品預設使用 `ALL`
- `PUBLIC_SITE_URL`，正式站網址
- `PUBLIC_API_BASE_URL`，Vercel API 網址

綠界物流，付款成功後建立宅配物流單：

- `ECPAY_LOGISTICS_ENABLED`，設為 `true` 才會自動建立物流單
- `ECPAY_LOGISTICS_SUBTYPE`，可選，預設 `TCAT`
- `ECPAY_LOGISTICS_SENDER_NAME`，可選，預設 `奇幻文創`
- `ECPAY_LOGISTICS_SENDER_PHONE`，可選，預設 `0426335015`
- `ECPAY_LOGISTICS_SENDER_CELL`，可選，預設 `0989593280`
- `ECPAY_LOGISTICS_SENDER_ZIP`
- `ECPAY_LOGISTICS_SENDER_ADDRESS`

綠界後台常用回傳網址：

- 付款結果通知：`https://iching-oracle-pwa.vercel.app/api/ecpay-return`
- 使用者付款完成頁：`https://iching-oracle-pwa.vercel.app/api/ecpay-result`
- 物流狀態通知：`https://iching-oracle-pwa.vercel.app/api/ecpay-logistics-return`

LINE 通知，使用 LINE Messaging API：

- `LINE_CHANNEL_ACCESS_TOKEN`
- `LINE_NOTIFY_USER_ID`

## 注意

手鏈是實體商品。AI 易經諮詢為購買商品隨附贈品，僅供生活參考，不取代醫療、法律、投資或其他專業建議。

如果物流環境變數尚未設定，付款成功仍會記錄訂單並加贈 AI 諮詢次數，但不會自動建立綠界物流單，需由站主手動出貨或補齊寄件資料後再處理。

# 奇幻線上易經卜卦

這是一個可直接架站的 PWA 網站。使用者可以在網頁上輸入問題、選擇問事方向，網站會用籌策法起六爻，產生本卦、動爻、變卦與解說。

## 適合的架站方式

最簡單的方式是使用靜態網站平台：

- Netlify：可直接拖曳整個資料夾上傳。
- Vercel：可匯入專案資料夾並部署為靜態網站。
- GitHub Pages：把這些檔案放到 repository 根目錄後啟用 Pages。

PWA 安裝功能需要 HTTPS。Netlify、Vercel、GitHub Pages 預設都會提供 HTTPS。

目前正式版使用 Vercel 承接 AI、會員資料庫與金流 API。

## 需要一起上傳的檔案

請保留並上傳整個資料夾內容：

- `index.html`
- `styles.css`
- `app.js`
- `manifest.webmanifest`
- `sw.js`
- `assets/`
- `robots.txt`

不要只上傳單一 HTML，否則背景圖、icon、PWA 離線功能會失效。

## 啟動本機預覽

如果要先在自己的電腦看：

```powershell
python -m http.server 4173
```

然後打開：

```text
http://127.0.0.1:4173/
```

## 正式上線前

拿到正式網址後，可再調整：

- `manifest.webmanifest` 的 `start_url` 與 `scope` 通常保持 `./` 即可。
- `robots.txt` 可以加上正式 sitemap。
- 若要做品牌名稱、LINE 分享圖、SEO 文案，可以再補 Open Graph 圖與 meta 描述。

## Vercel 環境變數

AI 解卦：

- `OPENAI_API_KEY`
- `OPENAI_MODEL`，可選

會員資料庫，使用 Upstash Redis REST：

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

綠界金流，使用信用卡定期定額：

- `ECPAY_ENV`，`stage` 或 `production`
- `ECPAY_MERCHANT_ID`
- `ECPAY_HASH_KEY`
- `ECPAY_HASH_IV`
- `MEMBERSHIP_MONTHLY_AMOUNT`
- `MEMBERSHIP_EXEC_TIMES`，可選，預設 12
- `POINTS_PACK_AMOUNT`，可選，預設 99
- `POINTS_PACK_CREDITS`，可選，預設 50
- `VIP_DAILY_AI_LIMIT`，可選，預設 30
- `ECPAY_CHOOSE_PAYMENT`，可選；不設定時，AI 解卦服務包使用 `ALL`，月費會員使用 `Credit`
- `PUBLIC_SITE_URL`，正式站網址
- `PUBLIC_API_BASE_URL`，Vercel API 網址

綠界後台常用回傳網址：

- 付款結果通知：`https://iching-oracle-pwa.vercel.app/api/ecpay-return`
- 定期定額每期通知：`https://iching-oracle-pwa.vercel.app/api/ecpay-return`
- 使用者付款完成頁：`https://iching-oracle-pwa.vercel.app/api/ecpay-result`

注意：綠界後台的模擬付款通知不會開通 VIP，只有正式付款成功才會把會員狀態改為 VIP。月費會員使用定期定額，商店需先在綠界開通信用卡與定期定額服務；AI 解卦服務包會使用商店已開通的一般付款方式。

LINE 通知，使用 LINE Messaging API：

- `LINE_CHANNEL_ACCESS_TOKEN`
- `LINE_NOTIFY_USER_ID`

## 隱私

最近占卜紀錄只存在使用者自己的瀏覽器中。會員註冊、付款狀態與 AI 追問會送到 Vercel API 處理。

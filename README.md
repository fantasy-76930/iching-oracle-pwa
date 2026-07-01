# 奇幻線上易經卜卦

這是一個可直接架站的靜態 PWA 網站。使用者可以在網頁上輸入問題、選擇問事方向，網站會用籌策法起六爻，產生本卦、動爻、變卦與解說。

## 適合的架站方式

最簡單的方式是使用靜態網站平台：

- Netlify：可直接拖曳整個資料夾上傳。
- Vercel：可匯入專案資料夾並部署為靜態網站。
- GitHub Pages：把這些檔案放到 repository 根目錄後啟用 Pages。

PWA 安裝功能需要 HTTPS。Netlify、Vercel、GitHub Pages 預設都會提供 HTTPS。

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

## 隱私

目前網站不需要後端，也不會把使用者問題送到伺服器。最近占卜紀錄只存在使用者自己的瀏覽器中。

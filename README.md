![](https://i.imgur.com/TRdGrQ2.png)

# 六角 2024 React 作品實戰冬季班第六週作業 - Vite、React Router

- [線上部署連結](http://hex2024-react-training-week6.worksbyaaron.com/)
- [作業範例](https://github.com/hexschool/react-training-chapter-2024)
- [註冊連結、測試管理平台](https://ec-course-api.hexschool.io/)
- [API 文件](https://hexschool.github.io/ec-courses-api-swaggerDoc/)

## 使用技術

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)

## 開發環境設置

建議使用 [VSCode](https://code.visualstudio.com/) 搭配 [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)

## 快速開始

**專案設置（Project setup）**

將專案複製到本地端

```sh
$ git clone https://github.com/happyloa/Hex2024-React-Training-Week6.git
```

套件安裝

```sh
$ cd hex2024-react-training-week6
$ npm install
```

**執行專案（Start the server）**

```sh
$ npm run dev
```

在瀏覽器上輸入

```
http://localhost:5173/
```

即可在本地端預覽專案

## 專案結構

位於 `src`

結構說明

```
src
├── App.jsx                           所有元件的母元件，也是引入全域樣式的地方
├── main.jsx                          React 的主要元件
└── router.jsx                        路由表
```

## 結構檔案（Layout）、頁面檔案（views）& 整體樣式

位於 `src/layout` 與 `src/views` 與 `src/assets`

結構說明

```
src/layout
├── AdminLayout.jsx                   管理者後台頁面 layout
└── FrontendLayout.jsx                前台頁面 layout
```

```
src/views
├── admin                             管理者後台頁面
└── front                             前台頁面
```

```
src/assets
└── style.css                         網站整體的樣式設定
```

## 靜態檔案

位於 `public`

結構說明

```
public
├── CNAME                             網站的 DNS CNAME 紀錄
└── favicon.ico                       網站 favicon
```

## 使用的套件 & 工具

- [axios](https://axios-http.com/)
- [Bootstrap](https://getbootstrap.com/)
- [gh-pages](https://www.npmjs.com/package/gh-pages)
- [prop-types](https://www.npmjs.com/package/prop-types)
- [react-hook-form](https://react-hook-form.com/)
- [react-loading](https://www.npmjs.com/package/react-loading)
- [React Router](https://reactrouter.com/)
- [validate.js](https://validatejs.org/)
- [ChatGPT 4o](https://openai.com/)

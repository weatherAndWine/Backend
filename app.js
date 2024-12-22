const express = require("express");
const session = require("express-session");
const myPageRoutes = require("./alcohol/routes/myPage");
const mainPageRoutes = require("./alcohol/routes/mainPage");
const recommendPageRoutes = require("./alcohol/routes/recommendPage");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json()); // JSON 요청 본문 파싱

// 세션 설정 (필요하다면)
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// 라우트 등록
app.use("/my-page", myPageRoutes);
app.use("/mainpage", mainPageRoutes);
app.use("/recommandpage", recommendPageRoutes);

module.exports = app;

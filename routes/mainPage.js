const express = require("express");
const { getWeatherData } = require("../controllers/mainPageController");

const router = express.Router();

// 메인 페이지 API: 날씨 정보 가져오기
router.get("/weather", getWeatherData);

module.exports = router;

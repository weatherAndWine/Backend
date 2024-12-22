const express = require("express");
const { getRecommendations, updateLikes } = require("../controllers/recommendPageController");

const router = express.Router();

// 날씨 기반 추천 데이터 가져오기
router.get("/", getRecommendations);

// 좋아요 추가
router.post("/like", updateLikes);

module.exports = router;

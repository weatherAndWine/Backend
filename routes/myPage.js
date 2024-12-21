const express = require("express");
const { getMyPage } = require("../controllers/myPageController");

const router = express.Router();

// 마이페이지 API
router.get("/", getMyPage);

module.exports = router;

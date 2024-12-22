const express = require("express");
const { getMyPage } = require("../controllers/myPageController");

const router = express.Router();

// 마이페이지 API
router.get("/", (req, res, next) => {
  const { nickname } = req.query;

  if (!nickname) {
    return res.status(400).send("Nickname is required");
  }

  // `getMyPage`를 호출하며 nickname 전달
  getMyPage(req, res, next);
});

module.exports = router;

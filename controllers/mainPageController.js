const axios = require("axios");

const getMainPageData = async (req, res) => {
  try {
    // 날씨데이터를 메인페이지 프론트에서 받기 때문에 관련 부분 삭제
    res.json({ message: "Main page is ready" });
  } catch (error) {
    console.error("Error in main page controller:", error.message);
    res.status(500).json({ error: "메인 페이지 데이터 로딩 중 문제가 발생했습니다." });
  }
};

module.exports = {
  getMainPageData,
};
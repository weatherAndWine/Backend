const db = require("../config/db");

// 날씨 기반 추천 데이터 가져오기
const getRecommendations = async (req, res) => {
  const { weather } = req.query; // 날씨 정보를 쿼리 파라미터로 받음

  if (!weather) {
    return res.status(400).json({ error: "날씨 정보를 제공해주세요." });
  }

  try {
    // DB에서 날씨 조건에 맞는 알코올 추천 데이터 가져오기
    const query = `
      SELECT * FROM alcohols
      WHERE weather = ? OR weather = 0`; // weather=0은 모든 날씨에서 추천
    const [rows] = await db.execute(query, [weather]);

    res.status(200).json(rows); // 추천 데이터 반환
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({ message: "추천 데이터를 가져오는 데 실패했습니다." });
  }
};

// 좋아요 상태 업데이트
const updateLikes = async (req, res) => {
  const { userId, alcoholId } = req.body;

  try {
    // 이미 좋아요를 눌렀는지 확인
    const [existing] = await db.execute(
      `SELECT * FROM likes WHERE user_id = ? AND alcohol_id = ?`,
      [userId, alcoholId]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "이미 좋아요를 눌렀습니다." });
    }

    // 좋아요 추가
    const query = `INSERT INTO likes (user_id, alcohol_id) VALUES (?, ?)`;
    await db.execute(query, [userId, alcoholId]);

    res.status(200).json({ message: "좋아요가 성공적으로 추가되었습니다." });
  } catch (error) {
    console.error("Error updating likes:", error);
    res.status(500).json({ message: "좋아요 추가에 실패했습니다." });
  }
};

module.exports = { getRecommendations, updateLikes };

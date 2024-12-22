const db = require("../db/connection");

const getRecommendations = async (req, res) => {
  const { weatherCode } = req.query;

  if (!weatherCode) {
    return res.status(400).json({ error: "날씨 코드가 필요합니다." });
  }

  try {
    const recommendations = await db.alcohols.findAll({
      where: {
        weather: weatherCode, // 날씨 코드와 일치하는 데이터만 가져옴
      },
    });

    if (recommendations.length === 0) {
      return res
        .status(404)
        .json({ message: "해당 날씨에 맞는 추천 와인이 없습니다." });
    }

    res.json(recommendations);
  } catch (error) {
    console.error("Error fetching recommendations:", error.message);
    res.status(500).json({ error: "추천 데이터를 가져오는 중 문제가 발생했습니다." });
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

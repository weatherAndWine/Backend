const db = require("../db/connection");

exports.getMyPage = (req, res) => {
  const userId = req.user.id; // 로그인한 사용자 ID

  if (!userId) {
    return res.status(401).send("Unauthorized");
  }

  // 사용자 정보 가져오기
  const userQuery = "SELECT name, profile_image FROM users WHERE id = ?";
  db.query(userQuery, [userId], (err, userResults) => {
    if (err) {
      return res.status(500).send("Error fetching user information");
    }

    const user = userResults[0];

    // 사용자가 좋아요를 누른 술 목록 가져오기
    const alcoholQuery = `
      SELECT a.* FROM alcohols a
      JOIN likes l ON a.id = l.alcohol_id
      WHERE l.user_id = ?`;

    db.query(alcoholQuery, [userId], (err, alcoholResults) => {
      if (err) {
        return res.status(500).send("Error fetching liked alcohols");
      }

      // 사용자 정보와 좋아요 술 목록을 함께 반환
      res.json({
        user: {
          name: user.name,
          profile_image: user.profile_image,
        },
        likedAlcohols: alcoholResults,
      });
    });
  });
};

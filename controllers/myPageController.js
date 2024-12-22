const db = require("../db/connections");

exports.getMyPage = (req, res) => {
  // 로컬스토리지에서 저장된 닉네임을 사용
  const userName = req.query.nickname;

  if (!userName) {
    return res.status(401).send("Unauthorized");
  }

  // 사용자 정보 가져오기
  const userQuery = "SELECT id, name, profile_image FROM users WHERE name = ?";
  db.query(userQuery, [userName], (err, userResults) => {
    if (err) {
      return res.status(500).send("Error fetching user information");
    }

    if (!userResults.length) {
      return res.status(404).send("User not found");
    }

    const user = userResults[0];

    // 사용자가 좋아요를 누른 술 목록 가져오기
    const alcoholQuery = `
      SELECT a.* FROM alcohols a
      JOIN likes l ON a.id = l.alcohol_id
      WHERE l.user_id = ?`;

    db.query(alcoholQuery, [user.id], (err, alcoholResults) => {
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

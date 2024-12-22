// userRoutes.js (백엔드)
const express = require("express");
const router = express.Router();
const db = require("../db/connections");

router.post("/", (req, res) => {
  const userData = req.body;

  // 먼저 사용자가 이미 존재하는지 확인
  const checkQuery = "SELECT id FROM users WHERE name = ?";
  db.query(checkQuery, [userData.name], (checkErr, checkResults) => {
    if (checkErr) {
      console.error("Error checking user:", checkErr);
      return res.status(500).json({ message: "Error checking user data" });
    }

    if (checkResults.length > 0) {
      // 사용자가 이미 존재하면 업데이트
      const updateQuery = "UPDATE users SET profile_image = ? WHERE name = ?";
      db.query(
        updateQuery,
        [userData.profile_image, userData.name],
        (updateErr, updateResults) => {
          if (updateErr) {
            console.error("Error updating user:", updateErr);
            return res
              .status(500)
              .json({ message: "Error updating user data" });
          }
          res.status(200).json({
            message: "User data updated successfully",
            id: checkResults[0].id,
          });
        }
      );
    } else {
      // 새로운 사용자면 삽입
      const insertQuery =
        "INSERT INTO users (name, profile_image) VALUES (?, ?)";
      db.query(
        insertQuery,
        [userData.name, userData.profile_image],
        (insertErr, insertResults) => {
          if (insertErr) {
            console.error("Error saving user:", insertErr);
            return res.status(500).json({ message: "Error saving user data" });
          }
          res.status(201).json({
            message: "User data saved successfully",
            id: insertResults.insertId,
          });
        }
      );
    }
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("../db/connections");

// 사용자 정보를 저장하는 API 엔드포인트
router.post("/", (req, res) => {
  const userData = req.body;

  const query = "INSERT INTO users (name, profile_image) VALUES (?, ?)";
  db.query(query, [userData.name, userData.profile_image], (err, results) => {
    if (err) {
      console.error("Error saving user data:", err);
      return res.status(500).json({ message: "Error saving user data" });
    }
    res.status(201).json({
      message: "User data saved successfully",
      id: results.insertId,
    });
  });
});

module.exports = router;

const axios = require("axios");

const OPENWEATHER_API_KEY = "1fe26cb2ddc3c398db0efe1693fe598f"; // 여기에 OpenWeather API 키를 입력하세요.

// 날씨 타입 매핑 함수
const mapWeatherType = (weatherCode) => {
  if (weatherCode >= 200 && weatherCode < 300) {
    return 3; // 비 (뇌우)
  } else if (weatherCode >= 300 && weatherCode < 400) {
    return 3; // 비 (이슬비)
  } else if (weatherCode >= 500 && weatherCode < 600) {
    return 3; // 비
  } else if (weatherCode >= 600 && weatherCode < 700) {
    return 4; // 눈
  } else if (weatherCode === 800) {
    return 1; // 맑음
  } else if (weatherCode > 800 && weatherCode < 900) {
    return 2; // 구름
  } else {
    return 0; // 알 수 없음
  }
};

// 날씨 정보 가져오기 컨트롤러
const getWeatherData = async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "위도와 경도를 제공해주세요." });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
    const response = await axios.get(url);

    const data = response.data;
    const weatherType = mapWeatherType(data.weather[0].main);

    const result = {
      date: new Date().toISOString().split("T")[0],
      weather: weatherType,
      temperature: `${Math.round(data.main.temp)}°`,
      location: data.name,
    };

    res.json(result);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "날씨 정보를 가져오는 중 문제가 발생했습니다." });
  }
};

module.exports = {
  getWeatherData,
};
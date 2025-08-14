import axios from "axios";

const W_API = import.meta.env.VITE_WEATHER_API_KEY;
const W_BASE = "https://api.openweathermap.org/data/2.5";

const wx = axios.create({
  baseURL: W_BASE,
  timeout: 12000,
});

export const fetchCurrentWeather = async (city = "Delhi", units = "metric") => {
  try {
    const res = await wx.get("/weather", {
      params: { q: city, appid: W_API, units },
    });
    return res.data;
  } catch (err) {
    const msg = err?.response?.data?.message || err.message || "API error";
    throw new Error(`WeatherAPI: ${msg}`);
  }
};

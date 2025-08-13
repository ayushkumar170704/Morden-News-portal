import axios from "axios";

const W_API = import.meta.env.VITE_WEATHER_API_KEY;
const W_BASE = "https://api.openweathermap.org/data/2.5";

export const fetchCurrentWeather = async (city = "Delhi", units = "metric") => {
  const url = `${W_BASE}/weather?q=${encodeURIComponent(city)}&appid=${W_API}&units=${units}`;
  const res = await axios.get(url);
  return res.data; // { main, weather, wind, sys, name, visibility, ... }
};

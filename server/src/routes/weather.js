import { Router } from "express";
import axios from "axios";
import apicache from "apicache";

const router = Router();
const cache = apicache.middleware;

const WEATHER_API_BASE = process.env.WEATHER_API_BASE;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

const client = axios.create({
  baseURL: WEATHER_API_BASE,
  timeout: 12000
});

router.get("/current", cache("2 minutes"), async (req, res) => {
  const { city = "Delhi", units = "metric" } = req.query;
  try {
    const r = await client.get("/weather", {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        units
      }
    });
    res.json(r.data);
  } catch (e) {
    const msg = e?.response?.data?.message || e.message || "Weather API error";
    const code = e?.response?.status || 500;
    res.status(code).json({ error: `WeatherAPI: ${msg}` });
  }
});

export default router;

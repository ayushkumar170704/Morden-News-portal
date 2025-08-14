import { Router } from "express";
import axios from "axios";
import apicache from "apicache";

const router = Router();
const cache = apicache.middleware;

const NEWS_API_BASE = process.env.NEWS_API_BASE;
const NEWS_API_KEY = process.env.NEWS_API_KEY;

const client = axios.create({
  baseURL: NEWS_API_BASE,
  timeout: 12000
});

const handle = async (promise, res) => {
  try {
    const r = await promise;
    return res.json(r.data.articles || []);
  } catch (e) {
    const msg = e?.response?.data?.message || e.message || "NewsAPI error";
    const code = e?.response?.status || 500;
    return res.status(code).json({ error: `NewsAPI: ${msg}` });
  }
};

router.get("/top", cache("5 minutes"), async (req, res) => {
  const { country = "us", pageSize = 8, page = 1 } = req.query;
  const params = { country, pageSize, page, apiKey: NEWS_API_KEY };
  await handle(client.get("/top-headlines", { params }), res);
});

router.get("/category", cache("5 minutes"), async (req, res) => {
  const { category = "technology", country = "us", pageSize = 18, page = 1 } = req.query;
  const params = { country, category, pageSize, page, apiKey: NEWS_API_KEY };
  await handle(client.get("/top-headlines", { params }), res);
});

router.get("/search", cache("2 minutes"), async (req, res) => {
  const { q = "", pageSize = 12, page = 1, language = "en" } = req.query;
  if (!q.trim()) {
    return res.status(400).json({ error: "Query parameter 'q' is required." });
  }
  const params = { q, pageSize, page, sortBy: "publishedAt", language, apiKey: NEWS_API_KEY };
  await handle(client.get("/everything", { params }), res);
});

router.get("/today", cache("5 minutes"), async (req, res) => {
  const { pageSize = 30, page = 1, country = "us" } = req.query;
  const params = { country, pageSize, page, apiKey: NEWS_API_KEY };
  await handle(client.get("/top-headlines", { params }), res);
});

export default router;

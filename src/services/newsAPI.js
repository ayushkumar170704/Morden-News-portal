// src/services/newsAPI.js
import axios from "axios";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 12000,
});

api.interceptors.request.use((config) => {
  config.params = { ...(config.params || {}), apiKey: API_KEY };
  return config;
});

const handle = async (promise) => {
  try {
    const res = await promise;
    return res.data.articles || [];
  } catch (err) {
    const msg = err?.response?.data?.message || err.message || "API error";
    throw new Error(`NewsAPI: ${msg}`);
  }
};

export const fetchTopHeadlines = (country = "us", pageSize = 8, page = 1) =>
  handle(api.get("/top-headlines", { params: { country, pageSize, page } }));

export const fetchByCategory = (category, country = "us", pageSize = 18, page = 1) =>
  handle(
    api.get("/top-headlines", {
      params: { country, category: encodeURIComponent(category), pageSize, page },
    })
  );

export const searchNews = (query, pageSize = 12) =>
  handle(
    api.get("/everything", {
      params: {
        q: encodeURIComponent(query),
        pageSize,
        sortBy: "publishedAt",
        language: "en",
      },
    })
  );

// Today’s News: use top-headlines to avoid q requirement in /everything
export const fetchTodaysNews = (pageSize = 30, page = 1, country = "us") =>
  handle(api.get("/top-headlines", { params: { country, pageSize, page } }));

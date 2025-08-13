// src/services/newsAPI.js
import axios from "axios";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

export const fetchTopHeadlines = async (country = "us", pageSize = 8, page = 1) => {
  const res = await axios.get(
    `${BASE_URL}/top-headlines?country=${country}&pageSize=${pageSize}&page=${page}&apiKey=${API_KEY}`
  );
  return res.data.articles || [];
};

// ADD THIS export
export const fetchByCategory = async (category, country = "us", pageSize = 18, page = 1) => {
  // NewsAPI top-headlines supports category with country[9][12]
  const res = await axios.get(
    `${BASE_URL}/top-headlines?country=${country}&category=${encodeURIComponent(
      category
    )}&pageSize=${pageSize}&page=${page}&apiKey=${API_KEY}`
  );
  return res.data.articles || [];
};

export const searchNews = async (query, pageSize = 12) => {
  const res = await axios.get(
    `${BASE_URL}/everything?q=${encodeURIComponent(query)}&pageSize=${pageSize}&sortBy=publishedAt&language=en&apiKey=${API_KEY}`
  );
  return res.data.articles || [];
};
// TODAY'S IMPORTANT NEWS
export const fetchTodaysNews = async (pageSize = 30, page = 1, language = "en") => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const isoDate = `${yyyy}-${mm}-${dd}`; // YYYY-MM-DD

  const url = `${BASE_URL}/everything?from=${isoDate}&to=${isoDate}&language=${language}&sortBy=popularity&pageSize=${pageSize}&page=${page}&apiKey=${API_KEY}`;

  const res = await axios.get(url);
  return res.data.articles || [];
};

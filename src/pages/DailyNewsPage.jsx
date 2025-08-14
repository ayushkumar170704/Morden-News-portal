// src/pages/DailyNewsPage.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NewsSection from "../components/NewsSection";
import { fetchTodaysNews, fetchTopHeadlines } from "../services/newsAPI";

export default function DailyNewsPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setErr("");
      try {
        // Primary: top-headlines as Today’s news
        const res = await fetchTodaysNews(30, 1, "us");
        if (res && res.length) {
          setArticles(res);
        } else {
          // Fallback to top-headlines again with larger pageSize
          const top = await fetchTopHeadlines("us", 30, 1);
          setArticles(top);
        }
      } catch (e) {
        setErr(e?.message || "Failed to load Today’s News");
        // Final fallback so the page shows something
        try {
          const top = await fetchTopHeadlines("us", 30, 1);
          setArticles(top);
        } catch {
          setArticles([]);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full max-w-none px-4 sm:px-6 lg:px-8 py-8 flex-1">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Today’s Most Important News
        </h1>
        <Link to="/" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          ← Back to Home
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : err ? (
        <div className="space-y-2">
          <p className="text-sm text-red-600">{err}</p>
          {articles.length ? (
            <p className="text-sm text-gray-500">Showing top headlines.</p>
          ) : null}
          <NewsSection title="" articles={articles} />
        </div>
      ) : (
        <NewsSection title="" articles={articles} />
      )}
    </div>
  );
}

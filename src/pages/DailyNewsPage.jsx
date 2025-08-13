import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NewsSection from "../components/NewsSection";
import { fetchTodaysNews } from "../services/newsAPI"; // we'll add this helper

export default function DailyNewsPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetchTodaysNews();
        setArticles(res);
      } catch (e) {
        console.error("Failed to load Today's News:", e);
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
        <Link
          to="/"
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to Home
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <NewsSection title="" articles={articles} />
      )}
    </div>
  );
}

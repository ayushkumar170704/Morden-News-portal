import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NewsSection from "../components/NewsSection";
import { fetchByCategory } from "../services/newsAPI";

const TITLE_MAP = {
  technology: "Technology",
  sports: "Sports",
  business: "Business",
  entertainment: "Entertainment",
};

export default function CategoryPage() {
  const { category } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const title = TITLE_MAP[category] || category;

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetchByCategory(category, "us", 18);
        setArticles(res);
      } catch (e) {
        console.error("Failed to load category:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
    window.scrollTo(0, 0);
  }, [category]);

  return (
    <div className="container mx-auto px-5 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {title} News
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
      ) : articles?.length ? (
        <NewsSection title="" articles={articles} />
      ) : (
        <p className="text-gray-500">No articles found.</p>
      )}
    </div>
  );
}

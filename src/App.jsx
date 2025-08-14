import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import NewsSection from "./components/NewsSection";
import MarketWidget from "./components/MarketWidget";
import Pagination from "./components/Pagination";
import WeatherWidget from "./components/WeatherWidget";
import CategoryPage from "./pages/CategoryPage";
import DailyNewsPage from "./pages/DailyNewsPage";
import SharedNewsPage from "./pages/SharedNewsPage";
import { fetchTopHeadlines, searchNews } from "./services/newsAPI";

function Home() {
  const [top, setTop] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const loadLanding = async (page = 1) => {
    setLoading(true);
    try {
      const t = await fetchTopHeadlines("us", 8, page);
      setTop(t);
    } catch (e) {
      console.error("Failed to load news:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    if (!query) return loadLanding(currentPage);
    setLoading(true);
    try {
      const res = await searchNews(query, 8);
      setTop(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLanding(currentPage);
  }, [currentPage]);

  return (
    <Layout onSearch={handleSearch}>
      <div className="grid lg:grid-cols-3 gap-8">
        <main className="lg:col-span-2">
          <section id="top">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Top Headlines</h2>
            </div>
            {loading ? (
              <p className="text-gray-500 text-center">Loading...</p>
            ) : (
              <NewsSection title="" articles={top} />
            )}
          </section>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </main>

        <aside id="market" className="lg:col-span-1">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Market Snapshot</h3>
            <MarketWidget />
            <WeatherWidget />
          </div>
        </aside>
      </div>
    </Layout>
  );
}

export default function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/category/:category"
            element={
              <Layout>
                <CategoryPage />
              </Layout>
            }
          />

          <Route
            path="/daily-news"
            element={
              <Layout>
                <DailyNewsPage />
              </Layout>
            }
          />

          <Route
            path="/shared-news"
            element={
              <Layout>
                <SharedNewsPage />
              </Layout>
            }
          />

          <Route
            path="*"
            element={
              <Layout>
                <div className="py-16 w-full">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold">Page not found</h2>
                    <p className="mt-2 text-gray-500">Try using the navigation above.</p>
                  </div>
                </div>
              </Layout>
            }
          />
        </Routes>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

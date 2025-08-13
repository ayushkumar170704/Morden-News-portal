import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import NewsSection from "./components/NewsSection";
import MarketWidget from "./components/MarketWidget";
import Pagination from "./components/Pagination";
import Footer from "./components/Footer";
import WeatherWidget from "./components/WeatherWidget";
import CategoryPage from "./pages/CategoryPage";
import DailyNewsPage from "./pages/DailyNewsPage";
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
    <div className="bg-gray-50 dark:bg-gray-900 dark:text-gray-100 min-h-screen flex flex-col">
      <Header onSearch={handleSearch} />

      {/* Full width container with proper max-width and centering */}
      <div className="flex-1 py-8 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <main className="lg:col-span-2">
              <section id="top">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Top Headlines
                  </h2>
                </div>

                {loading ? (
                  <p className="text-gray-500 text-center">Loading...</p>
                ) : (
                  <NewsSection title="" articles={top} />
                )}
              </section>

              {/* Centered pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </main>

            <aside id="market" className="lg:col-span-1">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Market Snapshot
                </h3>
                <MarketWidget />
                <WeatherWidget />
              </div>
            </aside>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/category/:category"
        element={
          <div className="bg-gray-50 dark:bg-gray-900 dark:text-gray-100 min-h-screen flex flex-col">
            <Header />
            <div className="flex-1 py-8 w-full">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <CategoryPage />
              </div>
            </div>
            <Footer />
          </div>
        }
      />
      <Route
        path="/daily-news"
        element={
          <div className="bg-gray-50 dark:bg-gray-900 dark:text-gray-100 min-h-screen flex flex-col">
            <Header />
            <div className="flex-1 py-8 w-full">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <DailyNewsPage />
              </div>
            </div>
            <Footer />
          </div>
        }
      />
      <Route
        path="*"
        element={
          <div className="bg-gray-50 dark:bg-gray-900 dark:text-gray-100 min-h-screen flex flex-col">
            <Header />
            <div className="flex-1 py-16 w-full">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-2xl font-bold">Page not found</h2>
                <p className="mt-2 text-gray-500">
                  Try using the navigation above.
                </p>
              </div>
            </div>
            <Footer />
          </div>
        }
      />
    </Routes>
  );
}
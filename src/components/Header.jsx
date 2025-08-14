import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AuthButton from "./AuthButton";

export default function Header({ onSearch }) {
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const location = useLocation();
  const debounceRef = useRef(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(query);
  };

  useEffect(() => {
    if (!onSearch) return;
    if (!query) return;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSearch(query);
    }, 400);
    return () => clearTimeout(debounceRef.current);
  }, [query, onSearch]);

  const nav = [
    { to: "/", label: "Top" },
    { to: "/daily-news", label: "Today's News" },
    { to: "/shared-news", label: "Community News" },
    { to: "/category/technology", label: "Technology" },
    { to: "/category/sports", label: "Sports" },
    { to: "/category/business", label: "Business" },
    { to: "/category/entertainment", label: "Entertainment" },
    { to: "/#market", label: "Market" },
  ];

  const isActive = (to) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to);
  };

  const goToMarket = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      const el = document.getElementById("market");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md dark:from-gray-900 dark:to-gray-800">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <Link to="/" className="text-3xl font-bold tracking-wide">
            📰 News Portal
          </Link>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <form
              onSubmit={handleSubmit}
              className="flex flex-1 md:flex-initial rounded-lg overflow-hidden shadow-lg"
            >
              <input
                type="text"
                placeholder="Search latest news..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-4 py-2 bg-white text-gray-900 placeholder-gray-500 outline-none border border-white/30 focus:border-white"
                aria-label="Search news"
              />
              <button
                type="submit"
                className="bg-blue-800 px-5 hover:bg-blue-900 transition text-white font-semibold"
                aria-label="Submit search"
              >
                Search
              </button>
            </form>

            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-sm"
              title="Toggle dark mode"
              aria-pressed={theme === "dark"}
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            {/* Share News Button - Only visible when authenticated */}
            {isAuthenticated && (
              <Link
                to="/shared-news"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition text-sm font-medium whitespace-nowrap"
              >
                📰 Share News
              </Link>
            )}

            <AuthButton />
          </div>
        </div>

        <nav className="flex gap-4 mt-4 text-sm overflow-x-auto whitespace-nowrap">
          {nav.map((n) =>
            n.to.startsWith("/#") ? (
              <a
                key={n.to}
                href={n.to}
                onClick={goToMarket}
                className="pb-1 border-b-2 border-transparent hover:border-yellow-300"
              >
                {n.label}
              </a>
            ) : (
              <Link
                key={n.to}
                to={n.to}
                className={`pb-1 border-b-2 transition ${
                  isActive(n.to)
                    ? "border-yellow-400 font-semibold"
                    : "border-transparent hover:border-yellow-300"
                }`}
              >
                {n.label}
              </Link>
            )
          )}
        </nav>
      </div>
    </header>
  );
}

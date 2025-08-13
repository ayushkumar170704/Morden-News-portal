import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header({ onSearch }) {
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const location = useLocation();

  // Dark mode logic
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(query);
  };

  const nav = [
    { to: "/", label: "Top" },
    { to: "/daily-news", label: "Today’s News" },
    { to: "/category/technology", label: "Technology" },
    { to: "/category/sports", label: "Sports" },
    { to: "/category/business", label: "Business" },
    { to: "/category/entertainment", label: "Entertainment" },
    { to: "/#market", label: "Market" }, // same-page anchor
  ];

  const isActive = (to) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to);
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md dark:from-gray-900 dark:to-gray-800">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold tracking-wide">
            📰 News Portal
          </Link>

          {/* Search + Dark Mode */}
          <div className="flex items-center gap-2 w-full md:w-auto">
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
              />
              <button
                type="submit"
                className="bg-blue-800 px-5 hover:bg-blue-900 transition text-white font-semibold"
              >
                Search
              </button>
            </form>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="ml-2 px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-sm"
              title="Toggle dark mode"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex gap-4 mt-4 text-sm overflow-x-auto whitespace-nowrap">
          {nav.map((n) =>
            n.to.startsWith("/#") ? (
              <a
                key={n.to}
                href={n.to}
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

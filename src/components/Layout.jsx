import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children, onSearch }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 dark:text-gray-100 min-h-screen flex flex-col">
      <Header onSearch={onSearch} />
      <main className="flex-1 py-8 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
      <Footer />
    </div>
  );
}

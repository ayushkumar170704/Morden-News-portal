import NewsCard from "./NewsCard";

export default function NewsList({ articles, loading }) {
  if (loading)
    return (
      <p className="text-center text-lg text-gray-500 animate-pulse">
        Loading news...
      </p>
    );
  if (!articles.length)
    return (
      <p className="text-center text-gray-400">No news articles found.</p>
    );

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
      {articles.map((article, index) => (
        <NewsCard key={index} article={article} />
      ))}
    </div>
  );
}

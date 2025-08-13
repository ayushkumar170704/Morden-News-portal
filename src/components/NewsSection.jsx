import NewsCard from "./NewsCard";

export default function NewsSection({ title, articles = [], link }) {
  if (!articles.length) return null;

  return (
    <section className="mb-10">
      {title ? (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          {link ? (
            <a href={link} className="text-sm text-blue-600 hover:text-blue-800">
              View more →
            </a>
          ) : null}
        </div>
      ) : null}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a, i) => (
          <NewsCard key={`${title}-${i}`} article={a} />
        ))}
      </div>
    </section>
  );
}

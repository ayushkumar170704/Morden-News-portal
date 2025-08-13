export default function NewsCard({ article }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 flex flex-col">
      {article?.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-44 object-cover"
        />
      )}
      <div className="p-5 flex flex-col flex-1">
        <h2 className="font-extrabold text-lg text-gray-900 dark:text-gray-100 mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition">
          {article?.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 flex-1 mb-4">
          {article?.description || "No description available."}
        </p>
        <div className="mt-auto flex justify-between items-center">
          <span className="text-xs text-gray-400">
            {article?.source?.name || "Unknown"}
          </span>
          <a
            href={article?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Read more →
          </a>
        </div>
      </div>
    </div>
  );
}

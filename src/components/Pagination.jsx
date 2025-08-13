// src/components/Pagination.jsx
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (!totalPages || totalPages <= 1) return null;

  // Simple page list (1..totalPages). If you want ellipsis later, we can add.
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  return (
    <div className="mt-8">
      <nav
        className="flex items-center justify-center gap-2"
        role="navigation"
        aria-label="Pagination"
      >
        <button
          onClick={() => canPrev && onPageChange(currentPage - 1)}
          disabled={!canPrev}
          className={`px-3 py-2 rounded-md border text-sm transition ${
            canPrev
              ? "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
          }`}
          aria-label="Previous page"
        >
          Prev
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-current={currentPage === page ? "page" : undefined}
            className={`min-w-9 px-3 py-2 rounded-md border text-sm transition ${
              currentPage === page
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => canNext && onPageChange(currentPage + 1)}
          disabled={!canNext}
          className={`px-3 py-2 rounded-md border text-sm transition ${
            canNext
              ? "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
          }`}
          aria-label="Next page"
        >
          Next
        </button>
      </nav>
    </div>
  );
}

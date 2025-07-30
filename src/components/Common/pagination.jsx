import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const handleChange = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <button
            key={i}
            onClick={() => handleChange(i)}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              i === currentPage
                ? "bg-[#147265] text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {i}
          </button>
        );
      } else if (
        (i === currentPage - 2 && i > 2) ||
        (i === currentPage + 2 && i < totalPages - 1)
      ) {
        pages.push(
          <span key={`dots-${i}`} className="px-2 text-gray-500">
            ...
          </span>
        );
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-6">
      <button
        onClick={() => handleChange(currentPage - 1)}
        className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50"
        disabled={currentPage === 1}
        aria-label="Trang trước"
      >
        <ChevronLeft size={18} />
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => handleChange(currentPage + 1)}
        className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50"
        disabled={currentPage === totalPages}
        aria-label="Trang sau"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}) => {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex justify-between items-center px-6 py-3 bg-dark-surface border-t border-dark-border text-sm text-dark-text-secondary">
      {/* Results range display */}

      <span>
        {startItem} — {endItem} of {totalItems} results
      </span>

      {/* Page counter */}
      <div className="flex  items-center">
        <span className="mr-6">
          {currentPage} of {totalPages} pages
        </span>

        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center px-3 py-1 rounded-md  hover:bg-dark-hover disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="ml-2 flex items-center px-3 py-1 rounded-md  hover:bg-dark-hover disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;

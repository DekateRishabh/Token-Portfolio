import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-end items-center px-6 py-3 bg-dark-surface border-t border-dark-border text-sm text-dark-text-secondary">
      {/* Page counter */}
      <span className="mr-6">
        {currentPage} of {totalPages} pages
      </span>

      {/* Prev button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center px-3 py-1 rounded-md  hover:bg-dark-hover disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="ml-2 flex items-center px-3 py-1 rounded-md  hover:bg-dark-hover disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

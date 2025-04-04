import React from "react";
import '../css/pagination.css';
import {TPagination} from "../types/TPagination";

const Pagination: React.FC<TPagination> = ({ currentPage, totalPages, onPageChange }) => {
    const maxVisiblePages = 5;

    const getPages = (): (number | string)[] => {
      let pages: (number | string)[] = [];
      if (totalPages <= maxVisiblePages) {
        pages = Array.from({ length: totalPages }, (_, i) => i + 1);
      } else {
        if (currentPage <= 3) {
          pages = [1, 2, 3, 4, "...",totalPages-1 ,totalPages];
        } else if (currentPage >= totalPages - 2) {
          pages = [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        } else {
          pages = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
        }
      }
      return pages;
    };
  
    return (
      <div className="pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="page-button"
        >
          {"<"}
        </button>
  
        {getPages().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && onPageChange(page)}
            className={`page-button ${currentPage === page ? "active" : ""}`}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}
  
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="page-button"
        >
          {">"}
        </button>
      </div>
    );
  };
export default Pagination;


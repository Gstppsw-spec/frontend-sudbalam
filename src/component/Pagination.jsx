import { useEffect } from "react";
import { usePagination } from "../hooks/usePagination";

export const Pagination = ({ size, totalPage, onPageChange }) => {
  const { currentPage, totalPages, nextPage, prevPage, goToPage } =
    usePagination(size, totalPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    onPageChange(currentPage)

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <div
          key={i}
          className={`pagination-button ${i === currentPage ? "active" : ""}`}
          onClick={() => goToPage(i)}
        >
          {i}
        </div>
      );
    }

    return pageNumbers;
  };



  return (
    <div className="pagination-container">
      <div className="pagination-button" onClick={prevPage}>
        Prev
      </div>
      {renderPageNumbers()}
      <div className="pagination-button" onClick={nextPage}>
        Next
      </div>
    </div>
  );
};

import { useState } from 'react';

export const usePagination = (size, totalPages) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };


  return {
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
  };
};
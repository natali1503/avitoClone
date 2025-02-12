import { useState } from 'react';

interface IUsePagination {
  quantityAd: number;
}

export function usePagination({ quantityAd }: IUsePagination) {
  const itemsPerPage = 5;
  const totalPages = Math.ceil(quantityAd / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  return {
    currentPage,
    totalPages,
    indexOfLastItem,
    indexOfFirstItem,
    setCurrentPage,
  };
}

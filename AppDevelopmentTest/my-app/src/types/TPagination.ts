export interface TPagination {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }
  
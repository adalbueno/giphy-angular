export class PaginationPage {
  index: number;
  current: boolean;
};

export class Pagination {
  size: number;
  currentPage: number;
  firstPage: number;
  lastPage: number;
  totalPages: number;
  pages: Array<PaginationPage>
};

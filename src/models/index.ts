type Sort = {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
};

type PageableItem = {
  sort: Sort;
  offset: number;
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  unpaged: boolean;
};

export type Pageable<T> = {
  map(arg0: (opt: any) => { id: any; label: any; '': any; }): import('react').SetStateAction<{ id: number; label: string; }[]>;
  content: T[];
  pageable: PageableItem;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
};

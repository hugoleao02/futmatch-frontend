import type { PartidaResponse } from './PartidaResponse';

export interface SortObject {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface PageableObject {
  offset: number;
  sort: SortObject;
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  unpaged: boolean;
}

export interface PagePartidaResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  content: PartidaResponse[];
  number: number;
  sort: SortObject;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: PageableObject;
  empty: boolean;
}

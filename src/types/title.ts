 export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  }
  
  export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  }
  
  export interface ContentItem {
    title: string;
    id?: string;
  }
  
  export interface TitleData {
    content: ContentItem[];
    pageable: Pageable;
    size: number;
    number: number;
    sort: Sort;
    numberOfElements: number;
    first: boolean;
    last: boolean;
    empty: boolean;
  }
  
export interface Sort {
    direction: string;
    nullHandling: string;
    ascending: boolean;
    property: string;
    ignoreCase: boolean;
  }
  
  export interface Pageable {
    offset: number;
    sort: Sort[];
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
  }
  
  export interface ContentGallery {
    id: string;
    title: string;
    genres: string;
    rating: number;
    posterPath: string;
    duration: string;
    releaseYear: number;
    type: string;
  }
  
  export interface GalleryData {
    size: number;
    content: ContentGallery[];
    number: number;
    sort: Sort[];
    numberOfElements: number;
    pageable: Pageable;
    first: boolean;
    last: boolean;
    empty: boolean;
  }

  export interface FetchGalleryParams {
    title?: string;
    years?: string;
    type?: string;
    page?: number;
    size?: number;
    sort?: string[];
  }

  export interface FiltersOptions {
    value: string;
    label: string;
}
  
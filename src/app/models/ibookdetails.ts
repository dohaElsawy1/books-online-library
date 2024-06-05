export interface IBookDetails {
  
    key: string;
    title: string;
    edition_count: number;
    cover_id: number;
    authors: { author: { key: string } }[];
    first_publish_year: number;
    number_of_pages: string; 
}
export interface Author {
    key: string;
    name: string;
  }

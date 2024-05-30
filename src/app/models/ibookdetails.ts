export interface IBookDetails {
  
    key: string;
    title: string;
    edition_count: number;
    cover_id: number;
    authors: { key: string, name: string }[];
    first_publish_year: number;
    number_of_pages: string; 
}

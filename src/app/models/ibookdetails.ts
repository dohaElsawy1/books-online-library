export interface IBookDetails {
    // title: string;
    // first_publish_year: number;
    // authors: { name: string }[];
    // edition_count: number;
    // number_of_pages: number;
    // cover_id?: number;

    key: string;
    title: string;
    edition_count: number;
    cover_id: number;
    authors: { key: string, name: string }[];
    first_publish_year: number;
    number_of_pages: string; 
}

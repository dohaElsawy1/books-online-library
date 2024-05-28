export interface IBookDetails {
    title: string;
    first_publish_year: number;
    authors: { name: string }[];
    edition_count: number;
    number_of_pages: number;
    cover_id?: number;
}

export interface IBooks {
    title: string;
    first_publish_year: number;
    cover_id?: number;
    authors: Author[];
    authorNames?: string;
}
export interface Author {
    name: string;
}

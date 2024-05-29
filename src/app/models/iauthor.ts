export interface IAuthor {
    key: string;
    name: string;
    birth_date: string;
    top_5_subjects: string[];
    photo?: string; // Assuming photo is optional
    work_count: number;
}

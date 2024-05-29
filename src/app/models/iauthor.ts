export interface Author {
    key: string;
    name: string;
    birth_date: string;
    top_subjects: string[];
    photos?: number[]; // Assuming photo is optional
    work_count: number;
}

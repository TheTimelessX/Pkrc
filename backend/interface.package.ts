export interface Package {
    owner_id: number;
    owner_name: string;
    id: string;
    size: number;
    compressed_size: number;
    contains_files: number;
    name: string;
    command: string;
    description: string;
    type: "public" | "private";
    released_at: number; // timestamp
    version: string;
    path: string;
}

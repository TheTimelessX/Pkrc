import { Package } from "./interface.package";

export interface User {
    id: number;
    name: string;
    gmail: string;
    auth: string;
    packages: string[]; // ids of owning packages
    verified: boolean;
}

export interface UserCarry extends Omit<User, "packages"> {
    packages: Package[];
}
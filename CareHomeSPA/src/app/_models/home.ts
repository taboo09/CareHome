import { staff } from "./staff";

export interface home{
    id: number;
    name: string;
    address: string;
    city: string;
    email: string;
    rating: number;
    staffs: staff[];
}
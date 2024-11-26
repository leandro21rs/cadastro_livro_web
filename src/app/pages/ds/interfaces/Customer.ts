import { Country } from "./Country";
import { Representative } from "./Representative";

export interface Customer {
    id?: number;
    name?: number;
    country?: Country;
    company?: string;
    date?: Date;
    status?: string;
    badge?:string;
    representative?: Representative;
}
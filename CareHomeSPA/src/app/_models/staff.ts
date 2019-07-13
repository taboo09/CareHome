import { qualification } from "./qualification";

export interface staff{
    id: number;
    forename: string;
    surname: string;
    dateOfBirth: Date;
    jobTitle: string;
    annualSalary: number;
    homeId: number;
    qualifications: qualification[];
}
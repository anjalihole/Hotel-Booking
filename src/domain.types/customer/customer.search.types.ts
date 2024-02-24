/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import { CustomerDto } from './customer.dto';

///////////////////////////////////////////////////////////////////////////////////

export interface CustomerSearchFilters {
    id?: string;
    FirstName: string;
    LastName: string;
    Address: string;
    Password: string;
    Phone?: string;
    Email?: string;
}

export interface CustomerSearchResults {
    id?: string;
    FirstName: string;
    LastName: string;
    Address: string;
    Password: string;
    Phone?: string;
    Email?: string;
}

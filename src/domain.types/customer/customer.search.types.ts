/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import { CustomerDto } from "./customer.dto";

///////////////////////////////////////////////////////////////////////////////////

export interface CustomerSearchFilters {
    id?: string;
    UserId: string;
    AddressId: string;
    PAN: string;
    Aadhar: string;
    OrderBy      : string;
    Order        : string;
    PageIndex    : number;
    ItemsPerPage : number;
}

export interface CustomerSearchResults {
    TotalCount     : number;
    RetrievedCount : number;
    PageIndex      : number;
    ItemsPerPage   : number;
    Order          : string;
    OrderedBy      : string;
    Items          : CustomerDto[];
}

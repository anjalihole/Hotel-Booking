/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import { AddressDto } from './address.dto';

///////////////////////////////////////////////////////////////////////////////////

export interface AddressSearchFilters {
    id?: string;
    AddressLine1 : string;
    AddressLine2: string;
    Street: string;
    City: string;
    Country: string;
    State: string;
    ZipCode: number;
    OrderBy      : string;
    Order        : string;
    PageIndex    : number;
    ItemsPerPage : number;

}

export interface AddressSearchResults {
    TotalCount     : number;
    RetrievedCount : number;
    PageIndex      : number;
    ItemsPerPage   : number;
    Order          : string;
    OrderedBy      : string;
    Items          : AddressDto[];
}

/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import { HotelDto } from './hotel.dto';

///////////////////////////////////////////////////////////////////////////////////

export interface HotelSearchFilters {
    id?: string;
    HotelName: string;
    Address: string;
    Phone?: string;
    Email?: string;
    OrderBy      : string;
    Order        : string;
    PageIndex    : number;
    ItemsPerPage : number;
}

export interface HotelSearchResults {
    TotalCount     : number;
    RetrievedCount : number;
    PageIndex      : number;
    ItemsPerPage   : number;
    Order          : string;
    OrderedBy      : string;
    Items          : HotelDto[];
}

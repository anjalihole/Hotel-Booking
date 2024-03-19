/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import { HotelDto } from "./hotel.dto";

///////////////////////////////////////////////////////////////////////////////////

export interface HotelSearchFilters {
    id?: string;
    Name: string;
    AddressId: string;
    Phone?: string;
    Email?: string;
    Description: string;
    CheckInTime: string;
    CheckOutTime: string;
    OwnerUserId: string;
    Photos: string;
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

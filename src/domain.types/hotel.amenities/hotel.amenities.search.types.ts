/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import { HotelAmenitiesDto } from "./hotel.amenities.dto";

///////////////////////////////////////////////////////////////////////////////////

export interface HotelAmenitiesSearchFilters {
    id?: string;
    AminityName: string;
    HotelId: string;
    OrderBy      : string;
    Order        : string;
    PageIndex    : number;
    ItemsPerPage : number;
}

export interface HotelAmenitiesSearchResults {
    TotalCount     : number;
    RetrievedCount : number;
    PageIndex      : number;
    ItemsPerPage   : number;
    Order          : string;
    OrderedBy      : string;
    Items          : HotelAmenitiesDto[];
}

/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import { HotelPhotosDto } from "./hotel.photos.dto";

///////////////////////////////////////////////////////////////////////////////////

export interface HotelPhotosSearchFilters {
    id?: string;
    FileResourceId: string;
    HotelId: string;
    RoomTypeId: string;
    OrderBy      : string;
    Order        : string;
    PageIndex    : number;
    ItemsPerPage : number;
}

export interface HotelPhotosSearchResults {
    TotalCount     : number;
    RetrievedCount : number;
    PageIndex      : number;
    ItemsPerPage   : number;
    Order          : string;
    OrderedBy      : string;
    Items          : HotelPhotosDto[];
}

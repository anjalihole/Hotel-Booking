/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import { RoomAmenitiesDto } from "./room.amenities.dto";

///////////////////////////////////////////////////////////////////////////////////

export interface RoomAmenitiesSearchFilters {
    id?: string;
    AminityName: string;
    RoomId: string;
    HotelId:string;
    OrderBy      : string;
    Order        : string;
    PageIndex    : number;
    ItemsPerPage : number;
}

export interface RoomAmenitiesSearchResults {
    TotalCount     : number;
    RetrievedCount : number;
    PageIndex      : number;
    ItemsPerPage   : number;
    Order          : string;
    OrderedBy      : string;
    Items          : RoomAmenitiesDto[];
}

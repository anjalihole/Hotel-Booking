/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import { RoomDto } from './room.dto';

///////////////////////////////////////////////////////////////////////////////////

export interface RoomSearchFilters {
    id?: string;
    Name: string;
    RoomNumber: string;
    RoomTypeId: string;
    Description: string;
    Blocked: string;
    Status: string;
    Phone?:string;
    Inventory: string;
    OrderBy      : string;
    Order        : string;
    PageIndex    : number;
    ItemsPerPage : number;

}

export interface RoomSearchResults {
    TotalCount     : number;
    RetrievedCount : number;
    PageIndex      : number;
    ItemsPerPage   : number;
    Order          : string;
    OrderedBy      : string;
    Items          : RoomDto[];
}

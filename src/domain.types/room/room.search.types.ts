/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import { RoomDto } from './room.dto';

///////////////////////////////////////////////////////////////////////////////////

export interface RoomSearchFilters {
    id?: string;
    HotelId: string;
    RoomNumber: string;
    RoomType: string;
    BedType: string;
    RoomImage: string;
    Price: string;
    Taxes: string;
    Description: string;
    BlockRoom: string;
    RoomPerPerson: string;
    CostPerDay: string;
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

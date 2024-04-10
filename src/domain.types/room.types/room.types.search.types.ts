/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import { RoomTypesDto } from './room.types.dto';

///////////////////////////////////////////////////////////////////////////////////

export interface RoomTypesSearchFilters {
    id?: string;
    TypeName: string;
    TypeDescription: string;
    StandardRate: string;
    Options: string;
    OccupancyAdult: string;
    OccupancyChildren: string;
    OrderBy      : string;
    Order        : string;
    PageIndex    : number;
    ItemsPerPage : number;

}

export interface RoomTypesSearchResults {
    TotalCount     : number;
    RetrievedCount : number;
    PageIndex      : number;
    ItemsPerPage   : number;
    Order          : string;
    OrderedBy      : string;
    Items          : RoomTypesDto[];
}

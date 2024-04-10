/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import { RoleDto } from "./role.dto";

///////////////////////////////////////////////////////////////////////////////////

export interface RoleSearchFilters {
    id?: string;
    RoleName: string;
    Description: string;
    OrderBy      : string;
    Order        : string;
    PageIndex    : number;
    ItemsPerPage : number;
}

export interface RoleSearchResults {
    TotalCount     : number;
    RetrievedCount : number;
    PageIndex      : number;
    ItemsPerPage   : number;
    Order          : string;
    OrderedBy      : string;
    Items          : RoleDto[];
}

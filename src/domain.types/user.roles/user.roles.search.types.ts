/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import { UserRolesDto } from './user.roles.dto';

///////////////////////////////////////////////////////////////////////////////////

export interface UserRolesSearchFilters {
    id?: string;
    UserId: string;
    RoleId: string;
    OrderBy      : string;
    Order        : string;
    PageIndex    : number;
    ItemsPerPage : number;
}

export interface UserRolesSearchResults {
    TotalCount     : number;
    RetrievedCount : number;
    PageIndex      : number;
    ItemsPerPage   : number;
    Order          : string;
    OrderedBy      : string;
    Items          : UserRolesDto[];
}

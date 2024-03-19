/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import { UserDto } from './user.dto';

///////////////////////////////////////////////////////////////////////////////////

export interface UserSearchFilters {
    Id?: string;
    FirstName: string;
    LastName: string;
    Phone?: string;
    Email?: string;
    OrderBy      : string;
    Order        : string;
    PageIndex    : number;
    ItemsPerPage : number;
}

export interface UserSearchResults {
    TotalCount     : number;
    RetrievedCount : number;
    PageIndex      : number;
    ItemsPerPage   : number;
    Order          : string;
    OrderedBy      : string;
    Items          : UserDto[];
}

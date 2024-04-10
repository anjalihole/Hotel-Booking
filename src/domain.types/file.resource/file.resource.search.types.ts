/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import { FileResourceDto } from './file.resource.dto';

///////////////////////////////////////////////////////////////////////////////////

export interface FileResourceSearchFilters {
    id?: string;
    Name : string;
    MineType: string;
    StorageKey: string;
    IsPublic: boolean;
    Url: string;
    OrderBy      : string;
    Order        : string;
    PageIndex    : number;
    ItemsPerPage : number;
}
export interface FileResourceSearchResults {
    TotalCount     : number;
    RetrievedCount : number;
    PageIndex      : number;
    ItemsPerPage   : number;
    Order          : string;
    OrderedBy      : string;
    Items          : FileResourceDto[];
}

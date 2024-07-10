/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import { AddressHolderDto } from './address.holder.dto';

///////////////////////////////////////////////////////////////////////////////////

export interface AddressHolderSearchFilters {
    id?: string;
    AddressId : string;
    HolderType: string;
    AddressType: string;
    OrderBy      : string;
    Order        : string;
    PageIndex    : number;
    ItemsPerPage : number;

}

export interface AddressHolderSearchResults {
    TotalCount     : number;
    RetrievedCount : number;
    PageIndex      : number;
    ItemsPerPage   : number;
    Order          : string;
    OrderedBy      : string;
    Items          : AddressHolderDto[];
}

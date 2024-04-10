/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import { PropertyRulesDto } from "./property.rules.dto";

///////////////////////////////////////////////////////////////////////////////////

export interface PropertyRulesSearchFilters {
    id?: string;
    HotelId: string;
    RulesName: string;
    Description: string;
    OrderBy      : string;
    Order        : string;
    PageIndex    : number;
    ItemsPerPage : number;
}

export interface PropertyRulesSearchResults {
    TotalCount     : number;
    RetrievedCount : number;
    PageIndex      : number;
    ItemsPerPage   : number;
    Order          : string;
    OrderedBy      : string;
    Items          : PropertyRulesDto[];
}

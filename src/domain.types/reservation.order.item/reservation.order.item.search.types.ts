/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import { ReservationOrderItemDto } from "./reservation.order.item.dto";

///////////////////////////////////////////////////////////////////////////////////

export interface ReservationOrderItemSearchFilters {
    id?: string;
    ReservationOrderId: string;
    RoomId: string;
    Tax: string;
    Discount: string;
    Cost: string;
    TotalDays:string;
    OrderBy      : string;
    Order        : string;
    PageIndex    : number;
    ItemsPerPage : number;
}

export interface ReservationOrderItemSearchResults {
    TotalCount     : number;
    RetrievedCount : number;
    PageIndex      : number;
    ItemsPerPage   : number;
    Order          : string;
    OrderedBy      : string;
    Items          : ReservationOrderItemDto[];
}

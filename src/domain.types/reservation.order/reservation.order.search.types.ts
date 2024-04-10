/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import { ReservationOrderDto } from "./reservation.order.dto";

///////////////////////////////////////////////////////////////////////////////////

export interface ReservationOrderSearchFilters {
    id?: string;
    CustomerUserId: string;
    TotalCost: string;
    CheckInDate: string;
    CheckOutDate: string;
    ReservationDateTime: string;
    Status: string;
    Discount: string;
    Taxes: string;
    TotalPayable: string;
    AdvancePaid: string;
    AdvancePaymentDateTime: string;
    BookingStaffUserId: string;
    Penalties: string;
    OrderBy      : string;
    Order        : string;
    PageIndex    : number;
    ItemsPerPage : number;
}

export interface ReservationOrderSearchResults {
    TotalCount     : number;
    RetrievedCount : number;
    PageIndex      : number;
    ItemsPerPage   : number;
    Order          : string;
    OrderedBy      : string;
    Items          : ReservationOrderDto[];
}

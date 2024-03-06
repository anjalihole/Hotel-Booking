/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import { ReservationDto } from './reservation.dto';

///////////////////////////////////////////////////////////////////////////////////

export interface ReservationSearchFilters {
    id?: string;
    CustomerId: string;
    RoomId: string;
    CheckInDate: string;
    CheckOutDate: string;
    TotalCost: string;
    Status: string;
}

export interface ReservationSearchResults {
    TotalCount     : number;
    RetrievedCount : number;
    PageIndex      : number;
    ItemsPerPage   : number;
    Order          : string;
    OrderedBy      : string;
    Items          : ReservationDto[];
}

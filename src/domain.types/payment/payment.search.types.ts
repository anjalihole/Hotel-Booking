/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import { PaymentDto } from './payment.dto';

///////////////////////////////////////////////////////////////////////////////////

export interface PaymentSearchFilters {
    id?: string;
    BookingId : string;
    PaymentDate: string;
    PaymentAmount: string;
    PaymentMethod: string;
    TransactionStatus: string;
    OrderBy      : string;
    Order        : string;
    PageIndex    : number;
    ItemsPerPage : number;

}

export interface PaymentSearchResults {
    TotalCount     : number;
    RetrievedCount : number;
    PageIndex      : number;
    ItemsPerPage   : number;
    Order          : string;
    OrderedBy      : string;
    Items          : PaymentDto[];
}

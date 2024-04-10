/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable linebreak-style */

export interface ReservationOrderDto {
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
}

/* eslint-disable linebreak-style */
export interface ReservationOrderDomainModel {
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
export interface ApiReservationOrderVerificationDomainModel {
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

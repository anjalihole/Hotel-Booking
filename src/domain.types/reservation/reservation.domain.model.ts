/* eslint-disable linebreak-style */
export interface ReservationDomainModel {
    id?: string;
    CustomerId: string;
    RoomId: string;
    CheckInDate: string;
    CheckOutDate: string;
    TotalCost: string;
    Status: string;
}
export interface ApiReservationVerificationDomainModel {
    CustomerId: string;
    RoomId: string;
    CheckInDate: string;
    CheckOutDate: string;
    TotalCost: string;
    Status: string;
}

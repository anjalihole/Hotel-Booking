/* eslint-disable linebreak-style */
export interface ReservationOrderItemDomainModel {
    id?: string;
    ReservationOrderId: string;
    RoomId: string;
    Tax: string;
    Discount: string;
    Cost: string;
    TotalDays:string;
}
export interface ApiReservationOrderItemVerificationDomainModel {
    id?: string;
    ReservationOrderId: string;
    RoomId: string;
    Tax: string;
    Discount: string;
    Cost: string;
    TotalDays:string;
}

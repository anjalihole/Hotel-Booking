/* eslint-disable linebreak-style */

export interface PaymentDto {
    id?: string;
    HotelId : string;
    PaymentDate: string;
    Amount: string;
    PaymentMethod: string;
    TransactionStatus: string;
    ReservationOrderId: string;
    PaymentConfirm: string;
}

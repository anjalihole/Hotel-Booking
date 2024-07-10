/* eslint-disable linebreak-style */
export interface PaymentDomainModel {
    id?: string;
    HotelId : string;
    PaymentDate: string;
    Amount: string;
    PaymentMethod: string;
    TransactionStatus: string;
    ReservationOrderId: string;
    PaymentConfirm: string;
}
export interface ApiPaymentVerificationDomainModel {
    HotelId : string;
    PaymentDate: string;
    Amount: string;
    PaymentMethod: string;
    TransactionStatus: string;
    ReservationOrderId: string;
    PaymentConfirm: string;
}

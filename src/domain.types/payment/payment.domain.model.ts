/* eslint-disable linebreak-style */
export interface PaymentDomainModel {
    id?: string;
    BookingId : string;
    PaymentDate: string;
    PaymentAmount: string;
    PaymentMethod: string;
    TransactionStatus: string
}
export interface ApiPaymentVerificationDomainModel {
    BookingId : string;
    PaymentDate: string;
    PaymentAmount: string;
    PaymentMethod: string;
    TransactionStatus: string
}

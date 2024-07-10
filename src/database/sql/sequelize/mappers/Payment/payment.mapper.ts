/* eslint-disable linebreak-style */
/* eslint-disable key-spacing */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
// /* eslint-disable linebreak-style */
// /* eslint-disable padded-blocks */
// /* eslint-disable key-spacing */
// /* eslint-disable linebreak-style */
import { PaymentDto } from '/../src/domain.types/payment/payment.dto';
import Payment from '../../models/payment/payment.model';

///////////////////////////////////////////////////////////////////////////////////

export class paymentMapper {
    static toDto = (payment: Payment): PaymentDto => {
        if (payment == null) {
            return null;
        }
        const dto: PaymentDto = {
            id: payment.id,
            HotelId: payment.HotelId,
            PaymentDate: payment.PaymentDate,
            Amount: payment.Amount,
            PaymentMethod: payment.PaymentMethod,
            TransactionStatus:payment.TransactionStatus,
            ReservationOrderId: payment.ReservationOrderId,
            PaymentConfirm: payment.PaymentConfirm,
        };
        return dto;
    };

    static topaymentDto = (payment: Payment): PaymentDto => {
        if (payment == null) {
            return null;
        }
        const dto: PaymentDto = {
            id: payment.id,
            HotelId: payment.HotelId,
            PaymentDate: payment.PaymentDate,
            Amount: payment.Amount,
            PaymentMethod: payment.PaymentMethod,
            TransactionStatus:payment.TransactionStatus,
            ReservationOrderId: payment.ReservationOrderId,
            PaymentConfirm: payment.PaymentConfirm,
        };
        return dto;
    };
}

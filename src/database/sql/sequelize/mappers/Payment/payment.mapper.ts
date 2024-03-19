/* eslint-disable linebreak-style */
/* eslint-disable key-spacing */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
// /* eslint-disable linebreak-style */
// /* eslint-disable padded-blocks */
// /* eslint-disable key-spacing */
// /* eslint-disable linebreak-style */
import { PaymentDto } from '/../src/domain.types/payment/payment.dto';
import Payment from '../../models/Payment/payment.model';

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
            ReservationId: payment.ReservationId,
            PaymentConfirm: payment.PaymentConfirm,
            PaymentId: payment.PaymentId,
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
            ReservationId: payment.ReservationId,
            PaymentConfirm: payment.PaymentConfirm,
            PaymentId: payment.PaymentId,
        };
        return dto;
    };
}

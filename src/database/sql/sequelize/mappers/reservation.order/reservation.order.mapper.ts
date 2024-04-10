/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
import { ReservationOrderDto } from '../../../../../domain.types/reservation.order/reservation.order.dto';
import ReservationOrder from '../../models/reservation.order/reservation.order.model';

///////////////////////////////////////////////////////////////////////////////////

export class ReservationOrderMapper {
    static toDto = (reservationorder: ReservationOrder): ReservationOrderDto => {
        if (reservationorder == null) {
            return null;
        }
        const dto: ReservationOrderDto = {

            id: reservationorder.id,
            CustomerUserId: reservationorder.CustomerUserId,
            TotalCost: reservationorder.TotalCost,
            CheckInDate: reservationorder.CheckInDate,
            CheckOutDate: reservationorder.CheckOutDate,
            ReservationDateTime: reservationorder.ReservationDateTime,
            Status: reservationorder.Status,
            Discount: reservationorder.Discount,
            Taxes: reservationorder.Taxes,
            TotalPayable: reservationorder.TotalPayable,
            AdvancePaid: reservationorder.AdvancePaid,
            AdvancePaymentDateTime: reservationorder.AdvancePaymentDateTime,
            BookingStaffUserId: reservationorder.BookingStaffUserId,
            Penalties: reservationorder.Penalties,

        };
        return dto;
    };

    static toReservationOrderDto = (reservationorder: ReservationOrder): ReservationOrderDto => {
        if (reservationorder == null) {
            return null;
        }
        const dto: ReservationOrderDto = {

            id: reservationorder.id,
            CustomerUserId: reservationorder.CustomerUserId,
            TotalCost: reservationorder.TotalCost,
            CheckInDate: reservationorder.CheckInDate,
            CheckOutDate: reservationorder.CheckOutDate,

            ReservationDateTime: reservationorder.ReservationDateTime,
            Status: reservationorder.Status,
            Discount: reservationorder.Discount,
            Taxes: reservationorder.Taxes,

            TotalPayable: reservationorder.TotalPayable,
            AdvancePaid: reservationorder.AdvancePaid,
            AdvancePaymentDateTime: reservationorder.AdvancePaymentDateTime,
            BookingStaffUserId: reservationorder.BookingStaffUserId,
            Penalties: reservationorder.Penalties,
        };
        return dto;
    };
}

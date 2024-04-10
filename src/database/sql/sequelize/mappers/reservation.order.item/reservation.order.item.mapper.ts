/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
import { ReservationOrderItemDto } from '../../../../../domain.types/reservation.order.item/reservation.order.item.dto';
import ReservationOrderItem from '../../models/reservation.order.item/reservation.order.item.model';

///////////////////////////////////////////////////////////////////////////////////

export class ReservationOrderItemMapper {
    static toDto = (reservationorderitem: ReservationOrderItem): ReservationOrderItemDto => {
        if (reservationorderitem == null) {
            return null;
        }
        const dto: ReservationOrderItemDto = {
            id: reservationorderitem.id,
            ReservationOrderId: reservationorderitem.ReservationOrderId,
            RoomId: reservationorderitem.RoomId,
            Tax: reservationorderitem.Tax,
            Discount: reservationorderitem.Discount,
            Cost: reservationorderitem.Cost,
            TotalDays: reservationorderitem.TotalDays,

        };
        return dto;
    };

    static toReservationOrderItemDto = (reservationorderitem: ReservationOrderItem): ReservationOrderItemDto => {
        if (reservationorderitem == null) {
            return null;
        }
        const dto: ReservationOrderItemDto = {

            id: reservationorderitem.id,
            ReservationOrderId: reservationorderitem.ReservationOrderId,
            RoomId: reservationorderitem.RoomId,
            Tax: reservationorderitem.Tax,
            Cost: reservationorderitem.Cost,
            Discount: reservationorderitem.Discount,
            TotalDays: reservationorderitem.TotalDays,
        };
        return dto;
    };
}

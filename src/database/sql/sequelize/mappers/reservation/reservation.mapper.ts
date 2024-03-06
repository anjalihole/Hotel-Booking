/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
import { ReservationDto } from '/../src/domain.types/reservation/reservation.dto';
import Reservation from '../../models/reservation/reservation.model';

///////////////////////////////////////////////////////////////////////////////////

export class ReservationMapper {
    static toDto = (reservation: Reservation): ReservationDto => {
        if (reservation == null) {
            return null;
        }
        const dto: ReservationDto = {
            id: reservation.id,
            CustomerId: reservation.CustomerId,
            RoomId: reservation.RoomId,
            CheckInDate: reservation.CheckInDate,
            CheckOutDate: reservation.CheckOutDate,
            TotalCost: reservation.TotalCost,
            Status: reservation.Status,
            
        };
        return dto;
    };

    static toReservationDto = (reservation: Reservation): ReservationDto => {
        if (reservation == null) {
            return null;
        }
        const dto: ReservationDto = {
            id: reservation.id,
            CustomerId: reservation.CustomerId,
            RoomId: reservation.RoomId,
            CheckInDate: reservation.CheckInDate,
            CheckOutDate: reservation.CheckOutDate,
            TotalCost: reservation.TotalCost,
            Status: reservation.Status,
            
        };
        return dto;
    };
}

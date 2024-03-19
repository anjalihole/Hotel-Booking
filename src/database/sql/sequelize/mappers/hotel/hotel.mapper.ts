/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
// import { HotelDto } from '../../../../../domain.types/hotel/hotel.dto';
import { HotelDto } from '../../../../../domain.types/Hotel/hotel.dto';
import Hotel from '../../models/Hotel/hotel.model';

///////////////////////////////////////////////////////////////////////////////////

export class HotelMapper {
    static toDto = (hotel: Hotel): HotelDto => {
        if (hotel == null) {
            return null;
        }
        const dto: HotelDto = {
            id: hotel.id,
            Name: hotel.Name,
            Description: hotel.Description,
            Email: hotel.Email,
            AddressId: hotel.AddressId,
            CheckInTime: hotel.CheckInTime,
            CheckOutTime: hotel.CheckOutTime,
            OwnerUserId: hotel.OwnerUserId,
            Photos:hotel.Photos,
            Phone:hotel.Phone,

        };
        return dto;
    };

    static toHotelDto = (hotel: Hotel): HotelDto => {
        if (hotel == null) {
            return null;
        }
        const dto: HotelDto = {
            id: hotel.id,
            Name: hotel.Name,
            Description: hotel.Description,
            Email: hotel.Email,
            AddressId: hotel.AddressId,
            CheckInTime: hotel.CheckInTime,
            CheckOutTime: hotel.CheckOutTime,
            OwnerUserId: hotel.OwnerUserId,
            Photos:hotel.Photos,
            Phone:hotel.Phone,
            
        };
        return dto;
    };
}

/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
import { HotelDto } from '/../src/domain.types/hotel/hotel.dto';
import Hotel from '../../models/hotel/hotel.model';

///////////////////////////////////////////////////////////////////////////////////

export class HotelMapper {
    static toDto = (hotel: Hotel): HotelDto => {
        if (hotel == null) {
            return null;
        }
        const dto: HotelDto = {
            id: hotel.id,
            HotelName: hotel.HotelName,
            Phone: hotel.Phone,
            Email: hotel.Email,
            Address: hotel.Address,
        };
        return dto;
    };

    static toHotelDto = (hotel: Hotel): HotelDto => {
        if (hotel == null) {
            return null;
        }
        const dto: HotelDto = {
            id: hotel.id,
            HotelName: hotel.HotelName,
            Phone: hotel.Phone,
            Email: hotel.Email,
            Address: hotel.Address,
            
        };
        return dto;
    };
}

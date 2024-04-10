/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
// import { HotelDto } from '../../../../../domain.types/hotel/hotel.dto';
import { HotelAmenitiesDto } from '../../../../../domain.types/hotel.amenities/hotel.amenities.dto';
import HotelAmenities from '../../models/hotel.amenities/hotel.amenities.model';

///////////////////////////////////////////////////////////////////////////////////

export class HotelAmenitiesMapper {
    static toDto = (hotelamenities: HotelAmenities): HotelAmenitiesDto => {
        if (hotelamenities == null) {
            return null;
        }
        const dto: HotelAmenitiesDto = {
            id: hotelamenities.id,
            AminityName: hotelamenities.AminityName,
            HotelId: hotelamenities.HotelId,
        };
        return dto;
    };

    static toHotelAmenitiesDto = (hotelamenities: HotelAmenities): HotelAmenitiesDto => {
        if (hotelamenities == null) {
            return null;
        }
        const dto: HotelAmenitiesDto = {
            id: hotelamenities.id,
            AminityName: hotelamenities.AminityName,
            HotelId: hotelamenities.HotelId,
        };
        return dto;
    };
}

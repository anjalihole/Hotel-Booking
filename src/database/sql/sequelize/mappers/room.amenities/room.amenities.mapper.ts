/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
import { RoomAmenitiesDto } from '/../src/domain.types/room.amenities/room.amenities.dto';
import RoomAmenities from '../../models/room.amenities/room.amenities.model';

///////////////////////////////////////////////////////////////////////////////////

export class RoomAmenitiesMapper {
    static toDto = (roomamenities: RoomAmenities): RoomAmenitiesDto => {
        if (roomamenities == null) {
            return null;
        }
        const dto: RoomAmenitiesDto = {
            id: roomamenities.id,
            AmenityName: roomamenities.AmenityName,
            HotelId: roomamenities.HotelId,
            RoomId: roomamenities.RoomId,
           
        };
        return dto;
    };

    static toRoomAmenitiesDto = (roomamenities: RoomAmenities): RoomAmenitiesDto => {
        if (roomamenities == null) {
            return null;
        }
        const dto: RoomAmenitiesDto = {
            id: roomamenities.id,
            AmenityName: roomamenities.AmenityName,
            HotelId: roomamenities.HotelId,
            RoomId: roomamenities.RoomId,
        };
        return dto;
    };
}

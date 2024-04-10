/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
import { RoomAmenitiesDto } from '../../../../../domain.types/room.amenities/room.amenities.dto';
// import RoomAmenities from '../../models/room.amenities/room.amenities.model';
import RoomAmenities from '../../models/room.aminities/room.aminities.model';

///////////////////////////////////////////////////////////////////////////////////

export class RoomAmenitiesMapper {
    static toDto = (roomamenities: RoomAmenities): RoomAmenitiesDto => {
        if (roomamenities == null) {
            return null;
        }
        const dto: RoomAmenitiesDto = {
            id: roomamenities.id,
            AminityName: roomamenities.AminityName,
            RoomId: roomamenities.RoomId,
            HotelId: roomamenities.HotelId,
        };
        return dto;
    };

    static toRoomAmenitiesDto = (roomamenities: RoomAmenities): RoomAmenitiesDto => {
        if (roomamenities == null) {
            return null;
        }
        const dto: RoomAmenitiesDto = {
            id: roomamenities.id,
            AminityName: roomamenities.AminityName,
            RoomId: roomamenities.RoomId,
            HotelId: roomamenities.HotelId,

        };
        return dto;
    };
}

/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
import { RoomDto } from '/../src/domain.types/room/room.dto';
import Room from '../../models/room/room.model';

///////////////////////////////////////////////////////////////////////////////////

export class RoomMapper {
    static toDto = (room: Room): RoomDto => {
        if (room == null) {
            return null;
        }
        const dto: RoomDto = {
            id: room.id,
            HotelId: room.HotelId,
            Name: room.Name,
            RoomNumber: room.RoomNumber,
            Phone: room.Phone,
            RoomTypesId: room.RoomTypesId,
            Status: room.Status,
            Description: room.Description,
            Blocked: room.Blocked,
            Inventory: room.Inventory,
        };
        return dto;
    };

    static toRoomDto = (room: Room): RoomDto => {
        if (room == null) {
            return null;
        }
        const dto: RoomDto = {
            id: room.id,
            Name: room.Name,
            RoomNumber: room.RoomNumber,
            Phone: room.Phone,
            RoomTypesId: room.RoomTypesId,
            HotelId: room.HotelId,
            Status: room.Status,
            Description: room.Description,
            Blocked: room.Blocked,
            Inventory: room.Inventory,
        };
        return dto;
    };
}

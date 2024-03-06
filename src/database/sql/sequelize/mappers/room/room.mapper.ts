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
            RoomNumber: room.RoomNumber,
            Phone: room.Phone,
            RoomType: room.RoomType,
            BedType: room.BedType,
            RoomImage: room.RoomImage,
            Price: room.Price,
            Taxes: room.Taxes,
            Description: room.Description,
            BlockRoom: room.BlockRoom,
            RoomPerPerson: room.RoomPerPerson,
            CostPerDay: room.CostPerDay,
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
            HotelId: room.HotelId,
            RoomNumber: room.RoomNumber,
            Phone: room.Phone,
            RoomType: room.RoomType,
            BedType: room.BedType,
            RoomImage: room.RoomImage,
            Price: room.Price,
            Taxes: room.Taxes,
            Description: room.Description,
            BlockRoom: room.BlockRoom,
            RoomPerPerson: room.RoomPerPerson,
            CostPerDay: room.CostPerDay,
            Inventory: room.Inventory,
        };
        return dto;
    };
}

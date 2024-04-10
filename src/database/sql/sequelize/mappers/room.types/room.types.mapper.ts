/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
import { RoomTypesDto } from '../../../../../domain.types/room.types/room.types.dto';
import RoomTypes from '../../models/room.types/room.types.model';

///////////////////////////////////////////////////////////////////////////////////

export class RoomTypesMapper {
    static toDto = (roomtypes: RoomTypes): RoomTypesDto => {
        if (roomtypes == null) {
            return null;
        }
        const dto: RoomTypesDto = {
            id: roomtypes.id,
            TypeName: roomtypes.TypeName,
            TypeDescription: roomtypes.TypeDescription,
            StandardRate: roomtypes.StandardRate,
            Options: roomtypes.Options,
            OccupancyAdult: roomtypes.OccupancyAdult,
            OccupancyChildren: roomtypes.OccupancyChildren,
        };
        return dto;
    };

    static toRoomRoomDto = (roomtypes: RoomTypes): RoomTypesDto => {
        if (roomtypes == null) {
            return null;
        }
        const dto: RoomTypesDto = {
            id: roomtypes.id,
            TypeName: roomtypes.TypeName,
            TypeDescription: roomtypes.TypeDescription,
            StandardRate: roomtypes.StandardRate,
            Options: roomtypes.Options,
            OccupancyAdult: roomtypes.OccupancyAdult,
            OccupancyChildren: roomtypes.OccupancyChildren,

        };
        return dto;
    };
}

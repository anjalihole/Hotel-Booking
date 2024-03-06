/* eslint-disable linebreak-style */
import { RoomSearchFilters, RoomSearchResults } from '../../../domain.types/room/room.search.types';
import { RoomDomainModel } from '../../../domain.types/room/room.domain.model';
import { RoomDto } from '../../../domain.types/room/room.dto';
//import { CurrentClient } from '../../../domain.types/miscellaneous/current.client';

////////////////////////////////////////////////////////////////////////////////////////////////

export interface IRoomRepo {
    create(roomDomainModel: RoomDomainModel): Promise<RoomDto>;

         getById(id: string): Promise<RoomDto>;

         getAllRoom(): Promise<RoomDto[]>;

         update(id: string, RoomDomainModel: RoomDomainModel): Promise<RoomDto>;

         search(filters: RoomSearchFilters): Promise<RoomSearchResults>;

         delete(id: string): Promise<boolean>;
}

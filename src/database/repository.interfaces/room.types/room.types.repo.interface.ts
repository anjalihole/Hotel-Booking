/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
import { RoomTypesSearchFilters, RoomTypesSearchResults } from '../../../domain.types/room.types/room.types.search.types';
import { RoomTypesDomainModel } from '../../../domain.types/room.types/room.types.domain.model';
import { RoomTypesDto } from '../../../domain.types/room.types/room.types.dto';
//import { CurrentClient } from '../../../domain.types/miscellaneous/current.client';

////////////////////////////////////////////////////////////////////////////////////////////////

export interface IRoomTypesRepo {
    
        create(roomtypesDomainModel: RoomTypesDomainModel): Promise<RoomTypesDto>;

        getById(id: string): Promise<RoomTypesDto>;

        getAllRoomTypes(): Promise<RoomTypesDto[]>;

        update(id: string, RoomTypesDomainModel: RoomTypesDomainModel): Promise<RoomTypesDto>;

        search(filters: RoomTypesSearchFilters): Promise<RoomTypesSearchResults>;
        
        delete(id: string): Promise<boolean>;
}


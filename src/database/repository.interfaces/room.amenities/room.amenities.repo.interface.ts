/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
import { RoomAmenitiesSearchFilters, RoomAmenitiesSearchResults } from '../../../domain.types/room.amenities/room.amenities.search.types';
import { RoomAmenitiesDomainModel } from '../../../domain.types/room.amenities/room.amenities.domain.model';
import { RoomAmenitiesDto } from '../../../domain.types/room.amenities/room.amenities.dto';
//import { CurrentClient } from '../../../domain.types/miscellaneous/current.client';

////////////////////////////////////////////////////////////////////////////////////////////////

export interface IRoomAmenitiesRepo {
    
        create(roomamenitiesDomainModel: RoomAmenitiesDomainModel): Promise<RoomAmenitiesDto>;

        getById(id: string): Promise<RoomAmenitiesDto>;

        getAllRoomAmenities(): Promise<RoomAmenitiesDto[]>;

        update(id: string, RoomAmenitiesDomainModel: RoomAmenitiesDomainModel): Promise<RoomAmenitiesDto>;

        search(filters: RoomAmenitiesSearchFilters): Promise<RoomAmenitiesSearchResults>;
        
        delete(id: string): Promise<boolean>;
}


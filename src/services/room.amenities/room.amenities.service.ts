/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable lines-between-class-members */
/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
import { inject, injectable } from 'tsyringe';
//import { ApiError } from '../../common/api.error';
import { RoomAmenitiesDomainModel } from '../../domain.types/room.amenities/room.amenities.domain.model';
import { RoomAmenitiesDto } from '../../domain.types/room.amenities/room.amenities.dto';
import { IRoomAmenitiesRepo } from '../../database/repository.interfaces/room.amenities/room.amenities.repo.interface';
// import { generate } from 'generate-password';
// import { Helper } from '../../common/helper';
// import { CurrentClient } from '../../domain.types/miscellaneous/current.client';
//import * as apikeyGenerator from 'uuid-apikey';
import { RoomAmenitiesSearchFilters, RoomAmenitiesSearchResults } from '../../domain.types/room.amenities/room.amenities.search.types';

////////////////////////////////////////////////////////////////////////////////////////////////////////

@injectable()
export class RoomAmenitiesService {
    constructor(@inject('IRoomAmenitiesRepo') private _roomamenitiesRepo: IRoomAmenitiesRepo) {}

    create = async (roomamenitiesDomainModel: RoomAmenitiesDomainModel): Promise<RoomAmenitiesDto> => {
        
        return await this._roomamenitiesRepo.create(roomamenitiesDomainModel);
    };

    getById = async (id: string): Promise<RoomAmenitiesDto> => {
        return await this._roomamenitiesRepo.getById(id);
    };

    getAllRoomAmenities = async (): Promise<RoomAmenitiesDto[]> => {
        return await this._roomamenitiesRepo.getAllRoomAmenities();
    };

    update = async (id: string,roomamenitiesDomainModel: RoomAmenitiesDomainModel): Promise<RoomAmenitiesDto> => {
        return await this._roomamenitiesRepo.update(id, roomamenitiesDomainModel);
    };

    public search = async (filters: RoomAmenitiesSearchFilters): Promise<RoomAmenitiesSearchResults> => {
        return await this._roomamenitiesRepo.search(filters);
    };

    delete = async (id: string): Promise<boolean> => {
        return await this._roomamenitiesRepo.delete(id);
    };
}

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
import { RoomDomainModel } from '../../domain.types/room/room.domain.model';
import { RoomDto } from '../../domain.types/room/room.dto';
import { IRoomRepo } from '../../database/repository.interfaces/room/room.repo.interface';
// import { generate } from 'generate-password';
// import { Helper } from '../../common/helper';
// import { CurrentClient } from '../../domain.types/miscellaneous/current.client';
//import * as apikeyGenerator from 'uuid-apikey';
import { RoomSearchFilters,RoomSearchResults} from '../../domain.types/room/room.search.types';

////////////////////////////////////////////////////////////////////////////////////////////////////////

@injectable()
export class RoomService {
    constructor(@inject('IRoomRepo') private _roomRepo: IRoomRepo) {}

    create = async (roomDomainModel: RoomDomainModel): Promise<RoomDto> => {
        
        return await this._roomRepo.create(roomDomainModel);
    };

    getById = async (id: string): Promise<RoomDto> => {
        return await this._roomRepo.getById(id);
    };

    getAllRoom = async (): Promise<RoomDto[]> => {
        return await this._roomRepo.getAllRoom();
    };

    update = async (id: string, roomDomainModel: RoomDomainModel): Promise<RoomDto> => {
        return await this._roomRepo.update(id, roomDomainModel);
    };

    public search = async (filters: RoomSearchFilters): Promise<RoomSearchResults> => {
        return await this._roomRepo.search(filters);
    };

    delete = async (id: string): Promise<boolean> => {
        return await this._roomRepo.delete(id);
    };
}

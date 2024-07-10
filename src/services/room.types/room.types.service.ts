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
import { RoomTypesDomainModel } from '../../domain.types/room.types/room.types.domain.model';
import { RoomTypesDto } from '../../domain.types/room.types/room.types.dto';
import { IRoomTypesRepo } from '../../database/repository.interfaces/room.types/room.types.repo.interface';
// import { generate } from 'generate-password';
// import { Helper } from '../../common/helper';
// import { CurrentClient } from '../../domain.types/miscellaneous/current.client';
//import * as apikeyGenerator from 'uuid-apikey';
import { RoomTypesSearchFilters,RoomTypesSearchResults} from '../../domain.types/room.types/room.types.search.types';

////////////////////////////////////////////////////////////////////////////////////////////////////////

@injectable()
export class RoomTypesService {
    constructor(@inject('IRoomTypesRepo') private _roomtypesRepo: IRoomTypesRepo) {}

    create = async (roomtypesDomainModel: RoomTypesDomainModel): Promise<RoomTypesDto> => {
        
        return await this._roomtypesRepo.create(roomtypesDomainModel);
    };

    getById = async (id: string): Promise<RoomTypesDto> => {
        return await this._roomtypesRepo.getById(id);
    };

    update = async (id: string, roomtypesDomainModel: RoomTypesDomainModel): Promise<RoomTypesDto> => {
        return await this._roomtypesRepo.update(id, roomtypesDomainModel);
    };

    public search = async (filters: RoomTypesSearchFilters): Promise<RoomTypesSearchResults> => {
        return await this._roomtypesRepo.search(filters);
    };

    delete = async (id: string): Promise<boolean> => {
        return await this._roomtypesRepo.delete(id);
    };
}

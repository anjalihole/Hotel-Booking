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
import { RoleDomainModel } from '../../domain.types/role/role.domain.model';
import { RoleDto } from '../../domain.types/role/role.dto';
import { IRoleRepo } from '../../database/repository.interfaces/role/role.repo.interface';
// import { generate } from 'generate-password';
// import { Helper } from '../../common/helper';
// import { CurrentClient } from '../../domain.types/miscellaneous/current.client';
//import * as apikeyGenerator from 'uuid-apikey';
import { RoleSearchFilters, RoleSearchResults} from '../../domain.types/role/role.search.types';

////////////////////////////////////////////////////////////////////////////////////////////////////////

@injectable()
export class RoleService {
    constructor(@inject('IRoleRepo') private _roleRepo: IRoleRepo) {}

    create = async (roleDomainModel: RoleDomainModel): Promise<RoleDto> => {
        
        return await this._roleRepo.create(roleDomainModel);
    };

    getById = async (id: string): Promise<RoleDto> => {
        return await this._roleRepo.getById(id);
    };

    update = async (id: string, roleDomainModel: RoleDomainModel): Promise<RoleDto> => {
        return await this._roleRepo.update(id, roleDomainModel);
    };

    public search = async (filters: RoleSearchFilters): Promise<RoleSearchResults> => {
        return await this._roleRepo.search(filters);
    };

    delete = async (id: string): Promise<boolean> => {
        return await this._roleRepo.delete(id);
    };
}

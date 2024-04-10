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
import { UserRolesDomainModel } from '../../domain.types/user.roles/user.roles.domain.model';
import { UserRolesDto } from '../../domain.types/user.roles/user.roles.dto';
import { IUserRolesRepo } from '../../database/repository.interfaces/user.roles/user.roles.repo.interface';
// import { generate } from 'generate-password';
// import { Helper } from '../../common/helper';
// import { CurrentClient } from '../../domain.types/miscellaneous/current.client';
//import * as apikeyGenerator from 'uuid-apikey';
import { UserRolesSearchFilters,UserRolesSearchResults} from '../../domain.types/user.roles/user.roles.search.types';

////////////////////////////////////////////////////////////////////////////////////////////////////////

@injectable()
export class UserRolesService {
    constructor(@inject('IUserRolesRepo') private _userrolesRepo: IUserRolesRepo) {}

    create = async (userrolesDomainModel: UserRolesDomainModel): Promise<UserRolesDto> => {
        
        return await this._userrolesRepo.create(userrolesDomainModel);
    };

    getById = async (id: string): Promise<UserRolesDto> => {
        return await this._userrolesRepo.getById(id);
    };

    getAllUserRoles = async (): Promise<UserRolesDto[]> => {
        return await this._userrolesRepo.getAllUserRoles();
    };

    update = async (id: string, userrolesDomainModel: UserRolesDomainModel): Promise<UserRolesDto> => {
        return await this._userrolesRepo.update(id, userrolesDomainModel);
    };

    public search = async (filters: UserRolesSearchFilters): Promise<UserRolesSearchResults> => {
        return await this._userrolesRepo.search(filters);
    };

    delete = async (id: string): Promise<boolean> => {
        return await this._userrolesRepo.delete(id);
    };
}

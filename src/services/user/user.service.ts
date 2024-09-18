/* eslint-disable object-curly-spacing */
/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable lines-between-class-members */
/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
import { inject, injectable } from 'tsyringe';
import { UserDomainModel } from '../../domain.types/user/user.domain.model';
import { UserDto } from '../../domain.types/user/user.dto';
import { IUserRepo } from '../../database/repository.interfaces/user/user.repo.interface';
import { UserSearchFilters,UserSearchResults} from '../../domain.types/user/user.search.types';

////////////////////////////////////////////////////////////////////////////////////////////////////////

@injectable()
export class UserService {
    constructor(@inject('IUserRepo') private _userRepo: IUserRepo) {}

    create = async (userDomainModel: UserDomainModel): Promise<UserDto> => {
        
        return await this._userRepo.create(userDomainModel);
    };

    loginWithPassword = async (userDetails: UserDomainModel): Promise<any> => {
        return await this._userRepo.login(userDetails);
    };

    getById = async (id: string): Promise<UserDto> => {
        return await this._userRepo.getById(id);
    };

    update = async (id: string, userDomainModel: UserDomainModel): Promise<UserDto> => {
        return await this._userRepo.update(id, userDomainModel);
    };

    public search = async (filters: UserSearchFilters): Promise<UserSearchResults> => {
        return await this._userRepo.search(filters);
    };

    delete = async (id: string): Promise<boolean> => {
        return await this._userRepo.delete(id);
    };
}

/* eslint-disable linebreak-style */
import { UserSearchFilters, UserSearchResults } from '../../../domain.types/user/user.search.types';
import { UserDomainModel } from '../../../domain.types/user/user.domain.model';
import { UserDto } from '../../../domain.types/user/user.dto';
//import { CurrentClient } from '../../../domain.types/miscellaneous/current.client';

////////////////////////////////////////////////////////////////////////////////////////////////

export interface IUserRepo {
        create(userDomainModel: UserDomainModel): Promise<UserDto>;

         getById(id: string): Promise<UserDto>;

         update(id: string, UserDomainModel: UserDomainModel): Promise<UserDto>;

         search(filters: UserSearchFilters): Promise<UserSearchResults>;

         delete(id: string): Promise<boolean>;
}

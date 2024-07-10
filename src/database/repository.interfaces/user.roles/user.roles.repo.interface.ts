/* eslint-disable linebreak-style */
import { UserRolesSearchFilters, UserRolesSearchResults } from '../../../domain.types/user.roles/user.roles.search.types';
import { UserRolesDomainModel } from '../../../domain.types/user.roles/user.roles.domain.model';
import { UserRolesDto } from '../../../domain.types/user.roles/user.roles.dto';
//import { CurrentClient } from '../../../domain.types/miscellaneous/current.client';

////////////////////////////////////////////////////////////////////////////////////////////////

export interface IUserRolesRepo {
        create(userrolesDomainModel: UserRolesDomainModel): Promise<UserRolesDto>;

         getById(id: string): Promise<UserRolesDto>;

         update(id: string, UserRolesDomainModel: UserRolesDomainModel): Promise<UserRolesDto>;

         search(filters: UserRolesSearchFilters): Promise<UserRolesSearchResults>;

         delete(id: string): Promise<boolean>;
}

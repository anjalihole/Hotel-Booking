/* eslint-disable linebreak-style */
import { RoleSearchFilters, RoleSearchResults } from '../../../domain.types/role/role.search.types';
import { RoleDomainModel } from '../../../domain.types/role/role.domain.model';
import { RoleDto } from '../../../domain.types/role/role.dto';
//import { CurrentClient } from '../../../domain.types/miscellaneous/current.client';

////////////////////////////////////////////////////////////////////////////////////////////////

export interface IRoleRepo {
    
        create(roleDomainModel: RoleDomainModel): Promise<RoleDto>;

        getById(id: string): Promise<RoleDto>;

        getAllRole(): Promise<RoleDto[]>;

        update(id: string, RoleDomainModel: RoleDomainModel): Promise<RoleDto>;

        search(filters: RoleSearchFilters): Promise<RoleSearchResults>;
        
        delete(id: string): Promise<boolean>;
}


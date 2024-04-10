/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
import { RoleDto } from '../../../../../domain.types/role/role.dto';
import Role from '../../models/role/role.model';

///////////////////////////////////////////////////////////////////////////////////

export class RoleMapper {
    static toDto = (role:Role):RoleDto => {
        if (role == null) {
            return null;
        }
        const dto:RoleDto = {
            id: role.id,
            RoleName: role.RoleName,
            Description: role.Description,

        };
        return dto;
    };

    static toRoleDto = (role: Role): RoleDto => {
        if (role == null) {
            return null;
        }
        const dto: RoleDto = {
            id: role.id,
            RoleName: role.RoleName,
            Description: role.Description
            
        };
        return dto;
    };
}

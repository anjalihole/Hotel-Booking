/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
import { UserRolesDto } from '/../src/domain.types/user.roles/user.roles.dto';
import UserRoles from '../../models/user.roles/user.roles.model';
///////////////////////////////////////////////////////////////////////////////////

export class UserRolesMapper {
    static toDto = (userroles: UserRoles): UserRolesDto => {
        if (userroles == null) {
            return null;
        }
        const dto: UserRolesDto = {
            UserId: userroles.UserId,
            RoleId: userroles.RoleId,
            
        };
        return dto;
    };

    static toUserRolesDto = (userroles: UserRoles): UserRolesDto => {
        if (userroles == null) {
            return null;
        }
        const dto: UserRolesDto = {
            UserId: userroles.UserId,
            RoleId: userroles.RoleId,
        };
        return dto;
    };
}

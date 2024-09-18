/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
import { UserDto, UserDtoToken } from '/../src/domain.types/user/user.dto';
import User from '../../models/user/user.model';

///////////////////////////////////////////////////////////////////////////////////

export class UserMapper {
    static toDto = (user: User): UserDto => {
        if (user == null) {
            return null;
        }
        const dto: UserDto = {
            id : user.id,
            FirstName: user.FirstName,
            LastName: user.LastName,
            Phone: user.Phone,
            Email: user.Email,
            Password: user.Password,
        };
        return dto;
    };

    static toUserDto = (user: User): UserDto => {
        if (user == null) {
            return null;
        }
        const dto: UserDto = {
            id : user.id,
            FirstName: user.FirstName,
            LastName: user.LastName,
            Phone: user.Phone,
            Email: user.Email,
    
        };
        return dto;
    };

    static toUserDtoToken = (user: User): UserDtoToken => {
        if (user == null) {
            return null;
        }
        const dto: UserDtoToken = {
            id : user.id,
            FirstName: user.FirstName,
            LastName: user.LastName,
            Phone: user.Phone,
            Email: user.Email,
            Password: user.Password,
        };
        return dto;
    };
}

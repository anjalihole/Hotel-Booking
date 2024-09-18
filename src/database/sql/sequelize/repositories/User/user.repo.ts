/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
import { IUserRepo } from '../../../../repository.interfaces/user/user.repo.interface';
import User from '../../models/user/user.model';
import { Op } from 'sequelize';
import bcrypt from 'bcrypt'; // Use only bcrypt
import jwt from 'jsonwebtoken';
import { UserDomainModel } from '../../../../../domain.types/user/user.domain.model';
import { UserMapper } from '../../mappers/user/user.mapper';
import { Logger } from '../../../../../common/logger';
import { ApiError } from '../../../../../common/api.error';
import { UserDto } from '../../../../../domain.types/user/user.dto';
import { UserSearchFilters, UserSearchResults } from '../../../../../domain.types/user/user.search.types';

export class UserRepo implements IUserRepo {
    
    login = async (userDomainModel: UserDomainModel): Promise<UserDto> => {
        const { Email, Password } = userDomainModel;
        const JWT_SECRET = 'your_jwt_secret';

        // Check if email and password are provided
        if (!Email || !Password) {
            Logger.instance().log('Email or Password not provided');
            throw new ApiError(400, 'Email and Password are required');
        }

        try {
            // Find the user by Email
            const user = await User.findOne({ where: { Email: Email } });

            // If user not found, send error
            if (!user) {
                Logger.instance().log(`User not found for Email: ${Email}`);
                throw new ApiError(401, 'Invalid Email or Password');
            }

            // Compare Password with hashed Password
            const isPasswordValid = Password === user.Password ? true : false;
            if (!isPasswordValid) {
                Logger.instance().log('Password mismatch');
                throw new ApiError(401, 'Invalid Email or Password');
            }

            // Generate JWT token
            const token = jwt.sign({ id: user.id, Email: user.Email }, JWT_SECRET, { expiresIn: '1h' });
            const dto = await UserMapper.toDto(user);
            // Add token to the DTO
            const result = {
                ...dto,
                token: token
            };

            // Logger.instance().log('Login successful', result);
            // Return the user DTO along with the token
            return result;

        } catch (error) {
            Logger.instance().log(`Error during login: ${error.message}`);
            throw new ApiError(500, 'Internal server error');
        }
    };

    create = async (userDomainModel: UserDomainModel): Promise<UserDto> => {
        try {
            const hashedPassword = bcrypt.hashSync(userDomainModel.Password, 10); // Ensure password is hashed before saving
            const entity = {
                id         : userDomainModel.id,
                FirstName  : userDomainModel.FirstName,
                LastName   : userDomainModel.LastName,
                Phone      : userDomainModel.Phone,
                Email      : userDomainModel.Email,
                Password   : hashedPassword,
            };
            const user = await User.create(entity);
            const dto = await UserMapper.toDto(user);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getById = async (id: string): Promise<UserDto> => {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new ApiError(404, 'User not found');
            }
            const dto = await UserMapper.toDto(user);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };
    
    search = async (filters: UserSearchFilters): Promise<UserSearchResults> => {
        try {
            const search = { where: {} };

            if (filters.id != null) {
                search.where['id'] = filters.id;
            }

            if (filters.FirstName != null) {
                search.where['FirstName'] = filters.FirstName;
            }

            if (filters.LastName != null) {
                search.where['LastName'] = filters.LastName;
            }
            if (filters.Phone != null) {
                search.where['Phone'] = { [Op.like]: '%' + filters.Phone + '%' };
            }
            if (filters.Email != null) {
                search.where['Email'] = filters.Email;
            }

            const orderByColum = 'CreatedAt';
            let order = 'ASC';
            if (filters.Order === 'descending') {
                order = 'DESC';
            }
            search['order'] = [[orderByColum, order]];
            let limit = 25;
            if (filters.ItemsPerPage) {
                limit = filters.ItemsPerPage;
            }
            const foundResults = await User.findAndCountAll(search);
            let offset = 0;
            let pageIndex = 0;
            if (filters.PageIndex) {
                pageIndex = filters.PageIndex < 0 ? 0 : filters.PageIndex;
                offset = pageIndex * limit;
            }
            search['limit'] = limit;
            search['offset'] = offset;

            const dtos: UserDto[] = [];
            for (const user of foundResults.rows) {
                const dto = await UserMapper.toDto(user);
                dtos.push(dto);
            }

            const count = foundResults.count;
            const totalCount = typeof count === "number" ? count : count[0];

            const searchResults: UserSearchResults = {
                TotalCount     : totalCount,
                RetrievedCount : dtos.length,
                PageIndex      : pageIndex,
                ItemsPerPage   : limit,
                Order          : order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy      : orderByColum,
                Items          : dtos
            };

            return searchResults;

        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    update = async (id: string, userDomainModel: UserDomainModel): Promise<UserDto> => {
        try {
            const user = await User.findByPk(id);

            if (!user) {
                throw new ApiError(404, 'User not found');
            }

            if (userDomainModel.FirstName != null) {
                user.FirstName = userDomainModel.FirstName;
            }
            
            if (userDomainModel.Phone != null) {
                user.Phone = userDomainModel.Phone;
            }
            if (userDomainModel.Email != null) {
                user.Email = userDomainModel.Email;
            }
            if (userDomainModel.LastName != null) {
                user.LastName = userDomainModel.LastName;
            }
            await user.save();

            const dto = await UserMapper.toDto(user);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    delete = async (id: string): Promise<boolean> => {
        try {
            const result = await User.destroy({ where: { id: id } });
            return result === 1;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

}

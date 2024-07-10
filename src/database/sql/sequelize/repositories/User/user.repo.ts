/* eslint-disable linebreak-style */
/* eslint-disable space-infix-ops */
/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable key-spacing */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
import { IUserRepo } from '../../../../repository.interfaces/user/user.repo.interface';
import User from '../../models/user/user.model';
import { Op } from 'sequelize';
import { UserDomainModel } from '../../../../../domain.types/user/user.domain.model';
import { UserMapper } from '../../mappers/user/user.mapper';
import { Logger } from '../../../../../common/logger';
import { ApiError } from '../../../../../common/api.error';
import { UserDto } from '../../../../../domain.types/user/user.dto';
import { UserSearchFilters, UserSearchResults } from '../../../../../domain.types/user/user.search.types';

///////////////////////////////////////////////////////////////////////

export class UserRepo implements IUserRepo {

    create = async (userDomainModel: UserDomainModel): Promise<UserDto> => {
        try {
            const entity = {
                id   : userDomainModel.id,
                FirstName   : userDomainModel.FirstName,
                LastName   : userDomainModel.LastName,
                Phone        : userDomainModel.Phone,
                Email        : userDomainModel.Email,
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
    
                //Client code is not modifiable
                //Use renew key to update ApiKey, ValidFrom and ValidTill
                
                if (userDomainModel.id != null) {
                    user.id = userDomainModel.id;
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

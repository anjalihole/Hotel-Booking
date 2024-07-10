/* eslint-disable linebreak-style */
/* eslint-disable space-infix-ops */
/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable key-spacing */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
import { IUserRolesRepo } from '../../../../repository.interfaces/user.roles/user.roles.repo.interface';
import UserRoles from '../../models/user.roles/user.roles.model';
import { Op } from 'sequelize';
import { UserRolesDomainModel } from '../../../../../domain.types/user.roles/user.roles.domain.model';
import { UserRolesMapper } from '../../mappers/user.roles/user.roles.mapper';
import { Logger } from '../../../../../common/logger';
import { ApiError } from '../../../../../common/api.error';
import { UserRolesDto } from '../../../../../domain.types/user.roles/user.roles.dto';
import { UserRolesSearchFilters, UserRolesSearchResults } from '../../../../../domain.types/user.roles/user.roles.search.types';

///////////////////////////////////////////////////////////////////////

export class UserRolesRepo implements IUserRolesRepo {

    create = async (userrolesDomainModel: UserRolesDomainModel): Promise<UserRolesDto> => {
        try {
            const entity = {
                Id   : userrolesDomainModel.id,
                UserId   : userrolesDomainModel.UserId,
                RoleId   : userrolesDomainModel.RoleId,
            };
            const userroles = await UserRoles.create(entity);
            const dto = await UserRolesMapper.toDto(userroles);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getById = async (id: string): Promise<UserRolesDto> => {
        try {
            const userroles = await UserRoles.findByPk(id);
            const dto = await UserRolesMapper.toDto(userroles);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    search = async (filters: UserRolesSearchFilters): Promise<UserRolesSearchResults> => {
        try {

            const search = { where: {} };

            if (filters.id != null) {
                search.where['Id'] = filters.id;
            }

            if (filters.UserId != null) {
                search.where['UserId'] = filters.UserId;
            }

            if (filters.RoleId != null) {
                search.where['RoleId'] = filters.RoleId;
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
            const foundResults = await UserRoles.findAndCountAll(search);
            let offset = 0;
            let pageIndex = 0;
            if (filters.PageIndex) {
                pageIndex = filters.PageIndex < 0 ? 0 : filters.PageIndex;
                offset = pageIndex * limit;
            }
            search['limit'] = limit;
            search['offset'] = offset;

            const dtos: UserRolesDto[] = [];
            for (const userroles of foundResults.rows) {
                const dto = await UserRolesMapper.toDto(userroles);
                dtos.push(dto);
            }

            const count = foundResults.count;
            const totalCount = typeof count === "number" ? count : count[0];

            const searchResults: UserRolesSearchResults = {
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

update = async (id: string, userrolesDomainModel: UserRolesDomainModel): Promise<UserRolesDto> => {
            try {
                const userroles = await UserRoles.findByPk(id);
    
                //Client code is not modifiable
                //Use renew key to update ApiKey, ValidFrom and ValidTill
                
                if (userrolesDomainModel.id != null) {
                    userroles.id = userrolesDomainModel.id;
                }
                if (userrolesDomainModel.UserId != null) {
                    userroles.UserId = userrolesDomainModel.UserId;
                }
              
                if (userrolesDomainModel.RoleId != null) {
                    userroles.RoleId = userrolesDomainModel.RoleId;
                }
                await userroles.save();
    
                const dto = await UserRolesMapper.toDto(userroles);
                return dto;
            } catch (error) {
                Logger.instance().log(error.message);
                throw new ApiError(500, error.message);
            }
        };
    
        delete = async (id: string): Promise<boolean> => {
            try {
                const result = await UserRoles.destroy({ where: { id: id } });
                return result === 1;
            } catch (error) {
                Logger.instance().log(error.message);
                throw new ApiError(500, error.message);
            }
        };

}

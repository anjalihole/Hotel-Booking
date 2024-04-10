/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable key-spacing */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
import { IRoleRepo } from '../../../../repository.interfaces/role/role.repo.interface';
import Role from '../../models/role/role.model';
import { Op } from 'sequelize';
import { RoleDomainModel } from '../../../../../domain.types/role/role.domain.model';
import { RoleMapper } from '../../mappers/role/role.mapper';
import { Logger } from '../../../../../common/logger';
import { ApiError } from '../../../../../common/api.error';
import { RoleDto } from '../../../../../domain.types/role/role.dto';
import { RoleSearchFilters, RoleSearchResults } from '../../../../../domain.types/role/role.search.types';

///////////////////////////////////////////////////////////////////////

export class RoleRepo implements IRoleRepo {

    create = async (roleDomainModel: RoleDomainModel): Promise<RoleDto> => {
        try {
            const entity = {
                RoleName   : roleDomainModel.RoleName,
                Description : roleDomainModel.Description,

            };
            const role = await Role.create(entity);
            const dto = await RoleMapper.toDto(role);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getById = async (id: string): Promise<RoleDto> => {
        try {
            const role = await Role.findByPk(id);
            const dto = await RoleMapper.toDto(role);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getAllRole = async (): Promise<RoleDto[]> => {
        try {
            const records = await Role.findAll();
            const dtos = records.map((record) => this.toDto(record));
            return dtos;
            // const dto = await RoleMapper.toDto(records);
            // return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    toDto = (role): RoleDto => {
        if (role == null) {
            return null;
        }
        const dto: RoleDto = {
                id: role.id,
                RoleName   : role.RoleName,
                Description : role.Description,
        };
        return dto;
    };

    search = async (filters: RoleSearchFilters): Promise<RoleSearchResults> => {
        try {

            const search = { where: {} };

            if (filters.id != null) {
                search.where['id'] = filters.id;
            }

            if (filters.RoleName != null) {
                search.where['RoleName'] = filters.RoleName;
            }

            if (filters.Description != null) {
                search.where['Description'] = filters.Description;
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
            const foundResults = await Role.findAndCountAll(search);
            let offset = 0;
            let pageIndex = 0;
            if (filters.PageIndex) {
                pageIndex = filters.PageIndex < 0 ? 0 : filters.PageIndex;
                offset = pageIndex * limit;
            }
            search['limit'] = limit;
            search['offset'] = offset;

            const dtos: RoleDto[] = [];
            for (const role of foundResults.rows) {
                const dto = await RoleMapper.toDto(role);
                dtos.push(dto);
            }

            const count = foundResults.count;
            const totalCount = typeof count === "number" ? count : count[0];

            const searchResults: RoleSearchResults = {
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

update = async (id: string, roleDomainModel: RoleDomainModel): Promise<RoleDto> => {
            try {
                const role = await Role.findByPk(id);
                if (roleDomainModel.RoleName ) {
                    role.RoleName = roleDomainModel.RoleName;
                }
                if (roleDomainModel.Description != null) {
                    role.Description = roleDomainModel.Description;
                }
                await role.save();
    
                const dto = await RoleMapper.toDto(role);
                return dto;
            } catch (error) {
                Logger.instance().log(error.message);
                throw new ApiError(500, error.message);
            }
        };
    
        delete = async (id: string): Promise<boolean> => {
            try {
                const result = await Role.destroy({ where: { id: id } });
                return result === 1;
            } catch (error) {
                Logger.instance().log(error.message);
                throw new ApiError(500, error.message);
            }
        };

}

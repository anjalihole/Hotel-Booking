/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable key-spacing */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
import { IPropertyRulesRepo } from '../../../../repository.interfaces/property.rules/property.rules.repo.interface';
import PropertyRules from '../../models/property.rules/property.rules.model';
import { Op } from 'sequelize';
import { PropertyRulesDomainModel } from '../../../../../domain.types/property.rules/property.rules.domain.model';
import { PropertyRulesMapper } from '../../mappers/property.rules/property.rules.mapper';
import { Logger } from '../../../../../common/logger';
import { ApiError } from '../../../../../common/api.error';
import { PropertyRulesDto } from '../../../../../domain.types/property.rules/property.rules.dto';
import { PropertyRulesSearchFilters, PropertyRulesSearchResults } from '../../../../../domain.types/property.rules/property.rules.search.types';

///////////////////////////////////////////////////////////////////////

export class PropertyRulesRepo implements IPropertyRulesRepo {

    create = async (propertyrulesDomainModel: PropertyRulesDomainModel): Promise<PropertyRulesDto> => {
        try {
            const entity = {

                HotelId   : propertyrulesDomainModel.HotelId,
                RulesName : propertyrulesDomainModel.RulesName,
                Description  : propertyrulesDomainModel.Description,
            };
            const propertyrules = await PropertyRules.create(entity);
            const dto = await PropertyRulesMapper.toDto(propertyrules);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getById = async (id: string): Promise<PropertyRulesDto> => {
        try {
            const propertyrules = await PropertyRules.findByPk(id);
            const dto = await PropertyRulesMapper.toDto(propertyrules);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    search = async (filters: PropertyRulesSearchFilters): Promise<PropertyRulesSearchResults> => {
        try {

            const search = { where: {} };

            if (filters.id != null) {
                search.where['id'] = filters.id;
            }

            if (filters.HotelId != null) {
                search.where['HotelId'] = filters.HotelId;
            }
            if (filters.RulesName != null) {
                search.where['RulesName'] = { [Op.like]: '%' + filters.RulesName + '%' };
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
            const foundResults = await PropertyRules.findAndCountAll(search);
            let offset = 0;
            let pageIndex = 0;
            if (filters.PageIndex) {
                pageIndex = filters.PageIndex < 0 ? 0 : filters.PageIndex;
                offset = pageIndex * limit;
            }
            search['limit'] = limit;
            search['offset'] = offset;

            const dtos: PropertyRulesDto[] = [];
            for (const propertyrules of foundResults.rows) {
                const dto = await PropertyRulesMapper.toDto(propertyrules);
                dtos.push(dto);
            }

            const count = foundResults.count;
            const totalCount = typeof count === "number" ? count : count[0];

            const searchResults: PropertyRulesSearchResults = {
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

update = async (id: string, propertyrulesDomainModel: PropertyRulesDomainModel): Promise<PropertyRulesDto> => {
            try {
                const propertyrules = await PropertyRules.findByPk(id);
    
                if (propertyrulesDomainModel.HotelId ) {
                    propertyrules.HotelId = propertyrulesDomainModel.HotelId;
                }
                if (propertyrulesDomainModel.RulesName != null) {
                    propertyrules.RulesName = propertyrulesDomainModel.RulesName;
                }
                if (propertyrulesDomainModel.Description != null) {
                    propertyrules.Description = propertyrulesDomainModel.Description;
                }
                await propertyrules.save();
    
                const dto = await PropertyRulesMapper.toDto(propertyrules);
                return dto;
            } catch (error) {
                Logger.instance().log(error.message);
                throw new ApiError(500, error.message);
            }
        };
    
        delete = async (id: string): Promise<boolean> => {
            try {
                const result = await PropertyRules.destroy({ where: { id: id } });
                return result === 1;
            } catch (error) {
                Logger.instance().log(error.message);
                throw new ApiError(500, error.message);
            }
        };

}

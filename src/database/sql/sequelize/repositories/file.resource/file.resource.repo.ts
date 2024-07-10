/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable key-spacing */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
import { IFileResourceRepo } from '../../../../repository.interfaces/file.resource/file.resource.repo.interface';
import FileResource from '../../models/file.resource/file.resource.model';
import { Op } from 'sequelize';
import { FileResourceDomainModel } from '../../../../../domain.types/file.resource/file.resource.domain.model';
import { FileResourceMapper } from '../../mappers/file.resource/file.resource.mapper';
import { Logger } from '../../../../../common/logger';
import { ApiError } from '../../../../../common/api.error';
import { FileResourceDto } from '../../../../../domain.types/file.resource/file.resource.dto';
import { FileResourceSearchFilters, FileResourceSearchResults } from '../../../../../domain.types/file.resource/file.resource.search.types';

///////////////////////////////////////////////////////////////////////

export class FileResourceRepo implements IFileResourceRepo {

    create = async (fileresourceDomainModel: FileResourceDomainModel): Promise<FileResourceDto> => {
        try {
            const entity = {

                Name   : fileresourceDomainModel.Name,
                MineType : fileresourceDomainModel.MineType,
                StorageKey        : fileresourceDomainModel.StorageKey,
                IsPublic        : fileresourceDomainModel.IsPublic,
                Url : fileresourceDomainModel.Url,

            };
            const fileresource = await FileResource.create(entity);
            const dto = await FileResourceMapper.toDto(fileresource);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getById = async (id: string): Promise<FileResourceDto> => {
        try {
            const fileresource = await FileResource.findByPk(id);
            const dto = await FileResourceMapper.toDto(fileresource);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    search = async (filters: FileResourceSearchFilters): Promise<FileResourceSearchResults> => {
        try {

            const search = { where: {} };

            if (filters.id != null) {
                search.where['id'] = filters.id;
            }
            if (filters.Name != null) {
                search.where['Name'] = filters.Name;
            }
            if (filters.MineType != null) {
                search.where['MineType'] = { [Op.like]: '%' + filters.MineType + '%' };
            }
            if (filters.StorageKey != null) {
                search.where['StorageKey'] = filters.StorageKey;
            }
            
            if (filters.IsPublic != null) {
                search.where['IsPublic'] = filters.IsPublic;
            }

            if (filters.Url != null) {
                search.where['Url'] = filters.Url;
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
            const foundResults = await FileResource.findAndCountAll(search);
            let offset = 0;
            let pageIndex = 0;
            if (filters.PageIndex) {
                pageIndex = filters.PageIndex < 0 ? 0 : filters.PageIndex;
                offset = pageIndex * limit;
            }
            search['limit'] = limit;
            search['offset'] = offset;

            const dtos: FileResourceDto[] = [];
            for (const fileresource of foundResults.rows) {
                const dto = await FileResourceMapper.toDto(fileresource);
                dtos.push(dto);
            }

            const count = foundResults.count;
            const totalCount = typeof count === "number" ? count : count[0];

            const searchResults: FileResourceSearchResults = {
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

update = async (id: string,fileresourceDomainModel: FileResourceDomainModel): Promise<FileResourceDto> => {
            try {
                const fileresource = await FileResource.findByPk(id);
                
                if (fileresourceDomainModel.Name ) {
                    fileresource.Name = fileresourceDomainModel.Name;
                }
                if (fileresourceDomainModel.MineType != null) {
                    fileresource.MineType = fileresourceDomainModel.MineType;
                }
                if (fileresourceDomainModel.StorageKey != null) {
                    fileresource.StorageKey = fileresourceDomainModel.StorageKey;
                }
                if (fileresourceDomainModel.IsPublic != null) {
                    fileresource.IsPublic = fileresourceDomainModel.IsPublic;
                }

                if (fileresourceDomainModel.id != null) {
                    fileresource.id = fileresourceDomainModel.id;
                }
                if (fileresourceDomainModel.Url != null) {
                    fileresource.Url = fileresourceDomainModel.Url;
                }
                await fileresource.save();
    
                const dto = await FileResourceMapper.toDto(fileresource);
                return dto;
            } catch (error) {
                Logger.instance().log(error.message);
                throw new ApiError(500, error.message);
            }
        };
    
        delete = async (id: string): Promise<boolean> => {
            try {
                const result = await FileResource.destroy({ where: { id: id } });
                return result === 1;
            } catch (error) {
                Logger.instance().log(error.message);
                throw new ApiError(500, error.message);
            }
        };

}

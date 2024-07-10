/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable key-spacing */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
import { IHotelPhotosRepo } from '../../../../repository.interfaces/hotel.photos/hotel.photos.repo.interface';
import HotelPhotos from '../../models/hotel.photos/hotel.photos.model';
import { Op } from 'sequelize';
import { HotelPhotosDomainModel } from '../../../../../domain.types/hotel.photos/hotel.photos.domain.model';
import { HotelPhotosMapper } from '../../mappers/hotel.photos/hotel.photos.mapper';
import { Logger } from '../../../../../common/logger';
import { ApiError } from '../../../../../common/api.error';
import { HotelPhotosDto } from '../../../../../domain.types/hotel.photos/hotel.photos.dto';
import { HotelPhotosSearchFilters, HotelPhotosSearchResults } from '../../../../../domain.types/hotel.photos/hotel.photos.search.types';

///////////////////////////////////////////////////////////////////////

export class HotelPhotosRepo implements IHotelPhotosRepo {

    create = async (hotelphotosDomainModel: HotelPhotosDomainModel): Promise<HotelPhotosDto> => {
        try {
            const entity = {

                FileResourceId : hotelphotosDomainModel.FileResourceId,
                HotelId : hotelphotosDomainModel.HotelId,
                RoomTypeId : hotelphotosDomainModel.RoomTypeId,
            
            };
            const hotelphotos = await HotelPhotos.create(entity);
            const dto = await HotelPhotosMapper.toDto(hotelphotos);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getById = async (id: string): Promise<HotelPhotosDto> => {
        try {
            const hotelphotos = await HotelPhotos.findByPk(id);
            const dto = await HotelPhotosMapper.toDto(hotelphotos);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    search = async (filters: HotelPhotosSearchFilters): Promise<HotelPhotosSearchResults> => {
        try {

            const search = { where: {} };

            if (filters.id != null) {
                search.where['id'] = filters.id;
            }
            if (filters.FileResourceId != null) {
                search.where['FileResourceId'] = filters.FileResourceId;
            }
            if (filters.HotelId != null) {
                search.where['HotelId'] = { [Op.like]: '%' + filters.HotelId + '%' };
            }
            if (filters.RoomTypeId != null) {
                search.where['RoomTypeId'] = filters.RoomTypeId;
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
            const foundResults = await HotelPhotos.findAndCountAll(search);
            let offset = 0;
            let pageIndex = 0;
            if (filters.PageIndex) {
                pageIndex = filters.PageIndex < 0 ? 0 : filters.PageIndex;
                offset = pageIndex * limit;
            }
            search['limit'] = limit;
            search['offset'] = offset;

            const dtos: HotelPhotosDto[] = [];
            for (const hotelphotos of foundResults.rows) {
                const dto = await HotelPhotosMapper.toDto(hotelphotos);
                dtos.push(dto);
            }

            const count = foundResults.count;
            const totalCount = typeof count === "number" ? count : count[0];

            const searchResults: HotelPhotosSearchResults = {
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

update = async (id: string, hotelphotosDomainModel: HotelPhotosDomainModel): Promise<HotelPhotosDto> => {
            try {
                const hotelphotos = await HotelPhotos.findByPk(id);

                if (hotelphotosDomainModel.FileResourceId ) {
                    hotelphotos.FileResourceId = hotelphotosDomainModel.FileResourceId;
                }
                if (hotelphotosDomainModel.HotelId != null) {
                    hotelphotos.HotelId = hotelphotosDomainModel.HotelId;
                }
                if (hotelphotosDomainModel.RoomTypeId != null) {
                    hotelphotos.RoomTypeId = hotelphotosDomainModel.RoomTypeId;
                }
    
                await hotelphotos.save();
    
                const dto = await HotelPhotosMapper.toDto(hotelphotos);
                return dto;
            } catch (error) {
                Logger.instance().log(error.message);
                throw new ApiError(500, error.message);
            }
        };
    
        delete = async (id: string): Promise<boolean> => {
            try {
                const result = await HotelPhotos.destroy({ where: { id: id } });
                return result === 1;
            } catch (error) {
                Logger.instance().log(error.message);
                throw new ApiError(500, error.message);
            }
        };

}

/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable key-spacing */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
import { IHotelAmenitiesRepo } from '../../../../repository.interfaces/hotel.amenities/hotel.amenities.repo.interface';
import HotelAmenities from '../../models/hotel.amenities/hotel.amenities.model';
import { Op } from 'sequelize';
import { HotelAmenitiesDomainModel } from '../../../../../domain.types/hotel.amenities/hotel.amenities.domain.model';
import { HotelAmenitiesMapper } from '../../mappers/hotel.amenities/hotel.amenities.mapper';
import { Logger } from '../../../../../common/logger';
import { ApiError } from '../../../../../common/api.error';
import { HotelAmenitiesDto } from '../../../../../domain.types/hotel.amenities/hotel.amenities.dto';
import { HotelAmenitiesSearchFilters, HotelAmenitiesSearchResults } from '../../../../../domain.types/hotel.amenities/hotel.amenities.search.types';

///////////////////////////////////////////////////////////////////////

export class HotelAmenitiesRepo implements IHotelAmenitiesRepo {

    create = async (hotelamenitiesDomainModel: HotelAmenitiesDomainModel): Promise<HotelAmenitiesDto> => {
        try {
            const entity = {
                AminityName   : hotelamenitiesDomainModel.AminityName,
                HotelId : hotelamenitiesDomainModel.HotelId,
            };
            const hotelamenities = await HotelAmenities.create(entity);
            const dto = await HotelAmenitiesMapper.toDto(hotelamenities);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getById = async (id: string): Promise<HotelAmenitiesDto> => {
        try {
            const hotelamenities = await HotelAmenities.findByPk(id);
            const dto = await HotelAmenitiesMapper.toDto(hotelamenities);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getAllHotelAmenities = async (): Promise<HotelAmenitiesDto[]> => {
        try {
            const records = await HotelAmenities.findAll();
            const dtos = records.map((record) => this.toDto(record));
            return dtos;
            // const dto = await HotelMapper.toDto(records);
            // return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    toDto = (hotelamenities): HotelAmenitiesDto => {
        if (hotelamenities == null) {
            return null;
        }
        const dto: HotelAmenitiesDto = {
                id: hotelamenities.id,
                AminityName : hotelamenities.AminityName,
                HotelId : hotelamenities.HotelId,
        };
        return dto;
    };

    search = async (filters: HotelAmenitiesSearchFilters): Promise<HotelAmenitiesSearchResults> => {
        try {

            const search = { where: {} };

            if (filters.id != null) {
                search.where['id'] = filters.id;
            }

            if (filters.AminityName != null) {
                search.where['AminityName'] = filters.AminityName;
            }
            if (filters.HotelId != null) {
                search.where['HotelId'] = { [Op.like]: '%' + filters.HotelId + '%' };
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
            const foundResults = await HotelAmenities.findAndCountAll(search);
            let offset = 0;
            let pageIndex = 0;
            if (filters.PageIndex) {
                pageIndex = filters.PageIndex < 0 ? 0 : filters.PageIndex;
                offset = pageIndex * limit;
            }
            search['limit'] = limit;
            search['offset'] = offset;

            const dtos: HotelAmenitiesDto[] = [];
            for (const hotel of foundResults.rows) {
                const dto = await HotelAmenitiesMapper.toDto(hotel);
                dtos.push(dto);
            }

            const count = foundResults.count;
            const totalCount = typeof count === "number" ? count : count[0];

            const searchResults: HotelAmenitiesSearchResults = {
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

update = async (id: string, hotelamenitiesDomainModel: HotelAmenitiesDomainModel): Promise<HotelAmenitiesDto> => {
            try {
                const hotelamenities = await HotelAmenities.findByPk(id);
                if (hotelamenitiesDomainModel.AminityName ) {
                    hotelamenities.AminityName = hotelamenitiesDomainModel.AminityName;
                }
                if (hotelamenitiesDomainModel.HotelId != null) {
                    hotelamenities.HotelId = hotelamenitiesDomainModel.HotelId;
                }
                
                await hotelamenities.save();
    
                const dto = await HotelAmenitiesMapper.toDto(hotelamenities);
                return dto;
            } catch (error) {
                Logger.instance().log(error.message);
                throw new ApiError(500, error.message);
            }
        };
    
        delete = async (id: string): Promise<boolean> => {
            try {
                const result = await HotelAmenities.destroy({ where: { id: id } });
                return result === 1;
            } catch (error) {
                Logger.instance().log(error.message);
                throw new ApiError(500, error.message);
            }
        };

}

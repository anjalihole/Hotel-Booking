/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable key-spacing */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
import { IHotelRepo } from '../../../../repository.interfaces/hotel/hotel.repo.interface';
import Hotel from '../../models/hotel/hotel.model';
import { Op } from 'sequelize';
import { HotelDomainModel } from '../../../../../domain.types/hotel/hotel.domain.model';
import { HotelMapper } from '../../mappers/hotel/hotel.mapper';
import { Logger } from '../../../../../common/logger';
import { ApiError } from '../../../../../common/api.error';
import { HotelDto } from '../../../../../domain.types/hotel/hotel.dto';
import { HotelSearchFilters, HotelSearchResults } from '../../../../../domain.types/hotel/hotel.search.types';

///////////////////////////////////////////////////////////////////////

export class HotelRepo implements IHotelRepo {

    create = async (hotelDomainModel: HotelDomainModel): Promise<HotelDto> => {
        try {
            const entity = {
                HotelName   : hotelDomainModel.HotelName,
                Address : hotelDomainModel.Address,
                Phone        : hotelDomainModel.Phone,
                Email        : hotelDomainModel.Email,
            };
            const hotel = await Hotel.create(entity);
            const dto = await HotelMapper.toDto(hotel);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getById = async (id: string): Promise<HotelDto> => {
        try {
            const hotel = await Hotel.findByPk(id);
            const dto = await HotelMapper.toDto(hotel);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getAllHotel = async (): Promise<HotelDto[]> => {
        try {
            const records = await Hotel.findAll();
            const dtos = records.map((record) => this.toDto(record));
            return dtos;
            // const dto = await HotelMapper.toDto(records);
            // return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    toDto = (hotel): HotelDto => {
        if (hotel == null) {
            return null;
        }
        const dto: HotelDto = {
            id: hotel.CustomerId,
            HotelName: hotel.FirstName,
            Phone: hotel.Phone,
            Email: hotel.Email,
            Address: hotel.Address,
        };
        return dto;
    };

    search = async (filters: HotelSearchFilters): Promise<HotelSearchResults> => {
        try {

            const search = { where: {} };

            if (filters.HotelName != null) {
                search.where['HotelName'] = filters.HotelName;
            }
            if (filters.Phone != null) {
                search.where['Phone'] = { [Op.like]: '%' + filters.Phone + '%' };
            }
            if (filters.Email != null) {
                search.where['Email'] = filters.Email;
            }
            
            if (filters.Address != null) {
                search.where['Address'] = filters.Address;
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
            const foundResults = await Hotel.findAndCountAll(search);
            let offset = 0;
            let pageIndex = 0;
            if (filters.PageIndex) {
                pageIndex = filters.PageIndex < 0 ? 0 : filters.PageIndex;
                offset = pageIndex * limit;
            }
            search['limit'] = limit;
            search['offset'] = offset;

            const dtos: HotelDto[] = [];
            for (const hotel of foundResults.rows) {
                const dto = await HotelMapper.toDto(hotel);
                dtos.push(dto);
            }

            const count = foundResults.count;
            const totalCount = typeof count === "number" ? count : count[0];

            const searchResults: HotelSearchResults = {
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

update = async (id: string, hotelDomainModel: HotelDomainModel): Promise<HotelDto> => {
            try {
                const hotel = await Hotel.findByPk(id);
                if (hotelDomainModel.HotelName != null) {
                    hotel.HotelName = hotelDomainModel.HotelName;
                }
                if (hotelDomainModel.Phone != null) {
                    hotel.Phone = hotelDomainModel.Phone;
                }
                if (hotelDomainModel.Email != null) {
                    hotel.Email = hotelDomainModel.Email;
                }
                if (hotelDomainModel.Address != null) {
                    hotel.Address = hotelDomainModel.Address;
                }
                await hotel.save();
    
                const dto = await HotelMapper.toDto(hotel);
                return dto;
            } catch (error) {
                Logger.instance().log(error.message);
                throw new ApiError(500, error.message);
            }
        };
    
        delete = async (id: string): Promise<boolean> => {
            try {
                const result = await Hotel.destroy({ where: { id: id } });
                return result === 1;
            } catch (error) {
                Logger.instance().log(error.message);
                throw new ApiError(500, error.message);
            }
        };

}

/* eslint-disable linebreak-style */
/* eslint-disable space-infix-ops */
/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable key-spacing */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
import { IRoomAmenitiesRepo } from '../../../../repository.interfaces/room.amenities/room.amenities.repo.interface';
import RoomAmenities from '../../models/room.amenities/room.amenities.model';
import { Op } from 'sequelize';
import { RoomAmenitiesDomainModel } from '../../../../../domain.types/room.amenities/room.amenities.domain.model';
import { RoomAmenitiesMapper } from '../../mappers/room.amenities/room.amenities.mapper';
import { Logger } from '../../../../../common/logger';
import { ApiError } from '../../../../../common/api.error';
import { RoomAmenitiesDto } from '../../../../../domain.types/room.amenities/room.amenities.dto';
import { RoomAmenitiesSearchFilters, RoomAmenitiesSearchResults } from '../../../../../domain.types/room.amenities/room.amenities.search.types';

///////////////////////////////////////////////////////////////////////

export class RoomAmenitiesRepo implements IRoomAmenitiesRepo {

    create = async (roomamenitiesDomainModel: RoomAmenitiesDomainModel): Promise<RoomAmenitiesDto> => {
        try {
            const entity = {
                id  : roomamenitiesDomainModel.id,
                AmenityName : roomamenitiesDomainModel.AmenityName ?? null,
                HotelId  : roomamenitiesDomainModel.HotelId,
                RoomId : roomamenitiesDomainModel.RoomId,

            };
            const roomamenities = await RoomAmenities.create(entity);
            const dto = await RoomAmenitiesMapper.toDto(roomamenities);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getById = async (id: string): Promise<RoomAmenitiesDto> => {
        try {
            const roomamenities = await RoomAmenities.findByPk(id);
            const dto = await RoomAmenitiesMapper.toDto(roomamenities);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    search = async (filters: RoomAmenitiesSearchFilters): Promise<RoomAmenitiesSearchResults> => {
        try {

            const search = { where: {} };

            if (filters.id!= null) {
                search.where['id'] = filters.id;
            }

            if (filters.AmenityName!= null) {
                search.where['AmenityName'] = filters.AmenityName;
            }
            if (filters.HotelId != null) {
                search.where['HotelId'] = { [Op.like]: '%' + filters.HotelId + '%' };
            }
            if (filters.RoomId!= null) {
                search.where['RoomId'] = filters.RoomId;
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
            const foundResults = await RoomAmenities.findAndCountAll(search);
            let offset = 0;
            let pageIndex = 0;
            if (filters.PageIndex) {
                pageIndex = filters.PageIndex < 0 ? 0 : filters.PageIndex;
                offset = pageIndex * limit;
            }
            search['limit'] = limit;
            search['offset'] = offset;

            const dtos: RoomAmenitiesDto[] = [];
            for (const roomamenities of foundResults.rows) {
                const dto = await RoomAmenitiesMapper.toDto(roomamenities);
                dtos.push(dto);
            }

            const count = foundResults.count;
            const totalCount = typeof count === "number" ? count : count[0];

            const searchResults: RoomAmenitiesSearchResults = {
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

update = async (id: string, roomamenitiesDomainModel: RoomAmenitiesDomainModel): Promise<RoomAmenitiesDto> => {
            try {
                const roomamenities = await RoomAmenities.findByPk(id);
    
                //Client code is not modifiable
                //Use renew key to update ApiKey, ValidFrom and ValidTill
    
                if (roomamenitiesDomainModel.id != null) {
                    roomamenities.id = roomamenitiesDomainModel.id;
                }

                if (roomamenitiesDomainModel.AmenityName != null) {
                    roomamenities.AmenityName = roomamenitiesDomainModel.AmenityName;
                }

                if (roomamenitiesDomainModel.HotelId != null) {
                    roomamenities.HotelId = roomamenitiesDomainModel.HotelId;
                }
                if (roomamenitiesDomainModel.RoomId != null) {
                    roomamenities.RoomId = roomamenitiesDomainModel.RoomId;
                }
                
                await roomamenities.save();
    
                const dto = await RoomAmenitiesMapper.toDto(roomamenities);
                return dto;
            } catch (error) {
                Logger.instance().log(error.message);
                throw new ApiError(500, error.message);
            }
        };
    
        delete = async (id: string): Promise<boolean> => {
            try {
                const result = await RoomAmenities.destroy({ where: { id: id } });
                return result === 1;
            } catch (error) {
                Logger.instance().log(error.message);
                throw new ApiError(500, error.message);
            }
        };

}

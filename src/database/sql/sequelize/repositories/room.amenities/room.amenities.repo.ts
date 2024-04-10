/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable key-spacing */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
import { IRoomAmenitiesRepo } from '../../../../repository.interfaces/room.amenities/room.amenities.repo.interface';
import RoomAmenities from '../../models/room.aminities/room.aminities.model';
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
                AminityName   : roomamenitiesDomainModel.AminityName,
                RoomId : roomamenitiesDomainModel.RoomId,
                HotelId : roomamenitiesDomainModel.HotelId,

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

    getAllRoomAmenities = async (): Promise<RoomAmenitiesDto[]> => {
        try {
            const records = await RoomAmenities.findAll();
            const dtos = records.map((record) => this.toDto(record));
            return dtos;
            // const dto = await RoomMapper.toDto(records);
            // return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    toDto = (roomamenities): RoomAmenitiesDto => {
        if (roomamenities == null) {
            return null;
        }
        const dto: RoomAmenitiesDto = {
                id: roomamenities.id,
                AminityName : roomamenities.AminityName,
                RoomId : roomamenities.RoomId,
                HotelId : roomamenities.HotelId,
        };
        return dto;
    };

    search = async (filters: RoomAmenitiesSearchFilters): Promise<RoomAmenitiesSearchResults> => {
        try {

            const search = { where: {} };

            if (filters.id != null) {
                search.where['id'] = filters.id;
            }

            if (filters.AminityName != null) {
                search.where['AminityName'] = filters.AminityName;
            }
            if (filters.RoomId != null) {
                search.where['RoomId'] = { [Op.like]: '%' + filters.RoomId + '%' };
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
            for (const room of foundResults.rows) {
                const dto = await RoomAmenitiesMapper.toDto(room);
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
                if (roomamenitiesDomainModel.AminityName ) {
                    roomamenities.AminityName = roomamenitiesDomainModel.AminityName;
                }
                if (roomamenitiesDomainModel.RoomId != null) {
                    roomamenities.RoomId = roomamenitiesDomainModel.RoomId;
                }
                if (roomamenitiesDomainModel.HotelId != null) {
                    roomamenities.HotelId = roomamenitiesDomainModel.HotelId;
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

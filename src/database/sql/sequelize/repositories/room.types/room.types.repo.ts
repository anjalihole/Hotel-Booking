/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable key-spacing */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
import { IRoomTypesRepo } from '../../../../repository.interfaces/room.types/room.types.repo.interface';
import RoomTypes from '../../models/room.types/room.types.model';
import { Op } from 'sequelize';
import { RoomTypesDomainModel } from '../../../../../domain.types/room.types/room.types.domain.model';
import { RoomTypesMapper } from '../../mappers/room.types/room.types.mapper';
import { Logger } from '../../../../../common/logger';
import { ApiError } from '../../../../../common/api.error';
import { RoomTypesDto } from '../../../../../domain.types/room.types/room.types.dto';
import { RoomTypesSearchFilters, RoomTypesSearchResults } from '../../../../../domain.types/room.types/room.types.search.types';

///////////////////////////////////////////////////////////////////////

export class RoomTypesRepo implements IRoomTypesRepo {

    create = async (roomtypesDomainModel: RoomTypesDomainModel): Promise<RoomTypesDto> => {
        try {
            const entity = {

                TypeName   : roomtypesDomainModel.TypeName,
                TypeDescription : roomtypesDomainModel.TypeDescription,
                StandardRate        : roomtypesDomainModel.StandardRate,
                Options        : roomtypesDomainModel.Options,
                OccupancyAdult : roomtypesDomainModel.OccupancyAdult,
                OccupancyChildren        : roomtypesDomainModel.OccupancyChildren,

            };
            const roomtypes = await RoomTypes.create(entity);
            const dto = await RoomTypesMapper.toDto(roomtypes);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getById = async (id: string): Promise<RoomTypesDto> => {
        try {
            const roomtypes = await RoomTypes.findByPk(id);
            const dto = await RoomTypesMapper.toDto(roomtypes);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getAllRoomTypes = async (): Promise<RoomTypesDto[]> => {
        try {
            const records = await RoomTypes.findAll();
            const dtos = records.map((record) => this.toDto(record));
            return dtos;
            // const dto = await RoomTypesMapper.toDto(records);
            // return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    toDto = (roomtypes): RoomTypesDto => {
        if (roomtypes == null) {
            return null;
        }
        const dto: RoomTypesDto = {
                id: roomtypes.id,
                TypeName   : roomtypes.TypeName,
                TypeDescription : roomtypes.TypeDescription,
                StandardRate        : roomtypes.StandardRate,
                Options        : roomtypes.Options,
                OccupancyAdult : roomtypes.OccupancyAdult,
                OccupancyChildren        : roomtypes.OccupancyChildren,
        };
        return dto;
    };

    search = async (filters: RoomTypesSearchFilters): Promise<RoomTypesSearchResults> => {
        try {

            const search = { where: {} };

            if (filters.id != null) {
                search.where['id'] = filters.id;
            }
            if (filters.TypeName != null) {
                search.where['TypeName'] = filters.TypeName;
            }
            if (filters.TypeDescription != null) {
                search.where['TypeDescription'] = { [Op.like]: '%' + filters.TypeDescription + '%' };
            }
            if (filters.StandardRate != null) {
                search.where['StandardRate'] = filters.StandardRate;
            }
            
            if (filters.Options != null) {
                search.where['Options'] = filters.Options;
            }

            if (filters.OccupancyAdult != null) {
                search.where['OccupancyAdult'] = filters.OccupancyAdult;
            }
            if (filters.OccupancyChildren != null) {
                search.where['OccupancyChildren'] = { [Op.like]: '%' + filters.OccupancyChildren + '%' };
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
            const foundResults = await RoomTypes.findAndCountAll(search);
            let offset = 0;
            let pageIndex = 0;
            if (filters.PageIndex) {
                pageIndex = filters.PageIndex < 0 ? 0 : filters.PageIndex;
                offset = pageIndex * limit;
            }
            search['limit'] = limit;
            search['offset'] = offset;

            const dtos: RoomTypesDto[] = [];
            for (const roomtypes of foundResults.rows) {
                const dto = await RoomTypesMapper.toDto(roomtypes);
                dtos.push(dto);
            }

            const count = foundResults.count;
            const totalCount = typeof count === "number" ? count : count[0];

            const searchResults: RoomTypesSearchResults = {
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

update = async (id: string, roomtypesDomainModel: RoomTypesDomainModel): Promise<RoomTypesDto> => {
            try {
                const roomtypes = await RoomTypes.findByPk(id);

                if (roomtypesDomainModel.TypeName ) {
                    roomtypes.TypeName = roomtypesDomainModel.TypeName;
                }
                if (roomtypesDomainModel.TypeDescription != null) {
                    roomtypes.TypeDescription = roomtypesDomainModel.TypeDescription;
                }
                if (roomtypesDomainModel.StandardRate != null) {
                    roomtypes.StandardRate = roomtypesDomainModel.StandardRate;
                }
                if (roomtypesDomainModel.Options != null) {
                    roomtypes.Options = roomtypesDomainModel.Options;
                }

                if (roomtypesDomainModel.id != null) {
                    roomtypes.id = roomtypesDomainModel.id;
                }
                if (roomtypesDomainModel.OccupancyAdult != null) {
                    roomtypes.OccupancyAdult = roomtypesDomainModel.OccupancyAdult;
                }
                if (roomtypesDomainModel.OccupancyChildren != null) {
                    roomtypes.OccupancyChildren = roomtypesDomainModel.OccupancyChildren;
                }
                await roomtypes.save();
    
                const dto = await RoomTypesMapper.toDto(roomtypes);
                return dto;
            } catch (error) {
                Logger.instance().log(error.message);
                throw new ApiError(500, error.message);
            }
        };
    
        delete = async (id: string): Promise<boolean> => {
            try {
                const result = await RoomTypes.destroy({ where: { id: id } });
                return result === 1;
            } catch (error) {
                Logger.instance().log(error.message);
                throw new ApiError(500, error.message);
            }
        };

}

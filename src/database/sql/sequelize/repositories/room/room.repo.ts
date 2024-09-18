/* eslint-disable linebreak-style */
/* eslint-disable space-infix-ops */
/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable key-spacing */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
import { IRoomRepo } from '../../../../repository.interfaces/room/room.repo.interface';
import Room from '../../models/room/room.model';
import { Op } from 'sequelize';
import { RoomDomainModel } from '../../../../../domain.types/room/room.domain.model';
import { RoomMapper } from '../../mappers/room/room.mapper';
import { Logger } from '../../../../../common/logger';
import { ApiError } from '../../../../../common/api.error';
import { RoomDto } from '../../../../../domain.types/room/room.dto';
import { RoomSearchFilters, RoomSearchResults } from '../../../../../domain.types/room/room.search.types';

///////////////////////////////////////////////////////////////////////

export class RoomRepo implements IRoomRepo {

    create = async (roomDomainModel: RoomDomainModel): Promise<RoomDto> => {
        try {
            const entity = {
                id  : roomDomainModel.id,
                Name     : roomDomainModel.Name ?? null,
                RoomNumber   : roomDomainModel.RoomNumber,
                RoomTypesId : roomDomainModel.RoomTypesId,
                HotelId : roomDomainModel.HotelId,
                Phone        : roomDomainModel.Phone,
                Description     : roomDomainModel.Description ?? null,
                Blocked     : roomDomainModel.Blocked ?? null,
                Status     : roomDomainModel.Status ?? null,
                Inventory     : roomDomainModel.Inventory ?? null,

            };
            const room = await Room.create(entity);
            const dto = await RoomMapper.toDto(room);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getById = async (id: string): Promise<RoomDto> => {
        try {
            const room = await Room.findByPk(id);
            const dto = await RoomMapper.toDto(room);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    search = async (filters: RoomSearchFilters): Promise<RoomSearchResults> => {
        try {

            const search = { where: {} };

            if (filters.id!= null) {
                search.where['id'] = filters.id;
            }

            if (filters.Name!= null) {
                search.where['Name'] = filters.Name;
            }
            if (filters.Phone != null) {
                search.where['Phone'] = { [Op.like]: '%' + filters.Phone + '%' };
            }
            if (filters.Status!= null) {
                search.where['Status'] = filters.Status;
            }
            if (filters.RoomNumber != null) {
                search.where['RoomNumber'] = filters.RoomNumber;
            }
            if (filters.RoomTypesId != null) {
                search.where['RoomTypesId'] = filters.RoomTypesId;
            }

            if (filters.HotelId != null) {
                search.where['HotelId'] = filters.HotelId;
            }

            if (filters.Description != null) {
                search.where['Description'] = filters.Description;
            }

            if (filters.Blocked != null) {
                search.where['Blocked'] = filters.Blocked;
            }

            if (filters.Inventory != null) {
                search.where['Inventory'] = filters.Inventory;
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
            const foundResults = await Room.findAndCountAll(search);
            let offset = 0;
            let pageIndex = 0;
            if (filters.PageIndex) {
                pageIndex = filters.PageIndex < 0 ? 0 : filters.PageIndex;
                offset = pageIndex * limit;
            }
            search['limit'] = limit;
            search['offset'] = offset;

            const dtos: RoomDto[] = [];
            for (const room of foundResults.rows) {
                const dto = await RoomMapper.toDto(room);
                dtos.push(dto);
            }

            const count = foundResults.count;
            const totalCount = typeof count === "number" ? count : count[0];

            const searchResults: RoomSearchResults = {
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

update = async (id: string, roomDomainModel: RoomDomainModel): Promise<RoomDto> => {
            try {
                const room = await Room.findByPk(id);
    
                //Client code is not modifiable
                //Use renew key to update ApiKey, ValidFrom and ValidTill
    
                if (roomDomainModel.id != null) {
                    room.id = roomDomainModel.id;
                }

                if (roomDomainModel.Name != null) {
                    room.Name = roomDomainModel.Name;
                }

                if (roomDomainModel.RoomNumber != null) {
                    room.RoomNumber = roomDomainModel.RoomNumber;
                }
                if (roomDomainModel.RoomTypesId != null) {
                    room.RoomTypesId = roomDomainModel.RoomTypesId;
                }

                if (roomDomainModel.HotelId != null) {
                    room.HotelId = roomDomainModel.HotelId;
                }
                if (roomDomainModel.Phone != null) {
                    room.Phone = roomDomainModel.Phone;
                }
                if (roomDomainModel.Status != null) {
                    room.Status = roomDomainModel.Status;
                }

                if (roomDomainModel.Description != null) {
                    room.Description = roomDomainModel.Description;
                }

                if (roomDomainModel.Blocked != null) {
                    room.Blocked = roomDomainModel.Blocked;
                }

                if (roomDomainModel.Inventory != null) {
                   room.Inventory = roomDomainModel.Inventory;
                }
                await room.save();
    
                const dto = await RoomMapper.toDto(room);
                return dto;
            } catch (error) {
                Logger.instance().log(error.message);
                throw new ApiError(500, error.message);
            }
        };
    
        delete = async (id: string): Promise<boolean> => {
            try {
                const result = await Room.destroy({ where: { id: id } });
                return result === 1;
            } catch (error) {
                Logger.instance().log(error.message);
                throw new ApiError(500, error.message);
            }
        };

}

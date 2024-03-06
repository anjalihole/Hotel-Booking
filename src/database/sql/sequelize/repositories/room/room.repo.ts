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
                HotelId  : roomDomainModel.HotelId,
                RoomNumber   : roomDomainModel.RoomNumber,
                RoomType : roomDomainModel.RoomType,
                Phone        : roomDomainModel.Phone,
                BedType       : roomDomainModel.BedType,
                RoomImage     : roomDomainModel.RoomImage ?? null,
                Price     : roomDomainModel.Price ?? null,
                Taxes     : roomDomainModel.Taxes ?? null,
                Description     : roomDomainModel.Description ?? null,
                BlockRoom     : roomDomainModel.BlockRoom ?? null,
                RoomPerPerson     : roomDomainModel.RoomPerPerson ?? null,
                CostPerDay     : roomDomainModel.CostPerDay ?? null,
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

    getAllRoom = async (): Promise<RoomDto[]> => {
        try {
            const records = await Room.findAll();
            const dtos = records.map((record) => this.toDto(record));
            return dtos;
            // const dto = await CustomerMapper.toDto(records);
            // return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    toDto = (room): RoomDto => {
        if (room == null) {
            return null;
        }
        const dto: RoomDto = {
            id: room.RoomId,
             HotelId: room. HotelId,
            RoomNumber: room.RoomNumber,
            Phone: room.Phone,
            RoomType: room.RoomType,
            BedType: room.BedType,
            RoomImage: room.RoomImage,
            Price: room.Price,
            Taxes: room.Taxes,
            Description: room.Description,
            BlockRoom: room.BlockRoom,
            RoomPerPerson: room.RoomPerPerson,
            CostPerDay: room.CostPerDay,
            Inventory: room.Inventory,

        };
        return dto;
    };

    search = async (filters: RoomSearchFilters): Promise<RoomSearchResults> => {
        try {

            const search = { where: {} };

            if (filters.HotelId!= null) {
                search.where['HotelId'] = filters.HotelId;
            }
            if (filters.Phone != null) {
                search.where['Phone'] = { [Op.like]: '%' + filters.Phone + '%' };
            }
            if (filters.BedType!= null) {
                search.where['BedType'] = filters.BedType;
            }
            if (filters.RoomNumber != null) {
                search.where['RoomNumber'] = filters.RoomNumber;
            }
            if (filters.RoomType != null) {
                search.where['RoomType'] = filters.RoomType;
            }

            if (filters.RoomImage != null) {
                search.where['RoomImage'] = filters.RoomImage;
            }

            if (filters.Price != null) {
                search.where['Price'] = filters.Price;
            }

            if (filters.Taxes != null) {
                search.where['Taxes'] = filters.Taxes;
            }

            if (filters.Description != null) {
                search.where['Description'] = filters.Description;
            }

            if (filters.BlockRoom != null) {
                search.where['BlockRoom'] = filters.BlockRoom;
            }

            if (filters.RoomPerPerson != null) {
                search.where['RoomPerPerson'] = filters.RoomPerPerson;
            }

            if (filters.CostPerDay != null) {
                search.where['CostPerDay'] = filters.CostPerDay;
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
    
                if (roomDomainModel.HotelId != null) {
                    room.HotelId = roomDomainModel.HotelId;
                }

                if (roomDomainModel.RoomNumber != null) {
                    room.RoomNumber = roomDomainModel.RoomNumber;
                }
                if (roomDomainModel.RoomType != null) {
                    room.RoomType = roomDomainModel.RoomType;
                }
                if (roomDomainModel.Phone != null) {
                    room.Phone = roomDomainModel.Phone;
                }
                if (roomDomainModel.BedType != null) {
                    room.BedType = roomDomainModel.BedType;
                }
                if (roomDomainModel.RoomImage != null) {
                    room.RoomImage = roomDomainModel.RoomImage;
                }

                if (roomDomainModel.Price != null) {
                    room.Price = roomDomainModel.Price;
                }

                if (roomDomainModel.Taxes != null) {
                    room.Taxes = roomDomainModel.Taxes;
                }

                if (roomDomainModel.Description != null) {
                    room.Description = roomDomainModel.Description;
                }

                if (roomDomainModel.BlockRoom != null) {
                    room.BlockRoom = roomDomainModel.BlockRoom;
                }

                if (roomDomainModel.RoomPerPerson != null) {
                    room.RoomPerPerson = roomDomainModel.RoomPerPerson;
                }

                if (roomDomainModel.CostPerDay != null) {
                    room.CostPerDay = roomDomainModel.CostPerDay;
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

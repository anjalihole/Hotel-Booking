/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable key-spacing */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
import { IReservationOrderItemRepo } from '../../../../repository.interfaces/reservation.order.item/reservation.order.item.repo.interface';
import ReservationOrderItem from '../../models/reservation.order.item/reservation.order.item.model';
import { Op } from 'sequelize';
import { ReservationOrderItemDomainModel } from '../../../../../domain.types/reservation.order.item/reservation.order.item.domain.model';
import { ReservationOrderItemMapper } from '../../mappers/reservation.order.item/reservation.order.item.mapper';
import { Logger } from '../../../../../common/logger';
import { ApiError } from '../../../../../common/api.error';
import { ReservationOrderItemDto } from '../../../../../domain.types/reservation.order.item/reservation.order.item.dto';
import { ReservationOrderItemSearchFilters, ReservationOrderItemSearchResults } from '../../../../../domain.types/reservation.order.item/reservation.order.item.search.types';

///////////////////////////////////////////////////////////////////////

export class ReservationOrderItemRepo implements IReservationOrderItemRepo {

    create = async (reservationorderitemDomainModel: ReservationOrderItemDomainModel): Promise<ReservationOrderItemDto> => {
        try {
            const entity = {
                ReservationOrderId   : reservationorderitemDomainModel.ReservationOrderId,
                RoomId : reservationorderitemDomainModel.RoomId,
                Tax        : reservationorderitemDomainModel.Tax,
                Discount        : reservationorderitemDomainModel.Discount,
                Cost        : reservationorderitemDomainModel.Cost,
                TotalDays        : reservationorderitemDomainModel.TotalDays,
            };
            const reservationorderitem = await ReservationOrderItem.create(entity);
            const dto = await ReservationOrderItemMapper.toDto(reservationorderitem);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getById = async (id: string): Promise<ReservationOrderItemDto> => {
        try {
            const reservationorderitem = await ReservationOrderItem.findByPk(id);
            const dto = await ReservationOrderItemMapper.toDto(reservationorderitem);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    search = async (filters: ReservationOrderItemSearchFilters): Promise<ReservationOrderItemSearchResults> => {
        try {
            
            const search = { where: {} };

            if (filters.id != null) {
                search.where['id'] = filters.id;
            }
            if (filters.ReservationOrderId != null) {
                search.where['ReservationOrderId'] = filters.ReservationOrderId;
            }
            if (filters.RoomId != null) {
                search.where['RoomId'] = { [Op.like]: '%' + filters.RoomId + '%' };
            }
            if (filters.Tax != null) {
                search.where['Tax'] = filters.Tax;
            }
            if (filters.Discount != null) {
                search.where['Discount'] = filters.Discount;
            }
            if (filters.Cost != null) {
                search.where['Cost'] = filters.Cost;
            }
            if (filters.TotalDays != null) {
                search.where['TotalDays'] = filters.TotalDays;
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
            const foundResults = await ReservationOrderItem.findAndCountAll(search);
            let offset = 0;
            let pageIndex = 0;
            if (filters.PageIndex) {
                pageIndex = filters.PageIndex < 0 ? 0 : filters.PageIndex;
                offset = pageIndex * limit;
            }
            search['limit'] = limit;
            search['offset'] = offset;

            const dtos: ReservationOrderItemDto[] = [];
            for (const reservationorderitem of foundResults.rows) {
                const dto = await ReservationOrderItemMapper.toDto(reservationorderitem);
                dtos.push(dto);
            }

            const count = foundResults.count;
            const totalCount = typeof count === "number" ? count : count[0];

            const searchResults: ReservationOrderItemSearchResults = {
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

update = async (id: string, reservationorderitemDomainModel: ReservationOrderItemDomainModel): Promise<ReservationOrderItemDto> => {
            try {
                const reservationorderitem = await ReservationOrderItem.findByPk(id);
                if (reservationorderitemDomainModel.ReservationOrderId ) {
                    reservationorderitem.ReservationOrderId = reservationorderitemDomainModel.ReservationOrderId;
                }
                if (reservationorderitemDomainModel.RoomId != null) {
                    reservationorderitem.RoomId = reservationorderitemDomainModel.RoomId;
                }
                if (reservationorderitemDomainModel.Tax != null) {
                    reservationorderitem.Tax = reservationorderitemDomainModel.Tax;
                }
                if (reservationorderitemDomainModel.Discount != null) {
                    reservationorderitem.Discount = reservationorderitemDomainModel.Discount;
                }
                if (reservationorderitemDomainModel.Cost != null) {
                    reservationorderitem.Cost = reservationorderitemDomainModel.Cost;
                }
                if (reservationorderitemDomainModel.TotalDays != null) {
                    reservationorderitem.TotalDays = reservationorderitemDomainModel.TotalDays;
                }
                await reservationorderitem.save();
    
                const dto = await ReservationOrderItemMapper.toDto(reservationorderitem);
                return dto;
            } catch (error) {
                Logger.instance().log(error.message);
                throw new ApiError(500, error.message);
            }
        };
    
        delete = async (id: string): Promise<boolean> => {
            try {
                const result = await ReservationOrderItem.destroy({ where: { id: id } });
                return result === 1;
            } catch (error) {
                Logger.instance().log(error.message);
                throw new ApiError(500, error.message);
            }
        };

}

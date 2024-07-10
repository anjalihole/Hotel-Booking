/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable key-spacing */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
import { IReservationOrderRepo } from '../../../../repository.interfaces/reservation.order/reservation.order.repo.interface';
import ReservationOrder from '../../models/reservation.order/reservation.order.model';
import { Op } from 'sequelize';
import { ReservationOrderDomainModel } from '../../../../../domain.types/reservation.order/reservation.order.domain.model';
import { ReservationOrderMapper } from '../../mappers/reservation.order/reservation.order.mapper';
import { Logger } from '../../../../../common/logger';
import { ApiError } from '../../../../../common/api.error';
import { ReservationOrderDto } from '../../../../../domain.types/reservation.order/reservation.order.dto';
import { ReservationOrderSearchFilters, ReservationOrderSearchResults } from '../../../../../domain.types/reservation.order/reservation.order.search.types';

///////////////////////////////////////////////////////////////////////

export class ReservationOrderRepo implements IReservationOrderRepo {

    create = async (reservationorderDomainModel: ReservationOrderDomainModel): Promise<ReservationOrderDto> => {
        try {
            const entity = {
                
                CustomerUserId : reservationorderDomainModel.CustomerUserId,
                TotalCost : reservationorderDomainModel.TotalCost,
                CheckInDate : reservationorderDomainModel.CheckInDate,
                CheckOutDate : reservationorderDomainModel.CheckOutDate,
                ReservationDateTime : reservationorderDomainModel.ReservationDateTime,
                Status : reservationorderDomainModel.Status,
                Discount : reservationorderDomainModel.Discount,
                Taxes : reservationorderDomainModel.Taxes,
                TotalPayable : reservationorderDomainModel.TotalPayable,
                AdvancePaid : reservationorderDomainModel.AdvancePaid,
                AdvancePaymentDateTime : reservationorderDomainModel.AdvancePaymentDateTime,
                BookingStaffUserId : reservationorderDomainModel.BookingStaffUserId,
                Penalties : reservationorderDomainModel.Penalties,

            };
            const reservationorder = await ReservationOrder.create(entity);
            const dto = await ReservationOrderMapper.toDto(reservationorder);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getById = async (id: string): Promise<ReservationOrderDto> => {
        try {
            const reservationorder = await ReservationOrder.findByPk(id);
            const dto = await ReservationOrderMapper.toDto(reservationorder);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };
    
    search = async (filters: ReservationOrderSearchFilters): Promise<ReservationOrderSearchResults> => {
        try {
            
            const search = { where: {} };

            if (filters.id != null) {
                search.where['id'] = filters.id;
            }

            if (filters.CustomerUserId != null) {
                search.where['CustomerUserId'] = filters.CustomerUserId;
            }
            if (filters.TotalCost != null) {
                search.where['TotalCost'] = { [Op.like]: '%' + filters.TotalCost + '%' };
            }
            if (filters.CheckInDate != null) {
                search.where['CheckInDate'] = filters.CheckInDate;
            }
            
            if (filters.CheckOutDate != null) {
                search.where['CheckOutDate'] = filters.CheckOutDate;
            }

            if (filters.ReservationDateTime != null) {
                search.where['ReservationDateTime'] = filters.ReservationDateTime;
            }
            if (filters.Status != null) {
                search.where['Status'] = { [Op.like]: '%' + filters.Status + '%' };
            }
            if (filters.Discount != null) {
                search.where['Discount'] = filters.Discount;
            }
            
            if (filters.Taxes != null) {
                search.where['Taxes'] = filters.Taxes;
            }

            if (filters.TotalPayable != null) {
                search.where['TotalPayable'] = filters.TotalPayable;
            }
            if (filters.AdvancePaid != null) {
                search.where['AdvancePaid'] = { [Op.like]: '%' + filters.AdvancePaid + '%' };
            }
            if (filters.AdvancePaymentDateTime != null) {
                search.where['AdvancePaymentDateTime'] = filters.AdvancePaymentDateTime;
            }
            
            if (filters.BookingStaffUserId != null) {
                search.where['BookingStaffUserId'] = filters.BookingStaffUserId;
            }

            if (filters.Penalties != null) {
                search.where['Penalties'] = filters.Penalties;
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
            const foundResults = await ReservationOrder.findAndCountAll(search);
            let offset = 0;
            let pageIndex = 0;
            if (filters.PageIndex) {
                pageIndex = filters.PageIndex < 0 ? 0 : filters.PageIndex;
                offset = pageIndex * limit;
            }
            search['limit'] = limit;
            search['offset'] = offset;

            const dtos: ReservationOrderDto[] = [];
            for (const reservationorder of foundResults.rows) {
                const dto = await ReservationOrderMapper.toDto(reservationorder);
                dtos.push(dto);
            }

            const count = foundResults.count;
            const totalCount = typeof count === "number" ? count : count[0];

            const searchResults: ReservationOrderSearchResults = {
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

update = async (id: string, reservationorderDomainModel: ReservationOrderDomainModel): Promise<ReservationOrderDto> => {
            try {
                const reservationorder = await ReservationOrder.findByPk(id);
                if (reservationorderDomainModel.CustomerUserId ) {
                    reservationorder.CustomerUserId = reservationorderDomainModel.CustomerUserId;
                }
                if (reservationorderDomainModel.TotalCost != null) {
                    reservationorder.TotalCost = reservationorderDomainModel.TotalCost;
                }
                if (reservationorderDomainModel.CheckInDate != null) {
                    reservationorder.CheckInDate = reservationorderDomainModel.CheckInDate;
                }
                if (reservationorderDomainModel.CheckOutDate != null) {
                    reservationorder.CheckOutDate = reservationorderDomainModel.CheckOutDate;
                }
                if (reservationorderDomainModel.ReservationDateTime != null) {
                    reservationorder.ReservationDateTime = reservationorderDomainModel.ReservationDateTime;
                }
                if (reservationorderDomainModel.Status != null) {
                    reservationorder.Status = reservationorderDomainModel.Status;
                }
                if (reservationorderDomainModel.Discount != null) {
                    reservationorder.Discount = reservationorderDomainModel.Discount;
                }
                if (reservationorderDomainModel.Taxes != null) {
                    reservationorder.Taxes = reservationorderDomainModel.Taxes;
                }
                if (reservationorderDomainModel.TotalPayable != null) {
                    reservationorder.TotalPayable = reservationorderDomainModel.TotalPayable;
                }
                if (reservationorderDomainModel.AdvancePaid != null) {
                    reservationorder.AdvancePaid = reservationorderDomainModel.AdvancePaid;
                }
                if (reservationorderDomainModel.AdvancePaymentDateTime != null) {
                    reservationorder.AdvancePaymentDateTime = reservationorderDomainModel.AdvancePaymentDateTime;
                }
                if (reservationorderDomainModel.BookingStaffUserId != null) {
                    reservationorder.BookingStaffUserId = reservationorderDomainModel.BookingStaffUserId;
                }
                if (reservationorderDomainModel.Penalties != null) {
                    reservationorder.Penalties = reservationorderDomainModel.Penalties;
                }
                await reservationorder.save();
    
                const dto = await ReservationOrderMapper.toDto(reservationorder);
                return dto;
            } catch (error) {
                Logger.instance().log(error.message);
                throw new ApiError(500, error.message);
            }
        };
    
        delete = async (id: string): Promise<boolean> => {
            try {
                const result = await ReservationOrder.destroy({ where: { id: id } });
                return result === 1;
            } catch (error) {
                Logger.instance().log(error.message);
                throw new ApiError(500, error.message);
            }
        };

}

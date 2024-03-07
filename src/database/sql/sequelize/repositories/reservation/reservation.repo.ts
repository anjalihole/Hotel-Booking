/* eslint-disable linebreak-style */
/* eslint-disable space-infix-ops */
/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable key-spacing */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
import { IReservationRepo } from '../../../../repository.interfaces/reservation/reservation.repo.interface';
import Reservation from '../../models/reservation/reservation.model';
import { Op } from 'sequelize';
import { ReservationDomainModel } from '../../../../../domain.types/reservation/reservation.domain.model';
import { ReservationMapper } from '../../mappers/reservation/reservation.mapper';
import { Logger } from '../../../../../common/logger';
import { ApiError } from '../../../../../common/api.error';
import { ReservationDto } from '../../../../../domain.types/reservation/reservation.dto';
import { ReservationSearchFilters, ReservationSearchResults } from '../../../../../domain.types/reservation/reservation.search.types';

///////////////////////////////////////////////////////////////////////

export class ReservationRepo implements IReservationRepo {

    create = async (reservationDomainModel: ReservationDomainModel): Promise<ReservationDto> => {
        try {
            const entity = {
                CustomerId  : reservationDomainModel.CustomerId,
                RoomId   : reservationDomainModel.RoomId,
                CheckInDate : reservationDomainModel.CheckInDate,
                CheckOutDate        : reservationDomainModel.CheckOutDate,
                TotalCost       : reservationDomainModel.TotalCost,
                Status     : reservationDomainModel.Status ?? null,
            };
            const reservation = await Reservation.create(entity);
            const dto = await ReservationMapper.toDto(reservation);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getById = async (id: string): Promise<ReservationDto> => {
        try {
            const reservation = await Reservation.findByPk(id);
            const dto = await ReservationMapper.toDto(reservation);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getAllReservation = async (): Promise<ReservationDto[]> => {
        try {
            const records = await Reservation.findAll();
            const dtos = records.map((record) => this.toDto(record));
            return dtos;
            // const dto = await CustomerMapper.toDto(records);
            // return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    toDto = (reservation): ReservationDto => {
        if (reservation == null) {
            return null;
        }
        const dto: ReservationDto = {
            id: reservation.ReservationId,
             CustomerId: reservation. CustomerId,
            RoomId: reservation.RoomId,
            CheckInDate: reservation.CheckInDate,
            CheckOutDate: reservation.CheckOutDate,
            TotalCost: reservation.TotalCost,
            Status: reservation.Status,

        };
        return dto;
    };

    search = async (filters: ReservationSearchFilters): Promise<ReservationSearchResults> => {
        try {

            const search = { where: {} };

            if (filters.CustomerId!= null) {
                search.where['CustomerId'] = filters.CustomerId;
            }
            if (filters.RoomId != null) {
                search.where['RoomId'] = { [Op.like]: '%' + filters.RoomId + '%' };
            }
            if (filters.CheckInDate!= null) {
                search.where['CheckInDate'] = filters.CheckInDate;
            }
            if (filters.CheckOutDate != null) {
                search.where['CheckOutDate'] = filters.CheckOutDate;
            }
            if (filters.TotalCost != null) {
                search.where['TotalCost'] = filters.TotalCost;
            }

            if (filters.Status != null) {
                search.where['Status'] = filters.Status;
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
            const foundResults = await Reservation.findAndCountAll(search);
            let offset = 0;
            let pageIndex = 0;
            if (filters.PageIndex) {
                pageIndex = filters.PageIndex < 0 ? 0 : filters.PageIndex;
                offset = pageIndex * limit;
            }
            search['limit'] = limit;
            search['offset'] = offset;

            const dtos: ReservationDto[] = [];
            for (const room of foundResults.rows) {
                const dto = await ReservationMapper.toDto(room);
                dtos.push(dto);
            }
            const count = foundResults.count;
            const totalCount = typeof count === "number" ? count : count[0];

            const searchResults: ReservationSearchResults = {
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

update = async (id: string, reservationDomainModel: ReservationDomainModel): Promise<ReservationDto> => {
            try {
                const reservation = await Reservation.findByPk(id);
    
                //Client code is not modifiable
                //Use renew key to update ApiKey, ValidFrom and ValidTill
    
                if (reservationDomainModel.CustomerId != null) {
                    reservation.CustomerId = reservationDomainModel.CustomerId;
                }

                if (reservationDomainModel.RoomId != null) {
                    reservation.RoomId = reservationDomainModel.RoomId;
                }
                if (reservationDomainModel.CheckInDate != null) {
                    reservation.CheckInDate = reservationDomainModel.CheckInDate;
                }

                if (reservationDomainModel.CheckOutDate != null) {
                    reservation.CheckOutDate = reservationDomainModel.CheckOutDate;
                }

                if (reservationDomainModel.TotalCost != null) {
                    reservation.TotalCost = reservationDomainModel.TotalCost;
                }

                if (reservationDomainModel.Status != null) {
                    reservation.Status = reservationDomainModel.Status;
                }
                
                await reservation.save();
    
                const dto = await ReservationMapper.toDto(reservation);
                return dto;
            } catch (error) {
                Logger.instance().log(error.message);
                throw new ApiError(500, error.message);
            }
        };
    
        delete = async (id: string): Promise<boolean> => {
            try {
                const result = await Reservation.destroy({ where: { id: id } });
                return result === 1;
            } catch (error) {
                Logger.instance().log(error.message);
                throw new ApiError(500, error.message);
            }
        };

}

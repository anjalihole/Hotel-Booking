/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable lines-between-class-members */
/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
import { inject, injectable } from 'tsyringe';
//import { ApiError } from '../../common/api.error';
import { ReservationOrderDomainModel } from '../../domain.types/reservation.order/reservation.order.domain.model';
import { ReservationOrderDto } from '../../domain.types/reservation.order/reservation.order.dto';
import { IReservationOrderRepo } from '../../database/repository.interfaces/reservation.order/reservation.order.repo.interface';
// import { generate } from 'generate-password';
// import { Helper } from '../../common/helper';
// import { CurrentClient } from '../../domain.types/miscellaneous/current.client';
//import * as apikeyGenerator from 'uuid-apikey';
import { ReservationOrderSearchFilters,ReservationOrderSearchResults} from '../../domain.types/reservation.order/reservation.order.search.types';

////////////////////////////////////////////////////////////////////////////////////////////////////////

@injectable()
export class ReservationOrderService {
    constructor(@inject('IReservationOrderRepo') private _reservationorderRepo: IReservationOrderRepo) {}

    create = async (reservationorderDomainModel: ReservationOrderDomainModel): Promise<ReservationOrderDto> => {
        
        return await this._reservationorderRepo.create(reservationorderDomainModel);
    };

    getById = async (id: string): Promise<ReservationOrderDto> => {
        return await this._reservationorderRepo.getById(id);
    };

    getAllReservationOrder = async (): Promise<ReservationOrderDto[]> => {
        return await this._reservationorderRepo.getAllReservationOrder();
    };

    update = async (id: string, reservationorderDomainModel: ReservationOrderDomainModel): Promise<ReservationOrderDto> => {
        return await this._reservationorderRepo.update(id, reservationorderDomainModel);
    };

    public search = async (filters: ReservationOrderSearchFilters): Promise<ReservationOrderSearchResults> => {
        return await this._reservationorderRepo.search(filters);
    };

    delete = async (id: string): Promise<boolean> => {
        return await this._reservationorderRepo.delete(id);
    };
}

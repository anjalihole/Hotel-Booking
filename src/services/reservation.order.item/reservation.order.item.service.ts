/* eslint-disable linebreak-style */
/* eslint-disable max-len */
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
import { ReservationOrderItemDomainModel } from '../../domain.types/reservation.order.item/reservation.order.item.domain.model';
import { ReservationOrderItemDto } from '../../domain.types/reservation.order.item/reservation.order.item.dto';
import { IReservationOrderItemRepo } from '../../database/repository.interfaces/reservation.order.item/reservation.order.item.repo.interface';
// import { generate } from 'generate-password';
// import { Helper } from '../../common/helper';
// import { CurrentClient } from '../../domain.types/miscellaneous/current.client';
//import * as apikeyGenerator from 'uuid-apikey';
import { ReservationOrderItemSearchFilters,ReservationOrderItemSearchResults} from '../../domain.types/reservation.order.item/reservation.order.item.search.types';

////////////////////////////////////////////////////////////////////////////////////////////////////////

@injectable()
export class ReservationOrderItemService {
    constructor(@inject('IReservationOrderItemRepo') private _reservationorderitemRepo: IReservationOrderItemRepo) {}

    create = async (reservationorderitemDomainModel: ReservationOrderItemDomainModel): Promise<ReservationOrderItemDto> => {
        
        return await this._reservationorderitemRepo.create(reservationorderitemDomainModel);
    };

    getById = async (id: string): Promise<ReservationOrderItemDto> => {
        return await this._reservationorderitemRepo.getById(id);
    };

    update = async (id: string, reservationorderitemDomainModel: ReservationOrderItemDomainModel): Promise<ReservationOrderItemDto> => {
        return await this._reservationorderitemRepo.update(id, reservationorderitemDomainModel);
    };

    public search = async (filters: ReservationOrderItemSearchFilters): Promise<ReservationOrderItemSearchResults> => {
        return await this._reservationorderitemRepo.search(filters);
    };

    delete = async (id: string): Promise<boolean> => {
        return await this._reservationorderitemRepo.delete(id);
    };
}

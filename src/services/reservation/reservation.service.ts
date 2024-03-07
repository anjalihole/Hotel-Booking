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
import { ReservationDomainModel } from '../../domain.types/reservation/reservation.domain.model';
import { ReservationDto } from '../../domain.types/reservation/reservation.dto';
import { IReservationRepo } from '../../database/repository.interfaces/reservation/reservation.repo.interface';
// import { generate } from 'generate-password';
// import { Helper } from '../../common/helper';
// import { CurrentClient } from '../../domain.types/miscellaneous/current.client';
//import * as apikeyGenerator from 'uuid-apikey';
import { ReservationSearchFilters,ReservationSearchResults} from '../../domain.types/reservation/reservation.search.types';

////////////////////////////////////////////////////////////////////////////////////////////////////////

@injectable()
export class ReservationService {
    constructor(@inject('IReservationRepo') private _reservationRepo: IReservationRepo) {}

    create = async (reservationDomainModel: ReservationDomainModel): Promise<ReservationDto> => {
        
        return await this._reservationRepo.create(reservationDomainModel);
    };

    getById = async (id: string): Promise<ReservationDto> => {
        return await this._reservationRepo.getById(id);
    };

    getAllReservation = async (): Promise<ReservationDto[]> => {
        return await this._reservationRepo.getAllReservation();
    };

    update = async (id: string, reservationDomainModel: ReservationDomainModel): Promise<ReservationDto> => {
        return await this._reservationRepo.update(id, reservationDomainModel);
    };

    public search = async (filters: ReservationSearchFilters): Promise<ReservationSearchResults> => {
        return await this._reservationRepo.search(filters);
    };

    delete = async (id: string): Promise<boolean> => {
        return await this._reservationRepo.delete(id);
    };
}

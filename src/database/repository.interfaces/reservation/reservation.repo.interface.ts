/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
// import { ReservationSearchFilters, ReservationSearchResults } from '../../../domain.types/reservation/reservation.search.types';
import { ReservationDomainModel } from '../../../domain.types/reservation/reservation.domain.model';
import { ReservationDto } from '../../../domain.types/reservation/reservation.dto';
//import { CurrentClient } from '../../../domain.types/miscellaneous/current.client';

////////////////////////////////////////////////////////////////////////////////////////////////

export interface IReservationRepo {
    create(reservationDomainModel: ReservationDomainModel): Promise<ReservationDto>;

         //getById(id: string): Promise<ReservationDto>;

        //  getAllReservation(): Promise<ReservationDto[]>;

        //  update(id: string, ReservationDomainModel: ReservationDomainModel): Promise<ReservationDto>;

        //  search(filters: ReservationSearchFilters): Promise<ReservationSearchResults>;

        //  delete(id: string): Promise<boolean>;
}

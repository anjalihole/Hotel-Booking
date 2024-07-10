/* eslint-disable linebreak-style */
import { ReservationOrderSearchFilters, ReservationOrderSearchResults } from '../../../domain.types/reservation.order/reservation.order.search.types';
import { ReservationOrderDomainModel } from '../../../domain.types/reservation.order/reservation.order.domain.model';
import { ReservationOrderDto } from '../../../domain.types/reservation.order/reservation.order.dto';
//import { CurrentClient } from '../../../domain.types/miscellaneous/current.client';

////////////////////////////////////////////////////////////////////////////////////////////////

export interface IReservationOrderRepo {
    
        create(reservationorderDomainModel: ReservationOrderDomainModel): Promise<ReservationOrderDto>;

        getById(id: string): Promise<ReservationOrderDto>;

        update(id: string, ReservationOrderDomainModel: ReservationOrderDomainModel): Promise<ReservationOrderDto>;

        search(filters: ReservationOrderSearchFilters): Promise<ReservationOrderSearchResults>;
        
        delete(id: string): Promise<boolean>;
}


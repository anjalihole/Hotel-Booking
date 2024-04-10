/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
import { ReservationOrderItemSearchFilters, ReservationOrderItemSearchResults } from '../../../domain.types/reservation.order.item/reservation.order.item.search.types';
import { ReservationOrderItemDomainModel } from '../../../domain.types/reservation.order.item/reservation.order.item.domain.model';
import { ReservationOrderItemDto } from '../../../domain.types/reservation.order.item/reservation.order.item.dto';
//import { CurrentClient } from '../../../domain.types/miscellaneous/current.client';

////////////////////////////////////////////////////////////////////////////////////////////////

export interface IReservationOrderItemRepo {
    
        create(reservationorderitemDomainModel: ReservationOrderItemDomainModel): Promise<ReservationOrderItemDto>;

        getById(id: string): Promise<ReservationOrderItemDto>;

        getAllReservationOrderItem(): Promise<ReservationOrderItemDto[]>;

        update(id: string, ReservationOrderItemDomainModel: ReservationOrderItemDomainModel): Promise<ReservationOrderItemDto>;

        search(filters: ReservationOrderItemSearchFilters): Promise<ReservationOrderItemSearchResults>;
        
        delete(id: string): Promise<boolean>;
}


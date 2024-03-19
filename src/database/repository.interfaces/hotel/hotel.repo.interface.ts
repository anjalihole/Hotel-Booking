/* eslint-disable linebreak-style */
import { HotelSearchFilters, HotelSearchResults } from '../../../domain.types/Hotel/hotel.search.types';
import { HotelDomainModel } from '../../../domain.types/Hotel/hotel.domain.model';
import { HotelDto } from '../../../domain.types/Hotel/hotel.dto';
//import { CurrentClient } from '../../../domain.types/miscellaneous/current.client';

////////////////////////////////////////////////////////////////////////////////////////////////

export interface IHotelRepo {
    create(hotelDomainModel: HotelDomainModel): Promise<HotelDto>;

        getById(id: string): Promise<HotelDto>;
        getAllHotel(): Promise<HotelDto[]>;
        update(id: string, HotelDomainModel: HotelDomainModel): Promise<HotelDto>;
        search(filters: HotelSearchFilters): Promise<HotelSearchResults>;
        delete(id: string): Promise<boolean>;
}


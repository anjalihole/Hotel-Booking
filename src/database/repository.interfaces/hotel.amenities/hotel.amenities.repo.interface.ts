/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
import { HotelAmenitiesSearchFilters, HotelAmenitiesSearchResults } from '../../../domain.types/hotel.amenities/hotel.amenities.search.types';
import { HotelAmenitiesDomainModel } from '../../../domain.types/hotel.amenities/hotel.amenities.domain.model';
import { HotelAmenitiesDto } from '../../../domain.types/hotel.amenities/hotel.amenities.dto';
//import { CurrentClient } from '../../../domain.types/miscellaneous/current.client';

////////////////////////////////////////////////////////////////////////////////////////////////

export interface IHotelAmenitiesRepo {
    
        create(hotelamenitiesDomainModel: HotelAmenitiesDomainModel): Promise<HotelAmenitiesDto>;

        getById(id: string): Promise<HotelAmenitiesDto>;

        getAllHotelAmenities(): Promise<HotelAmenitiesDto[]>;

        update(id: string, HotelAmenitiesDomainModel: HotelAmenitiesDomainModel): Promise<HotelAmenitiesDto>;

        search(filters: HotelAmenitiesSearchFilters): Promise<HotelAmenitiesSearchResults>;
        
        delete(id: string): Promise<boolean>;
}


/* eslint-disable linebreak-style */
import { HotelPhotosSearchFilters, HotelPhotosSearchResults } from '../../../domain.types/hotel.photos/hotel.photos.search.types';
import { HotelPhotosDomainModel } from '../../../domain.types/hotel.photos/hotel.photos.domain.model';
import { HotelPhotosDto } from '../../../domain.types/hotel.photos/hotel.photos.dto';
//import { CurrentClient } from '../../../domain.types/miscellaneous/current.client';

////////////////////////////////////////////////////////////////////////////////////////////////

export interface IHotelPhotosRepo {
    
        create(hotelphotosDomainModel: HotelPhotosDomainModel): Promise<HotelPhotosDto>;

        getById(id: string): Promise<HotelPhotosDto>;

        getAllHotelPhotos(): Promise<HotelPhotosDto[]>;

        update(id: string, HotelPhotosDomainModel: HotelPhotosDomainModel): Promise<HotelPhotosDto>;

        search(filters: HotelPhotosSearchFilters): Promise<HotelPhotosSearchResults>;
        
        delete(id: string): Promise<boolean>;
}


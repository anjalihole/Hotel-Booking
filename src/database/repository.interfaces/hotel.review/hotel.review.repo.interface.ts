/* eslint-disable linebreak-style */
import { HotelReviewSearchFilters, HotelReviewSearchResults } from '../../../domain.types/hotel.review/hotel.review.search.types';
import { HotelReviewDomainModel } from '../../../domain.types/hotel.review/hotel.review.domain.model';
import { HotelReviewDto } from '../../../domain.types/hotel.review/hotel.review.dto';
//import { CurrentClient } from '../../../domain.types/miscellaneous/current.client';

////////////////////////////////////////////////////////////////////////////////////////////////

export interface IHotelReviewRepo {
    
        create(hotelreviewDomainModel: HotelReviewDomainModel): Promise<HotelReviewDto>;

        getById(id: string): Promise<HotelReviewDto>;

        getAllHotelReview(): Promise<HotelReviewDto[]>;

        update(id: string, HotelReviewDomainModel: HotelReviewDomainModel): Promise<HotelReviewDto>;

        search(filters: HotelReviewSearchFilters): Promise<HotelReviewSearchResults>;
        
        delete(id: string): Promise<boolean>;
}


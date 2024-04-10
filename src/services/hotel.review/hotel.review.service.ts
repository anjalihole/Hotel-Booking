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
import { HotelReviewDomainModel } from '../../domain.types/hotel.review/hotel.review.domain.model';
import { HotelReviewDto } from '../../domain.types/hotel.review/hotel.review.dto';
import { IHotelReviewRepo } from '../../database/repository.interfaces/hotel.review/hotel.review.repo.interface';
// import { generate } from 'generate-password';
// import { Helper } from '../../common/helper';
// import { CurrentClient } from '../../domain.types/miscellaneous/current.client';
//import * as apikeyGenerator from 'uuid-apikey';
import { HotelReviewSearchFilters,HotelReviewSearchResults} from '../../domain.types/hotel.review/hotel.review.search.types';

////////////////////////////////////////////////////////////////////////////////////////////////////////

@injectable()
export class HotelReviewService {
    constructor(@inject('IHotelReviewRepo') private _hotelreviewRepo: IHotelReviewRepo) {}

    create = async (hotelreviewDomainModel: HotelReviewDomainModel): Promise<HotelReviewDto> => {
        
        return await this._hotelreviewRepo.create(hotelreviewDomainModel);
    };

    getById = async (id: string): Promise<HotelReviewDto> => {
        return await this._hotelreviewRepo.getById(id);
    };

    getAllHotelReview = async (): Promise<HotelReviewDto[]> => {
        return await this._hotelreviewRepo.getAllHotelReview();
    };

    update = async (id: string, hotelreviewDomainModel: HotelReviewDomainModel): Promise<HotelReviewDto> => {
        return await this._hotelreviewRepo.update(id, hotelreviewDomainModel);
    };

    public search = async (filters: HotelReviewSearchFilters): Promise<HotelReviewSearchResults> => {
        return await this._hotelreviewRepo.search(filters);
    };

    delete = async (id: string): Promise<boolean> => {
        return await this._hotelreviewRepo.delete(id);
    };
}

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
import { HotelAmenitiesDomainModel } from '../../domain.types/hotel.amenities/hotel.amenities.domain.model';
import { HotelAmenitiesDto } from '../../domain.types/hotel.amenities/hotel.amenities.dto';
import { IHotelAmenitiesRepo } from '../../database/repository.interfaces/hotel.amenities/hotel.amenities.repo.interface';
// import { generate } from 'generate-password';
// import { Helper } from '../../common/helper';
// import { CurrentClient } from '../../domain.types/miscellaneous/current.client';
//import * as apikeyGenerator from 'uuid-apikey';
import { HotelAmenitiesSearchFilters, HotelAmenitiesSearchResults } from '../../domain.types/hotel.amenities/hotel.amenities.search.types';

////////////////////////////////////////////////////////////////////////////////////////////////////////

@injectable()
export class HotelAmenitiesService {
    constructor(@inject('IHotelAmenitiesRepo') private _hotelamenitiesRepo: IHotelAmenitiesRepo) {}

    create = async (hotelamenitiesDomainModel: HotelAmenitiesDomainModel): Promise<HotelAmenitiesDto> => {
        
        return await this._hotelamenitiesRepo.create(hotelamenitiesDomainModel);
    };

    getById = async (id: string): Promise<HotelAmenitiesDto> => {
        return await this._hotelamenitiesRepo.getById(id);
    };

    update = async (id: string, hotelamenitiesDomainModel: HotelAmenitiesDomainModel): Promise<HotelAmenitiesDto> => {
        return await this._hotelamenitiesRepo.update(id, hotelamenitiesDomainModel);
    };

    public search = async (filters: HotelAmenitiesSearchFilters): Promise<HotelAmenitiesSearchResults> => {
        return await this._hotelamenitiesRepo.search(filters);
    };

    delete = async (id: string): Promise<boolean> => {
        return await this._hotelamenitiesRepo.delete(id);
    };
}

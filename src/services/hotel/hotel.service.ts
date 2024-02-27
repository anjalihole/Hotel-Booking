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
import { HotelDomainModel } from '../../domain.types/hotel/hotel.domain.model';
import { HotelDto } from '../../domain.types/hotel/hotel.dto';
import { IHotelRepo } from '../../database/repository.interfaces/hotel/hotel.repo.interface';
// import { generate } from 'generate-password';
// import { Helper } from '../../common/helper';
// import { CurrentClient } from '../../domain.types/miscellaneous/current.client';
//import * as apikeyGenerator from 'uuid-apikey';
//import { HotelSearchFilters,HotelSearchResults} from '../../domain.types/hotel/hotel.search.types';

////////////////////////////////////////////////////////////////////////////////////////////////////////

@injectable()
export class HotelService {
    constructor(@inject('IHotelRepo') private _hotelRepo: IHotelRepo) {}

    create = async (hotelDomainModel: HotelDomainModel): Promise<HotelDto> => {
        
        return await this._hotelRepo.create(hotelDomainModel);
    };

    getById = async (id: string): Promise<HotelDto> => {
        return await this._hotelRepo.getById(id);
    };

    getAllHotel = async (): Promise<HotelDto[]> => {
        return await this._hotelRepo.getAllHotel();
    };

    // update = async (id: string, customerDomainModel: CustomerDomainModel): Promise<CustomerDto> => {
    //     return await this._customerRepo.update(id, customerDomainModel);
    // };

    // public search = async (filters: CustomerSearchFilters): Promise<CustomerSearchResults> => {
    //     return await this._customerRepo.search(filters);
    // };

    // delete = async (id: string): Promise<boolean> => {
    //     return await this._customerRepo.delete(id);
    // };
}

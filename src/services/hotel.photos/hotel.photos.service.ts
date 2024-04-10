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
import { HotelPhotosDomainModel } from '../../domain.types/hotel.photos/hotel.photos.domain.model';
import { HotelPhotosDto } from '../../domain.types/hotel.photos/hotel.photos.dto';
import { IHotelPhotosRepo } from '../../database/repository.interfaces/hotel.photos/hotel.photos.repo.interface';
// import { generate } from 'generate-password';
// import { Helper } from '../../common/helper';
// import { CurrentClient } from '../../domain.types/miscellaneous/current.client';
//import * as apikeyGenerator from 'uuid-apikey';
import { HotelPhotosSearchFilters,HotelPhotosSearchResults} from '../../domain.types/hotel.photos/hotel.photos.search.types';

////////////////////////////////////////////////////////////////////////////////////////////////////////

@injectable()
export class HotelPhotosService {
    constructor(@inject('IHotelPhotosRepo') private _hotelphotosRepo: IHotelPhotosRepo) {}

    create = async (hotelphotosDomainModel: HotelPhotosDomainModel): Promise<HotelPhotosDto> => {
        
        return await this._hotelphotosRepo.create(hotelphotosDomainModel);
    };

    getById = async (id: string): Promise<HotelPhotosDto> => {
        return await this._hotelphotosRepo.getById(id);
    };

    getAllHotelPhotos = async (): Promise<HotelPhotosDto[]> => {
        return await this._hotelphotosRepo.getAllHotelPhotos();
    };

    update = async (id: string, hotelphotosDomainModel: HotelPhotosDomainModel): Promise<HotelPhotosDto> => {
        return await this._hotelphotosRepo.update(id, hotelphotosDomainModel);
    };

    public search = async (filters: HotelPhotosSearchFilters): Promise<HotelPhotosSearchResults> => {
        return await this._hotelphotosRepo.search(filters);
    };

    delete = async (id: string): Promise<boolean> => {
        return await this._hotelphotosRepo.delete(id);
    };
}

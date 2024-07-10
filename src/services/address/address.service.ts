/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
// /* eslint-disable linebreak-style */
// /* eslint-disable object-curly-spacing */
// /* eslint-disable linebreak-style */
// /* eslint-disable indent */
// /* eslint-disable lines-between-class-members */
// /* eslint-disable linebreak-style */
// /* eslint-disable padded-blocks */
// /* eslint-disable linebreak-style */
import { inject, injectable } from 'tsyringe';
//import { ApiError } from '../../common/api.error';
import { AddressDomainModel } from '../../domain.types/address/address.domain.model';
import { AddressDto } from '../../domain.types/address/address.dto';
import { IAddressRepo } from '../../database/repository.interfaces/address/address.repo.interface';
// import { generate } from 'generate-password';
// import { Helper } from '../../common/helper';
// import { CurrentClient } from '../../domain.types/miscellaneous/current.client';
//import * as apikeyGenerator from 'uuid-apikey';
import { AddressSearchFilters,AddressSearchResults } from '../../domain.types/address/address.search.types';

////////////////////////////////////////////////////////////////////////////////////////////////////////

@injectable()
export class AddressService {
    constructor(@inject('IAddressRepo') private _addressRepo: IAddressRepo) {}

    create = async (addressDomainModel: AddressDomainModel): Promise<AddressDto> => {
        
        return await this._addressRepo.create(addressDomainModel);
    };

    getById = async (id: string): Promise<AddressDto> => {
        return await this._addressRepo.getById(id);
    };

    update = async (id: string, AddressDomainModel: AddressDomainModel): Promise<AddressDto> => {
        return await this._addressRepo.update(id, AddressDomainModel);
    };

    public search = async (filters: AddressSearchFilters): Promise<AddressSearchResults> => {
        return await this._addressRepo.search(filters);
    };

    delete = async (id: string): Promise<boolean> => {
        return await this._addressRepo.delete(id);
    };
}

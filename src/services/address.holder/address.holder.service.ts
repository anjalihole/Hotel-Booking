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
import { AddressHolderDomainModel } from '../../domain.types/address.holder/address.holder.domain.model';
import { AddressHolderDto } from '../../domain.types/address.holder/address.holder.dto';
import { IAddressHolderRepo } from '../../database/repository.interfaces/address.holder/address.holder.repo.interface';
// import { generate } from 'generate-password';
// import { Helper } from '../../common/helper';
// import { CurrentClient } from '../../domain.types/miscellaneous/current.client';
//import * as apikeyGenerator from 'uuid-apikey';
import { AddressHolderSearchFilters,AddressHolderSearchResults } from '../../domain.types/address.holder/address.holder.search.types';

////////////////////////////////////////////////////////////////////////////////////////////////////////

@injectable()
export class AddressHolderService {
    constructor(@inject('IAddressHolderRepo') private _addressholderRepo: IAddressHolderRepo) {}

    create = async (addressholderDomainModel: AddressHolderDomainModel): Promise<AddressHolderDto> => {
        
        return await this._addressholderRepo.create(addressholderDomainModel);
    };

    getById = async (id: string): Promise<AddressHolderDto> => {
        return await this._addressholderRepo.getById(id);
    };

    getAllAddressHolder = async (): Promise<AddressHolderDto[]> => {
        return await this._addressholderRepo.getAllAddressHolder();
    };

    update = async (id: string, AddressHolderDomainModel: AddressHolderDomainModel): Promise<AddressHolderDto> => {
        return await this._addressholderRepo.update(id, AddressHolderDomainModel);
    };

    public search = async (filters: AddressHolderSearchFilters): Promise<AddressHolderSearchResults> => {
        return await this._addressholderRepo.search(filters);
    };

    delete = async (id: string): Promise<boolean> => {
        return await this._addressholderRepo.delete(id);
    };
}

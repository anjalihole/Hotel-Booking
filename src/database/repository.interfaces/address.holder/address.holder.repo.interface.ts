/* eslint-disable linebreak-style */
// /* eslint-disable linebreak-style */
import { AddressHolderSearchFilters, AddressHolderSearchResults } from '../../../domain.types/address.holder/address.holder.search.types';
import { AddressHolderDomainModel } from '/../src/domain.types/address.holder/address.holder.domain.model';
import { AddressHolderDto } from '../../../domain.types/address.holder/address.holder.dto';
//import { CurrentClient } from '../../../domain.types/miscellaneous/current.client';

////////////////////////////////////////////////////////////////////////////////////////////////

export interface IAddressHolderRepo {
         create(addressholderDomainModel: AddressHolderDomainModel): Promise<AddressHolderDto>;

         getById(id: string): Promise<AddressHolderDto>;

         update(id: string, AddressHolderDomainModel: AddressHolderDomainModel): Promise<AddressHolderDto>;

         search(filters: AddressHolderSearchFilters): Promise<AddressHolderSearchResults>;
         
         delete(id: string): Promise<boolean>;
 }

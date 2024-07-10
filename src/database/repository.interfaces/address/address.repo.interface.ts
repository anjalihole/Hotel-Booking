/* eslint-disable linebreak-style */
// /* eslint-disable linebreak-style */
import { AddressSearchFilters, AddressSearchResults } from '../../../domain.types/address/address.search.types';
import { AddressDomainModel } from '/../src/domain.types/address/address.domain.model';
import { AddressDto } from '../../../domain.types/address/address.dto';
//import { CurrentClient } from '../../../domain.types/miscellaneous/current.client';

////////////////////////////////////////////////////////////////////////////////////////////////

export interface IAddressRepo {
         create(addressDomainModel: AddressDomainModel): Promise<AddressDto>;

         getById(id: string): Promise<AddressDto>;

         update(id: string, AddressDomainModel: AddressDomainModel): Promise<AddressDto>;

         search(filters: AddressSearchFilters): Promise<AddressSearchResults>;
         
         delete(id: string): Promise<boolean>;
 }

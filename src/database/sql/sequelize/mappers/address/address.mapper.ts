/* eslint-disable linebreak-style */
/* eslint-disable key-spacing */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
// /* eslint-disable linebreak-style */
// /* eslint-disable padded-blocks */
// /* eslint-disable key-spacing */
// /* eslint-disable linebreak-style */
import { AddressDto } from '/../src/domain.types/address/address.dto';
import Address from '../../models/address/address.model';

///////////////////////////////////////////////////////////////////////////////////

export class addressMapper {
    static toDto = (address: Address): AddressDto => {
        if (address == null) {
            return null;
        }
        const dto: AddressDto = {
            id: address.id,
            AddressLine1: address.AddressLine1,
            AddressLine2: address.AddressLine2,
            Street: address.Street,
            City: address.City,
            State:address.State,
            Country: address.Country,
            ZipCode: address.ZipCode,
        };
        return dto;
    };

    static toaddressDto = (address: Address): AddressDto => {
        if (address == null) {
            return null;
        }
        const dto: AddressDto = {
            id: address.id,
            AddressLine1: address.AddressLine1,
            AddressLine2: address.AddressLine2,
            Street: address.Street,
            City: address.City,
            State:address.State,
            Country: address.Country,
            ZipCode: address.ZipCode,
        };
        return dto;
    };
}

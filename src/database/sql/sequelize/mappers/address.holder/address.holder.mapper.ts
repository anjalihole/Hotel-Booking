/* eslint-disable linebreak-style */
/* eslint-disable key-spacing */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
// /* eslint-disable linebreak-style */
// /* eslint-disable padded-blocks */
// /* eslint-disable key-spacing */
// /* eslint-disable linebreak-style */
import { AddressHolderDto } from '/../src/domain.types/address.holder/address.holder.dto';
import AddressHolder from '../../models/address.holder/address.holder.model';

///////////////////////////////////////////////////////////////////////////////////

export class addressholderMapper {
    static toDto = (addressholder: AddressHolder): AddressHolderDto => {
        if (addressholder == null) {
            return null;
        }
        const dto: AddressHolderDto = {
            id: addressholder.id,
            AddressId: addressholder.AddressId,
            HolderId: addressholder.HolderId,
            HolderType: addressholder.HolderType,
            AddressType: addressholder.AddressType,
        };
        return dto;
    };

    static toaddressholderDto = (addressholder: AddressHolder): AddressHolderDto => {
        if (addressholder == null) {
            return null;
        }
        const dto: AddressHolderDto = {
            id: addressholder.id,
            AddressId: addressholder.AddressId,
            HolderId: addressholder.HolderId,
            HolderType: addressholder.HolderType,
            AddressType: addressholder.AddressType,
        };
        return dto;
    };
}

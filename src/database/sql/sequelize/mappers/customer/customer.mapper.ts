/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
import { CustomerDto } from '../../../../../domain.types/customer/customer.dto';
import Customer from '../../models/customer/customer.model';

///////////////////////////////////////////////////////////////////////////////////

export class CustomerMapper {
    static toDto = (customer: Customer): CustomerDto => {
        if (customer == null) {
            return null;
        }
        const dto: CustomerDto = {
            id: customer.id,
            UserId: customer.UserId,
            PAN: customer.PAN,
            Aadhar: customer.Aadhar,
            AddressId: customer.AddressId
        };
        return dto;
    };

    static toCustomerDto = (customer: Customer): CustomerDto => {
        if (customer == null) {
            return null;
        }
        const dto: CustomerDto = {
            id: customer.id,
            UserId: customer.UserId,
            PAN: customer.PAN,
            Aadhar: customer.Aadhar,
            AddressId: customer.AddressId,
        };
        return dto;
    };
}

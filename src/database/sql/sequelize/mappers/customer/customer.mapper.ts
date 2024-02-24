/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
import { CustomerDto } from '/../src/domain.types/customer/customer.dto';
import Customer from '../../models/customer/customer.model';

///////////////////////////////////////////////////////////////////////////////////

export class CustomerMapper {
    static toDto = (customer: Customer): CustomerDto => {
        if (customer == null) {
            return null;
        }
        const dto: CustomerDto = {
            id: customer.id,
            FirstName: customer.FirstName,
            LastName: customer.LastName,
            Phone: customer.Phone,
            Email: customer.Email,
            Address: customer.Address,
            Password: customer.Password,
        };
        return dto;
    };

    static toCustomerDto = (customer: Customer): CustomerDto => {
        if (customer == null) {
            return null;
        }
        const dto: CustomerDto = {
            id: customer.id,
            FirstName: customer.FirstName,
            LastName: customer.LastName,
            Phone: customer.Phone,
            Email: customer.Email,
            Address: customer.Address,
            Password: customer.Password,
        };
        return dto;
    };
}

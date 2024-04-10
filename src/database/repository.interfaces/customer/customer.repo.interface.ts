/* eslint-disable linebreak-style */
import { CustomerSearchFilters, CustomerSearchResults } from '../../../domain.types/customer/customer.search.types';
import { CustomerDomainModel } from '../../../domain.types/customer/customer.domain.model';
import { CustomerDto } from '../../../domain.types/customer/customer.dto';
//import { CurrentClient } from '../../../domain.types/miscellaneous/current.client';

////////////////////////////////////////////////////////////////////////////////////////////////

export interface ICustomerRepo {
    
        create(customerDomainModel: CustomerDomainModel): Promise<CustomerDto>;

        getById(id: string): Promise<CustomerDto>;

        getAllCustomer(): Promise<CustomerDto[]>;

        update(id: string, CustomerDomainModel: CustomerDomainModel): Promise<CustomerDto>;

        search(filters: CustomerSearchFilters): Promise<CustomerSearchResults>;
        
        delete(id: string): Promise<boolean>;
}


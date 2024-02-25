/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable lines-between-class-members */
/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
import { inject, injectable } from 'tsyringe';
//import { ApiError } from '../../common/api.error';
import { CustomerDomainModel } from '../../domain.types/customer/customer.domain.model';
import { CustomerDto } from '../../domain.types/customer/customer.dto';
import { ICustomerRepo } from '../../database/repository.interfaces/customer/customer.repo.interface';
// import { generate } from 'generate-password';
// import { Helper } from '../../common/helper';
// import { CurrentClient } from '../../domain.types/miscellaneous/current.client';
//import * as apikeyGenerator from 'uuid-apikey';
//import { CustomerSearchFilters} from '../../domain.types/customer/customer.search.types';
// { CustomerSearchFilters, CustomerSearchResults } from '../../domain.types/customer/customer.search.types';

////////////////////////////////////////////////////////////////////////////////////////////////////////

@injectable()
export class CustomerService {
    constructor(@inject('ICustomerRepo') private _customerRepo: ICustomerRepo) {}

    create = async (customerDomainModel: CustomerDomainModel): Promise<CustomerDto> => {
        
        return await this._customerRepo.create(customerDomainModel);
    };

    getById = async (id: string): Promise<CustomerDto> => {
        return await this._customerRepo.getById(id);
    };

    getAllCustomer = async (): Promise<CustomerDto[]> => {
        return await this._customerRepo.getAllCustomer();
    };

    update = async (id: string, customerDomainModel: CustomerDomainModel): Promise<CustomerDto> => {
        return await this._customerRepo.update(id, customerDomainModel);
    };

    // public search = async (filters: CustomerSearchFilters): Promise<CustomerSearchResults> => {
    //     return await this._customerRepo.search(filters);
    // };

    delete = async (id: string): Promise<boolean> => {
        return await this._customerRepo.delete(id);
    };
}

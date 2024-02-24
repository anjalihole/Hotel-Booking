/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable key-spacing */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
import { ICustomerRepo } from '../../../../repository.interfaces/customer/customer.repo.interface';
import Customer from '../../models/customer/customer.model';
//import { Op } from 'sequelize';
import { CustomerDomainModel } from '../../../../../domain.types/customer/customer.domain.model';
import { CustomerMapper } from '../../mappers/customer/customer.mapper';
import { Logger } from '../../../../../common/logger';
import { ApiError } from '../../../../../common/api.error';
import { CustomerDto } from '../../../../../domain.types/customer/customer.dto';
//import { CustomerSearchFilters, CustomerSearchResults } from '../../../../../domain.types/customer/customer.search.types';

///////////////////////////////////////////////////////////////////////

export class CustomerRepo implements ICustomerRepo {

    create = async (customerDomainModel: CustomerDomainModel): Promise<CustomerDto> => {
        try {
            const entity = {
                FirstName   : customerDomainModel.FirstName,
                LastName   : customerDomainModel.LastName,
                Address : customerDomainModel.Address,
                Phone        : customerDomainModel.Phone,
                Email        : customerDomainModel.Email,
                Password     : customerDomainModel.Password ?? null,
            };
            const customer = await Customer.create(entity);
            const dto = await CustomerMapper.toDto(customer);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getById = async (id: string): Promise<CustomerDto> => {
        try {
            const customer = await Customer.findByPk(id);
            const dto = await CustomerMapper.toDto(customer);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getAllCustomer = async (): Promise<CustomerDto[]> => {
        try {
            const records = await Customer.findAll();
            const dtos = records.map((record) => this.toDto(record));
            return dtos;
            // const dto = await CustomerMapper.toDto(records);
            // return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    toDto = (client): CustomerDto => {
        if (client == null) {
            return null;
        }
        const dto: CustomerDto = {
            id: client.CustomerId,
            FirstName: client.FirstName,
            LastName: client.LastName,
            Phone: client.Phone,
            Email: client.Email,
            Address: client.Address,
            Password: client.Password,
        };
        return dto;
    };

//     search = async (filters: CustomerSearchFilters): Promise<CustomerSearchResults> => {
//         try {

//             const search = { where: {} };

//             if (filters.Customer != null) {
//                 search.where['Customer'] = filters.Customer;
//             }
//             if (filters.FirstName != null) {
//                 search.where['FirstName'] = filters.FirstName;
//             }
//             if (filters.Phone != null) {
//                 search.where['Phone'] = { [Op.like]: '%' + filters.Phone + '%' };
//             }
//             if (filters.Email != null) {
//                 search.where['Email'] = filters.Email;
//             }
//             if (filters.LastName != null) {
//                 search.where['LastName'] = filters.LastName;
//             }
//             if (filters.Address != null) {
//                 search.where['Address'] = filters.Address;
//             }

//             const orderByColum = 'CreatedAt';
//             let order = 'ASC';
//             if (filters.Order === 'descending') {
//                 order = 'DESC';
//             }
//             search['order'] = [[orderByColum, order]];

//             let limit = 25;
//             if (filters.ItemsPerPage) {
//                 limit = filters.ItemsPerPage;
//             }
//             let offset = 0;
//             let pageIndex = 0;
//             if (filters.PageIndex) {
//                 pageIndex = filters.PageIndex < 0 ? 0 : filters.PageIndex;
//                 offset = pageIndex * limit;
//             }
//             search['limit'] = limit;
//             search['offset'] = offset;

//             const foundResults = await Customer.findAndCountAll(search);

//             const dtos: CustomerDto[] = [];
//             for (const customer of foundResults.rows) {
//                 const dto = await CustomerMapper.toDto(customer);
//                 dtos.push(dto);
//             }

//             const count = foundResults.count;
//             const totalCount = typeof count === "number" ? count : count[0];

//             const searchResults: CustomerSearchResults = {
//                 TotalCount     : totalCount,
//                 RetrievedCount : dtos.length,
//                 PageIndex      : pageIndex,
//                 ItemsPerPage   : limit,
//                 Order          : order === 'DESC' ? 'descending' : 'ascending',
//                 OrderedBy      : orderByColum,
//                 Items          : dtos
//             };

//             return searchResults;

//         } catch (error) {
//             Logger.instance().log(error.message);
//             throw new ApiError(500, error.message);
//         }
//     };

update = async (id: string, customerDomainModel: CustomerDomainModel): Promise<CustomerDto> => {
            try {
                const customer = await Customer.findByPk(id);
    
                //Client code is not modifiable
                //Use renew key to update ApiKey, ValidFrom and ValidTill
    
                if (customerDomainModel.FirstName != null) {
                    customer.FirstName = customerDomainModel.FirstName;
                }

                if (customerDomainModel.FirstName != null) {
                    customer.LastName = customerDomainModel.LastName;
                }
                if (customerDomainModel.Password != null) {
                    customer.Password = customerDomainModel.Password;
                }
                if (customerDomainModel.Phone != null) {
                    customer.Phone = customerDomainModel.Phone;
                }
                if (customerDomainModel.Email != null) {
                    customer.Email = customerDomainModel.Email;
                }
                if (customerDomainModel.Address != null) {
                    customer.Address = customerDomainModel.Address;
                }
                await customer.save();
    
                const dto = await CustomerMapper.toDto(customer);
                return dto;
            } catch (error) {
                Logger.instance().log(error.message);
                throw new ApiError(500, error.message);
            }
        };
    
//         delete = async (id: string): Promise<boolean> => {
//             try {
//                 const result = await Customer.destroy({ where: { id: id } });
//                 return result === 1;
//             } catch (error) {
//                 Logger.instance().log(error.message);
//                 throw new ApiError(500, error.message);
//             }
//         };

}

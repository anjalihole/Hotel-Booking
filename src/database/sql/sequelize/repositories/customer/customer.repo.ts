/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable key-spacing */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
import { ICustomerRepo } from '../../../../repository.interfaces/customer/customer.repo.interface';
import Customer from '../../models/customer/customer.model';
import { Op } from 'sequelize';
import { CustomerDomainModel } from '../../../../../domain.types/customer/customer.domain.model';
import { CustomerMapper } from '../../mappers/customer/customer.mapper';
import { Logger } from '../../../../../common/logger';
import { ApiError } from '../../../../../common/api.error';
import { CustomerDto } from '../../../../../domain.types/customer/customer.dto';
import { CustomerSearchFilters, CustomerSearchResults } from '../../../../../domain.types/customer/customer.search.types';

///////////////////////////////////////////////////////////////////////

export class CustomerRepo implements ICustomerRepo {

    create = async (customerDomainModel: CustomerDomainModel): Promise<CustomerDto> => {
        try {
            const entity = {
                UserId   : customerDomainModel.UserId,
                AddressId: customerDomainModel.AddressId,
                PAN      : customerDomainModel.PAN,
                Aadhar   : customerDomainModel.Aadhar,
                
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

    search = async (filters: CustomerSearchFilters): Promise<CustomerSearchResults> => {
        try {

            const search = { where: {} };

            if (filters.id != null) {
                search.where['id'] = filters.id;
            }

            if (filters.UserId != null) {
                search.where['UserId'] = filters.UserId;
            }
            if (filters.AddressId != null) {
                search.where['AddressId'] = { [Op.like]: '%' + filters.AddressId + '%' };
            }
            if (filters.PAN != null) {
                search.where['PAN'] = filters.PAN;
            }
            
            if (filters.Aadhar != null) {
                search.where['Aadhar'] = filters.Aadhar;
            }

            const orderByColum = 'CreatedAt';
            let order = 'ASC';
            if (filters.Order === 'descending') {
                order = 'DESC';
            }
            search['order'] = [[orderByColum, order]];
            let limit = 25;
            if (filters.ItemsPerPage) {
                limit = filters.ItemsPerPage;
            }
            const foundResults = await Customer.findAndCountAll(search);
            let offset = 0;
            let pageIndex = 0;
            if (filters.PageIndex) {
                pageIndex = filters.PageIndex < 0 ? 0 : filters.PageIndex;
                offset = pageIndex * limit;
            }
            search['limit'] = limit;
            search['offset'] = offset;

            const dtos: CustomerDto[] = [];
            for (const customer of foundResults.rows) {
                const dto = await CustomerMapper.toDto(customer);
                dtos.push(dto);
            }

            const count = foundResults.count;
            const totalCount = typeof count === "number" ? count : count[0];

            const searchResults: CustomerSearchResults = {
                TotalCount     : totalCount,
                RetrievedCount : dtos.length,
                PageIndex      : pageIndex,
                ItemsPerPage   : limit,
                Order          : order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy      : orderByColum,
                Items          : dtos
            };

            return searchResults;

        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

update = async (id: string, customerDomainModel: CustomerDomainModel): Promise<CustomerDto> => {
            try {
                const customer = await Customer.findByPk(id);
                if (customerDomainModel.UserId ) {
                    customer.UserId = customerDomainModel.UserId;
                }
                if (customerDomainModel.PAN != null) {
                    customer.PAN = customerDomainModel.PAN;
                }
                if (customerDomainModel.Aadhar != null) {
                    customer.Aadhar = customerDomainModel.Aadhar;
                }
                if (customerDomainModel.AddressId != null) {
                    customer.AddressId = customerDomainModel.AddressId;
                }
                await customer.save();
    
                const dto = await CustomerMapper.toDto(customer);
                return dto;
            } catch (error) {
                Logger.instance().log(error.message);
                throw new ApiError(500, error.message);
            }
        };
    
        delete = async (id: string): Promise<boolean> => {
            try {
                const result = await Customer.destroy({ where: { id: id } });
                return result === 1;
            } catch (error) {
                Logger.instance().log(error.message);
                throw new ApiError(500, error.message);
            }
        };

}

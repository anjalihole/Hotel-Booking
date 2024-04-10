/* eslint-disable linebreak-style */
/* eslint-disable key-spacing */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
// /* eslint-disable linebreak-style */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable key-spacing */
// /* eslint-disable indent */
// /* eslint-disable linebreak-style */
import { IAddressRepo } from '../../../../repository.interfaces/address/address.repo.interface';
import Address from '../../models/address/address.model';
import { Op } from 'sequelize';
import { AddressDomainModel } from '../../../../../domain.types/address/address.domain.model';
import { addressMapper } from '../../mappers/address/address.mapper';
import { Logger } from '../../../../../common/logger';
import { ApiError } from '../../../../../common/api.error';
import { AddressDto } from '../../../../../domain.types/address/address.dto';
import { AddressSearchFilters, AddressSearchResults } from '../../../../../domain.types/address/address.search.types';

///////////////////////////////////////////////////////////////////////

export class AddressRepo implements IAddressRepo {

    create = async (addressDomainModel: AddressDomainModel): Promise<AddressDto> => {
        try {
            const entity = {
                AddressLine1 : addressDomainModel.AddressLine1,
                AddressLine2: addressDomainModel.AddressLine2,
                Street: addressDomainModel.Street,
                City: addressDomainModel.City,
                State: addressDomainModel.State,
                Country: addressDomainModel.Country,
                ZipCode: addressDomainModel.ZipCode,
            };
            const address = await Address.create(entity);
            const dto = await addressMapper.toDto(address);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getById = async (id: string): Promise<AddressDto> => {
        try {
            const address = await Address.findByPk(id);
            const dto = await addressMapper.toDto(address);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getAllAddress = async (): Promise<AddressDto[]> => {
        try {
            const records = await Address.findAll();
            const dtos = records.map((record) => this.toDto(record));
            return dtos;
            // const dto = await PaymentMapper.toDto(records);
            // return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    toDto = (address): AddressDto => {
        if (address == null) {
            return null;
        }
        const dto: AddressDto = {
            id: address.addressId,
            AddressLine1: address.AddressLine1,
            AddressLine2: address.AddressLine2,
            Street: address.Street,
            City: address.City,
            State: address.State,
            Country: address.Country,
            ZipCode: address.ZipCode,
        };
        return dto;
    };

    search = async (filters: AddressSearchFilters): Promise<AddressSearchResults> => {
        try {

            const search = { where: {} };

            if (filters.AddressLine1 != null) {
                search.where['AddressLine1'] = filters.AddressLine1;
            }
            if (filters.AddressLine2 != null) {
                search.where['AddressLine2'] = { [Op.like]: '%' + filters.AddressLine2 + '%' };
            }
            if (filters.Street != null) {
                search.where['Street'] = filters.Street;
            }
            if (filters.City != null) {
                search.where['City'] = filters.City;
            }
            if (filters.State != null) {
                search.where['State'] = filters.State;
            }

            if (filters.Country != null) {
                search.where['Country'] = filters.Country;
            }
            if (filters.ZipCode != null) {
                search.where['ZipCode'] = filters.ZipCode;
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
            const foundResults = await Address.findAndCountAll(search);
            let offset = 0;
            let pageIndex = 0;
            if (filters.PageIndex) {
                pageIndex = filters.PageIndex < 0 ? 0 : filters.PageIndex;
                offset = pageIndex * limit;
            }
            search['limit'] = limit;
            search['offset'] = offset;

            const dtos: AddressDto[] = [];
            for (const address of foundResults.rows) {
                const dto = await addressMapper.toDto(address);
                dtos.push(dto);
            }

            const count = foundResults.count;
            const totalCount = typeof count === "number" ? count : count[0];

            const searchResults: AddressSearchResults = {
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

update = async (id: string, addressDomainModel: AddressDomainModel): Promise<AddressDto> => {
            try {
                const address = await Address.findByPk(id);
    
                //Client code is not modifiable
                //Use renew key to update ApiKey, ValidFrom and ValidTill
    
                if (addressDomainModel.AddressLine1 != null) {
                    address.AddressLine1 = addressDomainModel.AddressLine1;
                }

                if (addressDomainModel.AddressLine2 != null) {
                    address.AddressLine2 = addressDomainModel.AddressLine2;
                }
                if (addressDomainModel.Street != null) {
                    address.Street = addressDomainModel.Street;
                }
                if (addressDomainModel.City != null) {
                    address.City = addressDomainModel.City;
                }
                if (addressDomainModel.State != null) {
                    address.State = addressDomainModel.State;
                }

                if (addressDomainModel.Country != null) {
                    address.Country = addressDomainModel.Country;
                }
                if (addressDomainModel.ZipCode != null) {
                    address.ZipCode = addressDomainModel.ZipCode;
                }
               
                await address.save();
    
                const dto = await addressMapper.toDto(address);
                return dto;
            } catch (error) {
                Logger.instance().log(error.message);
                throw new ApiError(500, error.message);
            }
        };
    
        delete = async (id: string): Promise<boolean> => {
            try {
                const result = await Address.destroy({ where: { id: id } });
                return result === 1;
            } catch (error) {
                Logger.instance().log(error.message);
                throw new ApiError(500, error.message);
            }
        };

 }

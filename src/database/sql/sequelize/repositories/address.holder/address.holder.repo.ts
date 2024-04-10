/* eslint-disable linebreak-style */
/* eslint-disable key-spacing */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
// /* eslint-disable linebreak-style */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable key-spacing */
// /* eslint-disable indent */
// /* eslint-disable linebreak-style */
import { IAddressHolderRepo } from '../../../../repository.interfaces/address.holder/address.holder.repo.interface';
import AddressHolder from '../../models/address.holder/address.holder.model';
import { Op } from 'sequelize';
import { AddressHolderDomainModel } from '../../../../../domain.types/address.holder/address.holder.domain.model';
import { addressholderMapper } from '../../mappers/address.holder/address.holder.mapper';
import { Logger } from '../../../../../common/logger';
import { ApiError } from '../../../../../common/api.error';
import { AddressHolderDto } from '../../../../../domain.types/address.holder/address.holder.dto';
import { AddressHolderSearchFilters, AddressHolderSearchResults } from '../../../../../domain.types/address.holder/address.holder.search.types';

///////////////////////////////////////////////////////////////////////

export class AddressHolderRepo implements IAddressHolderRepo {

    create = async (addressholderDomainModel: AddressHolderDomainModel): Promise<AddressHolderDto> => {
        try {
            const entity = {
                AddressId : addressholderDomainModel.AddressId,
                HolderId: addressholderDomainModel.HolderId,
                HolderType: addressholderDomainModel.HolderType,
                AddressType: addressholderDomainModel.AddressType,
                
            };
            const addressholder = await AddressHolder.create(entity);
            const dto = await addressholderMapper.toDto(addressholder);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getById = async (id: string): Promise<AddressHolderDto> => {
        try {
            const addressholder = await AddressHolder.findByPk(id);
            const dto = await addressholderMapper.toDto(addressholder);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getAllAddressHolder = async (): Promise<AddressHolderDto[]> => {
        try {
            const records = await AddressHolder.findAll();
            const dtos = records.map((record) => this.toDto(record));
            return dtos;
            // const dto = await AddressHolderMapper.toDto(records);
            // return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    toDto = (addressholder): AddressHolderDto => {
        if (addressholder == null) {
            return null;
        }
        const dto: AddressHolderDto = {
            id: addressholder.addressholderId,
            AddressId: addressholder.AddressId,
            HolderId: addressholder.HolderId,
            HolderType: addressholder.HolderType,
            AddressType: addressholder.AddressType,
            
        };
        return dto;
    };

    search = async (filters: AddressHolderSearchFilters): Promise<AddressHolderSearchResults> => {
        try {

            const search = { where: {} };

            if (filters.AddressId != null) {
                search.where['AddressId'] = filters.AddressId;
            }
            if (filters.HolderId != null) {
                search.where['HolderId'] = { [Op.like]: '%' + filters.HolderId + '%' };
            }
            if (filters.HolderType != null) {
                search.where['HolderType'] = filters.HolderType;
            }
            if (filters.AddressType != null) {
                search.where['AddressType'] = filters.AddressType;
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
            const foundResults = await AddressHolder.findAndCountAll(search);
            let offset = 0;
            let pageIndex = 0;
            if (filters.PageIndex) {
                pageIndex = filters.PageIndex < 0 ? 0 : filters.PageIndex;
                offset = pageIndex * limit;
            }
            search['limit'] = limit;
            search['offset'] = offset;

            const dtos: AddressHolderDto[] = [];
            for (const addressholder of foundResults.rows) {
                const dto = await addressholderMapper.toDto(addressholder);
                dtos.push(dto);
            }

            const count = foundResults.count;
            const totalCount = typeof count === "number" ? count : count[0];

            const searchResults: AddressHolderSearchResults = {
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

     update = async (id: string, addressholderDomainModel: AddressHolderDomainModel): Promise<AddressHolderDto> => {
        try {
            const addressholder = await AddressHolder.findByPk(id);

            //Client code is not modifiable
            //Use renew key to update ApiKey, ValidFrom and ValidTill

            if (addressholderDomainModel.AddressId != null) {
                addressholder.AddressId = addressholderDomainModel.AddressId;
            }

            if (addressholderDomainModel.HolderId != null) {
                addressholder.HolderId = addressholderDomainModel.HolderId;
            }
            if (addressholderDomainModel.HolderType != null) {
                addressholder.HolderType = addressholderDomainModel.HolderType;
            }
            if (addressholderDomainModel.AddressType != null) {
                addressholder.AddressType = addressholderDomainModel.AddressType;
            }
           
            await addressholder.save();

            const dto = await addressholderMapper.toDto(addressholder);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };
    
        delete = async (id: string): Promise<boolean> => {
            try {
                const result = await AddressHolder.destroy({ where: { id: id } });
                return result === 1;
            } catch (error) {
                Logger.instance().log(error.message);
                throw new ApiError(500, error.message);
            }
        };

 }

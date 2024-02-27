/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable key-spacing */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
import { IHotelRepo } from '../../../../repository.interfaces/hotel/hotel.repo.interface';
import Hotel from '../../models/hotel/hotel.model';
//import { Op } from 'sequelize';
import { HotelDomainModel } from '../../../../../domain.types/hotel/hotel.domain.model';
import { HotelMapper } from '../../mappers/hotel/hotel.mapper';
import { Logger } from '../../../../../common/logger';
import { ApiError } from '../../../../../common/api.error';
import { HotelDto } from '../../../../../domain.types/hotel/hotel.dto';
//import { HotelSearchFilters, HotelSearchResults } from '../../../../../domain.types/hotel/hotel.search.types';

///////////////////////////////////////////////////////////////////////

export class HotelRepo implements IHotelRepo {

    create = async (hotelDomainModel: HotelDomainModel): Promise<HotelDto> => {
        try {
            const entity = {
                HotelName   : hotelDomainModel.HotelName,
                Address : hotelDomainModel.Address,
                Phone        : hotelDomainModel.Phone,
                Email        : hotelDomainModel.Email,
            };
            const hotel = await Hotel.create(entity);
            const dto = await HotelMapper.toDto(hotel);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getById = async (id: string): Promise<HotelDto> => {
        try {
            const hotel = await Hotel.findByPk(id);
            const dto = await HotelMapper.toDto(hotel);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getAllHotel = async (): Promise<HotelDto[]> => {
        try {
            const records = await Hotel.findAll();
            const dtos = records.map((record) => this.toDto(record));
            return dtos;
            // const dto = await HotelMapper.toDto(records);
            // return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    toDto = (hotel): HotelDto => {
        if (hotel == null) {
            return null;
        }
        const dto: HotelDto = {
            id: hotel.CustomerId,
            HotelName: hotel.FirstName,
            Phone: hotel.Phone,
            Email: hotel.Email,
            Address: hotel.Address,
        };
        return dto;
    };

    // search = async (filters: CustomerSearchFilters): Promise<CustomerSearchResults> => {
    //     try {

    //         const search = { where: {} };

    //         if (filters.FirstName != null) {
    //             search.where['FirstName'] = filters.FirstName;
    //         }
    //         if (filters.Phone != null) {
    //             search.where['Phone'] = { [Op.like]: '%' + filters.Phone + '%' };
    //         }
    //         if (filters.Email != null) {
    //             search.where['Email'] = filters.Email;
    //         }
    //         if (filters.LastName != null) {
    //             search.where['LastName'] = filters.LastName;
    //         }
    //         if (filters.Address != null) {
    //             search.where['Address'] = filters.Address;
    //         }

    //         const orderByColum = 'CreatedAt';
    //         let order = 'ASC';
    //         if (filters.Order === 'descending') {
    //             order = 'DESC';
    //         }
    //         search['order'] = [[orderByColum, order]];
    //         let limit = 25;
    //         if (filters.ItemsPerPage) {
    //             limit = filters.ItemsPerPage;
    //         }
    //         const foundResults = await Customer.findAndCountAll(search);
    //         let offset = 0;
    //         let pageIndex = 0;
    //         if (filters.PageIndex) {
    //             pageIndex = filters.PageIndex < 0 ? 0 : filters.PageIndex;
    //             offset = pageIndex * limit;
    //         }
    //         search['limit'] = limit;
    //         search['offset'] = offset;

    //         const dtos: CustomerDto[] = [];
    //         for (const customer of foundResults.rows) {
    //             const dto = await CustomerMapper.toDto(customer);
    //             dtos.push(dto);
    //         }

    //         const count = foundResults.count;
    //         const totalCount = typeof count === "number" ? count : count[0];

    //         const searchResults: CustomerSearchResults = {
    //             TotalCount     : totalCount,
    //             RetrievedCount : dtos.length,
    //             PageIndex      : pageIndex,
    //             ItemsPerPage   : limit,
    //             Order          : order === 'DESC' ? 'descending' : 'ascending',
    //             OrderedBy      : orderByColum,
    //             Items          : dtos
    //         };

    //         return searchResults;

    //     } catch (error) {
    //         Logger.instance().log(error.message);
    //         throw new ApiError(500, error.message);
    //     }
    // };

// update = async (id: string, customerDomainModel: CustomerDomainModel): Promise<CustomerDto> => {
//             try {
//                 const customer = await Customer.findByPk(id);
    
//                 //Client code is not modifiable
//                 //Use renew key to update ApiKey, ValidFrom and ValidTill
    
//                 if (customerDomainModel.FirstName != null) {
//                     customer.FirstName = customerDomainModel.FirstName;
//                 }

//                 if (customerDomainModel.FirstName != null) {
//                     customer.LastName = customerDomainModel.LastName;
//                 }
//                 if (customerDomainModel.Password != null) {
//                     customer.Password = customerDomainModel.Password;
//                 }
//                 if (customerDomainModel.Phone != null) {
//                     customer.Phone = customerDomainModel.Phone;
//                 }
//                 if (customerDomainModel.Email != null) {
//                     customer.Email = customerDomainModel.Email;
//                 }
//                 if (customerDomainModel.Address != null) {
//                     customer.Address = customerDomainModel.Address;
//                 }
//                 await customer.save();
    
//                 const dto = await CustomerMapper.toDto(customer);
//                 return dto;
//             } catch (error) {
//                 Logger.instance().log(error.message);
//                 throw new ApiError(500, error.message);
//             }
//         };
    
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

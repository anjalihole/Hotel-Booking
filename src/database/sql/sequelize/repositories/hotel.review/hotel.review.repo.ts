/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable key-spacing */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
import { IHotelReviewRepo } from '../../../../repository.interfaces/hotel.review/hotel.review.repo.interface';
import HotelReview from '../../models/hotel.review/hotel.review.model';
import { Op } from 'sequelize';
import { HotelReviewDomainModel } from '../../../../../domain.types/hotel.review/hotel.review.domain.model';
import { HotelReviewMapper } from '../../mappers/hotel.review/hotel.review.mapper';
import { Logger } from '../../../../../common/logger';
import { ApiError } from '../../../../../common/api.error';
import { HotelReviewDto } from '../../../../../domain.types/hotel.review/hotel.review.dto';
import { HotelReviewSearchFilters, HotelReviewSearchResults } from '../../../../../domain.types/hotel.review/hotel.review.search.types';

///////////////////////////////////////////////////////////////////////

export class HotelReviewRepo implements IHotelReviewRepo {

    create = async (hotelreviewDomainModel: HotelReviewDomainModel): Promise<HotelReviewDto> => {
        try {
            const entity = {

                HotelId   : hotelreviewDomainModel.HotelId,
                ReviewUserId : hotelreviewDomainModel.ReviewUserId,
                Rating        : hotelreviewDomainModel.Rating,
                ReviewTitle        : hotelreviewDomainModel.ReviewTitle,
                ReviewDescription : hotelreviewDomainModel.ReviewDescription,
                ReviewTimeStamp        : hotelreviewDomainModel.ReviewTimeStamp,

            };
            const hotelreview = await HotelReview.create(entity);
            const dto = await HotelReviewMapper.toDto(hotelreview);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getById = async (id: string): Promise<HotelReviewDto> => {
        try {
            const hotelreview = await HotelReview.findByPk(id);
            const dto = await HotelReviewMapper.toDto(hotelreview);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getAllHotelReview = async (): Promise<HotelReviewDto[]> => {
        try {
            const records = await HotelReview.findAll();
            const dtos = records.map((record) => this.toDto(record));
            return dtos;
            // const dto = await HotelReviewMapper.toDto(records);
            // return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    toDto = (hotelreview): HotelReviewDto => {
        if (hotelreview == null) {
            return null;
        }
        const dto: HotelReviewDto = {

                id: hotelreview.id,
                HotelId : hotelreview.HotelId,
                ReviewUserId : hotelreview.ReviewUserId,
                Rating : hotelreview.Rating,
                ReviewTitle : hotelreview.ReviewTitle,
                ReviewTimeStamp : hotelreview. ReviewTimeStamp,
                ReviewDescription : hotelreview.ReviewDescription,
        };
        return dto;
    };

    search = async (filters: HotelReviewSearchFilters): Promise<HotelReviewSearchResults> => {
        try {

            const search = { where: {} };

            if (filters.id != null) {
                search.where['id'] = filters.id;
            }

            if (filters.HotelId != null) {
                search.where['HotelId'] = filters.HotelId;
            }
            if (filters.ReviewUserId != null) {
                search.where['ReviewUserId'] = { [Op.like]: '%' + filters.ReviewUserId + '%' };
            }
            if (filters.Rating != null) {
                search.where['Rating'] = filters.Rating;
            }
            
            if (filters.ReviewTitle != null) {
                search.where['ReviewTitle'] = filters.ReviewTitle;
            }

            if (filters.ReviewDescription != null) {
                search.where['ReviewDescription'] = filters.ReviewDescription;
            }
            if (filters.ReviewTimeStamp != null) {
                search.where['ReviewTimeStamp'] = { [Op.like]: '%' + filters.ReviewTimeStamp + '%' };
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
            const foundResults = await HotelReview.findAndCountAll(search);
            let offset = 0;
            let pageIndex = 0;
            if (filters.PageIndex) {
                pageIndex = filters.PageIndex < 0 ? 0 : filters.PageIndex;
                offset = pageIndex * limit;
            }
            search['limit'] = limit;
            search['offset'] = offset;

            const dtos: HotelReviewDto[] = [];
            for (const hotelreview of foundResults.rows) {
                const dto = await HotelReviewMapper.toDto(hotelreview);
                dtos.push(dto);
            }

            const count = foundResults.count;
            const totalCount = typeof count === "number" ? count : count[0];

            const searchResults: HotelReviewSearchResults = {
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

update = async (id: string, hotelreviewDomainModel: HotelReviewDomainModel): Promise<HotelReviewDto> => {
            try {
                const hotelreview = await HotelReview.findByPk(id);
    
                if (hotelreviewDomainModel.HotelId ) {
                    hotelreview.HotelId = hotelreviewDomainModel.HotelId;
                }
                if (hotelreviewDomainModel.ReviewUserId != null) {
                    hotelreview.ReviewUserId = hotelreviewDomainModel.ReviewUserId;
                }
                if (hotelreviewDomainModel.Rating != null) {
                    hotelreview.Rating = hotelreviewDomainModel.Rating;
                }
                if (hotelreviewDomainModel.ReviewTitle != null) {
                    hotelreview.ReviewTitle = hotelreviewDomainModel.ReviewTitle;
                }

                if (hotelreviewDomainModel.id != null) {
                    hotelreview.id = hotelreviewDomainModel.id;
                }
                if (hotelreviewDomainModel.ReviewDescription != null) {
                    hotelreview.ReviewDescription = hotelreviewDomainModel.ReviewDescription;
                }
                if (hotelreviewDomainModel.ReviewTimeStamp != null) {
                    hotelreview.ReviewTimeStamp = hotelreviewDomainModel.ReviewTimeStamp;
                }
                await hotelreview.save();
    
                const dto = await HotelReviewMapper.toDto(hotelreview);
                return dto;
            } catch (error) {
                Logger.instance().log(error.message);
                throw new ApiError(500, error.message);
            }
        };
    
        delete = async (id: string): Promise<boolean> => {
            try {
                const result = await HotelReview.destroy({ where: { id: id } });
                return result === 1;
            } catch (error) {
                Logger.instance().log(error.message);
                throw new ApiError(500, error.message);
            }
        };

}

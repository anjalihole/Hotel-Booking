/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
import { HotelReviewDto } from '../../../../../domain.types/hotel.review/hotel.review.dto';
import HotelReview from '../../models/hotel.review/hotel.review.model';

///////////////////////////////////////////////////////////////////////////////////

export class HotelReviewMapper {
    static toDto = (hotelreview: HotelReview): HotelReviewDto => {
        if (hotelreview == null) {
            return null;
        }
        const dto: HotelReviewDto = {

            id: hotelreview.id,
            HotelId: hotelreview.HotelId,
            ReviewUserId: hotelreview.ReviewUserId,
            Rating: hotelreview.Rating,
            ReviewTitle: hotelreview.ReviewTitle,
            ReviewDescription: hotelreview.ReviewDescription,
            ReviewTimeStamp: hotelreview.ReviewTimeStamp,

        };
        return dto;
    };

    static toHotelReviewDto = (hotelreview: HotelReview): HotelReviewDto => {
        if (hotelreview == null) {
            return null;
        }
        const dto: HotelReviewDto = {

            id: hotelreview.id,
            HotelId: hotelreview.HotelId,
            ReviewUserId: hotelreview.ReviewUserId,
            Rating: hotelreview.Rating,
            ReviewTitle: hotelreview.ReviewTitle,
            ReviewDescription: hotelreview.ReviewDescription,
            ReviewTimeStamp: hotelreview.ReviewTimeStamp,
            
        };
        return dto;
    };
}

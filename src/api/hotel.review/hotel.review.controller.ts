/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
import express from 'express';
import { HotelReviewService } from '../../services/hotel.review/hotel.review.service';
import { ResponseHandler } from '../../common/response.handler';
import { Loader } from '../../startup/loader';
import { Authorizer } from '../../auth/authorizer';
import { HotelReviewValidator } from './hotel.review.validator';
import { ApiError } from '../../common/api.error';

///////////////////////////////////////////////////////////////////////////////////////

export class HotelReviewController {
    //#region member variables and constructors

    _service: HotelReviewService = null;

    _authorizer: Authorizer = null;

    constructor() {
        this._service = Loader.container.resolve(HotelReviewService);
        this._authorizer = Loader.authorizer;
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Hotel Review Review.Create';
            const HotelReviewDomainModel = await HotelReviewValidator.create(request);
            const hotelreview = await this._service.create(HotelReviewDomainModel);
            if (hotelreview == null) {
                throw new ApiError(400, 'Unable to create hotel review.');
            }
            ResponseHandler.success(request, response, 'Hotel Review Api added successfully!', 201, {
                HotelReview: hotelreview,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Hotel Review.GetById';
            //await this._authorizer.authorize(request, response);

            const id: string = await HotelReviewValidator.getById(request);

            const hotelreview = await this._service.getById(id);
            if (hotelreview == null) {
                throw new ApiError(404, 'Hotel Review not found.');
            }
            ResponseHandler.success(request, response, 'Hotel Review Api retrieved successfully!', 200, {
                HotelReview: hotelreview,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getAllHotelReview = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Hotel Review.GetAllHotelReview';

            const hotelreview = await this._service.getAllHotelReview();
            if (hotelreview == null) {
                throw new ApiError(404, 'Hotel Review not found.');
            }
            ResponseHandler.success(request, response, '  All hotel review Api retrieved successfully!', 200, {
            HotelReview: hotelreview,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Hotel Review.Search';
            //await this._authorizer.authorize(request, response);

            const filters = await HotelReviewValidator.search(request);

            const searchResults = await this._service.search(filters);
            const count = searchResults.Items.length;
            const message =
                count === 0 ? 'No records found!' : `Total ${count} Hotel Api records retrieved successfully!`;

            ResponseHandler.success(request, response, message, 200, {
                HotelRecords: searchResults,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Hotel Review.Update';
            // await this._authorizer.authorize(request, response);

            const id: string = await HotelReviewValidator.getById(request);
            const domainModel = await HotelReviewValidator.update(request);
            const hotelreview = await this._service.update(id, domainModel);
            if (hotelreview == null) {
                throw new ApiError(404, ' Hotel Api not found.');
            }
            ResponseHandler.success(request, response, ' Hotel Review Api updated successfully!', 200, {
                HotelReview: hotelreview,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Hotel Review.Delete';            // await this._authorizer.authorize(request, response);

            const id: string = await HotelReviewValidator.getById(request);
            await this._service.delete(id);
            ResponseHandler.success(request, response, 'Hotel Review Api deleted successfully!', 200, null);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
 }

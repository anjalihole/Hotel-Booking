/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
import express from 'express';
import { HotelService } from '../../services/hotel/hotel.service';
import { ResponseHandler } from '../../common/response.handler';
import { Loader } from '../../startup/loader';
import { Authorizer } from '../../auth/authorizer';
import { HotelValidator } from './hotel.validator';
import { ApiError } from '../../common/api.error';

///////////////////////////////////////////////////////////////////////////////////////

export class HotelController {
    //#region member variables and constructors

    _service: HotelService = null;

    _authorizer: Authorizer = null;

    constructor() {
        this._service = Loader.container.resolve(HotelService);
        this._authorizer = Loader.authorizer;
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Hotel.Create';
            const HotelDomainModel = await HotelValidator.create(request);
            const hotel = await this._service.create(HotelDomainModel);
            if (hotel == null) {
                throw new ApiError(400, 'Unable to create hotel.');
            }
            ResponseHandler.success(request, response, 'Hotel Api added successfully!', 201, {
                Hotel: hotel,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Hotel.GetById';
            //await this._authorizer.authorize(request, response);

            const id: string = await HotelValidator.getById(request);

            const hotel = await this._service.getById(id);
            if (hotel == null) {
                throw new ApiError(404, 'Hotel not found.');
            }
            ResponseHandler.success(request, response, 'Hotel Api retrieved successfully!', 200, {
                Hotel: hotel,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getAllHotel = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Hotel.GetAllHotel';

            // const id: string = await CustomerValidator.getAllCustomer(request);

            const hotel = await this._service.getAllHotel();
            if (hotel == null) {
                throw new ApiError(404, 'Hotel not found.');
            }
            ResponseHandler.success(request, response, '  All hotel  Api retrieved successfully!', 200, {
            Hotel: hotel,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Hotel.Search';
            //await this._authorizer.authorize(request, response);

            const filters = await HotelValidator.search(request);

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
            request.context = 'Hotel.Update';
            // await this._authorizer.authorize(request, response);

            const id: string = await HotelValidator.getById(request);
            const domainModel = await HotelValidator.update(request);
            const hotel = await this._service.update(id, domainModel);
            if (hotel == null) {
                throw new ApiError(404, ' Hotel Api not found.');
            }
            ResponseHandler.success(request, response, ' Hotel Api updated successfully!', 200, {
                Hotel: hotel,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Hotel.Delete';            // await this._authorizer.authorize(request, response);

            const id: string = await HotelValidator.getById(request);
            await this._service.delete(id);
            ResponseHandler.success(request, response, 'Hotel Api deleted successfully!', 200, null);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
 }

/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
import express from 'express';

import { RoomAmenitiesService } from '../../services/room.amenities/room.amenities.service';
import { ResponseHandler } from '../../common/response.handler';
import { Loader } from '../../startup/loader';
import { Authorizer } from '../../auth/authorizer';
import { RoomAmenitiesValidator } from './room.amenities.validator';
import { ApiError } from '../../common/api.error';

///////////////////////////////////////////////////////////////////////////////////////

export class RoomAmenitiesController {
    //#region member variables and constructors

    _service: RoomAmenitiesService = null;

    _authorizer: Authorizer = null;

    constructor() {
        this._service = Loader.container.resolve(RoomAmenitiesService);
        this._authorizer = Loader.authorizer;
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'RoomAmenities.Create';
            // await this._authorizer.authorize(request, response);

            const RoomAmenitiesDomainModel = await RoomAmenitiesValidator.create(request);
            const roomamenities = await this._service.create(RoomAmenitiesDomainModel);
            if (roomamenities == null) {
                throw new ApiError(400, 'Unable to create roomamenities.');
            }
            ResponseHandler.success(request, response, 'Api roomamenities added successfully!', 201, {
                RoomAmenities: roomamenities,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'RoomAmenities.GetById';
            //await this._authorizer.authorize(request, response);

            const id: string = await RoomAmenitiesValidator.getById(request);

            const roomamenities = await this._service.getById(id);
            if (roomamenities == null) {
                throw new ApiError(404, 'RoomAmenities not found.');
            }
            ResponseHandler.success(request, response, 'Api RoomAmenities retrieved successfully!', 200, {
                RoomAmenities: roomamenities,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'RoomAmenities.Search';
            //await this._authorizer.authorize(request, response);

            const filters = await RoomAmenitiesValidator.search(request);

            const searchResults = await this._service.search(filters);
            const count = searchResults.Items.length;
            const message =
                count === 0 ? 'No records found!' : `Total ${count} Api RoomAmenities records retrieved successfully!`;

            ResponseHandler.success(request, response, message, 200, {
                RoomAmenitiesRecords: searchResults,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'RoomAmenities.Update';
            // await this._authorizer.authorize(request, response);

            const id: string = await RoomAmenitiesValidator.getById(request);
            const domainModel = await RoomAmenitiesValidator.update(request);
            const roomamenities = await this._service.update(id, domainModel);
            if (roomamenities == null) {
                throw new ApiError(404, 'Api roomAmenities not found.');
            }
            ResponseHandler.success(request, response, 'Api RoomAmenities updated successfully!', 200, {
                RoomAmenities: roomamenities,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'RoomAmenities.Delete';            // await this._authorizer.authorize(request, response);

            const id: string = await RoomAmenitiesValidator.getById(request);
            await this._service.delete(id);
            ResponseHandler.success(request, response, 'Api RoomAmenities deleted successfully!', 200, null);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
 }


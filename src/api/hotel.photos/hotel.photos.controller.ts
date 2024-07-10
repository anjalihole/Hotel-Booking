/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
import express from 'express';
import { HotelPhotosService } from '../../services/hotel.photos/hotel.photos.service';
import { ResponseHandler } from '../../common/response.handler';
import { Loader } from '../../startup/loader';
import { Authorizer } from '../../auth/authorizer';
import { HotelPhotosValidator } from './hotel.photos.validator';
import { ApiError } from '../../common/api.error';

///////////////////////////////////////////////////////////////////////////////////////

export class HotelPhotosController {
    //#region member variables and constructors

    _service: HotelPhotosService = null;

    _authorizer: Authorizer = null;

    constructor() {
        this._service = Loader.container.resolve(HotelPhotosService);
        this._authorizer = Loader.authorizer;
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'HotelPhotos.Create';
            const HotelPhotosDomainModel = await HotelPhotosValidator.create(request);
            const hotelphotos = await this._service.create(HotelPhotosDomainModel);
            if (hotelphotos == null) {
                throw new ApiError(400, 'Unable to create hotel.');
            }
            ResponseHandler.success(request, response, ' Api Hotel Photos  added successfully!', 201, {
                HotelPhotos: hotelphotos,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Hotel Photos.GetById';
            //await this._authorizer.authorize(request, response);

            const id: string = await HotelPhotosValidator.getById(request);

            const hotelphotos = await this._service.getById(id);
            if (hotelphotos == null) {
                throw new ApiError(404, 'Hotel Photos not found.');
            }
            ResponseHandler.success(request, response, ' Api Hotel Photos  retrieved successfully!', 200, {
                HotelPhotos: hotelphotos,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'HotelPhotos.Search';
            //await this._authorizer.authorize(request, response);

            const filters = await HotelPhotosValidator.search(request);

            const searchResults = await this._service.search(filters);
            const count = searchResults.Items.length;
            const message =
                count === 0 ? 'No records found!' : `Total ${count} Api Hotel Photos records retrieved successfully!`;

            ResponseHandler.success(request, response, message, 200, {
                HotelRecords: searchResults,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Hotel Photos.Update';
            // await this._authorizer.authorize(request, response);

            const id: string = await HotelPhotosValidator.getById(request);
            const domainModel = await HotelPhotosValidator.update(request);
            const hotelphotos = await this._service.update(id, domainModel);
            if (hotelphotos == null) {
                throw new ApiError(404, ' Hotel Api not found.');
            }
            ResponseHandler.success(request, response, ' Api Hotel Photos  updated successfully!', 200, {
                HotelPhotos: hotelphotos,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Hotel Photos.Delete';            // await this._authorizer.authorize(request, response);

            const id: string = await HotelPhotosValidator.getById(request);
            await this._service.delete(id);
            ResponseHandler.success(request, response, ' Api Hotel Photos  deleted successfully!', 200, null);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
 }

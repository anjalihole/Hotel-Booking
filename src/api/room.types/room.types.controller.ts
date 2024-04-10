/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
import express from 'express';
import { RoomTypesService } from '../../services/room.types/room.types.service';
import { ResponseHandler } from '../../common/response.handler';
import { Loader } from '../../startup/loader';
import { Authorizer } from '../../auth/authorizer';
import { RoomTypesValidator } from './room.types.validator';
import { ApiError } from '../../common/api.error';

///////////////////////////////////////////////////////////////////////////////////////

export class RoomTypesController {
    //#region member variables and constructors

    _service: RoomTypesService = null;

    _authorizer: Authorizer = null;

    constructor() {
        this._service = Loader.container.resolve(RoomTypesService);
        this._authorizer = Loader.authorizer;
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'RoomTypes.Create';
            // await this._authorizer.authorize(request, response);

            const RoomTypesDomainModel = await RoomTypesValidator.create(request);
            const roomtypes = await this._service.create(RoomTypesDomainModel);
            if (roomtypes == null) {
                throw new ApiError(400, 'Unable to create RoomTypes.');
            }
            ResponseHandler.success(request, response, 'Api RoomTypes added successfully!', 201, {
                RoomTypes: roomtypes,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'RoomTypes.GetById';
            //await this._authorizer.authorize(request, response);

            const id: string = await RoomTypesValidator.getById(request);

            const room = await this._service.getById(id);
            if (room == null) {
                throw new ApiError(404, 'RoomTypes not found.');
            }
            ResponseHandler.success(request, response, 'Api RoomTypes retrieved successfully!', 200, {
                Room: room,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getAllRoomTypes = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'RoomTypes.GetAllRoomTypes';

            // const id: string = await CustomerValidator.getAllCustomer(request);

            const roomtypes = await this._service.getAllRoomTypes();
            if (roomtypes == null) {
                throw new ApiError(404, 'RoomTypes not found.');
            }
            ResponseHandler.success(request, response, 'Api  All RoomTypes retrieved successfully!', 200, {
                RoomTypes: roomtypes,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'RoomTypes.Search';
            //await this._authorizer.authorize(request, response);

            const filters = await RoomTypesValidator.search(request);

            const searchResults = await this._service.search(filters);
            const count = searchResults.Items.length;
            const message =
                count === 0 ? 'No records found!' : `Total ${count} api RoomTypes records retrieved successfully!`;

            ResponseHandler.success(request, response, message, 200, {
                RoomRecords: searchResults,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'RoomTypes.Update';
            // await this._authorizer.authorize(request, response);

            const id: string = await RoomTypesValidator.getById(request);
            const domainModel = await RoomTypesValidator.update(request);
            const roomtypes = await this._service.update(id, domainModel);
            if (roomtypes == null) {
                throw new ApiError(404, 'Api RoomTypes not found.');
            }
            ResponseHandler.success(request, response, 'Api RoomTypes updated successfully!', 200, {
                RoomTypes: roomtypes,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'RoomTypes.Delete';            // await this._authorizer.authorize(request, response);

            const id: string = await RoomTypesValidator.getById(request);
            await this._service.delete(id);
            ResponseHandler.success(request, response, 'Api RoomTypes deleted successfully!', 200, null);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
 }


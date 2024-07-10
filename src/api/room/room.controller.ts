/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
import express from 'express';

import { RoomService } from '../../services/room/room.service';
import { ResponseHandler } from '../../common/response.handler';
import { Loader } from '../../startup/loader';
import { Authorizer } from '../../auth/authorizer';
import { RoomValidator } from './room.validator';
import { ApiError } from '../../common/api.error';

///////////////////////////////////////////////////////////////////////////////////////

export class RoomController {
    //#region member variables and constructors

    _service: RoomService = null;

    _authorizer: Authorizer = null;

    constructor() {
        this._service = Loader.container.resolve(RoomService);
        this._authorizer = Loader.authorizer;
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Room.Create';
            // await this._authorizer.authorize(request, response);

            const RoomDomainModel = await RoomValidator.create(request);
            const room = await this._service.create(RoomDomainModel);
            if (room == null) {
                throw new ApiError(400, 'Unable to create room.');
            }
            ResponseHandler.success(request, response, 'Api room added successfully!', 201, {
                Room: room,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Room.GetById';
            //await this._authorizer.authorize(request, response);

            const id: string = await RoomValidator.getById(request);

            const room = await this._service.getById(id);
            if (room == null) {
                throw new ApiError(404, 'Roomnot found.');
            }
            ResponseHandler.success(request, response, 'Api Room retrieved successfully!', 200, {
                Room: room,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Room.Search';
            //await this._authorizer.authorize(request, response);

            const filters = await RoomValidator.search(request);

            const searchResults = await this._service.search(filters);
            const count = searchResults.Items.length;
            const message =
                count === 0 ? 'No records found!' : `Total ${count} Api Room records retrieved successfully!`;

            ResponseHandler.success(request, response, message, 200, {
                RoomRecords: searchResults,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Room.Update';
            // await this._authorizer.authorize(request, response);

            const id: string = await RoomValidator.getById(request);
            const domainModel = await RoomValidator.update(request);
            const room = await this._service.update(id, domainModel);
            if (room == null) {
                throw new ApiError(404, 'Api room not found.');
            }
            ResponseHandler.success(request, response, 'Api Room updated successfully!', 200, {
                Room: room,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Room.Delete';            // await this._authorizer.authorize(request, response);

            const id: string = await RoomValidator.getById(request);
            await this._service.delete(id);
            ResponseHandler.success(request, response, 'Api Room deleted successfully!', 200, null);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
 }


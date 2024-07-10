/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
import express from 'express';

import { UserService } from '../../services/user/user.service';
import { ResponseHandler } from '../../common/response.handler';
import { Loader } from '../../startup/loader';
import { Authorizer } from '../../auth/authorizer';
import { UserValidator } from './user.validator';
import { ApiError } from '../../common/api.error';

///////////////////////////////////////////////////////////////////////////////////////

export class UserController {
    //#region member variables and constructors

    _service: UserService = null;

    _authorizer: Authorizer = null;

    constructor() {
        this._service = Loader.container.resolve(UserService);
        this._authorizer = Loader.authorizer;
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'User.Create';
            // await this._authorizer.authorize(request, response);

            const UserDomainModel = await UserValidator.create(request);
            const user = await this._service.create(UserDomainModel);
            if (user == null) {
                throw new ApiError(400, 'Unable to create user.');
            }
            ResponseHandler.success(request, response, 'Api user added successfully!', 201, {
                User: user,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'User.GetById';
            //await this._authorizer.authorize(request, response);

            const id: string = await UserValidator.getById(request);

            const user = await this._service.getById(id);
            if (user == null) {
                throw new ApiError(404, 'user not found.');
            }
            ResponseHandler.success(request, response, 'Api user retrieved successfully!', 200, {
                User: user,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'User.Search';
            //await this._authorizer.authorize(request, response);

            const filters = await UserValidator.search(request);

            const searchResults = await this._service.search(filters);
            const count = searchResults.Items.length;
            const message =
                count === 0 ? 'No records found!' : `Total ${count} Api user records retrieved successfully!`;

            ResponseHandler.success(request, response, message, 200, {
                UserRecords: searchResults,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'User.Update';
            // await this._authorizer.authorize(request, response);

            const id: string = await UserValidator.getById(request);
            const domainModel = await UserValidator.update(request);
            const user = await this._service.update(id, domainModel);
            if (user == null) {
                throw new ApiError(404, 'Api user not found.');
            }
            ResponseHandler.success(request, response, 'Api user updated successfully!', 200, {
                User: user,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'User.Delete';            // await this._authorizer.authorize(request, response);

            const id: string = await UserValidator.getById(request);
            await this._service.delete(id);
            ResponseHandler.success(request, response, 'Api User deleted successfully!', 200, null);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
 }


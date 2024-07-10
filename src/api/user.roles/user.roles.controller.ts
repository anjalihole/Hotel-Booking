/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
import express from 'express';

import { UserRolesService } from '../../services/user.roles/user.roles.services';
import { ResponseHandler } from '../../common/response.handler';
import { Loader } from '../../startup/loader';
import { Authorizer } from '../../auth/authorizer';
import { UserRolesValidator } from './user.roles.validator';
import { ApiError } from '../../common/api.error';

///////////////////////////////////////////////////////////////////////////////////////

export class UserRolesController {
    //#region member variables and constructors

    _service: UserRolesService = null;

    _authorizer: Authorizer = null;

    constructor() {
        this._service = Loader.container.resolve(UserRolesService);
        this._authorizer = Loader.authorizer;
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'UserRoles.Create';
            // await this._authorizer.authorize(request, response);

            const UserRolesDomainModel = await UserRolesValidator.create(request);
            const userroles = await this._service.create(UserRolesDomainModel);
            if (userroles == null) {
                throw new ApiError(400, 'Unable to create user Roles.');
            }
            ResponseHandler.success(request, response, 'Api user Roles added successfully!', 201, {
                UserRoles: userroles,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'UserRoles.GetById';
            //await this._authorizer.authorize(request, response);

            const id: string = await UserRolesValidator.getById(request);

            const userroles = await this._service.getById(id);
            if (userroles == null) {
                throw new ApiError(404, 'user roles not found.');
            }
            ResponseHandler.success(request, response, 'Api user roles retrieved successfully!', 200, {
                UserRoles: userroles,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'User Roles.Search';
            //await this._authorizer.authorize(request, response);

            const filters = await UserRolesValidator.search(request);

            const searchResults = await this._service.search(filters);
            const count = searchResults.Items.length;
            const message =
                count === 0 ? 'No records found!' : `Total ${count} Api user roles records retrieved successfully!`;

            ResponseHandler.success(request, response, message, 200, {
                UserRolesRecords: searchResults,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'User Roles.Update';
            // await this._authorizer.authorize(request, response);

            const id: string = await UserRolesValidator.getById(request);
            const domainModel = await UserRolesValidator.update(request);
            const userroles = await this._service.update(id, domainModel);
            if (userroles == null) {
                throw new ApiError(404, 'Api user roles not found.');
            }
            ResponseHandler.success(request, response, 'Api user roles updated successfully!', 200, {
                UserRoles: userroles,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'User Roles.Delete';            // await this._authorizer.authorize(request, response);

            const id: string = await UserRolesValidator.getById(request);
            await this._service.delete(id);
            ResponseHandler.success(request, response, 'Api User Roles deleted successfully!', 200, null);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
 }


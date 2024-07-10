/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
import express from 'express';
import { RoleService } from '../../services/role/role.service';
import { ResponseHandler } from '../../common/response.handler';
import { Loader } from '../../startup/loader';
import { Authorizer } from '../../auth/authorizer';
import { RoleValidator } from './role.validator';
import { ApiError } from '../../common/api.error';

///////////////////////////////////////////////////////////////////////////////////////

export class RoleController {
    //#region member variables and constructors

    _service: RoleService = null;

    _authorizer: Authorizer = null;

    constructor() {
        this._service = Loader.container.resolve(RoleService);
        this._authorizer = Loader.authorizer;
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Role.Create';
            const RoleDomainModel = await RoleValidator.create(request);
            const role = await this._service.create(RoleDomainModel);
            if (role == null) {
                throw new ApiError(400, 'Unable to create Role.');
            }
            ResponseHandler.success(request, response, ' Api Role  added successfully!', 201, {
                Role: role,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Role.GetById';
            //await this._authorizer.authorize(request, response);

            const id: string = await RoleValidator.getById(request);

            const role = await this._service.getById(id);
            if (role == null) {
                throw new ApiError(404, 'Role not found.');
            }
            ResponseHandler.success(request, response, ' Api Role  retrieved successfully!', 200, {
                Role: role,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Role.Search';
            //await this._authorizer.authorize(request, response);

            const filters = await RoleValidator.search(request);

            const searchResults = await this._service.search(filters);
            const count = searchResults.Items.length;
            const message =
                count === 0 ? 'No records found!' : `Total ${count} Api Role  records retrieved successfully!`;

            ResponseHandler.success(request, response, message, 200, {
                RoleRecords: searchResults,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Role.Update';
            // await this._authorizer.authorize(request, response);

            const id: string = await RoleValidator.getById(request);
            const domainModel = await RoleValidator.update(request);
            const role = await this._service.update(id, domainModel);
            if (role == null) {
                throw new ApiError(404, ' Role Api not found.');
            }
            ResponseHandler.success(request, response, 'Api Role  updated successfully!', 200, {
                Role: role,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Role.Delete';            // await this._authorizer.authorize(request, response);

            const id: string = await RoleValidator.getById(request);
            await this._service.delete(id);
            ResponseHandler.success(request, response, ' Api Role  deleted successfully!', 200, null);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
 }

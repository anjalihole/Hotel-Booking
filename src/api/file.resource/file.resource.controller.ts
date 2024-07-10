/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
import express from 'express';
import { FileResourceService } from '../../services/file.resource/file.resource.service';
import { ResponseHandler } from '../../common/response.handler';
import { Loader } from '../../startup/loader';
import { Authorizer } from '../../auth/authorizer';
import { FileResourceValidator } from './file.resource.validator';
import { ApiError } from '../../common/api.error';

///////////////////////////////////////////////////////////////////////////////////////

export class FileResourceController {
    //#region member variables and constructors

    _service: FileResourceService = null;

    _authorizer: Authorizer = null;

    constructor() {
        this._service = Loader.container.resolve(FileResourceService);
        this._authorizer = Loader.authorizer;
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'FileResource.Create';
            const FileResourceDomainModel = await FileResourceValidator.create(request);
            const fileresource = await this._service.create(FileResourceDomainModel);
            if (fileresource == null) {
                throw new ApiError(400, 'Unable to create FileResource.');
            }
            ResponseHandler.success(request, response, 'Api FileResource  added successfully!', 201, {
                FileResource: fileresource,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'FileResource.GetById';
            //await this._authorizer.authorize(request, response);

            const id: string = await FileResourceValidator.getById(request);

            const fileresource = await this._service.getById(id);
            if (fileresource == null) {
                throw new ApiError(404, 'FileResource not found.');
            }
            ResponseHandler.success(request, response, 'Api FileResource  retrieved successfully!', 200, {
                FileResource: fileresource,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'FileResource.Search';
            //await this._authorizer.authorize(request, response);

            const filters = await FileResourceValidator.search(request);

            const searchResults = await this._service.search(filters);
            const count = searchResults.Items.length;
            const message =
                count === 0 ? 'No records found!' : `Total ${count} Api FileResource  records retrieved successfully!`;

            ResponseHandler.success(request, response, message, 200, {
                FileResourceRecords: searchResults,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'FileResource.Update';
            // await this._authorizer.authorize(request, response);

            const id: string = await FileResourceValidator.getById(request);
            const domainModel = await FileResourceValidator.update(request);
            const fileresource = await this._service.update(id, domainModel);
            if (fileresource == null) {
                throw new ApiError(404, 'Api FileResource  not found.');
            }
            ResponseHandler.success(request, response, 'Api FileResource  updated successfully!', 200, {
                FileResource: fileresource,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'FileResource.Delete';            // await this._authorizer.authorize(request, response);

            const id: string = await FileResourceValidator.getById(request);
            await this._service.delete(id);
            ResponseHandler.success(request, response, 'Api FileResource  deleted successfully!', 200, null);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
 }

/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
import express from 'express';
import { AddressService } from '../../services/address/address.service';
import { ResponseHandler } from '../../common/response.handler';
import { Loader } from '../../startup/loader';
import { Authorizer } from '../../auth/authorizer';
import { AddressValidator } from './address.validator';
import { ApiError } from '../../common/api.error';

///////////////////////////////////////////////////////////////////////////////////////

export class AddressController {
    //#region member variables and constructors

    _service: AddressService = null;

    _authorizer: Authorizer = null;

    constructor() {
        this._service = Loader.container.resolve(AddressService);
        this._authorizer = Loader.authorizer;
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Address.Create';
            // await this._authorizer.authorize(request, response);

            const AddressDomainModel = await AddressValidator.create(request);
            const address = await this._service.create(AddressDomainModel);
            if (address == null) {
                throw new ApiError(400, 'Unable to create Address.');
            }
            ResponseHandler.success(request, response, 'Api Address added successfully!', 201, {
                Address: address,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Address.GetById';
            //await this._authorizer.authorize(request, response);

            const id: string = await AddressValidator.getById(request);

            const address = await this._service.getById(id);
            if (address == null) {
                throw new ApiError(404, 'address not found.');
            }
            ResponseHandler.success(request, response, 'Api Address retrieved successfully!', 200, {
                Address: address,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Address.Search';
            //await this._authorizer.authorize(request, response);

            const filters = await AddressValidator.search(request);

            const searchResults = await this._service.search(filters);
            const count = searchResults.Items.length;
            const message =
                count === 0 ? 'No records found!' : `Total ${count} api Address records retrieved successfully!`;

            ResponseHandler.success(request, response, message, 200, {
                AddressRecords: searchResults,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Address.Update';
            // await this._authorizer.authorize(request, response);

            const id: string = await AddressValidator.getById(request);
            const domainModel = await AddressValidator.update(request);
            const address = await this._service.update(id, domainModel);
            if (address == null) {
                throw new ApiError(404, 'Api address not found.');
            }
            ResponseHandler.success(request, response, 'Api address updated successfully!', 200, {
                Address: address,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Address.Delete';            // await this._authorizer.authorize(request, response);

            const id: string = await AddressValidator.getById(request);
            await this._service.delete(id);
            ResponseHandler.success(request, response, 'Api Address deleted successfully!', 200, null);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
 }


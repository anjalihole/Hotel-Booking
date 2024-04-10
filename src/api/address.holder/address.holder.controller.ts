/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
import express from 'express';
import { AddressHolderService } from '../../services/address.holder/address.holder.service';
import { ResponseHandler } from '../../common/response.handler';
import { Loader } from '../../startup/loader';
import { Authorizer } from '../../auth/authorizer';
import { AddressHolderValidator } from './address.holder.validator';
import { ApiError } from '../../common/api.error';

///////////////////////////////////////////////////////////////////////////////////////

export class AddressHolderController {
    //#region member variables and constructors

    _service: AddressHolderService = null;

    _authorizer: Authorizer = null;

    constructor() {
        this._service = Loader.container.resolve(AddressHolderService);
        this._authorizer = Loader.authorizer;
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'AddressHolder.Create';
            const AddressHolderDomainModel = await AddressHolderValidator.create(request);
            const addressholder = await this._service.create(AddressHolderDomainModel);
            if (addressholder == null) {
                throw new ApiError(400, 'Unable to create Address.');
            }
            ResponseHandler.success(request, response, 'AddressHolder Api added successfully!', 201, {
                AddressHolder: addressholder,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'AddressHolder.GetById';
            //await this._authorizer.authorize(request, response);

            const id: string = await AddressHolderValidator.getById(request);

            const addressholder = await this._service.getById(id);
            if (addressholder == null) {
                throw new ApiError(404, 'AddressHolder not found.');
            }
            ResponseHandler.success(request, response, 'AddressHolder Api retrieved successfully!', 200, {
                AddressHolder: addressholder,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getAllAddressHolder = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'AddressHolder.GetAllHotel';

             //const id:string = await AddressHolderValidator.getAllAddressHolder(request);

            const address = await this._service.getAllAddressHolder();
            if (address == null) {
                throw new ApiError(404, 'AddressHolder not found.');
            }
            ResponseHandler.success(request, response, '  All AddressHolder  Api retrieved successfully!', 200, {
            Address: address,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'AddressHolder.Search';
            //await this._authorizer.authorize(request, response);

            const filters = await AddressHolderValidator.search(request);

            const searchResults = await this._service.search(filters);
            const count = searchResults.Items.length;
            const message =
                count === 0 ? 'No records found!' : `Total ${count} AddressHolder Api records retrieved successfully!`;

            ResponseHandler.success(request, response, message, 200, {
                HotelRecords: searchResults,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'AddressHolder.Update';
            // await this._authorizer.authorize(request, response);

            const id: string = await AddressHolderValidator.getById(request);
            const domainModel = await AddressHolderValidator.update(request);
            const addressholder = await this._service.update(id, domainModel);
            if (addressholder == null) {
                throw new ApiError(404, 'Address Api not found.');
            }
            ResponseHandler.success(request, response, ' AddressHolder Api updated successfully!', 200, {
                AddressHolder: addressholder,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'AddressHolder.Delete';            // await this._authorizer.authorize(request, response);

            const id: string = await AddressHolderValidator.getById(request);
            await this._service.delete(id);
            ResponseHandler.success(request, response, 'AddressHolder Api deleted successfully!', 200, null);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
 }

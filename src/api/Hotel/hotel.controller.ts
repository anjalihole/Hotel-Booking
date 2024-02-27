/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
import express from 'express';
import { HotelService } from '../../services/hotel/hotel.service';
import { ResponseHandler } from '../../common/response.handler';
import { Loader } from '../../startup/loader';
import { Authorizer } from '../../auth/authorizer';
import { HotelValidator } from './hotel.validator';
import { ApiError } from '../../common/api.error';

///////////////////////////////////////////////////////////////////////////////////////

export class HotelController {
    //#region member variables and constructors

    _service: HotelService = null;

    _authorizer: Authorizer = null;

    constructor() {
        this._service = Loader.container.resolve(HotelService);
        this._authorizer = Loader.authorizer;
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Hotel.Create';
            const HotelDomainModel = await HotelValidator.create(request);
            const hotel = await this._service.create(HotelDomainModel);
            if (hotel == null) {
                throw new ApiError(400, 'Unable to create hotel.');
            }
            ResponseHandler.success(request, response, 'Hotel Api added successfully!', 201, {
                Hotel: hotel,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

//     getById = async (request: express.Request, response: express.Response): Promise<void> => {
//         try {
//             request.context = 'Customer.GetById';
//             //await this._authorizer.authorize(request, response);

//             const id: string = await CustomerValidator.getById(request);

//             const customer = await this._service.getById(id);
//             if (customer == null) {
//                 throw new ApiError(404, 'Customer not found.');
//             }
//             ResponseHandler.success(request, response, 'Api customer retrieved successfully!', 200, {
//                 Customer: customer,
//             });
//         } catch (error) {
//             ResponseHandler.handleError(request, response, error);
//         }
//     };

//     getAllCustomer = async (request: express.Request, response: express.Response): Promise<void> => {
//         try {
//             request.context = 'Customer.GetAllCustomer';

//             // const id: string = await CustomerValidator.getAllCustomer(request);

//             const customer = await this._service.getAllCustomer();
//             if (customer == null) {
//                 throw new ApiError(404, 'Customer not found.');
//             }
//             ResponseHandler.success(request, response, 'Api  All customer retrieved successfully!', 200, {
//                 Customer: customer,
//             });
//         } catch (error) {
//             ResponseHandler.handleError(request, response, error);
//         }
//     };

//     search = async (request: express.Request, response: express.Response): Promise<void> => {
//         try {
//             request.context = 'Customer.Search';
//             //await this._authorizer.authorize(request, response);

//             const filters = await CustomerValidator.search(request);

//             const searchResults = await this._service.search(filters);
//             const count = searchResults.Items.length;
//             const message =
//                 count === 0 ? 'No records found!' : `Total ${count} api customer records retrieved successfully!`;

//             ResponseHandler.success(request, response, message, 200, {
//                 CustomerRecords: searchResults,
//             });
//         } catch (error) {
//             ResponseHandler.handleError(request, response, error);
//         }
//     };

//     update = async (request: express.Request, response: express.Response): Promise<void> => {
//         try {
//             request.context = 'Customer.Update';
//             // await this._authorizer.authorize(request, response);

//             const id: string = await CustomerValidator.getById(request);
//             const domainModel = await CustomerValidator.update(request);
//             const customer = await this._service.update(id, domainModel);
//             if (customer == null) {
//                 throw new ApiError(404, 'Api customer not found.');
//             }
//             ResponseHandler.success(request, response, 'Api customer updated successfully!', 200, {
//                 Customer: customer,
//             });
//         } catch (error) {
//             ResponseHandler.handleError(request, response, error);
//         }
//     };

//     delete = async (request: express.Request, response: express.Response): Promise<void> => {
//         try {
//             request.context = 'Customer.Delete';            // await this._authorizer.authorize(request, response);

//             const id: string = await CustomerValidator.getById(request);
//             await this._service.delete(id);
//             ResponseHandler.success(request, response, 'Api customer deleted successfully!', 200, null);
//         } catch (error) {
//             ResponseHandler.handleError(request, response, error);
//         }
//     };
 }

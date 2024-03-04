/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
import express from 'express';
import { PaymentService } from '../../../src/services/Payment/payment.service';
import { ResponseHandler } from '../../common/response.handler';
import { Loader } from '../../startup/loader';
import { Authorizer } from '../../auth/authorizer';
import { PaymentValidator } from './payment.validator';
import { ApiError } from '../../common/api.error';

///////////////////////////////////////////////////////////////////////////////////////

export class PaymentController {
    //#region member variables and constructors

    _service: PaymentService = null;

    _authorizer: Authorizer = null;

    constructor() {
        this._service = Loader.container.resolve(PaymentService);
        this._authorizer = Loader.authorizer;
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Payment.Create';
            const PaymentDomainModel = await PaymentValidator.create(request);
            const payment = await this._service.create(PaymentDomainModel);
            if (payment == null) {
                throw new ApiError(400, 'Unable to create payment.');
            }
            ResponseHandler.success(request, response, 'Payment Api added successfully!', 201, {
                Payment: payment,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Payment.GetById';
            //await this._authorizer.authorize(request, response);

            const id: string = await PaymentValidator.getById(request);

            const payment = await this._service.getById(id);
            if (payment == null) {
                throw new ApiError(404, 'Payment not found.');
            }
            ResponseHandler.success(request, response, 'Payment Api retrieved successfully!', 200, {
                Payment: payment,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getAllPayment = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Payment.GetAllHotel';

             //const id:string = await PaymentValidator.getAllPayment(request);

            const payment = await this._service.getAllPayment();
            if (payment == null) {
                throw new ApiError(404, 'Payment not found.');
            }
            ResponseHandler.success(request, response, '  All Payment  Api retrieved successfully!', 200, {
            Payment: payment,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Payment.Search';
            //await this._authorizer.authorize(request, response);

            const filters = await PaymentValidator.search(request);

            const searchResults = await this._service.search(filters);
            const count = searchResults.Items.length;
            const message =
                count === 0 ? 'No records found!' : `Total ${count} Payment Api records retrieved successfully!`;

            ResponseHandler.success(request, response, message, 200, {
                HotelRecords: searchResults,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Payment.Update';
            // await this._authorizer.authorize(request, response);

            const id: string = await PaymentValidator.getById(request);
            const domainModel = await PaymentValidator.update(request);
            const payment = await this._service.update(id, domainModel);
            if (payment == null) {
                throw new ApiError(404, 'Payment Api not found.');
            }
            ResponseHandler.success(request, response, ' Payment Api updated successfully!', 200, {
                Payment: payment,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Payment.Delete';            // await this._authorizer.authorize(request, response);

            const id: string = await PaymentValidator.getById(request);
            await this._service.delete(id);
            ResponseHandler.success(request, response, 'Payment Api deleted successfully!', 200, null);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
 }

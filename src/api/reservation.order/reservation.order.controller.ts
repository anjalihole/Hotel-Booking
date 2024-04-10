/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
import express from 'express';
import { ReservationOrderService } from '../../services/reservation.order/reservation.order.service';
import { ResponseHandler } from '../../common/response.handler';
import { Loader } from '../../startup/loader';
import { Authorizer } from '../../auth/authorizer';
import { ReservationOrderValidator } from './reservation.order.validator';
import { ApiError } from '../../common/api.error';

///////////////////////////////////////////////////////////////////////////////////////

export class ReservationOrderController {
    //#region member variables and constructors

    _service: ReservationOrderService = null;

    _authorizer: Authorizer = null;

    constructor() {
        this._service = Loader.container.resolve(ReservationOrderService);
        this._authorizer = Loader.authorizer;
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'ReservationOrder.Create';
            const ReservationOrderDomainModel = await ReservationOrderValidator.create(request);
            const reservationorder = await this._service.create(ReservationOrderDomainModel);
            if (reservationorder == null) {
                throw new ApiError(400, 'Unable to create ReservationOrder.');
            }
            ResponseHandler.success(request, response, 'ReservationOrder Api added successfully!', 201, {
                ReservationOrder: reservationorder,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'ReservationOrder.GetById';
            //await this._authorizer.authorize(request, response);

            const id: string = await ReservationOrderValidator.getById(request);

            const reservationorder = await this._service.getById(id);
            if (reservationorder == null) {
                throw new ApiError(404, 'ReservationOrder not found.');
            }
            ResponseHandler.success(request, response, 'ReservationOrder Api retrieved successfully!', 200, {
                ReservationOrder: reservationorder,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getAllReservationOrder = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'ReservationOrder.GetAllReservationOrder';

            const reservationorder = await this._service.getAllReservationOrder();
            if (reservationorder == null) {
                throw new ApiError(404, 'ReservationOrder not found.');
            }
            ResponseHandler.success(request, response, '  All ReservationOrder  Api retrieved successfully!', 200, {
            ReservationOrder: reservationorder,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'ReservationOrder.Search';
            //await this._authorizer.authorize(request, response);

            const filters = await ReservationOrderValidator.search(request);

            const searchResults = await this._service.search(filters);
            const count = searchResults.Items.length;
            const message =
                count === 0 ? 'No records found!' : `Total ${count} ReservationOrder Api records retrieved successfully!`;

            ResponseHandler.success(request, response, message, 200, {
                ReservationOrderRecords: searchResults,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'ReservationOrder.Update';
            // await this._authorizer.authorize(request, response);

            const id: string = await ReservationOrderValidator.getById(request);
            const domainModel = await ReservationOrderValidator.update(request);
            const reservationorder = await this._service.update(id, domainModel);
            if (reservationorder == null) {
                throw new ApiError(404, ' ReservationOrder Api not found.');
            }
            ResponseHandler.success(request, response, ' ReservationOrder Api updated successfully!', 200, {
                ReservationOrder: reservationorder,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'ReservationOrder.Delete';            // await this._authorizer.authorize(request, response);

            const id: string = await ReservationOrderValidator.getById(request);
            await this._service.delete(id);
            ResponseHandler.success(request, response, 'ReservationOrder Api deleted successfully!', 200, null);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
 }

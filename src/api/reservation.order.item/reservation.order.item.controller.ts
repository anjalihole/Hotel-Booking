/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
import express from 'express';
import { ReservationOrderItemService } from '../../services/reservation.order.item/reservation.order.item.service';
import { ResponseHandler } from '../../common/response.handler';
import { Loader } from '../../startup/loader';
import { Authorizer } from '../../auth/authorizer';
import { ReservationOrderItemValidator } from './reservation.order.item.validator';
import { ApiError } from '../../common/api.error';

///////////////////////////////////////////////////////////////////////////////////////

export class ReservationOrderItemController {
    //#region member variables and constructors

    _service: ReservationOrderItemService = null;

    _authorizer: Authorizer = null;

    constructor() {
        this._service = Loader.container.resolve(ReservationOrderItemService);
        this._authorizer = Loader.authorizer;
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'ReservationOrderItem.Create';
            const ReservationOrderItemDomainModel = await ReservationOrderItemValidator.create(request);
            const reservationorderitem = await this._service.create(ReservationOrderItemDomainModel);
            if (reservationorderitem == null) {
                throw new ApiError(400, 'Unable to create ReservationOrderItem.');
            }
            ResponseHandler.success(request, response, 'ReservationOrderItem Api added successfully!', 201, {
                ReservationOrderItem: reservationorderitem,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'ReservationOrderItem.GetById';
            //await this._authorizer.authorize(request, response);

            const id: string = await ReservationOrderItemValidator.getById(request);

            const reservationorderitem = await this._service.getById(id);
            if (reservationorderitem == null) {
                throw new ApiError(404, 'ReservationOrderItem not found.');
            }
            ResponseHandler.success(request, response, 'ReservationOrder Api retrieved successfully!', 200, {
                ReservationOrderItem: reservationorderitem,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getAllReservationOrderItem = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'ReservationOrderItem.GetAllReservationOrderItem';

            const reservationorderitem = await this._service.getAllReservationOrderItem();
            if (reservationorderitem == null) {
                throw new ApiError(404, 'ReservationOrderItem not found.');
            }
            ResponseHandler.success(request, response, '  All ReservationOrderItem  Api retrieved successfully!', 200, {
            ReservationOrderItem: reservationorderitem,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'ReservationOrderItem.Search';
            //await this._authorizer.authorize(request, response);

            const filters = await ReservationOrderItemValidator.search(request);

            const searchResults = await this._service.search(filters);
            const count = searchResults.Items.length;
            const message =
                count === 0 ? 'No records found!' : `Total ${count} ReservationOrderItem Api records retrieved successfully!`;

            ResponseHandler.success(request, response, message, 200, {
                ReservationOrderItemRecords: searchResults,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'ReservationOrderItem.Update';
            // await this._authorizer.authorize(request, response);

            const id: string = await ReservationOrderItemValidator.getById(request);
            const domainModel = await ReservationOrderItemValidator.update(request);
            const reservationorderitem = await this._service.update(id, domainModel);
            if (reservationorderitem == null) {
                throw new ApiError(404, ' ReservationOrderItem Api not found.');
            }
            ResponseHandler.success(request, response, ' ReservationOrderItem Api updated successfully!', 200, {
                ReservationOrderItem: reservationorderitem,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'ReservationOrderItem.Delete';            // await this._authorizer.authorize(request, response);

            const id: string = await ReservationOrderItemValidator.getById(request);
            await this._service.delete(id);
            ResponseHandler.success(request, response, 'ReservationOrderItem Api deleted successfully!', 200, null);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
 }

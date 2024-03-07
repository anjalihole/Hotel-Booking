/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
import express from 'express';

import { ReservationService } from '../../services/reservation/reservation.service';
import { ResponseHandler } from '../../common/response.handler';
import { Loader } from '../../startup/loader';
import { Authorizer } from '../../auth/authorizer';
import { ReservationValidator } from './reservation.validator';
import { ApiError } from '../../common/api.error';

///////////////////////////////////////////////////////////////////////////////////////

export class ReservationController {
    //#region member variables and constructors

    _service: ReservationService = null;

    _authorizer: Authorizer = null;

    constructor() {
        this._service = Loader.container.resolve(ReservationService);
        this._authorizer = Loader.authorizer;
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Reservation.Create';
            // await this._authorizer.authorize(request, response);

            const ReservationDomainModel = await ReservationValidator.create(request);
            const reservation = await this._service.create(ReservationDomainModel);
            if (reservation == null) {
                throw new ApiError(400, 'Unable to create reservation.');
            }
            ResponseHandler.success(request, response, 'Api Reservation added successfully!', 201, {
                Reservation: reservation,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Reservation.GetById';
            //await this._authorizer.authorize(request, response);

            const id: string = await ReservationValidator.getById(request);

            const reservation = await this._service.getById(id);
            if (reservation == null) {
                throw new ApiError(404, 'Reservation not found.');
            }
            ResponseHandler.success(request, response, 'Api Reservation retrieved successfully!', 200, {
                Reservation: reservation,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getAllReservation = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Reservation.GetAllReservation';

            // const id: string = await CustomerValidator.getAllCustomer(request);

            const reservation = await this._service.getAllReservation();
            if (reservation == null) {
                throw new ApiError(404, 'Reservation not found.');
            }
            ResponseHandler.success(request, response, 'Api  All Reservation retrieved successfully!', 200, {
                Reservation: reservation,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Reservation.Search';
            //await this._authorizer.authorize(request, response);

            const filters = await ReservationValidator.search(request);

            const searchResults = await this._service.search(filters);
            const count = searchResults.Items.length;
            const message =
                count === 0 ? 'No records found!' : `Total ${count} api Reservation records retrieved successfully!`;

            ResponseHandler.success(request, response, message, 200, {
                RoomRecords: searchResults,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Reservation.Update';
            // await this._authorizer.authorize(request, response);

            const id: string = await ReservationValidator.getById(request);
            const domainModel = await ReservationValidator.update(request);
            const reservation = await this._service.update(id, domainModel);
            if (reservation == null) {
                throw new ApiError(404, 'Api reservation not found.');
            }
            ResponseHandler.success(request, response, 'Api reservation updated successfully!', 200, {
                Reservation: reservation,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Reservation.Delete';      // await this._authorizer.authorize(request, response);

            const id: string = await ReservationValidator.getById(request);
            await this._service.delete(id);
            ResponseHandler.success(request, response, 'Api Reservation deleted successfully!', 200, null);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
 }


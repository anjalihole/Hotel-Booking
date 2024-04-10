/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable newline-per-chained-call */
/* eslint-disable key-spacing */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
import express from 'express';
import { body, validationResult, param, query } from 'express-validator';
import { ReservationOrderSearchFilters, } from '../../domain.types/reservation.order/reservation.order.search.types';
import { ReservationOrderDomainModel } from '../../domain.types/reservation.order/reservation.order.domain.model';
import { Helper } from '../../common/helper';
///////////////////////////////////////////////////////////////////////////////////////

export class ReservationOrderValidator {
    static getDomainModel = async (body: any): Promise<ReservationOrderDomainModel> => {
        let reservationorderModel: ReservationOrderDomainModel = null;

        reservationorderModel = {

            CustomerUserId: body.CustomerUserId || null,
            TotalCost: body.TotalCost ?? null,
            CheckInDate: body.CheckInDate ?? null,
            CheckOutDate: body.CheckOutDate ?? null,
            ReservationDateTime: body.ReservationDateTime || null,
            Status: body.Status ?? null,
            Discount: body.CheckInDate ?? null,
            Taxes: body.Taxes ?? null,
            TotalPayable: body.TotalPayable || null,
            AdvancePaid: body.AdvancePaid ?? null,
            AdvancePaymentDateTime: body.AdvancePaymentDateTime ?? null,
            BookingStaffUserId: body.BookingStaffUserId ?? null,
            Penalties: body.Penalties ?? null,

        };
        return reservationorderModel;
    };

    static create = async (request: express.Request): Promise<ReservationOrderDomainModel> => {

        await body('CustomerUserId').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('TotalCost').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('CheckInDate').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('CheckOutDate').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('ReservationDateTime').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('Status').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('Discount').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('Taxes').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('TotalPayable').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('AdvancePaid').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('AdvancePaymentDateTime').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('BookingStaffUserId').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('Penalties').exists().trim().escape().isLength({ min: 1 }).run(request);

        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return ReservationOrderValidator.getDomainModel(request.body);
    };

    static getById = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    static getAllReservationOrder = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    static update = async (request: express.Request): Promise<ReservationOrderDomainModel> => {

        await body('CustomerUserId').optional().isLength({ min: 1 }).trim().escape().run(request);
        await body('TotalCost').optional().trim().escape().isLength({ min: 1 }).run(request);
        await body('CheckInDate').optional().trim().escape().isLength({ min: 3 }).run(request);
        await body('CheckOutDate').optional().trim().escape().isLength({ min: 3 }).run(request);
        await body('ReservationDateTime').optional().isLength({ min: 1 }).trim().escape().run(request);
        await body('Status').optional().trim().escape().isLength({ min: 1 }).run(request);
        await body('Discount').optional().trim().escape().isLength({ min: 3 }).run(request);
        await body('Taxes').optional().trim().escape().isLength({ min: 3 }).run(request);
        await body('TotalPayable').optional().isLength({ min: 1 }).trim().escape().run(request);
        await body('AdvancePaid').optional().trim().escape().isLength({ min: 1 }).run(request);
        await body('AdvancePaymentDateTime').optional().trim().escape().isLength({ min: 3 }).run(request);
        await body('BookingStaffUserId').optional().trim().escape().isLength({ min: 3 }).run(request);
        await body('Penalties').optional().trim().escape().isLength({ min: 3 }).run(request);

        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return ReservationOrderValidator.getDomainModel(request.body);
    };

    static delete = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    static search = async (request: express.Request): Promise<ReservationOrderSearchFilters> => {

        await query('CustomerUserId').optional().trim().escape().run(request);

        await query('TotalCost').optional().trim().escape().run(request);

        await query('CheckInDate').optional().trim().escape().run(request);

        await query('CheckOutDate').optional().trim().escape().run(request);

        await query('ReservationDateTime').optional().trim().escape().run(request);

        await query('Status').optional().trim().escape().run(request);

        await query('Discount').optional().trim().escape().run(request);

        await query('Taxes').optional().trim().escape().run(request);
        
        await query('TotalPayable').optional().trim().escape().run(request);

        await query('AdvancePaid').optional().trim().escape().run(request);

        await query('BookingStaffUserId').optional().trim().escape().run(request);

        await query('Penalties').optional().trim().escape().run(request);

        await query('AdvancePaymentDateTime').optional().trim().escape().run(request);

        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return ReservationOrderValidator.getFilter(request);
    };

    private static getFilter(request): ReservationOrderSearchFilters {

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const pageIndex = request.query.pageIndex !== 'undefined' ? parseInt(request.query.pageIndex as string, 10) : 0;

        const itemsPerPage =
            request.query.itemsPerPage !== 'undefined' ? parseInt(request.query.itemsPerPage as string, 10) : 25;

        const filters: ReservationOrderSearchFilters = {

            CustomerUserId: request.query.CustomerUserId || null,
            TotalCost: request.query.TotalCost ?? null,
            CheckInDate: request.query.CheckInDate ?? null,
            CheckOutDate: request.query.CheckOutDate ?? null,
            ReservationDateTime: request.query.ReservationDateTime || null,
            Status: request.query.Status ?? null,
            Discount: request.query.Discount ?? null,
            Taxes: request.query.Taxes ?? null,
            TotalPayable: request.query.TotalPayable || null,
            AdvancePaid: request.query.AdvancePaid || null,
            AdvancePaymentDateTime: request.query.AdvancePaymentDateTime ?? null,
            BookingStaffUserId: request.query.BookingStaffUserId ?? null,
            Penalties: request.query.Penalties ?? null,
            OrderBy      : request.query.orderBy ?? 'CreatedAt',
            Order        : request.query.order ?? 'descending',
            PageIndex    : pageIndex,
            ItemsPerPage : itemsPerPage,
        };

        return filters;
    }
}

/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable newline-per-chained-call */
/* eslint-disable key-spacing */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
import express from 'express';
import { body, validationResult, param, query } from 'express-validator';
import { ReservationOrderItemSearchFilters, } from '../../domain.types/reservation.order.item/reservation.order.item.search.types';
import { ReservationOrderItemDomainModel } from '../../domain.types/reservation.order.item/reservation.order.item.domain.model';
import { Helper } from '../../common/helper';
///////////////////////////////////////////////////////////////////////////////////////

export class ReservationOrderItemValidator {
    static getDomainModel = async (body: any): Promise<ReservationOrderItemDomainModel> => {
        let reservationorderitemModel: ReservationOrderItemDomainModel = null;

        reservationorderitemModel = {
            ReservationOrderId: body.ReservationOrderId || null,
            RoomId: body.RoomId ?? null,
            Tax: body.Tax ?? null,
            Discount: body.Discount ?? null,
            Cost: body.Cost ?? null,
            TotalDays: body.TotalDays ?? null,

        };
        return reservationorderitemModel;
    };

    static create = async (request: express.Request): Promise<ReservationOrderItemDomainModel> => {
        await body('ReservationOrderId').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('RoomId').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('Tax').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('Discount').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('Cost').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('TotalDays').exists().trim().escape().isLength({ min: 1 }).run(request);

        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return ReservationOrderItemValidator.getDomainModel(request.body);
    };

    static search = async (request: express.Request): Promise<ReservationOrderItemSearchFilters> => {
     
        await query('ReservationOrderId').optional().trim().escape().run(request);

        await query('RoomId').optional().trim().escape().run(request);

        await query('Tax').optional().trim().escape().run(request);

        await query('Cost').optional().trim().escape().run(request);

        await query('TotalDays').optional().trim().escape().run(request);

        await query('Discount').optional().trim().escape().run(request);

        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return ReservationOrderItemValidator.getFilter(request);
    };

    static getById = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    static getAllReservationOrderItem = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    static update = async (request: express.Request): Promise<ReservationOrderItemDomainModel> => {
    
        await body('ReservationOrderId').optional().isLength({ min: 1 }).trim().escape().run(request);
        await body('RoomId').optional().trim().escape().isLength({ min: 1 }).run(request);
        await body('Tax').optional().trim().escape().isLength({ min: 1 }).run(request);
        await body('Cost').optional().trim().escape().isLength({ min: 1 }).run(request);
        await body('TotalDays').optional().trim().escape().isLength({ min: 1 }).run(request);
        await body('Discount').optional().trim().escape().isLength({ min: 1 }).run(request);
        
        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return ReservationOrderItemValidator.getDomainModel(request.body);
    };

    static delete = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    private static getFilter(request): ReservationOrderItemSearchFilters {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const pageIndex = request.query.pageIndex !== 'undefined' ? parseInt(request.query.pageIndex as string, 10) : 0;

        const itemsPerPage =
            request.query.itemsPerPage !== 'undefined' ? parseInt(request.query.itemsPerPage as string, 10) : 25;

        const filters: ReservationOrderItemSearchFilters = {
            ReservationOrderId: request.query.ReservationOrderId || null,
            RoomId: request.query.RoomId ?? null,
            Tax: request.query.Tax ?? null,
            Discount: request.query.Discount ?? null,
            Cost: request.query.Cost ?? null,
            TotalDays: request.query.TotalDays ?? null,
            OrderBy      : request.query.orderBy ?? 'CreatedAt',
            Order        : request.query.order ?? 'descending',
            PageIndex    : pageIndex,
            ItemsPerPage : itemsPerPage,
        };

        return filters;
    }
}

/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable newline-per-chained-call */
/* eslint-disable key-spacing */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
import express from 'express';
import { body, validationResult, param, query } from 'express-validator';
import { ReservationSearchFilters } from '/../src/domain.types/reservation/reservation.search.types';
import { ReservationDomainModel } from '/../src/domain.types/reservation/reservation.domain.model';
import { Helper } from '../../common/helper';
///////////////////////////////////////////////////////////////////////////////////////

export class ReservationValidator {
    static getDomainModel = async (body: any): Promise<ReservationDomainModel> => {
        let roomModel: ReservationDomainModel = null;

        roomModel = {
            CustomerId: body.CustomerId ?? null,
            RoomId: body.RoomId ?? null,
            CheckInDate: body.CheckInDate ?? null,
            CheckOutDate: body. CheckOutDate ?? null,
            TotalCost: body.TotalCost ?? null,
            Status: body.Status ?? null,
        };
        return roomModel;
    };

    static create = async (request: express.Request): Promise<ReservationDomainModel> => {
        await body('CustomerId').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('RoomId').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('CheckInDate').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('CheckOutDate').exists().trim().escape().isLength({ min: 10 }).run(request);
        await body('TotalCost').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('Status').exists().trim().escape().isLength({ min: 1 }).run(request);
        
        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return ReservationValidator.getDomainModel(request.body);
    };

        static getById = async (request: express.Request): Promise<string> => {
            await param('id').trim().escape().isUUID().run(request);

            const result = validationResult(request);

            if (!result.isEmpty()) {
                Helper.handleValidationError(result);
            }

            return request.params.id;
        };
        
        static getAllReservation = async (request: express.Request): Promise<string> => {
            await param('id').trim().escape().isUUID().run(request);
    
            const result = validationResult(request);
    
            if (!result.isEmpty()) {
                Helper.handleValidationError(result);
            }
    
            return request.params.id;
        };

    static update = async (request: express.Request): Promise<ReservationDomainModel> => {
        await body('CustomerId').optional().isLength({ min: 1 }).trim().escape().run(request);
        await body('RoomId').optional().isLength({ min: 1 }).trim().escape().run(request);
        await body('CheckInDate').optional().trim().escape().isLength({ min: 6 }).run(request);
        await body('CheckOutDate').optional().trim().escape().isLength({ min: 1 }).run(request);
        await body('TotalCost').optional().trim().escape().isLength({ min: 1 }).run(request);
        await body('Status').optional().trim().escape().isLength({ min: 1 }).run(request);
        
        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return ReservationValidator.getDomainModel(request.body);
    };

    static delete = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    static search = async (request: express.Request): Promise<ReservationSearchFilters> => {
        await query('CustomerId').optional().trim().escape().run(request);

        await query('RoomId').optional().trim().escape().run(request);

        await query('CheckInDate').optional().trim().escape().run(request);

        await query('CheckOutDate').optional().trim().escape().run(request);

        await query('TotalCost').optional().trim().escape().run(request);

        await query('Status').optional().trim().escape().run(request);

        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return ReservationValidator.getFilter(request);
    };

    private static getFilter(request): ReservationSearchFilters {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const pageIndex = request.query.pageIndex !== 'undefined' ? parseInt(request.query.pageIndex as string, 10) : 0;

        const itemsPerPage =
            request.query.itemsPerPage !== 'undefined' ? parseInt(request.query.itemsPerPage as string, 10) : 25;

        const filters: ReservationSearchFilters = {
            CustomerId: request.query.CustomerId || null,
            RoomId: request.query.RoomId || null,
            CheckInDate: request.query.CheckInDate || null,
            CheckOutDate: request.query.CheckOutDate || null,
            TotalCost: request.query.TotalCost || null,
            Status: request.query.Status || null,
            OrderBy      : request.query.orderBy || 'CreatedAt',
            Order        : request.query.order || 'descending',
            PageIndex    : pageIndex,
            ItemsPerPage : itemsPerPage,
           
        };

        return filters;
    }
}

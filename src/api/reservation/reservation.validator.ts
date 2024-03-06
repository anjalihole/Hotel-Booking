/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable newline-per-chained-call */
/* eslint-disable key-spacing */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
import express from 'express';
import { body, validationResult, param, query } from 'express-validator';
//import { ReservationSearchFilters } from '/../src/domain.types/reservation/reservation.search.types';
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

    //     static getById = async (request: express.Request): Promise<string> => {
    //         await param('id').trim().escape().isUUID().run(request);

    //         const result = validationResult(request);

    //         if (!result.isEmpty()) {
    //             Helper.handleValidationError(result);
    //         }

    //         return request.params.id;
    //     };
        
    // static getAllRoom = async (request: express.Request): Promise<string> => {
    //     await param('id').trim().escape().isUUID().run(request);

    //     const result = validationResult(request);

    //     if (!result.isEmpty()) {
    //         Helper.handleValidationError(result);
    //     }

    //     return request.params.id;
    // };

    // static update = async (request: express.Request): Promise<RoomDomainModel> => {
    //     await body('HotelId').optional().isLength({ min: 1 }).trim().escape().run(request);
    //     await body('RoomNumber').optional().isLength({ min: 1 }).trim().escape().run(request);
    //     await body('Phone').optional().trim().escape().isLength({ min: 6 }).run(request);
    //     await body('RoomType').optional().trim().escape().isLength({ min: 1 }).run(request);
    //     await body('BedType').optional().trim().escape().isLength({ min: 1 }).run(request);
    //     await body('RoomImage').optional().trim().escape().isLength({ min: 1 }).run(request);
    //     await body('Price').optional().trim().escape().isLength({ min: 2 }).run(request);
    //     await body('Taxes').optional().trim().escape().isLength({ min: 1 }).run(request);
    //     await body('Description').optional().trim().escape().isLength({ min: 30 }).run(request);
    //     await body('BlockRoom').optional().trim().escape().isLength({ min: 1 }).run(request);
    //     await body('RoomPerPerson').optional().trim().escape().isLength({ min: 1 }).run(request);
    //     await body('CostPerDay').optional().trim().escape().isLength({ min: 1 }).run(request);
    //     await body('Inventory').optional().trim().escape().isLength({ min: 1 }).run(request);

    //     const result = validationResult(request);
    //     if (!result.isEmpty()) {
    //         Helper.handleValidationError(result);
    //     }
    //     return RoomValidator.getDomainModel(request.body);
    // };

    // static delete = async (request: express.Request): Promise<string> => {
    //     await param('id').trim().escape().isUUID().run(request);

    //     const result = validationResult(request);

    //     if (!result.isEmpty()) {
    //         Helper.handleValidationError(result);
    //     }

    //     return request.params.id;
    // };

    // static search = async (request: express.Request): Promise<RoomSearchFilters> => {
    //     await query('HotelId').optional().trim().escape().run(request);

    //     await query('RoomNumber').optional().trim().escape().run(request);

    //     await query('phone').optional().trim().escape().run(request);

    //     await query('RoomType').optional().trim().escape().run(request);

    //     await query('BedType').optional().trim().escape().run(request);

    //     await query('RoomImage').optional().trim().escape().run(request);

    //     await query('Price').optional().trim().escape().run(request);

    //     await query('Taxes').optional().trim().escape().run(request);

    //     await query('Description').optional().trim().escape().run(request);

    //     await query('BlockRoom').optional().trim().escape().run(request);

    //     await query('RoomPerPerson').optional().trim().escape().run(request);

    //     await query('CostPerDay').optional().trim().escape().run(request);

    //     await query('Inventory').optional().trim().escape().run(request);

    //     const result = validationResult(request);
    //     if (!result.isEmpty()) {
    //         Helper.handleValidationError(result);
    //     }

    //     return RoomValidator.getFilter(request);
    // };

    // private static getFilter(request): RoomSearchFilters {
    //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //     const pageIndex = request.query.pageIndex !== 'undefined' ? parseInt(request.query.pageIndex as string, 10) : 0;

    //     const itemsPerPage =
    //         request.query.itemsPerPage !== 'undefined' ? parseInt(request.query.itemsPerPage as string, 10) : 25;

    //     const filters: RoomSearchFilters = {
    //         HotelId: request.query.HotelId || null,
    //         RoomNumber: request.query.RoomNumber || null,
    //         Phone: request.query.Phone || null,
    //         RoomType: request.query.RoomType || null,
    //         BedType: request.query.BedType || null,
    //         RoomImage: request.query.RoomImage || null,
    //         Price: request.query.Price || null,
    //         Taxes: request.query.Taxes || null,
    //         Description: request.query.Description || null,
    //         BlockRoom: request.query.BlockRoom || null,
    //         RoomPerPerson: request.query.RoomPerPerson || null,
    //         CostPerDay: request.query.CostPerDay || null,
    //         Inventory: request.query.Inventory || null,
    //         OrderBy      : request.query.orderBy || 'CreatedAt',
    //         Order        : request.query.order || 'descending',
    //         PageIndex    : pageIndex,
    //         ItemsPerPage : itemsPerPage,
    //     };

    //     return filters;
    // }
}

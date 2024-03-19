/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable newline-per-chained-call */
/* eslint-disable key-spacing */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
import express from 'express';
import { body, validationResult, param, query } from 'express-validator';
import { RoomSearchFilters } from '/../src/domain.types/room/room.search.types';
import { RoomDomainModel } from '/../src/domain.types/room/room.domain.model';
import { Helper } from '../../common/helper';
///////////////////////////////////////////////////////////////////////////////////////

export class RoomValidator {
    static getDomainModel = async (body: any): Promise<RoomDomainModel> => {
        let roomModel: RoomDomainModel = null;

        roomModel = {
            id: body.id ?? null,
            Name: body.Name ?? null,
            Phone: body.Phone ?? null,
            RoomTypeId: body. RoomTypeId ?? null,
            RoomNumber: body.RoomNumber ?? null,
            Description: body.Description ?? null,
            Blocked: body.Blocked ?? null,
            Status: body.Status ?? null,
            Inventory: body.Inventory ?? null,

        };
        return roomModel;
    };

    static create = async (request: express.Request): Promise<RoomDomainModel> => {
        await body('id').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('Name').exists().trim().escape().isLength({ min: 1 }).isLength({ max: 64 }).run(request);
        await body('RoomTypeId').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('Phone').exists().trim().escape().isLength({ min: 10 }).run(request);
        await body('RoomNumber').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('Blocked').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('Status').exists().trim().escape().isLength({ min: 1 }).isLength({ max: 500 }).run(request);
        await body('Inventory').exists().trim().escape().isLength({ min: 1 }).isLength({ max: 500 }).run(request);
        await body('Description').exists().trim().escape().isLength({ min: 1 }).isLength({ max: 200 }).run(request);
        
        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return RoomValidator.getDomainModel(request.body);
    };

        static getById = async (request: express.Request): Promise<string> => {
            await param('id').trim().escape().isUUID().run(request);

            const result = validationResult(request);

            if (!result.isEmpty()) {
                Helper.handleValidationError(result);
            }

            return request.params.id;
        };
        
    static getAllRoom = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    static update = async (request: express.Request): Promise<RoomDomainModel> => {
        await body('id').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('Name').exists().trim().escape().isLength({ min: 1 }).isLength({ max: 64 }).run(request);
        await body('RoomTypeId').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('Phone').exists().trim().escape().isLength({ min: 10 }).run(request);
        await body('RoomNumber').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('Blocked').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('Status').exists().trim().escape().isLength({ min: 1 }).isLength({ max: 500 }).run(request);
        await body('Inventory').exists().trim().escape().isLength({ min: 1 }).isLength({ max: 500 }).run(request);
        await body('Description').exists().trim().escape().isLength({ min: 1 }).isLength({ max: 200 }).run(request);
        
        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return RoomValidator.getDomainModel(request.body);
    };

    static delete = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    static search = async (request: express.Request): Promise<RoomSearchFilters> => {
        await query('id').optional().trim().escape().run(request);

        await query('Name').optional().trim().escape().run(request);

        await query('RoomNumber').optional().trim().escape().run(request);

        await query('phone').optional().trim().escape().run(request);

        await query('RoomTypeId').optional().trim().escape().run(request);

        await query('Status').optional().trim().escape().run(request);

        await query('Description').optional().trim().escape().run(request);

        await query('Blocked').optional().trim().escape().run(request);

        await query('Inventory').optional().trim().escape().run(request);

        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return RoomValidator.getFilter(request);
    };

    private static getFilter(request): RoomSearchFilters {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const pageIndex = request.query.pageIndex !== 'undefined' ? parseInt(request.query.pageIndex as string, 10) : 0;

        const itemsPerPage =
            request.query.itemsPerPage !== 'undefined' ? parseInt(request.query.itemsPerPage as string, 10) : 25;

        const filters: RoomSearchFilters = {
            id: request.query.id || null,
            RoomNumber: request.query.RoomNumber || null,
            Phone: request.query.Phone || null,
            RoomTypeId: request.query.RoomTypeId || null,
            Name: request.query.Name || null,
            Status: request.query.Status || null,
            Description: request.query.Description || null,
            Blocked: request.query.Blocked || null,
            Inventory: request.query.Inventory || null,
            OrderBy      : request.query.orderBy || 'CreatedAt',
            Order        : request.query.order || 'descending',
            PageIndex    : pageIndex,
            ItemsPerPage : itemsPerPage,
        };

        return filters;
    }
}

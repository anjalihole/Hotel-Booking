/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable newline-per-chained-call */
/* eslint-disable key-spacing */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
import express from 'express';
import { body, validationResult, param, query } from 'express-validator';
import { RoomTypesSearchFilters } from '/../src/domain.types/room.types/room.types.search.types';
import { RoomTypesDomainModel } from '../../domain.types/room.types/room.types.domain.model';
import { Helper } from '../../common/helper';
///////////////////////////////////////////////////////////////////////////////////////

export class RoomTypesValidator {
    static getDomainModel = async (body: any): Promise<RoomTypesDomainModel> => {
        let roomtypesModel: RoomTypesDomainModel = null;

        roomtypesModel = {
            TypeName: body.TypeName ?? null,
            TypeDescription: body.TypeDescription ?? null,
            StandardRate: body. StandardRate ?? null,
            Options: body.Options ?? null,
            OccupancyAdult: body.OccupancyAdult ?? null,
            OccupancyChildren: body. OccupancyChildren ?? null,
        };
        return roomtypesModel;
    };

    static create = async (request: express.Request): Promise<RoomTypesDomainModel> => {

        await body('TypeName').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('TypeDescription').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('StandardRate').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('Options').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('OccupancyAdult').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('OccupancyChildren').exists().trim().escape().isLength({ min: 1 }).run(request);
        
        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return RoomTypesValidator.getDomainModel(request.body);
    };

        static getById = async (request: express.Request): Promise<string> => {
            await param('id').trim().escape().isUUID().run(request);

            const result = validationResult(request);

            if (!result.isEmpty()) {
                Helper.handleValidationError(result);
            }

            return request.params.id;
        };
        
    static getAllRoomTypes = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    static update = async (request: express.Request): Promise<RoomTypesDomainModel> => {

        await body('TypeName').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('TypeDescription').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('StandardRate').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('Options').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('OccupancyAdult').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('OccupancyChildren').exists().trim().escape().isLength({ min: 1 }).run(request);

        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return RoomTypesValidator.getDomainModel(request.body);
    };

    static delete = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    static search = async (request: express.Request): Promise<RoomTypesSearchFilters> => {

        await query('TypeName').optional().trim().escape().run(request);

        await query('TypeDescription').optional().trim().escape().run(request);

        await query('StandardRate').optional().trim().escape().run(request);
        
        await query('Options').optional().trim().escape().run(request);

        await query('OccupancyAdult').optional().trim().escape().run(request);

        await query('OccupancyChildren').optional().trim().escape().run(request);

        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return RoomTypesValidator.getFilter(request);
    };

    private static getFilter(request): RoomTypesSearchFilters {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const pageIndex = request.query.pageIndex !== 'undefined' ? parseInt(request.query.pageIndex as string, 10) : 0;

        const itemsPerPage =
            request.query.itemsPerPage !== 'undefined' ? parseInt(request.query.itemsPerPage as string, 10) : 25;

        const filters: RoomTypesSearchFilters = {
            TypeName: request.query.TypeName || null,
            TypeDescription: request.query.TypeDescription || null,
            StandardRate: request.query.StandardRate || null,
            Options: request.query.Options || null,
            OccupancyAdult: request.query.OccupancyAdult || null,
            OccupancyChildren: request.query.OccupancyChildren || null,
            OrderBy      : request.query.orderBy || 'CreatedAt',
            Order        : request.query.order || 'descending',
            PageIndex    : pageIndex,
            ItemsPerPage : itemsPerPage,
        };

        return filters;
    }
}

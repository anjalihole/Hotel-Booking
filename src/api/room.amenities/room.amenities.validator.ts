/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable newline-per-chained-call */
/* eslint-disable key-spacing */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
import express from 'express';
import { body, validationResult, param, query } from 'express-validator';
import { RoomAmenitiesSearchFilters } from '/../src/domain.types/room.amenities/room.amenities.search.types';
import { RoomAmenitiesDomainModel } from '/../src/domain.types/room.amenities/room.amenities.domain.model';
import { Helper } from '../../common/helper';
///////////////////////////////////////////////////////////////////////////////////////

export class RoomAmenitiesValidator {
    static getDomainModel = async (body: any): Promise<RoomAmenitiesDomainModel> => {
        let roomamenitiesModel: RoomAmenitiesDomainModel = null;

        roomamenitiesModel = {
            AmenityName: body.AmenityName ?? null,
            HotelId: body.HotelId ?? null,
            RoomId: body. RoomId ?? null,

        };
        return roomamenitiesModel;
    };

    static create = async (request: express.Request): Promise<RoomAmenitiesDomainModel> => {
        await body('AmenityName').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('HotelId').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('RoomId').exists().trim().escape().isLength({ min: 1 }).run(request);
        
        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return RoomAmenitiesValidator.getDomainModel(request.body);
    };

        static getById = async (request: express.Request): Promise<string> => {
            await param('id').trim().escape().isUUID().run(request);

            const result = validationResult(request);

            if (!result.isEmpty()) {
                Helper.handleValidationError(result);
            }

            return request.params.id;
        };

    static update = async (request: express.Request): Promise<RoomAmenitiesDomainModel> => {
        await body('AmenityName').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('HotelId').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('RoomId').exists().trim().escape().isLength({ min: 10 }).run(request);
        
        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return RoomAmenitiesValidator.getDomainModel(request.body);
    };

    static delete = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    static search = async (request: express.Request): Promise<RoomAmenitiesSearchFilters> => {

        await query('AmenityName').optional().trim().escape().run(request);

        await query('HotelId').optional().trim().escape().run(request);

        await query('RoomId').optional().trim().escape().run(request);

        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return RoomAmenitiesValidator.getFilter(request);
    };

    private static getFilter(request): RoomAmenitiesSearchFilters {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const pageIndex = request.query.pageIndex !== 'undefined' ? parseInt(request.query.pageIndex as string, 10) : 0;

        const itemsPerPage =
            request.query.itemsPerPage !== 'undefined' ? parseInt(request.query.itemsPerPage as string, 10) : 25;

        const filters: RoomAmenitiesSearchFilters = {
            AmenityName: request.query.AmenityName || null,
            HotelId: request.query.HotelId || null,
            RoomId: request.query.RoomId || null,
            OrderBy      : request.query.orderBy || 'CreatedAt',
            Order        : request.query.order || 'descending',
            PageIndex    : pageIndex,
            ItemsPerPage : itemsPerPage,
        };

        return filters;
    }
}

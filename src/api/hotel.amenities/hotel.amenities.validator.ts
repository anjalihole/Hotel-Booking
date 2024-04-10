/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable newline-per-chained-call */
/* eslint-disable key-spacing */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
import express from 'express';
import { body, validationResult, param, query } from 'express-validator';
import { HotelAmenitiesSearchFilters, } from '../../domain.types/hotel.amenities/hotel.amenities.search.types';
import { HotelAmenitiesDomainModel } from '../../domain.types/hotel.amenities/hotel.amenities.domain.model';
import { Helper } from '../../common/helper';
///////////////////////////////////////////////////////////////////////////////////////

export class HotelAmenitiesValidator {
    static getDomainModel = async (body: any): Promise<HotelAmenitiesDomainModel> => {
        let hotelamenitiesModel: HotelAmenitiesDomainModel = null;

        hotelamenitiesModel = {
            AminityName: body.AminityName || null,
            HotelId: body.HotelId ?? null,
        };
        return hotelamenitiesModel;
    };

    static create = async (request: express.Request): Promise<HotelAmenitiesDomainModel> => {
        await body('AminityName').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('HotelId').exists().trim().escape().isLength({ min: 1 }).run(request);
        
        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return HotelAmenitiesValidator.getDomainModel(request.body);
    };

    static search = async (request: express.Request): Promise<HotelAmenitiesSearchFilters> => {
        await query('AminityName').optional().trim().escape().run(request);

        await query('HotelId').optional().trim().escape().run(request);

        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return HotelAmenitiesValidator.getFilter(request);
    };

    static getById = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    static getAllHotelAmenities = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    static update = async (request: express.Request): Promise<HotelAmenitiesDomainModel> => {
        await body('AminityName').optional().isLength({ min: 1 }).trim().escape().run(request);
        await body('HotelId').optional().trim().escape().isLength({ min: 10 }).run(request);
    
        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return HotelAmenitiesValidator.getDomainModel(request.body);
    };

    static delete = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    private static getFilter(request): HotelAmenitiesSearchFilters {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const pageIndex = request.query.pageIndex !== 'undefined' ? parseInt(request.query.pageIndex as string, 10) : 0;

        const itemsPerPage =
            request.query.itemsPerPage !== 'undefined' ? parseInt(request.query.itemsPerPage as string, 10) : 25;

        const filters: HotelAmenitiesSearchFilters = {
            AminityName: request.query.AminityName || null,
            HotelId: request.query.HotelId ?? null,
            OrderBy      : request.query.orderBy ?? 'CreatedAt',
            Order        : request.query.order ?? 'descending',
            PageIndex    : pageIndex,
            ItemsPerPage : itemsPerPage,
        };

        return filters;
    }
}

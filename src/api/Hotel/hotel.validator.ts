/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable newline-per-chained-call */
/* eslint-disable key-spacing */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
import express from 'express';
import { body, validationResult, param, query } from 'express-validator';
import { HotelSearchFilters, HotelSearchResults } from '/../src/domain.types/hotel/hotel.search.types';
import { HotelDomainModel } from '/../src/domain.types/hotel/hotel.domain.model';
import { Helper } from '../../common/helper';
///////////////////////////////////////////////////////////////////////////////////////

export class HotelValidator {
    static getDomainModel = async (body: any): Promise<HotelDomainModel> => {
        let hotelModel: HotelDomainModel = null;

        hotelModel = {
            HotelName: body.HotelName ?? null,
            Phone: body.Phone ?? null,
            Email: body.Email ?? null,
            Address: body.Address ?? null,
        };
        return hotelModel;
    };

    static create = async (request: express.Request): Promise<HotelDomainModel> => {
        await body('HotelName').exists().trim().escape().isLength({ min: 3 }).run(request);
        await body('Address').exists().trim().escape().isLength({ min: 3 }).run(request);
        await body('Phone').exists().trim().escape().isLength({ min: 10 }).run(request);
        await body('Email').exists().trim().escape().isEmail().isLength({ min: 3 }).run(request);

        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return HotelValidator.getDomainModel(request.body);
    };

    static search = async (request: express.Request): Promise<HotelSearchFilters> => {
        await query('HotelName').optional().trim().escape().run(request);

        await query('phone').optional().trim().escape().run(request);

        await query('email').optional().trim().escape().run(request);

        await query('Address').optional().trim().escape().run(request);

        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return HotelValidator.getFilter(request);
    };

    static getById = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    static getAllHotel = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    static update = async (request: express.Request): Promise<HotelDomainModel> => {
        await body('Name').optional().isLength({ min: 1 }).trim().escape().run(request);
        await body('Phone').optional().trim().escape().isLength({ min: 10 }).run(request);
        await body('Email').optional().trim().escape().isEmail().isLength({ min: 3 }).run(request);
        await body('Address').optional().trim().escape().isLength({ min: 6 }).run(request);
        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return HotelValidator.getDomainModel(request.body);
    };

    static delete = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    private static getFilter(request): HotelSearchFilters {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const pageIndex = request.query.pageIndex !== 'undefined' ? parseInt(request.query.pageIndex as string, 10) : 0;

        const itemsPerPage =
            request.query.itemsPerPage !== 'undefined' ? parseInt(request.query.itemsPerPage as string, 10) : 25;

        const filters: HotelSearchFilters = {
            HotelName: request.query.HotelName ?? null,
            Phone: request.query.Phone ?? null,
            Email: request.query.Email ?? null,
            Address: request.query.Address ?? null,
            OrderBy      : request.query.orderBy ?? 'CreatedAt',
            Order        : request.query.order ?? 'descending',
            PageIndex    : pageIndex,
            ItemsPerPage : itemsPerPage,
        };

        return filters;
    }
}

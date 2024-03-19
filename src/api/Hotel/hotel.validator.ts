/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable newline-per-chained-call */
/* eslint-disable key-spacing */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
import express from 'express';
import { body, validationResult, param, query } from 'express-validator';
import { HotelSearchFilters, } from '../../domain.types/Hotel/hotel.search.types';
import { HotelDomainModel } from '../../domain.types/Hotel/hotel.domain.model';
import { Helper } from '../../common/helper';
///////////////////////////////////////////////////////////////////////////////////////

export class HotelValidator {
    static getDomainModel = async (body: any): Promise<HotelDomainModel> => {
        let hotelModel: HotelDomainModel = null;

        hotelModel = {
            Name: body.HotelName ?? null,
            Phone: body.Phone ?? null,
            Email: body.Email ?? null,
            AddressId: body.Address ?? null,
            Description: body.Description ?? null,
            CheckInTime: body.CheckInTime ?? null,
            CheckOutTime: body.CheckOutTime ?? null,
            OwnerUserId: body.OwnerUserId ?? null,
            Photos: body.Photos ?? null,
        };
        return hotelModel;
    };

    static create = async (request: express.Request): Promise<HotelDomainModel> => {
        await body('Name').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('AddressId').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('Phone').exists().trim().escape().isLength({ min: 10 }).run(request);
        await body('Email').exists().trim().escape().isEmail().isLength({ min: 3 }).run(request);
        await body('Description').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('CheckInTime').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('CheckOutTime').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('OwnerUserId').exists().trim().escape().isEmail().isLength({ min: 1 }).run(request);
        await body('Photos').exists().trim().escape().isEmail().isLength({ min: 1 }).run(request);

        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return HotelValidator.getDomainModel(request.body);
    };

    static search = async (request: express.Request): Promise<HotelSearchFilters> => {
        await query('Name').optional().trim().escape().run(request);

        await query('phone').optional().trim().escape().run(request);

        await query('email').optional().trim().escape().run(request);

        await query('AddressId').optional().trim().escape().run(request);

        await query('Description').optional().trim().escape().run(request);

        await query('CheckInTime').optional().trim().escape().run(request);

        await query('CheckOutTime').optional().trim().escape().run(request);

        await query('OwnerUserId').optional().trim().escape().run(request);

        await query('Photos').optional().trim().escape().run(request);

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
        await body('AddressId').optional().trim().escape().isLength({ min: 1 }).run(request);
        await body('Description').optional().isLength({ min: 1 }).trim().escape().run(request);
        await body('CheckInTime').optional().trim().escape().isLength({ min: 10 }).run(request);
        await body('CheckOutTime').optional().trim().escape().isEmail().isLength({ min: 3 }).run(request);
        await body('OwnerUserId').optional().trim().escape().isLength({ min: 1 }).run(request);
        await body('Photos').optional().trim().escape().isLength({ min: 1 }).run(request);

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
            Name: request.query.HotelName ?? null,
            Phone: request.query.Phone ?? null,
            Email: request.query.Email ?? null,
            AddressId: request.query.AddressId ?? null,
            Description: request.query.Description ?? null,
            CheckInTime: request.query.CheckInTime ?? null,
            CheckOutTime: request.query.CheckOutTime ?? null,
            OwnerUserId: request.query.OwnerUserId ?? null,
            Photos: request.query.Photos ?? null,
            OrderBy      : request.query.orderBy ?? 'CreatedAt',
            Order        : request.query.order ?? 'descending',
            PageIndex    : pageIndex,
            ItemsPerPage : itemsPerPage,
        };

        return filters;
    }
}

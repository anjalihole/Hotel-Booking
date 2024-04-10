/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable newline-per-chained-call */
/* eslint-disable key-spacing */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
import express from 'express';
import { body, validationResult, param, query } from 'express-validator';
import { HotelPhotosSearchFilters, } from '../../domain.types/hotel.photos/hotel.photos.search.types';
import { HotelPhotosDomainModel } from '../../domain.types/hotel.photos/hotel.photos.domain.model';
import { Helper } from '../../common/helper';
///////////////////////////////////////////////////////////////////////////////////////

export class HotelPhotosValidator {
    static getDomainModel = async (body: any): Promise<HotelPhotosDomainModel> => {
        let hotelphotosModel: HotelPhotosDomainModel = null;

        hotelphotosModel = {

            FileResourceId: body.FileResourceId || null,
            HotelId: body.HotelId ?? null,
            RoomTypeId: body.RoomTypeId ?? null,
        };
        return hotelphotosModel;
    };

    static create = async (request: express.Request): Promise<HotelPhotosDomainModel> => {
        await body('FileResourceId').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('HotelId').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('RoomTypeId').exists().trim().escape().isLength({ min: 10 }).run(request);

        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return HotelPhotosValidator.getDomainModel(request.body);
    };

    static search = async (request: express.Request): Promise<HotelPhotosSearchFilters> => {

        await query('FileResourceId').optional().trim().escape().run(request);

        await query('HotelId').optional().trim().escape().run(request);

        await query('RoomTypeId').optional().trim().escape().run(request);

        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return HotelPhotosValidator.getFilter(request);
    };

    static getById = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    static getAllHotelPhotos = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    static update = async (request: express.Request): Promise<HotelPhotosDomainModel> => {
        
        await body('FileResourceId').optional().isLength({ min: 1 }).trim().escape().run(request);
        await body('HotelId').optional().trim().escape().isLength({ min: 10 }).run(request);
        await body('RoomTypeId').optional().trim().escape().isLength({ min: 3 }).run(request);
    
        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return HotelPhotosValidator.getDomainModel(request.body);
    };

    static delete = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    private static getFilter(request): HotelPhotosSearchFilters {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const pageIndex = request.query.pageIndex !== 'undefined' ? parseInt(request.query.pageIndex as string, 10) : 0;

        const itemsPerPage =
            request.query.itemsPerPage !== 'undefined' ? parseInt(request.query.itemsPerPage as string, 10) : 25;

        const filters: HotelPhotosSearchFilters = {

            FileResourceId: request.query.FileResourceId || null,
            HotelId: request.query.HotelId ?? null,
            RoomTypeId: request.query.RoomTypeId ?? null,
            OrderBy      : request.query.orderBy ?? 'CreatedAt',
            Order        : request.query.order ?? 'descending',
            PageIndex    : pageIndex,
            ItemsPerPage : itemsPerPage,
        };

        return filters;
    }
}

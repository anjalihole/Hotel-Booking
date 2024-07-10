/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable newline-per-chained-call */
/* eslint-disable key-spacing */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
import express from 'express';
import { body, validationResult, param, query } from 'express-validator';
import { HotelReviewSearchFilters, } from '../../domain.types/hotel.review/hotel.review.search.types';
import { HotelReviewDomainModel } from '../../domain.types/hotel.review/hotel.review.domain.model';
import { Helper } from '../../common/helper';
///////////////////////////////////////////////////////////////////////////////////////

export class HotelReviewValidator {
    static getDomainModel = async (body: any): Promise<HotelReviewDomainModel> => {
        let hotelreviewModel: HotelReviewDomainModel = null;

        hotelreviewModel = {
            HotelId: body.HotelId || null,
            ReviewUserId: body.ReviewUserId ?? null,
            Rating: body.Rating ?? null,
            ReviewTitle: body.ReviewTitle ?? null,
            ReviewDescription: body.ReviewDescription ?? null,
            ReviewTimeStamp: body.ReviewTimeStamp ?? null,
        };
        return hotelreviewModel;
    };

    static create = async (request: express.Request): Promise<HotelReviewDomainModel> => {

        await body('HotelId').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('ReviewUserId').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('Rating').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('ReviewTitle').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('ReviewDescription').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('ReviewTimeStamp').exists().trim().escape().isLength({ min: 1 }).run(request);

        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return HotelReviewValidator.getDomainModel(request.body);
    };

    static search = async (request: express.Request): Promise<HotelReviewSearchFilters> => {

        await query('HotelId').optional().trim().escape().run(request);

        await query('ReviewUserId').optional().trim().escape().run(request);

        await query('ReviewTitle').optional().trim().escape().run(request);

        await query('ReviewDescription').optional().trim().escape().run(request);

        await query('ReviewTimeStamp').optional().trim().escape().run(request);

        await query('Rating').optional().trim().escape().run(request);

        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return HotelReviewValidator.getFilter(request);
    };

    static getById = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    static update = async (request: express.Request): Promise<HotelReviewDomainModel> => {

        await body('HotelId').optional().isLength({ min: 1 }).trim().escape().run(request);
        await body('ReviewUserId').optional().trim().escape().isLength({ min: 1 }).run(request);
        await body('Rating').optional().trim().escape().isLength({ min: 1 }).run(request);
        await body('ReviewTitle').optional().trim().escape().isLength({ min: 1 }).run(request);
        await body('ReviewDescription').optional().isLength({ min: 1 }).trim().escape().run(request);
        await body('ReviewTimeStamp').optional().trim().escape().isLength({ min: 10 }).run(request);
        
        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return HotelReviewValidator.getDomainModel(request.body);
    };

    static delete = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    private static getFilter(request): HotelReviewSearchFilters {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const pageIndex = request.query.pageIndex !== 'undefined' ? parseInt(request.query.pageIndex as string, 10) : 0;

        const itemsPerPage =
            request.query.itemsPerPage !== 'undefined' ? parseInt(request.query.itemsPerPage as string, 10) : 25;

        const filters: HotelReviewSearchFilters = {

            HotelId: request.query.HotelId || null,
            ReviewUserId: request.query.ReviewUserId ?? null,
            Rating: request.query.Rating ?? null,
            ReviewTitle: request.query.ReviewTitle ?? null,
            ReviewDescription: request.query.ReviewDescription ?? null,
            ReviewTimeStamp: request.query.ReviewTimeStamp ?? null,
            OrderBy      : request.query.orderBy ?? 'CreatedAt',
            Order        : request.query.order ?? 'descending',
            PageIndex    : pageIndex,
            ItemsPerPage : itemsPerPage,
        };

        return filters;
    }
}

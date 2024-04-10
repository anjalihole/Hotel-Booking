/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable newline-per-chained-call */
/* eslint-disable key-spacing */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
import express from 'express';
import { body, validationResult, param, query } from 'express-validator';
import { AddressSearchFilters } from '/../src/domain.types/address/address.search.types';
import { AddressDomainModel } from '/../src/domain.types/address/address.domain.model';

import { Helper } from '../../common/helper';
///////////////////////////////////////////////////////////////////////////////////////

export class AddressValidator {
    static getDomainModel = async (body: any): Promise<AddressDomainModel > => {
        let addressModel: AddressDomainModel = null;

       addressModel = {
            AddressLine1: body.AddressLine1 ?? null,
            AddressLine2: body. AddressLine2 ?? null,
            Street: body.Street ?? null,
            City:body.City ?? null,
            State:body.State ?? null,
            Country:body.Country ?? null,
            ZipCode:body.ZipCode ?? null,

        };
        return addressModel;
    };

    static create = async (request: express.Request): Promise<AddressDomainModel> => {
        await body('AddressLine1').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('AddressLine2').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('Street').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('City').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('State').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('Country').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('ZipCode').exists().trim().escape().isLength({ min: 1 }).run(request);

        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return AddressValidator.getDomainModel(request.body);
    };

    static getById = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    static getAllAddress = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    static update = async (request: express.Request): Promise<AddressDomainModel> => {
    await body('AddressLine1').exists().trim().escape().isLength({ min: 1 }).run(request);
    await body('AddressLine2').exists().trim().escape().isLength({ min: 1 }).run(request);
    await body('Street').exists().trim().escape().isLength({ min: 1 }).run(request);
    await body('City').exists().trim().escape().isLength({ min: 1 }).run(request);
    await body('State').exists().trim().escape().isLength({ min: 1 }).run(request);
    await body('Country').exists().trim().escape().isLength({ min: 1 }).run(request);
    await body('ZipCode').exists().trim().escape().isLength({ min: 1 }).run(request);

        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return AddressValidator.getDomainModel(request.body);
    };

static search = async (request: express.Request): Promise<AddressSearchFilters> => {
    await query('AddressLine2').optional().trim().escape().run(request);

    await query('AddressLine1').optional().trim().escape().run(request);

    await query('Street').optional().trim().escape().run(request);

    await query('City').optional().trim().escape().run(request);

    await query('State').optional().trim().escape().run(request);

    await query('Country').optional().trim().escape().run(request);

    await query('ZipCode').optional().trim().escape().run(request);

    const result = validationResult(request);
    if (!result.isEmpty()) {
        Helper.handleValidationError(result);
    }

    return AddressValidator.getFilter(request);
};

    private static getFilter(request): AddressSearchFilters {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const pageIndex = request.query.pageIndex !== 'undefined' ? parseInt(request.query.pageIndex as string, 10) : 0;

        const itemsPerPage =
            request.query.itemsPerPage !== 'undefined' ? parseInt(request.query.itemsPerPage as string, 10) : 25;

        const filters: AddressSearchFilters = {
            AddressLine1: request.query.AddressLine1 ?? null,
            AddressLine2: request.query.AddressLine2 ?? null,
            Street: request.query.Street ?? null,
            State: request.query.State ?? null,
            Country: request.query.Country ?? null,
            ZipCode: request.query.ZipCode ?? null,
            City: request.query.City ?? null,
            OrderBy      : request.query.orderBy ?? 'CreatedAt',
            Order        : request.query.order ?? 'descending',
            PageIndex    : pageIndex,
            ItemsPerPage : itemsPerPage,
        };

        return filters;
    }

        static delete = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };
}

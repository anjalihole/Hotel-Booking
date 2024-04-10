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
import { AddressHolderSearchFilters } from '/../src/domain.types/address.holder/address.holder.search.types';
import { AddressHolderDomainModel } from '/../src/domain.types/address.holder/address.holder.domain.model';

import { Helper } from '../../common/helper';
///////////////////////////////////////////////////////////////////////////////////////

export class AddressHolderValidator {
    static getDomainModel = async (body: any): Promise<AddressHolderDomainModel > => {
        let addressholderModel: AddressHolderDomainModel = null;

       addressholderModel = {
            AddressId: body.AddressId ?? null,
            HolderId: body. HolderId ?? null,
            HolderType: body.HolderType ?? null,
            AddressType:body.AddressType ?? null,
        };
        return addressholderModel;
    };

    static create = async (request: express.Request): Promise<AddressHolderDomainModel> => {
        await body('AddressId').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('HolderId').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('HolderType').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('AddressType').exists().trim().escape().isLength({ min: 1 }).run(request);
        
        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return AddressHolderValidator.getDomainModel(request.body);
    };

    static getById = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    static getAllAddressHolder = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    static update = async (request: express.Request): Promise<AddressHolderDomainModel> => {
        await body('AddressId').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('HolderId').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('HolderType').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('AddressType').exists().trim().escape().isLength({ min: 1 }).run(request);

        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return AddressHolderValidator.getDomainModel(request.body);
    };

static search = async (request: express.Request): Promise<AddressHolderSearchFilters> => {
    await query('AddressId').optional().trim().escape().run(request);

    await query('HolderId').optional().trim().escape().run(request);

    await query('HolderType').optional().trim().escape().run(request);

    await query('AddressType').optional().trim().escape().run(request);

    const result = validationResult(request);
    if (!result.isEmpty()) {
        Helper.handleValidationError(result);
    }

    return AddressHolderValidator.getFilter(request);
};

    private static getFilter(request): AddressHolderSearchFilters {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const pageIndex = request.query.pageIndex !== 'undefined' ? parseInt(request.query.pageIndex as string, 10) : 0;

        const itemsPerPage =
            request.query.itemsPerPage !== 'undefined' ? parseInt(request.query.itemsPerPage as string, 10) : 25;

        const filters: AddressHolderSearchFilters = {
            AddressId: request.query.AddressId ?? null,
            HolderId: request.query.HolderId ?? null,
            HolderType: request.query.HolderType ?? null,
            AddressType: request.query.AddressType ?? null,
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

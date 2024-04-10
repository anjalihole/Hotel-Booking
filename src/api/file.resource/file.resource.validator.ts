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
import { FileResourceSearchFilters } from '/../src/domain.types/file.resource/file.resource.search.types';
import { FileResourceDomainModel } from '/../src/domain.types/file.resource/file.resource.domain.model';

import { Helper } from '../../common/helper';
///////////////////////////////////////////////////////////////////////////////////////

export class FileResourceValidator {
    static getDomainModel = async (body: any): Promise<FileResourceDomainModel > => {
        let fileresourceModel: FileResourceDomainModel = null;

       fileresourceModel = {
            Name: body.Name ?? null,
            MineType: body. MineType ?? null,
            StorageKey: body.StorageKey ?? null,
            IsPublic:body.IsPublic ?? null,
            Url:body.Url ?? null,
        };
        return fileresourceModel;
    };

    static create = async (request: express.Request): Promise<FileResourceDomainModel> => {

        await body('Name').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('MineType').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('StorageKey').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('IsPublic').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('Url').exists().trim().escape().isLength({ min: 1 }).run(request);

        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return FileResourceValidator.getDomainModel(request.body);
    };

    static getById = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    static getAllFileResource = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    static update = async (request: express.Request): Promise<FileResourceDomainModel> => {

    await body('Name').exists().trim().escape().isLength({ min: 1 }).run(request);
    await body('MineType').exists().trim().escape().isLength({ min: 1 }).run(request);
    await body('StorageKey').exists().trim().escape().isLength({ min: 1 }).run(request);
    await body('IsPublic').exists().trim().escape().isLength({ min: 1 }).run(request);
    await body('Url').exists().trim().escape().isLength({ min: 1 }).run(request);

        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return FileResourceValidator.getDomainModel(request.body);
    };

static search = async (request: express.Request): Promise<FileResourceSearchFilters> => {

    await query('Name').optional().trim().escape().run(request);

    await query('MineType').optional().trim().escape().run(request);

    await query('StorageKey').optional().trim().escape().run(request);

    await query('IsPublic').optional().trim().escape().run(request);

    await query('Url').optional().trim().escape().run(request);

    const result = validationResult(request);
    if (!result.isEmpty()) {
        Helper.handleValidationError(result);
    }

    return FileResourceValidator.getFilter(request);
};

    private static getFilter(request): FileResourceSearchFilters {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const pageIndex = request.query.pageIndex !== 'undefined' ? parseInt(request.query.pageIndex as string, 10) : 0;

        const itemsPerPage =
            request.query.itemsPerPage !== 'undefined' ? parseInt(request.query.itemsPerPage as string, 10) : 25;

        const filters: FileResourceSearchFilters = {
        
            Name: request.query.Name ?? null,
            MineType: request.query.MineType ?? null,
            StorageKey: request.query.StorageKey ?? null,
            IsPublic: request.query.IsPublic ?? null,
            Url: request.query.Url ?? null,
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

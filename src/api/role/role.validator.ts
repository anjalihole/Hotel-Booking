/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable newline-per-chained-call */
/* eslint-disable key-spacing */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
import express from 'express';
import { body, validationResult, param, query } from 'express-validator';
import { RoleSearchFilters, } from '../../domain.types/role/role.search.types';
import { RoleDomainModel } from '../../domain.types/role/role.domain.model';
import { Helper } from '../../common/helper';
///////////////////////////////////////////////////////////////////////////////////////

export class RoleValidator {
    static getDomainModel = async (body: any): Promise<RoleDomainModel> => {
        let roleModel: RoleDomainModel = null;

        roleModel = {
            RoleName: body.RoleName || null,
            Description: body.Description ?? null,
        };
        return roleModel;
    };

    static create = async (request: express.Request): Promise<RoleDomainModel> => {
        await body('RoleName').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('Description').exists().trim().escape().isLength({ min: 1 }).run(request);

        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return RoleValidator.getDomainModel(request.body);
    };

    static search = async (request: express.Request): Promise<RoleSearchFilters> => {
        await query('RoleName').optional().trim().escape().run(request);

        await query('Description').optional().trim().escape().run(request);

        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return RoleValidator.getFilter(request);
    };

    static getById = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    static getAllRole = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    static update = async (request: express.Request): Promise<RoleDomainModel> => {
        await body('RoleName').optional().isLength({ min: 1 }).trim().escape().run(request);
        await body('Description').optional().isLength({ min: 1 }).trim().escape().run(request);
    
        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return RoleValidator.getDomainModel(request.body);
    };

    static delete = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    private static getFilter(request): RoleSearchFilters {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const pageIndex = request.query.pageIndex !== 'undefined' ? parseInt(request.query.pageIndex as string, 10) : 0;

        const itemsPerPage =
            request.query.itemsPerPage !== 'undefined' ? parseInt(request.query.itemsPerPage as string, 10) : 25;

        const filters: RoleSearchFilters = {
            RoleName: request.query.RoleName || null,
            Description: request.query.Description || null,
            OrderBy      : request.query.orderBy ?? 'CreatedAt',
            Order        : request.query.order ?? 'descending',
            PageIndex    : pageIndex,
            ItemsPerPage : itemsPerPage,
        };

        return filters;
    }
}

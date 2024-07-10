/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable newline-per-chained-call */
/* eslint-disable key-spacing */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
import express from 'express';
import { body, validationResult, param, query } from 'express-validator';
import { UserRolesSearchFilters } from '/../src/domain.types/user.roles/user.roles.search.types';
import { UserRolesDomainModel } from '/../src/domain.types/user.roles/user.roles.domain.model';
import { Helper } from '../../common/helper';
///////////////////////////////////////////////////////////////////////////////////////

export class UserRolesValidator {
    static getDomainModel = async (body: any): Promise<UserRolesDomainModel> => {
        let userrolesModel: UserRolesDomainModel = null;

        userrolesModel = {
            UserId: body.UserId ?? null,
            RoleId: body.RoleId ?? null,
        };
        return userrolesModel;
    };

    static create = async (request: express.Request): Promise<UserRolesDomainModel> => {
        await body('UserId').exists().trim().escape().isLength({ min: 1 }).isLength({ max: 64 }).run(request);
        await body('RoleId').exists().trim().escape().isLength({ min: 1 }).isLength({ max: 64 }).run(request);
        
        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return UserRolesValidator.getDomainModel(request.body);
    };

        static getById = async (request: express.Request): Promise<string> => {
            await param('id').trim().escape().isUUID().run(request);

            const result = validationResult(request);

            if (!result.isEmpty()) {
                Helper.handleValidationError(result);
            }

            return request.params.id;
        };

    static update = async (request: express.Request): Promise<UserRolesDomainModel> => {
        await body('UserId').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('RoleId').exists().trim().escape().isLength({ min: 1 }).run(request);
        
        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return UserRolesValidator.getDomainModel(request.body);
    };

    static delete = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    static search = async (request: express.Request): Promise<UserRolesSearchFilters> => {

        await query('UserId').optional().trim().escape().run(request);

        await query('RoleId').optional().trim().escape().run(request);

        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return UserRolesValidator.getFilter(request);
    };

    private static getFilter(request): UserRolesSearchFilters {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const pageIndex = request.query.pageIndex !== 'undefined' ? parseInt(request.query.pageIndex as string, 10) : 0;

        const itemsPerPage =
            request.query.itemsPerPage !== 'undefined' ? parseInt(request.query.itemsPerPage as string, 10) : 25;

        const filters: UserRolesSearchFilters = {
            UserId: request.query.UserId || null,
            RoleId: request.query.RoleId || null,
            OrderBy      : request.query.orderBy || 'CreatedAt',
            Order        : request.query.order || 'descending',
            PageIndex    : pageIndex,
            ItemsPerPage : itemsPerPage,
        };

        return filters;
    }
}

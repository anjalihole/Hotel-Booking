/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable newline-per-chained-call */
/* eslint-disable key-spacing */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
import express from 'express';
import { body, validationResult, param, query, oneOf } from 'express-validator';
import { UserSearchFilters } from '/../src/domain.types/user/user.search.types';
import { UserDomainModel } from '/../src/domain.types/user/user.domain.model';
import { Helper } from '../../common/helper';
import { UserLoginDetails } from '/../src/domain.types/user/user.domain.model';
import { ResponseHandler } from '../../common/response.handler';
// import { ResponseHandler } from 'src/common/response.handler';
///////////////////////////////////////////////////////////////////////////////////////

export class UserValidator {
    static getDomainModel = async (body: any): Promise<UserDomainModel> => {
        let userModel: UserDomainModel = null;

        userModel = {
            FirstName: body.FirstName ?? null,
            LastName: body.LastName ?? null,
            Phone: body.Phone ?? null,
            Email: body.Email ?? null,
            Password: body.Password ?? null,
        };
        return userModel;
    };

    static create = async (request: express.Request): Promise<UserDomainModel> => {
        await body('FirstName').exists().trim().escape().isLength({ min: 1 }).isLength({ max: 64 }).run(request);
        await body('LastName').exists().trim().escape().isLength({ min: 1 }).isLength({ max: 64 }).run(request);
        await body('Phone').exists().trim().escape().isLength({ min: 10 }).isLength({ max: 16 }).run(request);
        await body('Email').exists().trim().escape().isLength({ min: 3 }).isLength({ max: 128 }).run(request);
        await body('Password').exists().trim().escape().isLength({ min: 3 }).isLength({ max: 25 }).run(request);
        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return UserValidator.getDomainModel(request.body);
    };

    static loginWithPassword = async (request: express.Request): Promise<UserDomainModel> => {
        await body('Email').exists().trim().escape().isEmail().isLength({ min: 3 }).run(request);
        await body('Password').exists().trim().escape().isLength({ min: 3 }).isLength({ max: 25 }).run(request);
        
        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return UserValidator.getDomainModel(request.body);
    };

    static getById = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    static update = async (request: express.Request): Promise<UserDomainModel> => {
        await body('FirstName').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('LastName').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('Phone').exists().trim().escape().isLength({ min: 10 }).run(request);
        await body('Email').exists().trim().escape().isEmail().isLength({ min: 3 }).run(request);
        
        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return UserValidator.getDomainModel(request.body);
    };

    static delete = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    static search = async (request: express.Request): Promise<UserSearchFilters> => {

        await query('FirstName').optional().trim().escape().run(request);

        await query('LastName').optional().trim().escape().run(request);

        await query('phone').optional().trim().escape().run(request);

        await query('Email').optional().trim().escape().run(request);

        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return UserValidator.getFilter(request);
    };

    private static getFilter(request): UserSearchFilters {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const pageIndex = request.query.pageIndex !== 'undefined' ? parseInt(request.query.pageIndex as string, 10) : 0;

        const itemsPerPage =
            request.query.itemsPerPage !== 'undefined' ? parseInt(request.query.itemsPerPage as string, 10) : 25;

        const filters: UserSearchFilters = {
            FirstName: request.query.FirstName || null,
            LastName: request.query.LastName || null,
            Phone: request.query.Phone || null,
            Email: request.query.Email || null,
            OrderBy      : request.query.orderBy || 'CreatedAt',
            Order        : request.query.order || 'descending',
            PageIndex    : pageIndex,
            ItemsPerPage : itemsPerPage,
        };

        return filters;
    }
}

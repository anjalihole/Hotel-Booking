/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable newline-per-chained-call */
/* eslint-disable key-spacing */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
import express from 'express';
import { body, validationResult, param, query } from 'express-validator';
import { CustomerSearchFilters } from '/../src/domain.types/customer/customer.search.types';
import { CustomerDomainModel } from '/../src/domain.types/customer/customer.domain.model';
import { Helper } from '../../common/helper';
///////////////////////////////////////////////////////////////////////////////////////

export class CustomerValidator {
    static getDomainModel = async (body: any): Promise<CustomerDomainModel> => {
        let customerModel: CustomerDomainModel = null;

        customerModel = {
            FirstName: body.FirstName ?? null,
            LastName: body.LastName ?? null,
            Phone: body.Phone ?? null,
            Email: body.Email ?? null,
            Password: body.Password ?? null,
            Address: body.Address ?? null,
        };
        return customerModel;
    };

    static create = async (request: express.Request): Promise<CustomerDomainModel> => {
        await body('FirstName').exists().trim().escape().isLength({ min: 3 }).run(request);
        await body('LastName').exists().trim().escape().isLength({ min: 3 }).run(request);
        await body('Address').exists().trim().escape().isLength({ min: 3 }).run(request);
        await body('Phone').exists().trim().escape().isLength({ min: 10 }).run(request);
        await body('Email').exists().trim().escape().isEmail().isLength({ min: 3 }).run(request);
        await body('Password').exists().trim().escape().isLength({ min: 6 }).run(request);

        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return CustomerValidator.getDomainModel(request.body);
    };

    // static search = async (request: express.Request): Promise<CustomerSearchFilters> => {
    //     await query('FirstName').optional().trim().escape().run(request);

    //     await query('LastName').optional().trim().escape().run(request);

    //     await query('phone').optional().trim().escape().run(request);

    //     await query('email').optional().trim().escape().run(request);

    //     await query('Address').optional().trim().escape().run(request);

    //     const result = validationResult(request);
    //     if (!result.isEmpty()) {
    //         Helper.handleValidationError(result);
    //     }

    //     return CustomerValidator.getFilter(request);
    // };

    static getById = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    static getAllCustomer = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    static update = async (request: express.Request): Promise<CustomerDomainModel> => {
        await body('FirstName').optional().isLength({ min: 1 }).trim().escape().run(request);
        await body('LastName').optional().isLength({ min: 1 }).trim().escape().run(request);
        await body('Phone').optional().trim().escape().isLength({ min: 10 }).run(request);
        await body('Password').optional().trim().escape().isLength({ min: 6 }).run(request);
        await body('Email').optional().trim().escape().isEmail().isLength({ min: 3 }).run(request);
        await body('Address').optional().trim().escape().isLength({ min: 6 }).run(request);
        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return CustomerValidator.getDomainModel(request.body);
    };

    // private static getFilter(request): CustomerSearchFilters {
    //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //     const pageIndex = request.query.pageIndex !== 'undefined' ? parseInt(request.query.pageIndex as string, 10) : 0;

    //     const itemsPerPage =
    //         request.query.itemsPerPage !== 'undefined' ? parseInt(request.query.itemsPerPage as string, 10) : 25;

    //     const filters: CustomerSearchFilters = {
    //         FirstName: request.query.firstName ?? null,
    //         LastName: request.query.lastName ?? null,
    //         Phone: request.query.phone ?? null,
    //         Email: request.query.email ?? null,
    //         Address: request.query.address ?? null,
    //         Password: request.query.password ?? null,
    //     };

    //     return filters;
    // }
}

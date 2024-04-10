/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable newline-per-chained-call */
/* eslint-disable key-spacing */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
import express from 'express';
import { body, validationResult, param, query } from 'express-validator';
import { CustomerSearchFilters, } from '../../domain.types/customer/customer.search.types';
import { CustomerDomainModel } from '../../domain.types/customer/customer.domain.model';
import { Helper } from '../../common/helper';
///////////////////////////////////////////////////////////////////////////////////////

export class CustomerValidator {
    static getDomainModel = async (body: any): Promise<CustomerDomainModel> => {
        let customerModel: CustomerDomainModel = null;

        customerModel = {
            UserId: body.UserId || null,
            PAN: body.PAN ?? null,
            Aadhar: body.Aadhar ?? null,
            AddressId: body.AddressId ?? null,
        };
        return customerModel;
    };

    static create = async (request: express.Request): Promise<CustomerDomainModel> => {
        await body('UserId').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('AddressId').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('PAN').exists().trim().escape().isLength({ min: 10 }).run(request);
        await body('Aadhar').exists().trim().escape().isLength({ min: 3 }).run(request);
        
        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return CustomerValidator.getDomainModel(request.body);
    };

    static search = async (request: express.Request): Promise<CustomerSearchFilters> => {
        await query('UserId').optional().trim().escape().run(request);

        await query('PAN').optional().trim().escape().run(request);

        await query('Aadhar').optional().trim().escape().run(request);

        await query('AddressId').optional().trim().escape().run(request);

        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return CustomerValidator.getFilter(request);
    };

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
        await body('UserId').optional().isLength({ min: 1 }).trim().escape().run(request);
        await body('PAN').optional().trim().escape().isLength({ min: 10 }).run(request);
        await body('Aadhar').optional().trim().escape().isLength({ min: 3 }).run(request);
        
        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return CustomerValidator.getDomainModel(request.body);
    };

    static delete = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    private static getFilter(request): CustomerSearchFilters {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const pageIndex = request.query.pageIndex !== 'undefined' ? parseInt(request.query.pageIndex as string, 10) : 0;

        const itemsPerPage =
            request.query.itemsPerPage !== 'undefined' ? parseInt(request.query.itemsPerPage as string, 10) : 25;

        const filters: CustomerSearchFilters = {

            UserId: request.query.UserId || null,
            PAN: request.query.PAN ?? null,
            Aadhar: request.query.Aadhar ?? null,
            AddressId: request.query.AddressId ?? null,
            OrderBy      : request.query.orderBy ?? 'CreatedAt',
            Order        : request.query.order ?? 'descending',
            PageIndex    : pageIndex,
            ItemsPerPage : itemsPerPage,
        };

        return filters;
    }
}

/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable newline-per-chained-call */
/* eslint-disable key-spacing */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
import express from 'express';
import { body, validationResult, param, query } from 'express-validator';
import { PropertyRulesSearchFilters, } from '../../domain.types/property.rules/property.rules.search.types';
import { PropertyRulesDomainModel } from '../../domain.types/property.rules/property.rules.domain.model';
import { Helper } from '../../common/helper';
///////////////////////////////////////////////////////////////////////////////////////

export class PropertyRulesValidator {
    static getDomainModel = async (body: any): Promise<PropertyRulesDomainModel> => {
        let propertyrulesModel: PropertyRulesDomainModel = null;

        propertyrulesModel = {
            id:body.id ?? null,
            RulesName: body.RulesName || null,
            HotelId: body.HotelId ?? null,
            Description: body.Description ?? null,
        };
        return propertyrulesModel;
    };

    static create = async (request: express.Request): Promise<PropertyRulesDomainModel> => {

        await body('RulesName').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('HotelId').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('Description').exists().trim().escape().isLength({ min: 10 }).run(request);
        
        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return PropertyRulesValidator.getDomainModel(request.body);
    };

    static getById = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    static update = async (request: express.Request): Promise<PropertyRulesDomainModel> => {

        await body('RulesName').optional().isLength({ min: 1 }).trim().escape().run(request);
        await body('HotelId').optional().trim().escape().isLength({ min: 10 }).run(request);
        await body('Description').optional().trim().escape().isLength({ min: 3 }).run(request);
        
        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return PropertyRulesValidator.getDomainModel(request.body);
    };

    static delete = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };
    
    static search = async (request: express.Request): Promise<PropertyRulesSearchFilters> => {

        await query('RulesName').optional().trim().escape().run(request);

        await query('HotelId').optional().trim().escape().run(request);

        await query('Description').optional().trim().escape().run(request);

        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return PropertyRulesValidator.getFilter(request);
    };

    private static getFilter(request): PropertyRulesSearchFilters {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const pageIndex = request.query.pageIndex !== 'undefined' ? parseInt(request.query.pageIndex as string, 10) : 0;

        const itemsPerPage =
            request.query.itemsPerPage !== 'undefined' ? parseInt(request.query.itemsPerPage as string, 10) : 25;

        const filters: PropertyRulesSearchFilters = {

            RulesName: request.query.RulesName ?? null,
            HotelId: request.query.HotelId ?? null,
            Description: request.query.Description ?? null,
            OrderBy      : request.query.orderBy ?? 'CreatedAt',
            Order        : request.query.order ?? 'descending',
            PageIndex    : pageIndex,
            ItemsPerPage : itemsPerPage,
        };

        return filters;
    }
}

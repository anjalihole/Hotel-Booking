/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
import express from 'express';
import { PropertyRulesService } from '../../services/property.rules/property.rules.service';
import { ResponseHandler } from '../../common/response.handler';
import { Loader } from '../../startup/loader';
import { Authorizer } from '../../auth/authorizer';
import { PropertyRulesValidator } from './property.rules.validator';
import { ApiError } from '../../common/api.error';

///////////////////////////////////////////////////////////////////////////////////////

export class PropertyRulesController {
    //#region member variables and constructors

    _service: PropertyRulesService = null;

    _authorizer: Authorizer = null;

    constructor() {
        this._service = Loader.container.resolve(PropertyRulesService);
        this._authorizer = Loader.authorizer;
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Property Rules Review.Create';
            const PropertyRulesDomainModel = await PropertyRulesValidator.create(request);
            const propertyrules = await this._service.create(PropertyRulesDomainModel);
            if (propertyrules == null) {
                throw new ApiError(400, 'Unable to create Property Rules.');
            }
            ResponseHandler.success(request, response, 'Property Rules Api added successfully!', 201, {
                PeopertyRules: propertyrules,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Property Rules.GetById';
            //await this._authorizer.authorize(request, response);

            const id: string = await PropertyRulesValidator.getById(request);

            const propertyrules = await this._service.getById(id);
            if (propertyrules == null) {
                throw new ApiError(404, 'Property Rules not found.');
            }
            ResponseHandler.success(request, response, 'Property Rules Api retrieved successfully!', 200, {
                PropertyRules: propertyrules,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getAllPropertyRules = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Property Rules.GetAllPropertRules';

            const propertyrules = await this._service.getAllPropertyRules();
            if (propertyrules == null) {
                throw new ApiError(404, 'Property Rulesnot found.');
            }
            ResponseHandler.success(request, response, '  All Property RulesApi retrieved successfully!', 200, {
            PropertyRules: propertyrules,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Property Rules.Search';
            //await this._authorizer.authorize(request, response);

            const filters = await PropertyRulesValidator.search(request);

            const searchResults = await this._service.search(filters);
            const count = searchResults.Items.length;
            const message =
                count === 0 ? 'No records found!' : `Total ${count} Hotel Api records retrieved successfully!`;

            ResponseHandler.success(request, response, message, 200, {
                HotelRecords: searchResults,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Property Rules.Update';
            // await this._authorizer.authorize(request, response);

            const id: string = await PropertyRulesValidator.getById(request);
            const domainModel = await PropertyRulesValidator.update(request);
            const propertyrules = await this._service.update(id, domainModel);
            if (propertyrules == null) {
                throw new ApiError(404, ' Property RulesApi not found.');
            }
            ResponseHandler.success(request, response, ' Property Rules Review Api updated successfully!', 200, {
                PropertyRules: propertyrules,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'Property Rules.Delete';            // await this._authorizer.authorize(request, response);

            const id: string = await PropertyRulesValidator.getById(request);
            await this._service.delete(id);
            ResponseHandler.success(request, response, 'Property Rules Api deleted successfully!', 200, null);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
 }

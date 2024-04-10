/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable lines-between-class-members */
/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
import { inject, injectable } from 'tsyringe';
//import { ApiError } from '../../common/api.error';
import { PropertyRulesDomainModel } from '../../domain.types/property.rules/property.rules.domain.model';
import { PropertyRulesDto } from '../../domain.types/property.rules/property.rules.dto';
import { IPropertyRulesRepo } from '../../database/repository.interfaces/property.rules/property.rules.repo.interface';
// import { generate } from 'generate-password';
// import { Helper } from '../../common/helper';
// import { CurrentClient } from '../../domain.types/miscellaneous/current.client';
//import * as apikeyGenerator from 'uuid-apikey';
import { PropertyRulesSearchFilters,PropertyRulesSearchResults} from '../../domain.types/property.rules/property.rules.search.types';

////////////////////////////////////////////////////////////////////////////////////////////////////////

@injectable()
export class PropertyRulesService {
    constructor(@inject('IPropertyRulesRepo') private _propertyrulesRepo: IPropertyRulesRepo) {}

    create = async (propertyrulesDomainModel: PropertyRulesDomainModel): Promise<PropertyRulesDto> => {
        return await this._propertyrulesRepo.create(propertyrulesDomainModel);
    };

    getById = async (id: string): Promise<PropertyRulesDto> => {
        return await this._propertyrulesRepo.getById(id);
    };

    getAllPropertyRules = async (): Promise<PropertyRulesDto[]> => {
        return await this._propertyrulesRepo.getAllPropertyRules();
    };

    update = async (id: string, propertyrulesDomainModel: PropertyRulesDomainModel): Promise<PropertyRulesDto> => {
        return await this._propertyrulesRepo.update(id, propertyrulesDomainModel);
    };

    public search = async (filters: PropertyRulesSearchFilters): Promise<PropertyRulesSearchResults> => {
        return await this._propertyrulesRepo.search(filters);
    };

    delete = async (id: string): Promise<boolean> => {
        return await this._propertyrulesRepo.delete(id);
    };
}

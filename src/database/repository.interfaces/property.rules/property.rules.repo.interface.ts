/* eslint-disable linebreak-style */
import { PropertyRulesSearchFilters, PropertyRulesSearchResults } from '../../../domain.types/property.rules/property.rules.search.types';
import { PropertyRulesDomainModel } from '../../../domain.types/property.rules/property.rules.domain.model';
import { PropertyRulesDto } from '../../../domain.types/property.rules/property.rules.dto';
//import { CurrentClient } from '../../../domain.types/miscellaneous/current.client';

////////////////////////////////////////////////////////////////////////////////////////////////

export interface IPropertyRulesRepo {
    
        create(propertyrulesDomainModel: PropertyRulesDomainModel): Promise<PropertyRulesDto>;

        getById(id: string): Promise<PropertyRulesDto>;

        update(id: string, PropertyRulesDomainModel: PropertyRulesDomainModel): Promise<PropertyRulesDto>;

        search(filters: PropertyRulesSearchFilters): Promise<PropertyRulesSearchResults>;
        
        delete(id: string): Promise<boolean>;
}


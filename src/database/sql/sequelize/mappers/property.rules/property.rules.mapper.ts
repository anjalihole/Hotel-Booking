/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
import { PropertyRulesDto } from '../../../../../domain.types/property.rules/property.rules.dto';
import PropertyRules from '../../models/property.rules/property.rules.model';

///////////////////////////////////////////////////////////////////////////////////

export class PropertyRulesMapper {
    static toDto = (propertyrules: PropertyRules): PropertyRulesDto => {
        if (propertyrules == null) {
            return null;
        }
        const dto: PropertyRulesDto = {

            id: propertyrules.id,
            RulesName: propertyrules.RulesName,
            HotelId: propertyrules.HotelId,
            Description: propertyrules.Description,
        };
        return dto;
    };

    static toPropertyRulesDto = (propertyrules: PropertyRules): PropertyRulesDto => {
        if (propertyrules == null) {
            return null;
        }
        const dto: PropertyRulesDto = {

            id: propertyrules.id,
            RulesName: propertyrules.RulesName,
            HotelId: propertyrules.HotelId,
            Description: propertyrules.Description,
            
        };
        return dto;
    };
}

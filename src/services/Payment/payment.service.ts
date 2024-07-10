/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
// /* eslint-disable linebreak-style */
// /* eslint-disable object-curly-spacing */
// /* eslint-disable linebreak-style */
// /* eslint-disable indent */
// /* eslint-disable lines-between-class-members */
// /* eslint-disable linebreak-style */
// /* eslint-disable padded-blocks */
// /* eslint-disable linebreak-style */
import { inject, injectable } from 'tsyringe';
//import { ApiError } from '../../common/api.error';
import { PaymentDomainModel } from '../../domain.types/payment/payment.domain.model';
import { PaymentDto } from '../../domain.types/payment/payment.dto';
import { IPaymentRepo } from '../../database/repository.interfaces/payment/payment.repo.interface';
// import { generate } from 'generate-password';
// import { Helper } from '../../common/helper';
// import { CurrentClient } from '../../domain.types/miscellaneous/current.client';
//import * as apikeyGenerator from 'uuid-apikey';
import { PaymentSearchFilters,PaymentSearchResults } from '../../domain.types/payment/payment.search.types';

////////////////////////////////////////////////////////////////////////////////////////////////////////

@injectable()
export class PaymentService {
    constructor(@inject('IPaymentRepo') private _paymentRepo: IPaymentRepo) {}

    create = async (paymentDomainModel: PaymentDomainModel): Promise<PaymentDto> => {
        
        return await this._paymentRepo.create(paymentDomainModel);
    };

    getById = async (id: string): Promise<PaymentDto> => {
        return await this._paymentRepo.getById(id);
    };

    update = async (id: string, PaymentDomainModel: PaymentDomainModel): Promise<PaymentDto> => {
        return await this._paymentRepo.update(id, PaymentDomainModel);
    };

    public search = async (filters: PaymentSearchFilters): Promise<PaymentSearchResults> => {
        return await this._paymentRepo.search(filters);
    };

    delete = async (id: string): Promise<boolean> => {
        return await this._paymentRepo.delete(id);
    };
}

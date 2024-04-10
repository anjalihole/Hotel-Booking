/* eslint-disable linebreak-style */
// /* eslint-disable linebreak-style */
import { PaymentSearchFilters, PaymentSearchResults } from '../../../domain.types/payment/payment.search.types';
import { PaymentDomainModel } from '/../src/domain.types/payment/payment.domain.model';
import { PaymentDto } from '../../../domain.types/payment/payment.dto';
//import { CurrentClient } from '../../../domain.types/miscellaneous/current.client';

////////////////////////////////////////////////////////////////////////////////////////////////

export interface IPaymentRepo {
        create(paymentDomainModel: PaymentDomainModel): Promise<PaymentDto>;

         getById(id: string): Promise<PaymentDto>;

         getAllPayment(): Promise<PaymentDto[]>;

         update(id: string, PaymentDomainModel: PaymentDomainModel): Promise<PaymentDto>;

         search(filters: PaymentSearchFilters): Promise<PaymentSearchResults>;
         
         delete(id: string): Promise<boolean>;
 }

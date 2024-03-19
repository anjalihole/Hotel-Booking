/* eslint-disable linebreak-style */
/* eslint-disable key-spacing */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
// /* eslint-disable linebreak-style */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable key-spacing */
// /* eslint-disable indent */
// /* eslint-disable linebreak-style */
import { IPaymentRepo } from '../../../../repository.interfaces/payment/payment.repo.interface';
import Payment from '../../models/payment/payment.model';
import { Op } from 'sequelize';
import { PaymentDomainModel } from '../../../../../domain.types/payment/payment.domain.model';
import { paymentMapper } from '../../mappers/payment/payment.mapper';
import { Logger } from '../../../../../common/logger';
import { ApiError } from '../../../../../common/api.error';
import { PaymentDto } from '../../../../../domain.types/payment/payment.dto';
import { PaymentSearchFilters, PaymentSearchResults } from '../../../../../domain.types/payment/payment.search.types';

///////////////////////////////////////////////////////////////////////

export class PaymentRepo implements IPaymentRepo {

    create = async (paymentDomainModel: PaymentDomainModel): Promise<PaymentDto> => {
        try {
            const entity = {
                HotelId : paymentDomainModel.HotelId,
                PaymentDate: paymentDomainModel.PaymentDate,
                Amount: paymentDomainModel.Amount,
                PaymentMethod: paymentDomainModel.PaymentMethod,
                TransactionStatus: paymentDomainModel.TransactionStatus,
                ReservationId: paymentDomainModel.ReservationId,
                PaymentConfirm: paymentDomainModel.PaymentConfirm,
                PaymentId: paymentDomainModel.PaymentId,
            };
            const payment = await Payment.create(entity);
            const dto = await paymentMapper.toDto(payment);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getById = async (id: string): Promise<PaymentDto> => {
        try {
            const payment = await Payment.findByPk(id);
            const dto = await paymentMapper.toDto(payment);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getAllPayment = async (): Promise<PaymentDto[]> => {
        try {
            const records = await Payment.findAll();
            const dtos = records.map((record) => this.toDto(record));
            return dtos;
            // const dto = await PaymentMapper.toDto(records);
            // return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    toDto = (payment): PaymentDto => {
        if (payment == null) {
            return null;
        }
        const dto: PaymentDto = {
            id: payment.paymentId,
            PaymentDate: payment.PaymentDate,
            HotelId: payment.HotelId,
            Amount: payment.Amount,
            PaymentMethod: payment.PaymentMethod,
            TransactionStatus: payment.TransactionStatus,
            ReservationId: payment.ReservationId,
            PaymentConfirm: payment.PaymentConfirm,
            PaymentId: payment.PaymentId,
        };
        return dto;
    };

    search = async (filters: PaymentSearchFilters): Promise<PaymentSearchResults> => {
        try {

            const search = { where: {} };

            if (filters.HotelId != null) {
                search.where['HotelId'] = filters.HotelId;
            }
            if (filters.PaymentDate != null) {
                search.where['PaymentDate'] = { [Op.like]: '%' + filters.PaymentDate + '%' };
            }
            if (filters.Amount != null) {
                search.where['Amount'] = filters.Amount;
            }
            if (filters.PaymentMethod != null) {
                search.where['PaymentMethod'] = filters.PaymentMethod;
            }
            if (filters.TransactionStatus != null) {
                search.where['TransactionStatus'] = filters.TransactionStatus;
            }

            if (filters.ReservationId != null) {
                search.where['ReservationId'] = filters.ReservationId;
            }
            if (filters.PaymentConfirm != null) {
                search.where['PaymentConfirm'] = filters.PaymentConfirm;
            }
            if (filters.PaymentId != null) {
                search.where['PaymentId'] = filters.PaymentId;
            }

            const orderByColum = 'CreatedAt';
            let order = 'ASC';
            if (filters.Order === 'descending') {
                order = 'DESC';
            }
            search['order'] = [[orderByColum, order]];
            let limit = 25;
            if (filters.ItemsPerPage) {
                limit = filters.ItemsPerPage;
            }
            const foundResults = await Payment.findAndCountAll(search);
            let offset = 0;
            let pageIndex = 0;
            if (filters.PageIndex) {
                pageIndex = filters.PageIndex < 0 ? 0 : filters.PageIndex;
                offset = pageIndex * limit;
            }
            search['limit'] = limit;
            search['offset'] = offset;

            const dtos: PaymentDto[] = [];
            for (const payment of foundResults.rows) {
                const dto = await paymentMapper.toDto(payment);
                dtos.push(dto);
            }

            const count = foundResults.count;
            const totalCount = typeof count === "number" ? count : count[0];

            const searchResults: PaymentSearchResults = {
                TotalCount     : totalCount,
                RetrievedCount : dtos.length,
                PageIndex      : pageIndex,
                ItemsPerPage   : limit,
                Order          : order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy      : orderByColum,
                Items          : dtos
            };

            return searchResults;

        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
     };

update = async (id: string, paymentDomainModel: PaymentDomainModel): Promise<PaymentDto> => {
            try {
                const payment = await Payment.findByPk(id);
    
                //Client code is not modifiable
                //Use renew key to update ApiKey, ValidFrom and ValidTill
    
                if (paymentDomainModel.HotelId != null) {
                    payment.HotelId = paymentDomainModel.HotelId;
                }

                if (paymentDomainModel.PaymentDate != null) {
                    payment.PaymentDate = paymentDomainModel.PaymentDate;
                }
                if (paymentDomainModel.Amount != null) {
                    payment.Amount = paymentDomainModel.Amount;
                }
                if (paymentDomainModel.PaymentMethod != null) {
                    payment.PaymentMethod = paymentDomainModel.PaymentMethod;
                }
                if (paymentDomainModel.TransactionStatus != null) {
                    payment.TransactionStatus = paymentDomainModel.TransactionStatus;
                }

                if (paymentDomainModel.ReservationId != null) {
                    payment.ReservationId = paymentDomainModel.ReservationId;
                }
                if (paymentDomainModel.PaymentConfirm != null) {
                    payment.PaymentConfirm = paymentDomainModel.PaymentConfirm;
                }
                if (paymentDomainModel.PaymentId != null) {
                    payment.PaymentId = paymentDomainModel.PaymentId;
                }
               
                await payment.save();
    
                const dto = await paymentMapper.toDto(payment);
                return dto;
            } catch (error) {
                Logger.instance().log(error.message);
                throw new ApiError(500, error.message);
            }
        };
    
        delete = async (id: string): Promise<boolean> => {
            try {
                const result = await Payment.destroy({ where: { id: id } });
                return result === 1;
            } catch (error) {
                Logger.instance().log(error.message);
                throw new ApiError(500, error.message);
            }
        };

 }

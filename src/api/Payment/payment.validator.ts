/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable newline-per-chained-call */
/* eslint-disable key-spacing */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
import express from 'express';
import { body, validationResult, param, query } from 'express-validator';
import { PaymentSearchFilters } from '/../src/domain.types/payment/payment.search.types';
 import { PaymentDomainModel } from '/../src/domain.types/payment/payment.domain.model';

import { Helper } from '../../common/helper';
///////////////////////////////////////////////////////////////////////////////////////

export class PaymentValidator {
    static getDomainModel = async (body: any): Promise<PaymentDomainModel > => {
        let paymentModel: PaymentDomainModel = null;

        paymentModel = {
            id:body.id ?? null,
            HotelId: body.HotelId ?? null,
            PaymentId: body. PaymentId ?? null,
            ReservationId: body.ReservationId ?? null,
            PaymentDate:body.PaymentDate ?? null,
            Amount: body.Amount ?? null,
             PaymentMethod: body. PaymentMethod ?? null,
            PaymentConfirm: body.PaymentConfirm ?? null,
            TransactionStatus:body.TransactionStatus ?? null,
        };
        return paymentModel;
    };

    static create = async (request: express.Request): Promise<PaymentDomainModel> => {
        await body('HotelId').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('PaymentDate').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('Amount').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('PaymentMethod').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('ReservationId').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('PaymentConfirm').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('PaymentId').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('TransactionStatus').exists().trim().escape().isLength({ min: 1 }).run(request);

        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return PaymentValidator.getDomainModel(request.body);
    };

    static getById = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    static getAllPayment = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };

    static update = async (request: express.Request): Promise<PaymentDomainModel> => {
        await body('HotelId').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('PaymentDate').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('Amount').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('PaymentMethod').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('ReservationId').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('PaymentConfirm').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('PaymentId').exists().trim().escape().isLength({ min: 1 }).run(request);
        await body('TransactionStatus').exists().trim().escape().isLength({ min: 1 }).run(request);

        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return PaymentValidator.getDomainModel(request.body);
    };

static search = async (request: express.Request): Promise<PaymentSearchFilters> => {
    await query('HotelId').optional().trim().escape().run(request);

    await query('PaymentDate').optional().trim().escape().run(request);

    await query('Amount').optional().trim().escape().run(request);

    await query('PaymentMethod').optional().trim().escape().run(request);

    await query('ReservationId').optional().trim().escape().run(request);

    await query('PaymentId').optional().trim().escape().run(request);

    await query('PaymentConfirm').optional().trim().escape().run(request);

    await query('TransactionStatus').optional().trim().escape().run(request);

    const result = validationResult(request);
    if (!result.isEmpty()) {
        Helper.handleValidationError(result);
    }

    return PaymentValidator.getFilter(request);
};

    private static getFilter(request): PaymentSearchFilters {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const pageIndex = request.query.pageIndex !== 'undefined' ? parseInt(request.query.pageIndex as string, 10) : 0;

        const itemsPerPage =
            request.query.itemsPerPage !== 'undefined' ? parseInt(request.query.itemsPerPage as string, 10) : 25;

        const filters: PaymentSearchFilters = {
            HotelId: request.query.HotelId ?? null,
            PaymentDate: request.query.PaymentDate ?? null,
            Amount: request.query.Amount ?? null,
            PaymentMethod: request.query.PaymentMethod ?? null,
            ReservationId: request.query.ReservationId ?? null,
            PaymentConfirm: request.query.PaymentConfirm ?? null,
            PaymentId: request.query.PaymentId ?? null,
            TransactionStatus: request.query.TransactionStatus ?? null,
            OrderBy      : request.query.orderBy ?? 'CreatedAt',
            Order        : request.query.order ?? 'descending',
            PageIndex    : pageIndex,
            ItemsPerPage : itemsPerPage,
        };

        return filters;
    }

        static delete = async (request: express.Request): Promise<string> => {
        await param('id').trim().escape().isUUID().run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return request.params.id;
    };
}

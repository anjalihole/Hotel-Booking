import  request  from 'supertest';
import { expect } from 'chai';
import  Application  from '../../../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from '../init';
const infra = Application.instance();

///////////////////////////////////////////////////////////////////////////

describe('07 - Payment tests', function() {

    var agent = request.agent(infra._app);

    it('07:01 -> Create payment', function(done) {
        loadPaymentCreateModel();
        const createModel = getTestData("paymentCreateModel");
        agent
            .post(`/api/v1/payment/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData(response.body.Data.Payment.id, 'paymentId_1');

                expect(response.body.Data.Payment).to.have.property('HotelId');
                expect(response.body.Data.Payment).to.have.property('ReservationOrderId');
                expect(response.body.Data.Payment).to.have.property('PaymentDate');
                expect(response.body.Data.Payment).to.have.property('TransactionStatus');
                expect(response.body.Data.Payment).to.have.property('Amount');
                expect(response.body.Data.Payment).to.have.property('PaymentMethod');
                expect(response.body.Data.Payment).to.have.property('PaymentConfirm');

                expect(response.body.Data.Payment.HotelId).to.equal(getTestData("paymentCreateModel").HotelId);
                expect(response.body.Data.Payment.ReservationOrderId).to.equal(getTestData("paymentCreateModel").ReservationOrderId);
                expect(response.body.Data.Payment.PaymentDate).to.equal(getTestData("paymentCreateModel").PaymentDate);
                expect(response.body.Data.Payment.TransactionStatus).to.equal(getTestData("paymentCreateModel").TransactionStatus);
                expect(response.body.Data.Payment.PaymentConfirm).to.equal(getTestData("paymentCreateModel").PaymentConfirm);

            })
            .expect(201, done);
    })

    it('07:04 -> Get payment by id', function(done) {
        agent
            .get(`/api/v1/payment/${getTestData("paymentId_1")}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body.Data.Payment).to.have.property('HotelId');
                expect(response.body.Data.Payment).to.have.property('ReservationOrderId');
                expect(response.body.Data.Payment).to.have.property('PaymentDate');
                expect(response.body.Data.Payment).to.have.property('TransactionStatus');
                expect(response.body.Data.Payment).to.have.property('Amount');
                expect(response.body.Data.Payment).to.have.property('PaymentMethod');
                expect(response.body.Data.Payment).to.have.property('PaymentConfirm');

                expect(response.body.Data.Payment.HotelId).to.equal(getTestData("paymentCreateModel").HotelId);
                expect(response.body.Data.Payment.ReservationOrderId).to.equal(getTestData("paymentCreateModel").ReservationOrderId);
                expect(response.body.Data.Payment.PaymentDate).to.equal(getTestData("paymentCreateModel").PaymentDate);
                expect(response.body.Data.Payment.TransactionStatus).to.equal(getTestData("paymentCreateModel").TransactionStatus);
                expect(response.body.Data.Payment.PaymentConfirm).to.equal(getTestData("paymentCreateModel").PaymentConfirm);

            })
            .expect(200, done);
     });

    it('81:03 -> Search records', function(done) {
        loadPaymentQueryString();
        agent
            .get(`/api/v1/payment/search${loadPaymentQueryString()}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body.Data.PaymentRecords).to.have.property('TotalCount');
                expect(response.body.Data.PaymentRecords).to.have.property('RetrievedCount');
                expect(response.body.Data.PaymentRecords).to.have.property('PageIndex');
                expect(response.body.Data.PaymentRecords).to.have.property('ItemsPerPage');
                expect(response.body.Data.PaymentRecords).to.have.property('Order');
                expect(response.body.Data.PaymentRecords.TotalCount).to.greaterThan(0);
                expect(response.body.Data.PaymentRecords.RetrievedCount).to.greaterThan(0);
                expect(response.body.Data.PaymentRecords.Items.length).to.greaterThan(0);
            })
            .expect(200, done);
    });

    it('07:04 -> Update payment', function(done) {
        loadPaymentUpdateModel();
        const updateModel = getTestData("paymentUpdateModel");
        agent
            .put(`/api/v1/payment/${getTestData("paymentId_1")}`)
            .set('Content-Type', 'application/json')
            .send(updateModel)
            .expect(response => {
                expect(response.body.Data.Payment).to.have.property('HotelId');
                expect(response.body.Data.Payment).to.have.property('ReservationOrderId');
                expect(response.body.Data.Payment).to.have.property('PaymentDate');
                expect(response.body.Data.Payment).to.have.property('TransactionStatus');
                expect(response.body.Data.Payment).to.have.property('Amount');
                expect(response.body.Data.Payment).to.have.property('PaymentMethod');
                expect(response.body.Data.Payment).to.have.property('PaymentConfirm');

                expect(response.body.Data.Payment.HotelId).to.equal(getTestData("paymentUpdateModel").HotelId);
                expect(response.body.Data.Payment.ReservationOrderId).to.equal(getTestData("paymentUpdateModel").ReservationOrderId);
                expect(response.body.Data.Payment.PaymentDate).to.equal(getTestData("paymentUpdateModel").PaymentDate);
                expect(response.body.Data.Payment.TransactionStatus).to.equal(getTestData("paymentUpdateModel").TransactionStatus);
                expect(response.body.Data.Payment.PaymentConfirm).to.equal(getTestData("paymentUpdateModel").PaymentConfirm);

            })
            .expect(200, done);
    });
    
    it('07:05 -> Delete payment', function(done) {
        agent
            .delete(`/api/v1/payment/${getTestData("paymentId_1")}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body).to.have.property('Status');
                expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

    it('07:01 -> Create payment again', function(done) {
        loadPaymentCreateModel();
        const createModel = getTestData("paymentCreateModel");
        agent
            .post(`/api/v1/payment/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData(response.body.Data.Payment.id, 'paymentId_1');

                expect(response.body.Data.Payment).to.have.property('HotelId');
                expect(response.body.Data.Payment).to.have.property('ReservationOrderId');
                expect(response.body.Data.Payment).to.have.property('PaymentDate');
                expect(response.body.Data.Payment).to.have.property('TransactionStatus');
                expect(response.body.Data.Payment).to.have.property('Amount');
                expect(response.body.Data.Payment).to.have.property('PaymentMethod');
                expect(response.body.Data.Payment).to.have.property('PaymentConfirm');

                expect(response.body.Data.Payment.HotelId).to.equal(getTestData("paymentCreateModel").HotelId);
                expect(response.body.Data.Payment.ReservationOrderId).to.equal(getTestData("paymentCreateModel").ReservationOrderId);
                expect(response.body.Data.Payment.PaymentDate).to.equal(getTestData("paymentCreateModel").PaymentDate);
                expect(response.body.Data.Payment.TransactionStatus).to.equal(getTestData("paymentCreateModel").TransactionStatus);
                expect(response.body.Data.Payment.PaymentConfirm).to.equal(getTestData("paymentCreateModel").PaymentConfirm);

            })
            .expect(201, done);
    });

 });

// ///////////////////////////////////////////////////////////////////////////

export const loadPaymentCreateModel = async (
) => {
    const model = {
        HotelId:getTestData("hotelId"),
        ReservationOrderId:getTestData("reservationOrderId"),
        PaymentDate:faker.date.month(),
        TransactionStatus:"Yes",
        Amount:faker.number.int(),
        PaymentMethod:"G-pay",
        PaymentConfirm:"No"
        
     };
    setTestData(model, "paymentCreateModel");
};

export const loadPaymentUpdateModel = async (
) => {
    const model = {
        HotelId:getTestData("hotelId"),
        ReservationOrderId:getTestData("reservationOrderId"),
        PaymentDate:faker.date.month(),
        TransactionStatus:"Yes",
        Amount:faker.number.int(100000),
        PaymentMethod:"G-pay",
        PaymentConfirm:"No"
        
     };
    setTestData(model, "paymentUpdateModel");
};

function loadPaymentQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '';
    return queryString;
}

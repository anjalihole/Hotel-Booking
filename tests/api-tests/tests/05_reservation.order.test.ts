import  request  from 'supertest';
import { expect } from 'chai';
import  Application  from '../../../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from '../init';
import { endDate, startDate } from '../utils';
const infra = Application.instance();

///////////////////////////////////////////////////////////////////////////

describe('07 - ReservationOrder tests', function() {

    var agent = request.agent(infra._app);

    it('07:01 -> Create reservationOrder', function(done) {
        loadReservationOrderCreateModel();
        const createModel = getTestData("reservationOrderCreateModel");
        agent
            .post(`/api/v1/reservationOrder/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData(response.body.Data.ReservationOrder.id, 'reservationOrderId_1');

                expect(response.body.Data.ReservationOrder).to.have.property('CustomerUserId');
                expect(response.body.Data.ReservationOrder).to.have.property('TotalCost');
                expect(response.body.Data.ReservationOrder).to.have.property('CheckInDate');
                expect(response.body.Data.ReservationOrder).to.have.property('CheckOutDate');
                expect(response.body.Data.ReservationOrder).to.have.property('ReservationDateTime');
                expect(response.body.Data.ReservationOrder).to.have.property('Status');
                expect(response.body.Data.ReservationOrder).to.have.property('Discount');
                expect(response.body.Data.ReservationOrder).to.have.property('Taxes');
                expect(response.body.Data.ReservationOrder).to.have.property('TotalPayable');
                expect(response.body.Data.ReservationOrder).to.have.property('AdvancePaid');
                expect(response.body.Data.ReservationOrder).to.have.property('AdvancePaymentDateTime');
                expect(response.body.Data.ReservationOrder).to.have.property('BookingStaffUserId');
                expect(response.body.Data.ReservationOrder).to.have.property('Penalties');

                expect(response.body.Data.ReservationOrder.CustomerUserId).to.equal(getTestData("reservationOrderCreateModel").CustomerUserId);
                expect(response.body.Data.ReservationOrder.TotalCost).to.equal(getTestData("reservationOrderCreateModel").TotalCost);
                expect(response.body.Data.ReservationOrder.Status).to.equal(getTestData("reservationOrderCreateModel").Status);
                expect(response.body.Data.ReservationOrder.Discount).to.equal(getTestData("reservationOrderCreateModel").Discount);
                expect(response.body.Data.ReservationOrder.Taxes).to.equal(getTestData("reservationOrderCreateModel").Taxes);
                expect(response.body.Data.ReservationOrder.TotalPayable).to.equal(getTestData("reservationOrderCreateModel").TotalPayable);
                expect(response.body.Data.ReservationOrder.AdvancePaid).to.equal(getTestData("reservationOrderCreateModel").AdvancePaid);
                expect(response.body.Data.ReservationOrder.BookingStaffUserId).to.equal(getTestData("reservationOrderCreateModel").BookingStaffUserId);
                expect(response.body.Data.ReservationOrder.Penalties).to.equal(getTestData("reservationOrderCreateModel").Penalties);

            })
            .expect(201, done);
    })

   
    it('07:04 -> Get reservationOrder by id', function(done) {
        agent
            .get(`/api/v1/reservationOrder/${getTestData("reservationOrderId_1")}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body.Data.ReservationOrder).to.have.property('CustomerUserId');
                expect(response.body.Data.ReservationOrder).to.have.property('TotalCost');
                expect(response.body.Data.ReservationOrder).to.have.property('CheckInDate');
                expect(response.body.Data.ReservationOrder).to.have.property('CheckOutDate');
                expect(response.body.Data.ReservationOrder).to.have.property('ReservationDateTime');
                expect(response.body.Data.ReservationOrder).to.have.property('Status');
                expect(response.body.Data.ReservationOrder).to.have.property('Discount');
                expect(response.body.Data.ReservationOrder).to.have.property('Taxes');
                expect(response.body.Data.ReservationOrder).to.have.property('TotalPayable');
                expect(response.body.Data.ReservationOrder).to.have.property('AdvancePaid');
                expect(response.body.Data.ReservationOrder).to.have.property('AdvancePaymentDateTime');
                expect(response.body.Data.ReservationOrder).to.have.property('BookingStaffUserId');
                expect(response.body.Data.ReservationOrder).to.have.property('Penalties');

                expect(response.body.Data.ReservationOrder.CustomerUserId).to.equal(getTestData("reservationOrderCreateModel").CustomerUserId);
                expect(response.body.Data.ReservationOrder.TotalCost).to.equal(getTestData("reservationOrderCreateModel").TotalCost);
                expect(response.body.Data.ReservationOrder.Status).to.equal(getTestData("reservationOrderCreateModel").Status);
                expect(response.body.Data.ReservationOrder.Discount).to.equal(getTestData("reservationOrderCreateModel").Discount);
                expect(response.body.Data.ReservationOrder.Taxes).to.equal(getTestData("reservationOrderCreateModel").Taxes);
                expect(response.body.Data.ReservationOrder.TotalPayable).to.equal(getTestData("reservationOrderCreateModel").TotalPayable);
                expect(response.body.Data.ReservationOrder.AdvancePaid).to.equal(getTestData("reservationOrderCreateModel").AdvancePaid);
                expect(response.body.Data.ReservationOrder.BookingStaffUserId).to.equal(getTestData("reservationOrderCreateModel").BookingStaffUserId);
                expect(response.body.Data.ReservationOrder.Penalties).to.equal(getTestData("reservationOrderCreateModel").Penalties);

            })
            .expect(200, done);
    });

    it('81:03 -> Search records', function(done) {
        loadReservationOrderQueryString();
        agent
            .get(`/api/v1/reservationorder/search${loadReservationOrderQueryString()}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body.Data.ReservationOrderRecords).to.have.property('TotalCount');
                expect(response.body.Data.ReservationOrderRecords).to.have.property('RetrievedCount');
                expect(response.body.Data.ReservationOrderRecords).to.have.property('PageIndex');
                expect(response.body.Data.ReservationOrderRecords).to.have.property('ItemsPerPage');
                expect(response.body.Data.ReservationOrderRecords).to.have.property('Order');
                expect(response.body.Data.ReservationOrderRecords.TotalCount).to.greaterThan(0);
                expect(response.body.Data.ReservationOrderRecords.RetrievedCount).to.greaterThan(0);
                expect(response.body.Data.ReservationOrderRecords.Items.length).to.greaterThan(0);
            })
            .expect(200, done);
    });

    it('07:04 -> Update reservationOrder', function(done) {
        loadReservationOrderUpdateModel();
        const updateModel = getTestData("reservationOrderUpdateModel");
        agent
            .put(`/api/v1/reservationOrder/${getTestData("reservationOrderId_1")}`)
            .set('Content-Type', 'application/json')
            .send(updateModel)
            .expect(response => {

                expect(response.body.Data.ReservationOrder).to.have.property('CustomerUserId');
                expect(response.body.Data.ReservationOrder).to.have.property('TotalCost');
                expect(response.body.Data.ReservationOrder).to.have.property('CheckInDate');
                expect(response.body.Data.ReservationOrder).to.have.property('CheckOutDate');
                expect(response.body.Data.ReservationOrder).to.have.property('ReservationDateTime');
                expect(response.body.Data.ReservationOrder).to.have.property('Status');
                expect(response.body.Data.ReservationOrder).to.have.property('Discount');
                expect(response.body.Data.ReservationOrder).to.have.property('Taxes');
                expect(response.body.Data.ReservationOrder).to.have.property('TotalPayable');
                expect(response.body.Data.ReservationOrder).to.have.property('AdvancePaid');
                expect(response.body.Data.ReservationOrder).to.have.property('AdvancePaymentDateTime');
                expect(response.body.Data.ReservationOrder).to.have.property('BookingStaffUserId');
                expect(response.body.Data.ReservationOrder).to.have.property('Penalties');

                expect(response.body.Data.ReservationOrder.CustomerUserId).to.equal(getTestData("reservationOrderUpdateModel").CustomerUserId);
                expect(response.body.Data.ReservationOrder.TotalCost).to.equal(getTestData("reservationOrderUpdateModel").TotalCost);
                expect(response.body.Data.ReservationOrder.Status).to.equal(getTestData("reservationOrderUpdateModel").Status);
                expect(response.body.Data.ReservationOrder.Discount).to.equal(getTestData("reservationOrderUpdateModel").Discount);
                expect(response.body.Data.ReservationOrder.Taxes).to.equal(getTestData("reservationOrderUpdateModel").Taxes);
                expect(response.body.Data.ReservationOrder.TotalPayable).to.equal(getTestData("reservationOrderUpdateModel").TotalPayable);
                expect(response.body.Data.ReservationOrder.AdvancePaid).to.equal(getTestData("reservationOrderUpdateModel").AdvancePaid);
                expect(response.body.Data.ReservationOrder.BookingStaffUserId).to.equal(getTestData("reservationOrderUpdateModel").BookingStaffUserId);
                expect(response.body.Data.ReservationOrder.Penalties).to.equal(getTestData("reservationOrderUpdateModel").Penalties);

            })
            .expect(200, done);
    });
    
    it('07:05 -> Delete reservationOrder', function(done) {
        agent
            .delete(`/api/v1/reservationOrder/${getTestData("reservationOrderId_1")}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body).to.have.property('Status');
                expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

    it('07:01 -> Create reservationOrder again', function(done) {
        loadReservationOrderCreateModel();
        const createModel = getTestData("reservationOrderCreateModel");
        agent
            .post(`/api/v1/reservationOrder/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData(response.body.Data.ReservationOrder.id, "reservationOrderId");

                expect(response.body.Data.ReservationOrder).to.have.property('CustomerUserId');
                expect(response.body.Data.ReservationOrder).to.have.property('TotalCost');
                expect(response.body.Data.ReservationOrder).to.have.property('CheckInDate');
                expect(response.body.Data.ReservationOrder).to.have.property('CheckOutDate');
                expect(response.body.Data.ReservationOrder).to.have.property('ReservationDateTime');
                expect(response.body.Data.ReservationOrder).to.have.property('Status');
                expect(response.body.Data.ReservationOrder).to.have.property('Discount');
                expect(response.body.Data.ReservationOrder).to.have.property('Taxes');
                expect(response.body.Data.ReservationOrder).to.have.property('TotalPayable');
                expect(response.body.Data.ReservationOrder).to.have.property('AdvancePaid');
                expect(response.body.Data.ReservationOrder).to.have.property('AdvancePaymentDateTime');
                expect(response.body.Data.ReservationOrder).to.have.property('BookingStaffUserId');
                expect(response.body.Data.ReservationOrder).to.have.property('Penalties');

                expect(response.body.Data.ReservationOrder.CustomerUserId).to.equal(getTestData("reservationOrderCreateModel").CustomerUserId);
                expect(response.body.Data.ReservationOrder.TotalCost).to.equal(getTestData("reservationOrderCreateModel").TotalCost);
                expect(response.body.Data.ReservationOrder.Status).to.equal(getTestData("reservationOrderCreateModel").Status);
                expect(response.body.Data.ReservationOrder.Discount).to.equal(getTestData("reservationOrderCreateModel").Discount);
                expect(response.body.Data.ReservationOrder.Taxes).to.equal(getTestData("reservationOrderCreateModel").Taxes);
                expect(response.body.Data.ReservationOrder.TotalPayable).to.equal(getTestData("reservationOrderCreateModel").TotalPayable);
                expect(response.body.Data.ReservationOrder.AdvancePaid).to.equal(getTestData("reservationOrderCreateModel").AdvancePaid);
                expect(response.body.Data.ReservationOrder.BookingStaffUserId).to.equal(getTestData("reservationOrderCreateModel").BookingStaffUserId);
                expect(response.body.Data.ReservationOrder.Penalties).to.equal(getTestData("reservationOrderCreateModel").Penalties);


            })
            .expect(201, done);
    });
 });

// ///////////////////////////////////////////////////////////////////////////

export const loadReservationOrderCreateModel = async (
) => {
    const model = {
        CustomerUserId:getTestData("customerId"),
        TotalCost:"9000",
        CheckInDate:startDate,
        CheckOutDate:endDate,
        ReservationDateTime:faker.date.past() ,
        Status:"Yes",
        Discount:"₹ 1,055",
        Taxes:"₹ 991",
        TotalPayable:"₹ 4,000",
        AdvancePaid:"1,055",
        AdvancePaymentDateTime:faker.date.past() ,
        BookingStaffUserId:getTestData("userId"),
        Penalties:"₹ 100"
        
     };
    setTestData(model, "reservationOrderCreateModel");
};

export const loadReservationOrderUpdateModel = async (
) => {
    const model = {
        CustomerUserId:getTestData("customerId"),
        TotalCost:"9000",
        CheckInDate:startDate,
        CheckOutDate:endDate,
        ReservationDateTime:faker.date.past() ,
        Status:"Yes",
        Discount:"₹ 1,055",
        Taxes:"₹ 991",
        TotalPayable:"₹ 4,000",
        AdvancePaid:"1,055",
        AdvancePaymentDateTime:faker.date.past() ,
        BookingStaffUserId:getTestData("userId"),
        Penalties:"₹ 100"
        
     };
    setTestData(model, "reservationOrderUpdateModel");
};

function loadReservationOrderQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '';
    return queryString;
}

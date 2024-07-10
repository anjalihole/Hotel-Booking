import  request  from 'supertest';
import { expect } from 'chai';
import  Application  from '../../../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from '../init';
const infra = Application.instance();

///////////////////////////////////////////////////////////////////////////

describe('07 - ReservationOrderItem tests', function() {

    var agent = request.agent(infra._app);

    it('07:01 -> Create reservationOrderItem', function(done) {
        loadReservationOrderItemCreateModel();
        const createModel = getTestData("reservationOrderItemCreateModel");
        agent
            .post(`/api/v1/reservationOrderItem/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData(response.body.Data.ReservationOrderItem.id, 'reservationOrderItemId_1');

                expect(response.body.Data.ReservationOrderItem).to.have.property('ReservationOrderId');
                expect(response.body.Data.ReservationOrderItem).to.have.property('RoomId');
                expect(response.body.Data.ReservationOrderItem).to.have.property('TotalDays');
                expect(response.body.Data.ReservationOrderItem).to.have.property('Tax');
                expect(response.body.Data.ReservationOrderItem).to.have.property('Discount');
                expect(response.body.Data.ReservationOrderItem).to.have.property('Cost');

                expect(response.body.Data.ReservationOrderItem.ReservationOrderId).to.equal(getTestData("reservationOrderItemCreateModel").ReservationOrderId);
                expect(response.body.Data.ReservationOrderItem.RoomId).to.equal(getTestData("reservationOrderItemCreateModel").RoomId);
                expect(response.body.Data.ReservationOrderItem.TotalDays).to.equal(getTestData("reservationOrderItemCreateModel").TotalDays);
                expect(response.body.Data.ReservationOrderItem.Tax).to.equal(getTestData("reservationOrderItemCreateModel").Tax);
                expect(response.body.Data.ReservationOrderItem.Discount).to.equal(getTestData("reservationOrderItemCreateModel").Discount);
                expect(response.body.Data.ReservationOrderItem.Cost).to.equal(getTestData("reservationOrderItemCreateModel").Cost);
    
            })
            .expect(201, done);
    })

   
    it('07:04 -> Get reservationOrderItem by id', function(done) {
        agent
            .get(`/api/v1/reservationOrderItem/${getTestData("reservationOrderItemId_1")}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body.Data.ReservationOrderItem).to.have.property('ReservationOrderId');
                expect(response.body.Data.ReservationOrderItem).to.have.property('RoomId');
                expect(response.body.Data.ReservationOrderItem).to.have.property('TotalDays');
                expect(response.body.Data.ReservationOrderItem).to.have.property('Tax');
                expect(response.body.Data.ReservationOrderItem).to.have.property('Discount');
                expect(response.body.Data.ReservationOrderItem).to.have.property('Cost');

                expect(response.body.Data.ReservationOrderItem.ReservationOrderId).to.equal(getTestData("reservationOrderItemCreateModel").ReservationOrderId);
                expect(response.body.Data.ReservationOrderItem.RoomId).to.equal(getTestData("reservationOrderItemCreateModel").RoomId);
                expect(response.body.Data.ReservationOrderItem.TotalDays).to.equal(getTestData("reservationOrderItemCreateModel").TotalDays);
                expect(response.body.Data.ReservationOrderItem.Tax).to.equal(getTestData("reservationOrderItemCreateModel").Tax);
                expect(response.body.Data.ReservationOrderItem.Discount).to.equal(getTestData("reservationOrderItemCreateModel").Discount);
                expect(response.body.Data.ReservationOrderItem.Cost).to.equal(getTestData("reservationOrderItemCreateModel").Cost);
            })
            .expect(200, done);
    });

    it('81:03 -> Search records', function(done) {
        loadReservationOrderItemQueryString();
        agent
            .get(`/api/v1/reservationorderItem/search${loadReservationOrderItemQueryString()}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body.Data.ReservationOrderItemRecords).to.have.property('TotalCount');
                expect(response.body.Data.ReservationOrderItemRecords).to.have.property('RetrievedCount');
                expect(response.body.Data.ReservationOrderItemRecords).to.have.property('PageIndex');
                expect(response.body.Data.ReservationOrderItemRecords).to.have.property('ItemsPerPage');
                expect(response.body.Data.ReservationOrderItemRecords).to.have.property('Order');
                expect(response.body.Data.ReservationOrderItemRecords.TotalCount).to.greaterThan(0);
                expect(response.body.Data.ReservationOrderItemRecords.RetrievedCount).to.greaterThan(0);
                expect(response.body.Data.ReservationOrderItemRecords.Items.length).to.greaterThan(0);
            })
            .expect(200, done);
    });

    it('07:04 -> Update reservationOrderItem', function(done) {
        loadReservationOrderItemUpdateModel();
        const updateModel = getTestData("reservationOrderItemUpdateModel");
        agent
            .put(`/api/v1/reservationOrderItem/${getTestData("reservationOrderItemId_1")}`)
            .set('Content-Type', 'application/json')
            .send(updateModel)
            .expect(response => {

                expect(response.body.Data.ReservationOrderItem).to.have.property('ReservationOrderId');
                expect(response.body.Data.ReservationOrderItem).to.have.property('RoomId');
                expect(response.body.Data.ReservationOrderItem).to.have.property('TotalDays');
                expect(response.body.Data.ReservationOrderItem).to.have.property('Tax');
                expect(response.body.Data.ReservationOrderItem).to.have.property('Discount');
                expect(response.body.Data.ReservationOrderItem).to.have.property('Cost');

                expect(response.body.Data.ReservationOrderItem.ReservationOrderId).to.equal(getTestData("reservationOrderItemUpdateModel").ReservationOrderId);
                expect(response.body.Data.ReservationOrderItem.RoomId).to.equal(getTestData("reservationOrderItemUpdateModel").RoomId);
                expect(response.body.Data.ReservationOrderItem.TotalDays).to.equal(getTestData("reservationOrderItemUpdateModel").TotalDays);
                expect(response.body.Data.ReservationOrderItem.Tax).to.equal(getTestData("reservationOrderItemUpdateModel").Tax);
                expect(response.body.Data.ReservationOrderItem.Discount).to.equal(getTestData("reservationOrderItemUpdateModel").Discount);
                expect(response.body.Data.ReservationOrderItem.Cost).to.equal(getTestData("reservationOrderItemUpdateModel").Cost);
    
            })
            .expect(200, done);
    });
    
    it('07:05 -> Delete reservationOrderItem', function(done) {
        agent
            .delete(`/api/v1/reservationOrderItem/${getTestData("reservationOrderItemId_1")}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body).to.have.property('Status');
                expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

    it('07:01 -> Create reservationOrderItem again', function(done) {
        loadReservationOrderItemCreateModel();
        const createModel = getTestData("reservationOrderItemCreateModel");
        agent
            .post(`/api/v1/reservationOrderItem/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData(response.body.Data.ReservationOrderItem.id, "reservationOrderItemId");

                expect(response.body.Data.ReservationOrderItem).to.have.property('ReservationOrderId');
                expect(response.body.Data.ReservationOrderItem).to.have.property('RoomId');
                expect(response.body.Data.ReservationOrderItem).to.have.property('TotalDays');
                expect(response.body.Data.ReservationOrderItem).to.have.property('Tax');
                expect(response.body.Data.ReservationOrderItem).to.have.property('Discount');
                expect(response.body.Data.ReservationOrderItem).to.have.property('Cost');

                expect(response.body.Data.ReservationOrderItem.ReservationOrderId).to.equal(getTestData("reservationOrderItemCreateModel").ReservationOrderId);
                expect(response.body.Data.ReservationOrderItem.RoomId).to.equal(getTestData("reservationOrderItemCreateModel").RoomId);
                expect(response.body.Data.ReservationOrderItem.TotalDays).to.equal(getTestData("reservationOrderItemCreateModel").TotalDays);
                expect(response.body.Data.ReservationOrderItem.Tax).to.equal(getTestData("reservationOrderItemCreateModel").Tax);
                expect(response.body.Data.ReservationOrderItem.Discount).to.equal(getTestData("reservationOrderItemCreateModel").Discount);
                expect(response.body.Data.ReservationOrderItem.Cost).to.equal(getTestData("reservationOrderItemCreateModel").Cost);
    

            })
            .expect(201, done);
    });
 });

// ///////////////////////////////////////////////////////////////////////////

export const loadReservationOrderItemCreateModel = async (
) => {
    const model = {
        ReservationOrderId:getTestData("reservationOrderId"),
        RoomId:getTestData("roomId"),
        TotalDays:"1",
        Tax:"₹ 750",
        Discount:"₹ 400",
        Cost:"₹ 8000",
        
     };
    setTestData(model, "reservationOrderItemCreateModel");
};

export const loadReservationOrderItemUpdateModel = async (
) => {
    const model = {
        ReservationOrderId:getTestData("reservationOrderId"),
        RoomId:getTestData("roomId"),
        TotalDays:"1",
        Tax:"₹ 750",
        Discount:"₹ 400",
        Cost:"₹ 8000",
        
     };
    setTestData(model, "reservationOrderItemUpdateModel");
};

function loadReservationOrderItemQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '';
    return queryString;
}

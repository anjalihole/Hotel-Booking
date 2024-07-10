import  request  from 'supertest';
import { expect } from 'chai';
import  Application  from '../../../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from '../init';
const infra = Application.instance();

///////////////////////////////////////////////////////////////////////////

describe('07 - RoomAmenities tests', function() {

    var agent = request.agent(infra._app);

    it('07:01 -> Create roomAmenities', function(done) {
        loadRoomAmenitiesCreateModel();
        const createModel = getTestData("roomAmenitiesCreateModel");
        agent
            .post(`/api/v1/roomAmenities/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData(response.body.Data.RoomAmenities.id, 'roomAmenitiesId_1');

                expect(response.body.Data.RoomAmenities).to.have.property('AmenityName');
                expect(response.body.Data.RoomAmenities).to.have.property('RoomId');
                expect(response.body.Data.RoomAmenities).to.have.property('HotelId');

                expect(response.body.Data.RoomAmenities.AmenityName).to.equal(getTestData("roomAmenitiesCreateModel").AmenityName);
                expect(response.body.Data.RoomAmenities.RoomId).to.equal(getTestData("roomAmenitiesCreateModel").RoomId);
                expect(response.body.Data.RoomAmenities.HotelId).to.equal(getTestData("roomAmenitiesCreateModel").HotelId);
            })
            .expect(201, done);
    })

    it('07:04 -> Get roomAmenities by id', function(done) {
        agent
            .get(`/api/v1/roomAmenities/${getTestData("roomAmenitiesId_1")}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body.Data.RoomAmenities).to.have.property('AmenityName');
                expect(response.body.Data.RoomAmenities).to.have.property('RoomId');
                expect(response.body.Data.RoomAmenities).to.have.property('HotelId');

                expect(response.body.Data.RoomAmenities.AmenityName).to.equal(getTestData("roomAmenitiesCreateModel").AmenityName);
                expect(response.body.Data.RoomAmenities.RoomId).to.equal(getTestData("roomAmenitiesCreateModel").RoomId);
                expect(response.body.Data.RoomAmenities.HotelId).to.equal(getTestData("roomAmenitiesCreateModel").HotelId);
            })
            .expect(200, done);
    });

    it('81:03 -> Search records', function(done) {
        loadRoomAmenitiesQueryString();
        agent
            .get(`/api/v1/roomAmenities/search${loadRoomAmenitiesQueryString()}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body.Data.RoomAmenitiesRecords).to.have.property('TotalCount');
                expect(response.body.Data.RoomAmenitiesRecords).to.have.property('RetrievedCount');
                expect(response.body.Data.RoomAmenitiesRecords).to.have.property('PageIndex');
                expect(response.body.Data.RoomAmenitiesRecords).to.have.property('ItemsPerPage');
                expect(response.body.Data.RoomAmenitiesRecords).to.have.property('Order');
                expect(response.body.Data.RoomAmenitiesRecords.TotalCount).to.greaterThan(0);
                expect(response.body.Data.RoomAmenitiesRecords.RetrievedCount).to.greaterThan(0);
                expect(response.body.Data.RoomAmenitiesRecords.Items.length).to.greaterThan(0);
            })
            .expect(200, done);
    });

    it('07:04 -> Update roomAmenities', function(done) {
        loadRoomAmenitiesUpdateModel();
        const updateModel = getTestData("roomAmenitiesUpdateModel");
        agent
            .put(`/api/v1/roomAmenities/${getTestData("roomAmenitiesId_1")}`)
            .set('Content-Type', 'application/json')
            .send(updateModel)
            .expect(response => {
                expect(response.body.Data.RoomAmenities).to.have.property('AmenityName');
                expect(response.body.Data.RoomAmenities).to.have.property('RoomId');
                expect(response.body.Data.RoomAmenities).to.have.property('HotelId');

                expect(response.body.Data.RoomAmenities.AmenityName).to.equal(getTestData("roomAmenitiesUpdateModel").AmenityName);
                expect(response.body.Data.RoomAmenities.RoomId).to.equal(getTestData("roomAmenitiesUpdateModel").RoomId);
                expect(response.body.Data.RoomAmenities.HotelId).to.equal(getTestData("roomAmenitiesUpdateModel").HotelId);
            })
            .expect(200, done);
    });
    
    it('07:05 -> Delete roomAmenities', function(done) {
        agent
            .delete(`/api/v1/roomAmenities/${getTestData("roomAmenitiesId_1")}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body).to.have.property('Status');
                expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

    it('07:01 -> Create roomAmenities again', function(done) {
        loadRoomAmenitiesCreateModel();
        const createModel = getTestData("roomAmenitiesCreateModel");
        agent
            .post(`/api/v1/roomAmenities/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData(response.body.Data.RoomAmenities.id, "roomAmenitiesId");

                expect(response.body.Data.RoomAmenities).to.have.property('AmenityName');
                expect(response.body.Data.RoomAmenities).to.have.property('RoomId');
                expect(response.body.Data.RoomAmenities).to.have.property('HotelId');

                
                expect(response.body.Data.RoomAmenities.AmenityName).to.equal(getTestData("roomAmenitiesCreateModel").AmenityName);
                expect(response.body.Data.RoomAmenities.RoomId).to.equal(getTestData("roomAmenitiesCreateModel").RoomId);
                expect(response.body.Data.RoomAmenities.HotelId).to.equal(getTestData("roomAmenitiesCreateModel").HotelId);
            })
            .expect(201, done);
    });

 });

// ///////////////////////////////////////////////////////////////////////////

export const loadRoomAmenitiesCreateModel = async (
) => {
    const model = {
        AmenityName: faker.person.firstName(),
        RoomId:getTestData("roomId"),
        HotelId:getTestData("hotelId"),
        
     };
    setTestData(model, "roomAmenitiesCreateModel");
};

export const loadRoomAmenitiesUpdateModel = async (
) => {
    const model = {
        AmenityName: faker.person.firstName(),
        RoomId:getTestData("roomId"),
        HotelId:getTestData("hotelId"),
     };
    setTestData(model, "roomAmenitiesUpdateModel");
};

function loadRoomAmenitiesQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '';
    return queryString;
}

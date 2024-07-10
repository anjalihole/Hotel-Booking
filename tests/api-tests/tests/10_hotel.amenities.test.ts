import  request  from 'supertest';
import { expect } from 'chai';
import  Application  from '../../../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from '../init';
const infra = Application.instance();

///////////////////////////////////////////////////////////////////////////

describe('07 - HotelAmenities tests', function() {

    var agent = request.agent(infra._app);

    it('07:01 -> Create hotelAmenities', function(done) {
        loadHotelAmenitiesCreateModel();
        const createModel = getTestData("hotelAmenitiesCreateModel");
        agent
            .post(`/api/v1/hotelAmenities/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData(response.body.Data.HotelAmenities.id, 'hotelAmenitiesId_1');

                expect(response.body.Data.HotelAmenities).to.have.property('AminityName');
                expect(response.body.Data.HotelAmenities).to.have.property('HotelId');

                expect(response.body.Data.HotelAmenities.AminityName).to.equal(getTestData("hotelAmenitiesCreateModel").AminityName);
                expect(response.body.Data.HotelAmenities.HotelId).to.equal(getTestData("hotelAmenitiesCreateModel").HotelId);

            })
            .expect(201, done);
    })

    it('07:04 -> Get hotelAmenities by id', function(done) {
        agent
            .get(`/api/v1/hotelAmenities/${getTestData("hotelAmenitiesId_1")}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body.Data.HotelAmenities).to.have.property('AminityName');
                expect(response.body.Data.HotelAmenities).to.have.property('HotelId');

                expect(response.body.Data.HotelAmenities.AminityName).to.equal(getTestData("hotelAmenitiesCreateModel").AminityName);
                expect(response.body.Data.HotelAmenities.HotelId).to.equal(getTestData("hotelAmenitiesCreateModel").HotelId);

            })
            .expect(200, done);
    });

    it('81:03 -> Search records', function(done) {
        loadHotelAmenitiesQueryString();
        agent
            .get(`/api/v1/hotelAmenities/search${loadHotelAmenitiesQueryString()}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body.Data.HotelAmenitiesRecords).to.have.property('TotalCount');
                expect(response.body.Data.HotelAmenitiesRecords).to.have.property('RetrievedCount');
                expect(response.body.Data.HotelAmenitiesRecords).to.have.property('PageIndex');
                expect(response.body.Data.HotelAmenitiesRecords).to.have.property('ItemsPerPage');
                expect(response.body.Data.HotelAmenitiesRecords).to.have.property('Order');
                expect(response.body.Data.HotelAmenitiesRecords.TotalCount).to.be.at.least(0);
                expect(response.body.Data.HotelAmenitiesRecords.RetrievedCount).to.be.at.least(0);
                expect(response.body.Data.HotelAmenitiesRecords.Items.length).to.be.at.least(0);
            })
            .expect(200, done);
    });

    it('07:04 -> Update hotelAmenities', function(done) {
        loadHotelAmenitiesUpdateModel();
        const updateModel = getTestData("hotelAmenitiesUpdateModel");
        agent
            .put(`/api/v1/hotelAmenities/${getTestData("hotelAmenitiesId_1")}`)
            .set('Content-Type', 'application/json')
            .send(updateModel)
            .expect(response => {
                expect(response.body.Data.HotelAmenities).to.have.property('AminityName');
                expect(response.body.Data.HotelAmenities).to.have.property('HotelId');

                expect(response.body.Data.HotelAmenities.AminityName).to.equal(getTestData("hotelAmenitiesUpdateModel").AminityName);
                expect(response.body.Data.HotelAmenities.HotelId).to.equal(getTestData("hotelAmenitiesUpdateModel").HotelId);

            })
            .expect(200, done);
    });

    it('07:05 -> Delete hotelAmenities', function(done) {
        agent
            .delete(`/api/v1/hotelAmenities/${getTestData("hotelAmenitiesId_1")}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body).to.have.property('Status');
                expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

it('07:01 -> Create hotelAmenities again', function(done) {
    loadHotelAmenitiesCreateModel();
    const createModel = getTestData("hotelAmenitiesCreateModel");
    agent
        .post(`/api/v1/hotelAmenities/`)
        .set('Content-Type', 'application/json')
        .send(createModel)
        .expect(response => {
            setTestData(response.body.Data.HotelAmenities.id, 'hotelAmenitiesId');

            expect(response.body.Data.HotelAmenities).to.have.property('AminityName');
            expect(response.body.Data.HotelAmenities).to.have.property('HotelId');

            expect(response.body.Data.HotelAmenities.AminityName).to.equal(getTestData("hotelAmenitiesCreateModel").AminityName);
            expect(response.body.Data.HotelAmenities.HotelId).to.equal(getTestData("hotelAmenitiesCreateModel").HotelId);

        })
        .expect(201, done);
})
  });

// // ///////////////////////////////////////////////////////////////////////////

export const loadHotelAmenitiesCreateModel = async (
) => {
    const model = {
        AminityName: faker.person.fullName(),
        HotelId:getTestData("hotelId"),
     };
    setTestData(model, "hotelAmenitiesCreateModel");
};

export const loadHotelAmenitiesUpdateModel = async (
) => {
    const model = {
        AminityName: faker.person.fullName(),
        HotelId:getTestData("hotelId"),
     };
    setTestData(model, "hotelAmenitiesUpdateModel");
};

function loadHotelAmenitiesQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '';
    return queryString;
}

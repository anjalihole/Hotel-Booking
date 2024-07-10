import  request  from 'supertest';
import { expect } from 'chai';
import  Application  from '../../../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from '../init';
import { startDate , endDate }  from '../utils'
const infra = Application.instance();

///////////////////////////////////////////////////////////////////////////

describe('07 - Hotel tests', function() {

    var agent = request.agent(infra._app);

    it('07:01 -> Create hotel', function(done) {
        loadHotelCreateModel();
        const createModel = getTestData("hotelCreateModel");
        agent
            .post(`/api/v1/hotel/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData(response.body.Data.Hotel.id, 'hotelId_1');

                expect(response.body.Data.Hotel).to.have.property('Name');
                expect(response.body.Data.Hotel).to.have.property('AddressId');
                expect(response.body.Data.Hotel).to.have.property('Phone');
                expect(response.body.Data.Hotel).to.have.property('Email');
                expect(response.body.Data.Hotel).to.have.property('Description');
                expect(response.body.Data.Hotel).to.have.property('CheckInTime');
                expect(response.body.Data.Hotel).to.have.property('CheckOutTime');
                expect(response.body.Data.Hotel).to.have.property('OwnerUserId');
                expect(response.body.Data.Hotel).to.have.property('Photos');

                expect(response.body.Data.Hotel.Name).to.equal(getTestData("hotelCreateModel").Name);
                expect(response.body.Data.Hotel.AddressId).to.equal(getTestData("hotelCreateModel").AddressId);
                expect(response.body.Data.Hotel.Phone).to.equal(getTestData("hotelCreateModel").Phone);
                expect(response.body.Data.Hotel.Email).to.equal(getTestData("hotelCreateModel").Email);
                expect(response.body.Data.Hotel.Description).to.equal(getTestData("hotelCreateModel").Description);
                expect(response.body.Data.Hotel.CheckInTime).to.equal(getTestData("hotelCreateModel").CheckInTime);
                expect(response.body.Data.Hotel.CheckOutTime).to.equal(getTestData("hotelCreateModel").CheckOutTime);
                expect(response.body.Data.Hotel.OwnerUserId).to.equal(getTestData("hotelCreateModel").OwnerUserId);
                expect(response.body.Data.Hotel.Photos).to.equal(getTestData("hotelCreateModel").Photos);


            })
            .expect(201, done);
    })

    it('07:04 -> Get hotel by id', function(done) {
        agent
            .get(`/api/v1/hotel/${getTestData("hotelId_1")}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body.Data.Hotel).to.have.property('Name');
                expect(response.body.Data.Hotel).to.have.property('AddressId');
                expect(response.body.Data.Hotel).to.have.property('Phone');
                expect(response.body.Data.Hotel).to.have.property('Email');
                expect(response.body.Data.Hotel).to.have.property('Description');
                expect(response.body.Data.Hotel).to.have.property('CheckInTime');
                expect(response.body.Data.Hotel).to.have.property('CheckOutTime');
                expect(response.body.Data.Hotel).to.have.property('OwnerUserId');
                expect(response.body.Data.Hotel).to.have.property('Photos');

                expect(response.body.Data.Hotel.Name).to.equal(getTestData("hotelCreateModel").Name);
                expect(response.body.Data.Hotel.AddressId).to.equal(getTestData("hotelCreateModel").AddressId);
                expect(response.body.Data.Hotel.Phone).to.equal(getTestData("hotelCreateModel").Phone);
                expect(response.body.Data.Hotel.Email).to.equal(getTestData("hotelCreateModel").Email);
                expect(response.body.Data.Hotel.Description).to.equal(getTestData("hotelCreateModel").Description);
                expect(response.body.Data.Hotel.CheckInTime).to.equal(getTestData("hotelCreateModel").CheckInTime);
                expect(response.body.Data.Hotel.CheckOutTime).to.equal(getTestData("hotelCreateModel").CheckOutTime);
                expect(response.body.Data.Hotel.OwnerUserId).to.equal(getTestData("hotelCreateModel").OwnerUserId);
                expect(response.body.Data.Hotel.Photos).to.equal(getTestData("hotelCreateModel").Photos);


            })
            .expect(200, done);
    });

    it('81:03 -> Search records', function(done) {
        loadHotelQueryString();
        agent
            .get(`/api/v1/hotel/search${loadHotelQueryString()}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body.Data.HotelRecords).to.have.property('TotalCount');
                expect(response.body.Data.HotelRecords).to.have.property('RetrievedCount');
                expect(response.body.Data.HotelRecords).to.have.property('PageIndex');
                expect(response.body.Data.HotelRecords).to.have.property('ItemsPerPage');
                expect(response.body.Data.HotelRecords).to.have.property('Order');
                expect(response.body.Data.HotelRecords.TotalCount).to.be.at.least(0);
                expect(response.body.Data.HotelRecords.RetrievedCount).to.be.at.least(0);
                expect(response.body.Data.HotelRecords.Items.length).to.be.at.least(0);
            })
            .expect(200, done);
    });

    it('07:04 -> Update hotel', function(done) {
        loadHotelUpdateModel();
        const updateModel = getTestData("hotelUpdateModel");
        agent
            .put(`/api/v1/hotel/${getTestData("hotelId_1")}`)
            .set('Content-Type', 'application/json')
            .send(updateModel)
            .expect(response => {
                expect(response.body.Data.Hotel).to.have.property('Name');
                expect(response.body.Data.Hotel).to.have.property('AddressId');
                expect(response.body.Data.Hotel).to.have.property('Phone');
                expect(response.body.Data.Hotel).to.have.property('Email');
                expect(response.body.Data.Hotel).to.have.property('Description');
                expect(response.body.Data.Hotel).to.have.property('CheckInTime');
                expect(response.body.Data.Hotel).to.have.property('CheckOutTime');
                expect(response.body.Data.Hotel).to.have.property('OwnerUserId');
                expect(response.body.Data.Hotel).to.have.property('Photos');

                expect(response.body.Data.Hotel.Name).to.equal(getTestData("hotelUpdateModel").Name);
                expect(response.body.Data.Hotel.AddressId).to.equal(getTestData("hotelUpdateModel").AddressId);
                expect(response.body.Data.Hotel.Phone).to.equal(getTestData("hotelUpdateModel").Phone);
                expect(response.body.Data.Hotel.Email).to.equal(getTestData("hotelUpdateModel").Email);
                expect(response.body.Data.Hotel.Description).to.equal(getTestData("hotelUpdateModel").Description);
                expect(response.body.Data.Hotel.CheckInTime).to.equal(getTestData("hotelUpdateModel").CheckInTime);
                expect(response.body.Data.Hotel.CheckOutTime).to.equal(getTestData("hotelUpdateModel").CheckOutTime);
                expect(response.body.Data.Hotel.OwnerUserId).to.equal(getTestData("hotelUpdateModel").OwnerUserId);
                expect(response.body.Data.Hotel.Photos).to.equal(getTestData("hotelUpdateModel").Photos);

            })
            .expect(200, done);
    });

    it('07:05 -> Delete hotel', function(done) {
        agent
            .delete(`/api/v1/hotel/${getTestData("hotelId_1")}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body).to.have.property('Status');
                expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });



it('07:01 -> Create hotel again', function(done) {
    loadHotelCreateModel();
    const createModel = getTestData("hotelCreateModel");
    agent
        .post(`/api/v1/hotel/`)
        .set('Content-Type', 'application/json')
        .send(createModel)
        .expect(response => {
            setTestData(response.body.Data.Hotel.id, 'hotelId');

            expect(response.body.Data.Hotel).to.have.property('Name');
            expect(response.body.Data.Hotel).to.have.property('AddressId');
            expect(response.body.Data.Hotel).to.have.property('Phone');
            expect(response.body.Data.Hotel).to.have.property('Email');
            expect(response.body.Data.Hotel).to.have.property('Description');
            expect(response.body.Data.Hotel).to.have.property('CheckInTime');
            expect(response.body.Data.Hotel).to.have.property('CheckOutTime');

            expect(response.body.Data.Hotel.Name).to.equal(getTestData("hotelCreateModel").Name);
            expect(response.body.Data.Hotel.AddressId).to.equal(getTestData("hotelCreateModel").AddressId);
            expect(response.body.Data.Hotel.Phone).to.equal(getTestData("hotelCreateModel").Phone);
            expect(response.body.Data.Hotel.Email).to.equal(getTestData("hotelCreateModel").Email);
            expect(response.body.Data.Hotel.Description).to.equal(getTestData("hotelCreateModel").Description);
            expect(response.body.Data.Hotel.CheckInTime).to.equal(getTestData("hotelCreateModel").CheckInTime);
            expect(response.body.Data.Hotel.CheckOutTime).to.equal(getTestData("hotelCreateModel").CheckOutTime);

        })
        .expect(201, done);
})
  });

// // ///////////////////////////////////////////////////////////////////////////

export const loadHotelCreateModel = async (
) => {
    const model = {
        Name: faker.person.fullName(),
        AddressId:getTestData("addressId"),
        Phone:"9783456701",
        Email: faker.internet.email(),
        Description:faker.lorem.words(),
        CheckInTime:"2 PM",
        CheckOutTime:"12 PM",
        OwnerUserId:getTestData("userId"),
        Photos:faker.datatype.boolean(),
     };
    setTestData(model, "hotelCreateModel");
};

export const loadHotelUpdateModel = async (
) => {
    const model = {
        Name: faker.person.fullName(),
        AddressId:getTestData("addressId"),
        Phone:"9783456701",
        Email: faker.internet.email(),
        Description:faker.lorem.words(),
        CheckInTime:"2 PM",
        CheckOutTime:"12 PM",
        OwnerUserId:getTestData("userId"),
        Photos:faker.datatype.boolean(),
        
     };
    setTestData(model, "hotelUpdateModel");
};

function loadHotelQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '';
    return queryString;
}

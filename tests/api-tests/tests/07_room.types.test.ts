import  request  from 'supertest';
import { expect } from 'chai';
import  Application  from '../../../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from '../init';
const infra = Application.instance();

///////////////////////////////////////////////////////////////////////////

describe('07 - RoomTypes tests', function() {

    var agent = request.agent(infra._app);

    it('07:01 -> Create roomTypes', function(done) {
        loadRoomTypesCreateModel();
        const createModel = getTestData("roomTypesCreateModel");
        agent
            .post(`/api/v1/roomTypes/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData(response.body.Data.RoomTypes.id, 'roomTypesId_1');

                expect(response.body.Data.RoomTypes).to.have.property('TypeName');
                expect(response.body.Data.RoomTypes).to.have.property('TypeDescription');
                expect(response.body.Data.RoomTypes).to.have.property('StandardRate');
                expect(response.body.Data.RoomTypes).to.have.property('Options');
                expect(response.body.Data.RoomTypes).to.have.property('OccupancyAdult');
                expect(response.body.Data.RoomTypes).to.have.property('OccupancyChildren');

                expect(response.body.Data.RoomTypes.TypeName).to.equal(getTestData("roomTypesCreateModel").TypeName);
                expect(response.body.Data.RoomTypes.TypeDescription).to.equal(getTestData("roomTypesCreateModel").TypeDescription);
                expect(response.body.Data.RoomTypes.StandardRate).to.equal(getTestData("roomTypesCreateModel").StandardRate);
                expect(response.body.Data.RoomTypes.Options).to.equal(getTestData("roomTypesCreateModel").Options);
                expect(response.body.Data.RoomTypes.OccupancyAdult).to.equal(getTestData("roomTypesCreateModel").OccupancyAdult);
                expect(response.body.Data.RoomTypes.OccupancyChildren).to.equal(getTestData("roomTypesCreateModel").OccupancyChildren);
            })
            .expect(201, done);
    })

    it('07:04 -> Get roomTypes by id', function(done) {
        agent
            .get(`/api/v1/roomTypes/${getTestData("roomTypesId_1")}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body.Data.RoomTypes).to.have.property('TypeName');
                expect(response.body.Data.RoomTypes).to.have.property('TypeDescription');
                expect(response.body.Data.RoomTypes).to.have.property('StandardRate');
                expect(response.body.Data.RoomTypes).to.have.property('Options');
                expect(response.body.Data.RoomTypes).to.have.property('OccupancyAdult');
                expect(response.body.Data.RoomTypes).to.have.property('OccupancyChildren');

                expect(response.body.Data.RoomTypes.TypeName).to.equal(getTestData("roomTypesCreateModel").TypeName);
                expect(response.body.Data.RoomTypes.TypeDescription).to.equal(getTestData("roomTypesCreateModel").TypeDescription);
                expect(response.body.Data.RoomTypes.StandardRate).to.equal(getTestData("roomTypesCreateModel").StandardRate);
                expect(response.body.Data.RoomTypes.Options).to.equal(getTestData("roomTypesCreateModel").Options);
                expect(response.body.Data.RoomTypes.OccupancyAdult).to.equal(getTestData("roomTypesCreateModel").OccupancyAdult);
                expect(response.body.Data.RoomTypes.OccupancyChildren).to.equal(getTestData("roomTypesCreateModel").OccupancyChildren);
            })
            .expect(200, done);
    });

    it('81:03 -> Search records', function(done) {
        loadRoomTypesQueryString();
        agent
            .get(`/api/v1/roomTypes/search${loadRoomTypesQueryString()}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body.Data.RoomTypesRecords).to.have.property('TotalCount');
                expect(response.body.Data.RoomTypesRecords).to.have.property('RetrievedCount');
                expect(response.body.Data.RoomTypesRecords).to.have.property('PageIndex');
                expect(response.body.Data.RoomTypesRecords).to.have.property('ItemsPerPage');
                expect(response.body.Data.RoomTypesRecords).to.have.property('Order');
                expect(response.body.Data.RoomTypesRecords.TotalCount).to.greaterThan(0);
                expect(response.body.Data.RoomTypesRecords.RetrievedCount).to.greaterThan(0);
                expect(response.body.Data.RoomTypesRecords.Items.length).to.greaterThan(0);
            })
            .expect(200, done);
    });

    it('07:04 -> Update roomTypes', function(done) {
        loadRoomTypesUpdateModel();
        const updateModel = getTestData("roomTypesUpdateModel");
        agent
            .put(`/api/v1/roomTypes/${getTestData("roomTypesId_1")}`)
            .set('Content-Type', 'application/json')
            .send(updateModel)
            .expect(response => {
                expect(response.body.Data.RoomTypes).to.have.property('TypeName');
                expect(response.body.Data.RoomTypes).to.have.property('TypeDescription');
                expect(response.body.Data.RoomTypes).to.have.property('StandardRate');
                expect(response.body.Data.RoomTypes).to.have.property('Options');
                expect(response.body.Data.RoomTypes).to.have.property('OccupancyAdult');
                expect(response.body.Data.RoomTypes).to.have.property('OccupancyChildren');

                expect(response.body.Data.RoomTypes.TypeName).to.equal(getTestData("roomTypesUpdateModel").TypeName);
                expect(response.body.Data.RoomTypes.TypeDescription).to.equal(getTestData("roomTypesUpdateModel").TypeDescription);
                expect(response.body.Data.RoomTypes.StandardRate).to.equal(getTestData("roomTypesUpdateModel").StandardRate);
                expect(response.body.Data.RoomTypes.Options).to.equal(getTestData("roomTypesUpdateModel").Options);
                expect(response.body.Data.RoomTypes.OccupancyAdult).to.equal(getTestData("roomTypesUpdateModel").OccupancyAdult);
                expect(response.body.Data.RoomTypes.OccupancyChildren).to.equal(getTestData("roomTypesUpdateModel").OccupancyChildren);
            })
            .expect(200, done);
    });
    
    it('07:05 -> Delete roomTypes', function(done) {
        agent
            .delete(`/api/v1/roomTypes/${getTestData("roomTypesId_1")}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body).to.have.property('Status');
                expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

    it('07:01 -> Create roomTypes again', function(done) {
        loadRoomTypesCreateModel();
        const createModel = getTestData("roomTypesCreateModel");
        agent
            .post(`/api/v1/roomTypes/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData(response.body.Data.RoomTypes.id, "roomTypesId");

                expect(response.body.Data.RoomTypes).to.have.property('TypeName');
                expect(response.body.Data.RoomTypes).to.have.property('TypeDescription');
                expect(response.body.Data.RoomTypes).to.have.property('StandardRate');
                expect(response.body.Data.RoomTypes).to.have.property('Options');
                expect(response.body.Data.RoomTypes).to.have.property('OccupancyAdult');
                expect(response.body.Data.RoomTypes).to.have.property('OccupancyChildren');

                expect(response.body.Data.RoomTypes.TypeName).to.equal(getTestData("roomTypesCreateModel").TypeName);
                expect(response.body.Data.RoomTypes.TypeDescription).to.equal(getTestData("roomTypesCreateModel").TypeDescription);
                expect(response.body.Data.RoomTypes.StandardRate).to.equal(getTestData("roomTypesCreateModel").StandardRate);
                expect(response.body.Data.RoomTypes.Options).to.equal(getTestData("roomTypesCreateModel").Options);
                expect(response.body.Data.RoomTypes.OccupancyAdult).to.equal(getTestData("roomTypesCreateModel").OccupancyAdult);
                expect(response.body.Data.RoomTypes.OccupancyChildren).to.equal(getTestData("roomTypesCreateModel").OccupancyChildren);

            })
            .expect(201, done);
    });

 });

// ///////////////////////////////////////////////////////////////////////////

export const loadRoomTypesCreateModel = async (
) => {
    const model = {
        TypeName: faker.person.firstName(),
        TypeDescription:faker.lorem.words(),
        StandardRate:"5000",
        Options:"Room With Free Cancellation",
        OccupancyAdult:"2",
        OccupancyChildren:"2",
        
     };
    setTestData(model, "roomTypesCreateModel");
};

export const loadRoomTypesUpdateModel = async (
) => {
    const model = {
        TypeName: faker.person.firstName(),
        TypeDescription:faker.lorem.words(),
        StandardRate:"5000",
        Options:"Room With Free Cancellation",
        OccupancyAdult:"2",
        OccupancyChildren:"2",
        
     };
    setTestData(model, "roomTypesUpdateModel");
};

function loadRoomTypesQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '';
    return queryString;
}

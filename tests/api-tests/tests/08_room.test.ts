import  request  from 'supertest';
import { expect } from 'chai';
import  Application  from '../../../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from '../init';
const infra = Application.instance();

///////////////////////////////////////////////////////////////////////////
describe('07 - Room tests', function() {

    var agent = request.agent(infra._app);

    it('07:01 -> Create room', function(done) {
        loadRoomCreateModel();
        const createModel = getTestData("roomCreateModel");
        agent
            .post(`/api/v1/room/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData(response.body.Data.Room.id, 'roomId_1');

                expect(response.body.Data.Room).to.have.property('Name');
                expect(response.body.Data.Room).to.have.property('Description');
                expect(response.body.Data.Room).to.have.property('RoomTypesId');
                expect(response.body.Data.Room).to.have.property('RoomNumber');
                expect(response.body.Data.Room).to.have.property('Blocked');
                expect(response.body.Data.Room).to.have.property('Status');
                expect(response.body.Data.Room).to.have.property('Inventory');
                expect(response.body.Data.Room).to.have.property('Phone');

                expect(response.body.Data.Room.Name).to.equal(getTestData("roomCreateModel").Name);
                expect(response.body.Data.Room.Description).to.equal(getTestData("roomCreateModel").Description);
                expect(response.body.Data.Room.RoomTypesId).to.equal(getTestData("roomCreateModel").RoomTypesId);
                expect(response.body.Data.Room.RoomNumber).to.equal(getTestData("roomCreateModel").RoomNumber);
                expect(response.body.Data.Room.Blocked).to.equal(getTestData("roomCreateModel").Blocked);
                expect(response.body.Data.Room.Status).to.equal(getTestData("roomCreateModel").Status);
                expect(response.body.Data.Room.Inventory).to.equal(getTestData("roomCreateModel").Inventory);
                expect(response.body.Data.Room.Phone).to.equal(getTestData("roomCreateModel").Phone);
            })
            .expect(201, done);
    })

    it('07:04 -> Get room by id', function(done) {
        agent
            .get(`/api/v1/room/${getTestData("roomId_1")}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body.Data.Room).to.have.property('Name');
                expect(response.body.Data.Room).to.have.property('Description');
                expect(response.body.Data.Room).to.have.property('RoomTypesId');
                expect(response.body.Data.Room).to.have.property('RoomNumber');
                expect(response.body.Data.Room).to.have.property('Blocked');
                expect(response.body.Data.Room).to.have.property('Status');
                expect(response.body.Data.Room).to.have.property('Inventory');
                expect(response.body.Data.Room).to.have.property('Phone');

                expect(response.body.Data.Room.Name).to.equal(getTestData("roomCreateModel").Name);
                expect(response.body.Data.Room.Description).to.equal(getTestData("roomCreateModel").Description);
                expect(response.body.Data.Room.RoomTypeId).to.equal(getTestData("roomCreateModel").RoomTypeId);
                expect(response.body.Data.Room.RoomNumber).to.equal(getTestData("roomCreateModel").RoomNumber);
                expect(response.body.Data.Room.Blocked).to.equal(getTestData("roomCreateModel").Blocked);
                expect(response.body.Data.Room.Status).to.equal(getTestData("roomCreateModel").Status);
                expect(response.body.Data.Room.Inventory).to.equal(getTestData("roomCreateModel").Inventory);
                expect(response.body.Data.Room.Phone).to.equal(getTestData("roomCreateModel").Phone);
            })
            .expect(200, done);
    });

    it('81:03 -> Search records', function(done) {
        loadRoomQueryString();
        agent
            .get(`/api/v1/room/search${loadRoomQueryString()}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body.Data.RoomRecords).to.have.property('TotalCount');
                expect(response.body.Data.RoomRecords).to.have.property('RetrievedCount');
                expect(response.body.Data.RoomRecords).to.have.property('PageIndex');
                expect(response.body.Data.RoomRecords).to.have.property('ItemsPerPage');
                expect(response.body.Data.RoomRecords).to.have.property('Order');
                expect(response.body.Data.RoomRecords.TotalCount).to.greaterThan(0);
                expect(response.body.Data.RoomRecords.RetrievedCount).to.greaterThan(0);
                expect(response.body.Data.RoomRecords.Items.length).to.greaterThan(0);
            })
            .expect(200, done);
    });

   
    it('07:04 -> Update room', function(done) {
        loadRoomUpdateModel();
        const updateModel = getTestData("roomUpdateModel");
        agent
            .put(`/api/v1/room/${getTestData("roomId_1")}`)
            .set('Content-Type', 'application/json')
            .send(updateModel)
            .expect(response => {
                expect(response.body.Data.Room).to.have.property('Name');
                expect(response.body.Data.Room).to.have.property('Description');
                expect(response.body.Data.Room).to.have.property('RoomTypesId');
                expect(response.body.Data.Room).to.have.property('RoomNumber');
                expect(response.body.Data.Room).to.have.property('Blocked');
                expect(response.body.Data.Room).to.have.property('Status');
                expect(response.body.Data.Room).to.have.property('Inventory');
                expect(response.body.Data.Room).to.have.property('Phone');

                expect(response.body.Data.Room.Name).to.equal(getTestData("roomUpdateModel").Name);
                expect(response.body.Data.Room.Description).to.equal(getTestData("roomUpdateModel").Description);
                expect(response.body.Data.Room.RoomTypesId).to.equal(getTestData("roomUpdateModel").RoomTypesId);
                expect(response.body.Data.Room.RoomNumber).to.equal(getTestData("roomUpdateModel").RoomNumber);
                expect(response.body.Data.Room.Blocked).to.equal(getTestData("roomUpdateModel").Blocked);
                expect(response.body.Data.Room.Status).to.equal(getTestData("roomUpdateModel").Status);
                expect(response.body.Data.Room.Inventory).to.equal(getTestData("roomUpdateModel").Inventory);
                expect(response.body.Data.Room.Phone).to.equal(getTestData("roomUpdateModel").Phone);
            })
            .expect(200, done);
    });
    

    it('07:05 -> Delete room', function(done) {
        agent
            .delete(`/api/v1/room/${getTestData("roomId_1")}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body).to.have.property('Status');
                expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });


    it('07:01 -> Create room again', function(done) {
        loadRoomCreateModel();
        const createModel = getTestData("roomCreateModel");
        agent
            .post(`/api/v1/room/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData(response.body.Data.Room.id, "roomId");

                expect(response.body.Data.Room).to.have.property('Name');
                expect(response.body.Data.Room).to.have.property('Description');
                expect(response.body.Data.Room).to.have.property('RoomTypesId');
                expect(response.body.Data.Room).to.have.property('RoomNumber');
                expect(response.body.Data.Room).to.have.property('Blocked');
                expect(response.body.Data.Room).to.have.property('Status');
                expect(response.body.Data.Room).to.have.property('Inventory');
                expect(response.body.Data.Room).to.have.property('Phone');

                expect(response.body.Data.Room.Name).to.equal(getTestData("roomCreateModel").Name);
                expect(response.body.Data.Room.Description).to.equal(getTestData("roomCreateModel").Description);
                expect(response.body.Data.Room.RoomTypesId).to.equal(getTestData("roomCreateModel").RoomTypesId);
                expect(response.body.Data.Room.RoomNumber).to.equal(getTestData("roomCreateModel").RoomNumber);
                expect(response.body.Data.Room.Blocked).to.equal(getTestData("roomCreateModel").Blocked);
                expect(response.body.Data.Room.Status).to.equal(getTestData("roomCreateModel").Status);
                expect(response.body.Data.Room.Inventory).to.equal(getTestData("roomCreateModel").Inventory);
                expect(response.body.Data.Room.Phone).to.equal(getTestData("roomCreateModel").Phone);
            })
            .expect(201, done);
    });

 });

// ///////////////////////////////////////////////////////////////////////////

export const loadRoomCreateModel = async (
) => {
    const model = {
        Name:faker.person.firstName(),
        Description:faker.lorem.words(),
        RoomTypesId:getTestData("roomTypesId"),
        RoomNumber:"3",
        Blocked:faker.datatype.boolean(),
        Status:"Yes",
        Inventory:faker.lorem.words(),
        Phone:"9999888803"
        
     };
    setTestData(model, "roomCreateModel");
};

export const loadRoomUpdateModel = async (
) => {
    const model = {
        Name:faker.person.firstName(),
        Description:faker.lorem.words(),
        RoomTypesId:getTestData("roomTypesId"),
        RoomNumber:"3",
        Blocked:faker.datatype.boolean(),
        Status:"Yes",
        Inventory:faker.lorem.words(),
        Phone:"9999888803"
     };
    setTestData(model, "roomUpdateModel");
};

function loadRoomQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '';
    return queryString;
}

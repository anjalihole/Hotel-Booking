import  request  from 'supertest';
import { expect } from 'chai';
import  Application  from '../../../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from '../init';
const infra = Application.instance();

///////////////////////////////////////////////////////////////////////////

describe('07 - AddressHolder tests', function() {

    var agent = request.agent(infra._app);

    it('07:01 -> Create addressHolder', function(done) {
        loadAddressHolderCreateModel();
        const createModel = getTestData("addressHolderCreateModel");
        agent
            .post(`/api/v1/addressHolder/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData(response.body.Data.AddressHolder.id, 'addressHolderId_1');

                expect(response.body.Data.AddressHolder).to.have.property('AddressId');
                expect(response.body.Data.AddressHolder).to.have.property('HolderType');
                expect(response.body.Data.AddressHolder).to.have.property('AddressType');

                expect(response.body.Data.AddressHolder.AddressId).to.equal(getTestData("addressHolderCreateModel").AddressId);
                expect(response.body.Data.AddressHolder.HolderType).to.equal(getTestData("addressHolderCreateModel").HolderType);
                expect(response.body.Data.AddressHolder.AddressType).to.equal(getTestData("addressHolderCreateModel").AddressType);
            
            })
            .expect(201, done);
    })

    it('07:04 -> Get addressHolder by id', function(done) {
        agent
            .get(`/api/v1/addressHolder/${getTestData("addressHolderId_1")}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body.Data.AddressHolder).to.have.property('AddressId');
                expect(response.body.Data.AddressHolder).to.have.property('HolderType');
                expect(response.body.Data.AddressHolder).to.have.property('AddressType');

                expect(response.body.Data.AddressHolder.AddressId).to.equal(getTestData("addressHolderCreateModel").AddressId);
                expect(response.body.Data.AddressHolder.HolderType).to.equal(getTestData("addressHolderCreateModel").HolderType);
                expect(response.body.Data.AddressHolder.AddressType).to.equal(getTestData("addressHolderCreateModel").AddressType);
            })
            .expect(200, done);
    });

    it('81:03 -> Search records', function(done) {
        loadAddressHolderQueryString();
        agent
            .get(`/api/v1/addressHolder/search${loadAddressHolderQueryString()}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body.Data.AddressHolderRecords).to.have.property('TotalCount');
                expect(response.body.Data.AddressHolderRecords).to.have.property('RetrievedCount');
                expect(response.body.Data.AddressHolderRecords).to.have.property('PageIndex');
                expect(response.body.Data.AddressHolderRecords).to.have.property('ItemsPerPage');
                expect(response.body.Data.AddressHolderRecords).to.have.property('Order');
                expect(response.body.Data.AddressHolderRecords.TotalCount).to.greaterThan(0);
                expect(response.body.Data.AddressHolderRecords.RetrievedCount).to.greaterThan(0);
                expect(response.body.Data.AddressHolderRecords.Items.length).to.greaterThan(0);
            })
            .expect(200, done);
    });

    it('07:04 -> Update addressHolder', function(done) {
        loadAddressHolderUpdateModel();
        const updateModel = getTestData("addressHolderUpdateModel");
        agent
            .put(`/api/v1/addressHolder/${getTestData("addressHolderId_1")}`)
            .set('Content-Type', 'application/json')
            .send(updateModel)
            .expect(response => {
                expect(response.body.Data.AddressHolder).to.have.property('AddressId');
                expect(response.body.Data.AddressHolder).to.have.property('HolderType');
                expect(response.body.Data.AddressHolder).to.have.property('AddressType');

                expect(response.body.Data.AddressHolder.AddressId).to.equal(getTestData("addressHolderUpdateModel").AddressId);
                expect(response.body.Data.AddressHolder.HolderType).to.equal(getTestData("addressHolderUpdateModel").HolderType);
                expect(response.body.Data.AddressHolder.AddressType).to.equal(getTestData("addressHolderUpdateModel").AddressType);

            })
            .expect(200, done);
    });

    it('07:05 -> Delete addressHolder', function(done) {
        agent
            .delete(`/api/v1/addressHolder/${getTestData("addressHolderId_1")}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body).to.have.property('Status');
                expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

it('07:01 -> Create addressHolder again', function(done) {
    loadAddressHolderCreateModel();
    const createModel = getTestData("addressHolderCreateModel");
    agent
        .post(`/api/v1/addressHolder/`)
        .set('Content-Type', 'application/json')
        .send(createModel)
        .expect(response => {
            setTestData(response.body.Data.AddressHolder.id, 'addressHolderId');

            expect(response.body.Data.AddressHolder).to.have.property('AddressId');
                expect(response.body.Data.AddressHolder).to.have.property('HolderType');
                expect(response.body.Data.AddressHolder).to.have.property('AddressType');

                expect(response.body.Data.AddressHolder.AddressId).to.equal(getTestData("addressHolderCreateModel").AddressId);
                expect(response.body.Data.AddressHolder.HolderType).to.equal(getTestData("addressHolderCreateModel").HolderType);
                expect(response.body.Data.AddressHolder.AddressType).to.equal(getTestData("addressHolderCreateModel").AddressType);
        })
        .expect(201, done);
    })
});

// ///////////////////////////////////////////////////////////////////////////

export const loadAddressHolderCreateModel = async (
) => {
    const model = {
        AddressId:getTestData("addressId"),
        HolderType:faker.database.type(),
        AddressType:faker.database.type(),
        
     };
    setTestData(model, "addressHolderCreateModel");
};

export const loadAddressHolderUpdateModel = async (
) => {
    const model = {
        AddressId:getTestData("addressId"),
        HolderType:faker.database.type(),
        AddressType:faker.database.type(),
        
     };
    setTestData(model, "addressHolderUpdateModel");
};

function loadAddressHolderQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '';
    return queryString;
}

import  request  from 'supertest';
import { expect } from 'chai';
import  Application  from '../../../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from '../init';
const infra = Application.instance();

///////////////////////////////////////////////////////////////////////////

describe('07 - Address tests', function() {

    var agent = request.agent(infra._app);

    it('07:01 -> Create address', function(done) {
        loadAddressCreateModel();
        const createModel = getTestData("addressCreateModel");
        agent
            .post(`/api/v1/address/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData(response.body.Data.Address.id, 'addressId_1');

                expect(response.body.Data.Address).to.have.property('AddressLine1');
                expect(response.body.Data.Address).to.have.property('AddressLine2');
                expect(response.body.Data.Address).to.have.property('Street');
                expect(response.body.Data.Address).to.have.property('City');
                expect(response.body.Data.Address).to.have.property('State');
                expect(response.body.Data.Address).to.have.property('Country');
                expect(response.body.Data.Address).to.have.property('ZipCode');

                expect(response.body.Data.Address.AddressLine1).to.equal(getTestData("addressCreateModel").AddressLine1);
                expect(response.body.Data.Address.AddressLine2).to.equal(getTestData("addressCreateModel").AddressLine2);
                expect(response.body.Data.Address.Street).to.equal(getTestData("addressCreateModel").Street);
                expect(response.body.Data.Address.City).to.equal(getTestData("addressCreateModel").City);
                expect(response.body.Data.Address.State).to.equal(getTestData("addressCreateModel").State);
                expect(response.body.Data.Address.Country).to.equal(getTestData("addressCreateModel").Country);
                expect(response.body.Data.Address.ZipCode).to.equal(getTestData("addressCreateModel").ZipCode);

            })
            .expect(201, done);
    })

    it('07:04 -> Get address by id', function(done) {
        agent
            .get(`/api/v1/address/${getTestData("addressId_1")}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body.Data.Address).to.have.property('AddressLine1');
                expect(response.body.Data.Address).to.have.property('AddressLine2');
                expect(response.body.Data.Address).to.have.property('Street');
                expect(response.body.Data.Address).to.have.property('City');
                expect(response.body.Data.Address).to.have.property('State');
                expect(response.body.Data.Address).to.have.property('Country');
                expect(response.body.Data.Address).to.have.property('ZipCode');

                expect(response.body.Data.Address.AddressLine1).to.equal(getTestData("addressCreateModel").AddressLine1);
                expect(response.body.Data.Address.AddressLine2).to.equal(getTestData("addressCreateModel").AddressLine2);
                expect(response.body.Data.Address.Street).to.equal(getTestData("addressCreateModel").Street);
                expect(response.body.Data.Address.City).to.equal(getTestData("addressCreateModel").City);
                expect(response.body.Data.Address.State).to.equal(getTestData("addressCreateModel").State);
                expect(response.body.Data.Address.Country).to.equal(getTestData("addressCreateModel").Country);
                expect(response.body.Data.Address.ZipCode).to.equal(getTestData("addressCreateModel").ZipCode);


            })
            .expect(200, done);
    });

    it('81:03 -> Search records', function(done) {
        loadAddressQueryString();
        agent
            .get(`/api/v1/address/search${loadAddressQueryString()}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body.Data.AddressRecords).to.have.property('TotalCount');
                expect(response.body.Data.AddressRecords).to.have.property('RetrievedCount');
                expect(response.body.Data.AddressRecords).to.have.property('PageIndex');
                expect(response.body.Data.AddressRecords).to.have.property('ItemsPerPage');
                expect(response.body.Data.AddressRecords).to.have.property('Order');
                expect(response.body.Data.AddressRecords.TotalCount).to.greaterThan(0);
                expect(response.body.Data.AddressRecords.RetrievedCount).to.greaterThan(0);
                expect(response.body.Data.AddressRecords.Items.length).to.greaterThan(0);
            })
            .expect(200, done);
    });

    it('07:04 -> Update address', function(done) {
        loadAddressUpdateModel();
        const updateModel = getTestData("addressUpdateModel");
        agent
            .put(`/api/v1/address/${getTestData("addressId_1")}`)
            .set('Content-Type', 'application/json')
            .send(updateModel)
            .expect(response => {
                expect(response.body.Data.Address).to.have.property('AddressLine1');
                expect(response.body.Data.Address).to.have.property('AddressLine2');
                expect(response.body.Data.Address).to.have.property('Street');
                expect(response.body.Data.Address).to.have.property('City');
                expect(response.body.Data.Address).to.have.property('State');
                expect(response.body.Data.Address).to.have.property('Country');
                expect(response.body.Data.Address).to.have.property('ZipCode');

                expect(response.body.Data.Address.AddressLine1).to.equal(getTestData("addressUpdateModel").AddressLine1);
                expect(response.body.Data.Address.AddressLine2).to.equal(getTestData("addressUpdateModel").AddressLine2);
                expect(response.body.Data.Address.Street).to.equal(getTestData("addressUpdateModel").Street);
                expect(response.body.Data.Address.City).to.equal(getTestData("addressUpdateModel").City);
                expect(response.body.Data.Address.State).to.equal(getTestData("addressUpdateModel").State);
                expect(response.body.Data.Address.Country).to.equal(getTestData("addressUpdateModel").Country);
                expect(response.body.Data.Address.ZipCode).to.equal(getTestData("addressUpdateModel").ZipCode);

            })
            .expect(200, done);
    });

    it('07:05 -> Delete address', function(done) {
        agent
            .delete(`/api/v1/address/${getTestData("addressId_1")}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body).to.have.property('Status');
                expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

it('07:01 -> Create address again', function(done) {
    loadAddressCreateModel();
    const createModel = getTestData("addressCreateModel");
    agent
        .post(`/api/v1/address/`)
        .set('Content-Type', 'application/json')
        .send(createModel)
        .expect(response => {
            setTestData(response.body.Data.Address.id, 'addressId');

            expect(response.body.Data.Address).to.have.property('AddressLine1');
            expect(response.body.Data.Address).to.have.property('AddressLine2');
            expect(response.body.Data.Address).to.have.property('Street');
            expect(response.body.Data.Address).to.have.property('City');
            expect(response.body.Data.Address).to.have.property('State');
            expect(response.body.Data.Address).to.have.property('Country');
            expect(response.body.Data.Address).to.have.property('ZipCode');

            expect(response.body.Data.Address.AddressLine1).to.equal(getTestData("addressCreateModel").AddressLine1);
            expect(response.body.Data.Address.AddressLine2).to.equal(getTestData("addressCreateModel").AddressLine2);
            expect(response.body.Data.Address.Street).to.equal(getTestData("addressCreateModel").Street);
            expect(response.body.Data.Address.City).to.equal(getTestData("addressCreateModel").City);
            expect(response.body.Data.Address.State).to.equal(getTestData("addressCreateModel").State);
            expect(response.body.Data.Address.Country).to.equal(getTestData("addressCreateModel").Country);
            expect(response.body.Data.Address.ZipCode).to.equal(getTestData("addressCreateModel").ZipCode);

        })
        .expect(201, done);
})
 });

// ///////////////////////////////////////////////////////////////////////////

export const loadAddressCreateModel = async (
) => {
    const model = {
        AddressLine1: faker.location.streetAddress(),
        AddressLine2:faker.location.streetAddress(),
        Street: faker.location.street(),
        City: faker.location.city(),
        State:faker.location.state(),
        Country:faker.location.country(),
        ZipCode:faker.location.zipCode()
     };
    setTestData(model, "addressCreateModel");
};

export const loadAddressUpdateModel = async (
) => {
    const model = {
        AddressLine1: faker.location.streetAddress(),
        AddressLine2:faker.location.streetAddress(),
        Street: faker.location.street(),
        City: faker.location.city(),
        State:faker.location.state(),
        Country:faker.location.country(),
        ZipCode:faker.location.zipCode()
        
     };
    setTestData(model, "addressUpdateModel");
};

function loadAddressQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '';
    return queryString;
}

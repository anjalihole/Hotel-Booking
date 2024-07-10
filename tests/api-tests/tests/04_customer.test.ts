import  request  from 'supertest';
import { expect } from 'chai';
import  Application  from '../../../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from '../init';
const infra = Application.instance();

///////////////////////////////////////////////////////////////////////////

describe('07 - Customer tests', function() {

    var agent = request.agent(infra._app);

    it('07:01 -> Create customer', function(done) {
        loadCustomerCreateModel();
        const createModel = getTestData("customerCreateModel");
        agent
            .post(`/api/v1/customer/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData(response.body.Data.Customer.id, 'customerId_1');
                expect(response.body.Data.Customer).to.have.property('UserId');
                expect(response.body.Data.Customer).to.have.property('AddressId');
                expect(response.body.Data.Customer).to.have.property('PAN');
                expect(response.body.Data.Customer).to.have.property('Aadhar');

                expect(response.body.Data.Customer.UserId).to.equal(getTestData("customerCreateModel").UserId);
                expect(response.body.Data.Customer.AddressId).to.equal(getTestData("customerCreateModel").AddressId);
                expect(response.body.Data.Customer.PAN).to.equal(getTestData("customerCreateModel").PAN);
                expect(response.body.Data.Customer.Aadhar).to.equal(getTestData("customerCreateModel").Aadhar);

            })
            .expect(201, done);
    })

    it('07:04 -> Get customer by id', function(done) {
        agent
            .get(`/api/v1/customer/${getTestData("customerId_1")}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body.Data.Customer).to.have.property('UserId');
                expect(response.body.Data.Customer).to.have.property('AddressId');
                expect(response.body.Data.Customer).to.have.property('PAN');
                expect(response.body.Data.Customer).to.have.property('Aadhar');

                expect(response.body.Data.Customer.UserId).to.equal(getTestData("customerCreateModel").UserId);
                expect(response.body.Data.Customer.AddressId).to.equal(getTestData("customerCreateModel").AddressId);
                expect(response.body.Data.Customer.PAN).to.equal(getTestData("customerCreateModel").PAN);
                expect(response.body.Data.Customer.Aadhar).to.equal(getTestData("customerCreateModel").Aadhar);

            })
            .expect(200, done);
    });

    it('81:03 -> Search records', function(done) {
        loadCustomerQueryString();
        agent
            .get(`/api/v1/customer/search${loadCustomerQueryString()}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body.Data.CustomerRecords).to.have.property('TotalCount');
                expect(response.body.Data.CustomerRecords).to.have.property('RetrievedCount');
                expect(response.body.Data.CustomerRecords).to.have.property('PageIndex');
                expect(response.body.Data.CustomerRecords).to.have.property('ItemsPerPage');
                expect(response.body.Data.CustomerRecords).to.have.property('Order');
                expect(response.body.Data.CustomerRecords.TotalCount).to.greaterThan(0);
                expect(response.body.Data.CustomerRecords.RetrievedCount).to.greaterThan(0);
                expect(response.body.Data.CustomerRecords.Items.length).to.greaterThan(0);
            })
            .expect(200, done);
    });

    it('07:04 -> Update customer', function(done) {
        loadCustomerUpdateModel();
        const updateModel = getTestData("customerUpdateModel");
        agent
            .put(`/api/v1/customer/${getTestData("customerId_1")}`)
            .set('Content-Type', 'application/json')
            .send(updateModel)
            .expect(response => {
                expect(response.body.Data.Customer).to.have.property('UserId');
                expect(response.body.Data.Customer).to.have.property('AddressId');
                expect(response.body.Data.Customer).to.have.property('PAN');
                expect(response.body.Data.Customer).to.have.property('Aadhar');

                expect(response.body.Data.Customer.UserId).to.equal(getTestData("customerUpdateModel").UserId);
                expect(response.body.Data.Customer.AddressId).to.equal(getTestData("customerUpdateModel").AddressId);
                expect(response.body.Data.Customer.PAN).to.equal(getTestData("customerUpdateModel").PAN);
                expect(response.body.Data.Customer.Aadhar).to.equal(getTestData("customerUpdateModel").Aadhar);

            })
            .expect(200, done);
    });
    
    it('07:05 -> Delete customer', function(done) {
        agent
            .delete(`/api/v1/customer/${getTestData("customerId_1")}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body).to.have.property('Status');
                expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

    it('07:01 -> Create customer again', function(done) {
        loadCustomerCreateModel();
        const createModel = getTestData("customerCreateModel");
        agent
            .post(`/api/v1/customer/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {

                            setTestData(response.body.Data.Customer.id, 'customerId');
                            expect(response.body.Data.Customer).to.have.property('UserId');
                            expect(response.body.Data.Customer).to.have.property('AddressId');
                            expect(response.body.Data.Customer).to.have.property('PAN');
                            expect(response.body.Data.Customer).to.have.property('Aadhar');
            
                            expect(response.body.Data.Customer.UserId).to.equal(getTestData("customerCreateModel").UserId);
                            expect(response.body.Data.Customer.AddressId).to.equal(getTestData("customerCreateModel").AddressId);
                            expect(response.body.Data.Customer.PAN).to.equal(getTestData("customerCreateModel").PAN);
                            expect(response.body.Data.Customer.Aadhar).to.equal(getTestData("customerCreateModel").Aadhar);
            
                        })
                        .expect(201, done);
                })


 });

// ///////////////////////////////////////////////////////////////////////////

export const loadCustomerCreateModel = async (
) => {
    const model = {
        UserId: getTestData("userId"),
        AddressId:getTestData("addressId"),
        PAN:"ACBBHHJJ11",
        Aadhar:"1234ABCDf"
        
     };
    setTestData(model, "customerCreateModel");
};

export const loadCustomerUpdateModel = async (
) => {
    const model = {
        UserId: getTestData("userId"),
        AddressId:getTestData("addressId"),
        PAN:"ACBBHHJJ11",
        Aadhar:"1234ABCDD"
        
     };
    setTestData(model, "customerUpdateModel");
};

function loadCustomerQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '';
    return queryString;
}

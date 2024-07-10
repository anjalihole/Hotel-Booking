import  request  from 'supertest';
import { expect } from 'chai';
import  Application  from '../../../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from '../init';
const infra = Application.instance();

///////////////////////////////////////////////////////////////////////////

describe('07 - PropertyRules tests', function() {

    var agent = request.agent(infra._app);

    it('07:01 -> Create propertyRules', function(done) {
        loadPropertyRulesCreateModel();
        const createModel = getTestData("propertyRulesCreateModel");
        agent
            .post(`/api/v1/propertyRules/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData(response.body.Data.PropertyRules.id, 'propertyRulesId_1');

                expect(response.body.Data.PropertyRules).to.have.property('HotelId');
                expect(response.body.Data.PropertyRules).to.have.property('RulesName');
                expect(response.body.Data.PropertyRules).to.have.property('Description');

                expect(response.body.Data.PropertyRules.HotelId).to.equal(getTestData("propertyRulesCreateModel").HotelId);
                expect(response.body.Data.PropertyRules.RulesName).to.equal(getTestData("propertyRulesCreateModel").RulesName);
                expect(response.body.Data.PropertyRules.Description).to.equal(getTestData("propertyRulesCreateModel").Description);


            })
            .expect(201, done);
    })

    it('07:04 -> Get propertyRules by id', function(done) {
        agent
            .get(`/api/v1/propertyRules/${getTestData("propertyRulesId_1")}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                
                expect(response.body.Data.PropertyRules).to.have.property('HotelId');
                expect(response.body.Data.PropertyRules).to.have.property('RulesName');
                expect(response.body.Data.PropertyRules).to.have.property('Description');

                expect(response.body.Data.PropertyRules.HotelId).to.equal(getTestData("propertyRulesCreateModel").HotelId);
                expect(response.body.Data.PropertyRules.RulesName).to.equal(getTestData("propertyRulesCreateModel").RulesName);
                expect(response.body.Data.PropertyRules.Description).to.equal(getTestData("propertyRulesCreateModel").Description);

            })
            .expect(200, done);
    });

    it('81:03 -> Search records', function(done) {
        loadPropertyRulesQueryString();
        agent
            .get(`/api/v1/propertyRules/search${loadPropertyRulesQueryString()}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body.Data.PropertyRulesRecords).to.have.property('TotalCount');
                expect(response.body.Data.PropertyRulesRecords).to.have.property('RetrievedCount');
                expect(response.body.Data.PropertyRulesRecords).to.have.property('PageIndex');
                expect(response.body.Data.PropertyRulesRecords).to.have.property('ItemsPerPage');
                expect(response.body.Data.PropertyRulesRecords).to.have.property('Order');
                expect(response.body.Data.PropertyRulesRecords.TotalCount).to.greaterThan(0);
                expect(response.body.Data.PropertyRulesRecords.RetrievedCount).to.greaterThan(0);
                expect(response.body.Data.PropertyRulesRecords.Items.length).to.greaterThan(0);
            })
            .expect(200, done);
    });

    it('07:04 -> Update propertyRules', function(done) {
        loadPropertyRulesUpdateModel();
        const updateModel = getTestData("propertyRulesUpdateModel");
        agent
            .put(`/api/v1/propertyRules/${getTestData("propertyRulesId_1")}`)
            .set('Content-Type', 'application/json')
            .send(updateModel)
            .expect(response => {
                
                expect(response.body.Data.PropertyRules).to.have.property('HotelId');
                expect(response.body.Data.PropertyRules).to.have.property('RulesName');
                expect(response.body.Data.PropertyRules).to.have.property('Description');

                expect(response.body.Data.PropertyRules.HotelId).to.equal(getTestData("propertyRulesUpdateModel").HotelId);
                expect(response.body.Data.PropertyRules.RulesName).to.equal(getTestData("propertyRulesUpdateModel").RulesName);
                expect(response.body.Data.PropertyRules.Description).to.equal(getTestData("propertyRulesUpdateModel").Description);
            })
            .expect(200, done);
    });
    
    it('07:05 -> Delete propertyRules', function(done) {
        agent
            .delete(`/api/v1/propertyRules/${getTestData("propertyRulesId_1")}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body).to.have.property('Status');
                expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

    it('07:01 -> Create propertyRules again', function(done) {
        loadPropertyRulesCreateModel();
        const createModel = getTestData("propertyRulesCreateModel");
        agent
            .post(`/api/v1/propertyRules/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData(response.body.Data.PropertyRules.id, "propertyRulesId");
             
                expect(response.body.Data.PropertyRules).to.have.property('HotelId');
                expect(response.body.Data.PropertyRules).to.have.property('RulesName');
                expect(response.body.Data.PropertyRules).to.have.property('Description');

                expect(response.body.Data.PropertyRules.HotelId).to.equal(getTestData("propertyRulesCreateModel").HotelId);
                expect(response.body.Data.PropertyRules.RulesName).to.equal(getTestData("propertyRulesCreateModel").RulesName);
                expect(response.body.Data.PropertyRules.Description).to.equal(getTestData("propertyRulesCreateModel").Description);

            })
            .expect(201, done);
    });

 });

// ///////////////////////////////////////////////////////////////////////////

export const loadPropertyRulesCreateModel = async (
) => {
    const model = {
        HotelId:getTestData("hotelId"),
        RulesName:faker.person.firstName(),
        Description:faker.lorem.words(),
     };
    setTestData(model, "propertyRulesCreateModel");
};

export const loadPropertyRulesUpdateModel = async (
) => {
    const model = {
        HotelId:getTestData("hotelId"),
        RulesName:faker.person.firstName(),
        Description:faker.lorem.words(),
     };
    setTestData(model, "propertyRulesUpdateModel");
};

function loadPropertyRulesQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '';
    return queryString;
}

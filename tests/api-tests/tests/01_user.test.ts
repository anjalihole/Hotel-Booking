import  request  from 'supertest';
import { expect } from 'chai';
import  Application  from '../../../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from '../init';
const infra = Application.instance();

///////////////////////////////////////////////////////////////////////////

describe('07 - User tests', function() {

    var agent = request.agent(infra._app);

    it('07:01 -> Create user', function(done) {
        loadUserCreateModel();
        const createModel = getTestData("userCreateModel");
        agent
            .post(`/api/v1/user/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData(response.body.Data.User.id, 'userId_1');

                expect(response.body.Data.User).to.have.property('FirstName');
                expect(response.body.Data.User).to.have.property('LastName');
                expect(response.body.Data.User).to.have.property('Email');
                expect(response.body.Data.User).to.have.property('Phone');

                expect(response.body.Data.User.FirstName).to.equal(getTestData("userCreateModel").FirstName);
                expect(response.body.Data.User.LastName).to.equal(getTestData("userCreateModel").LastName);
                expect(response.body.Data.User.Email).to.equal(getTestData("userCreateModel").Email);
                expect(response.body.Data.User.Phone).to.equal(getTestData("userCreateModel").Phone);

            })
            .expect(201, done);
    })

    it('07:04 -> Get user by id', function(done) {
        agent
            .get(`/api/v1/user/${getTestData("userId_1")}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body.Data.User).to.have.property('FirstName');
                expect(response.body.Data.User).to.have.property('LastName');
                expect(response.body.Data.User).to.have.property('Email');
                expect(response.body.Data.User).to.have.property('Phone');

                expect(response.body.Data.User.FirstName).to.equal(getTestData("userCreateModel").FirstName);
                expect(response.body.Data.User.LastName).to.equal(getTestData("userCreateModel").LastName);
                expect(response.body.Data.User.Email).to.equal(getTestData("userCreateModel").Email);
                expect(response.body.Data.User.Phone).to.equal(getTestData("userCreateModel").Phone);

            })
            .expect(200, done);
    });

    it('81:03 -> Search records', function(done) {
        loadUserQueryString();
        agent
            .get(`/api/v1/user/search${loadUserQueryString()}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body.Data.UserRecords).to.have.property('TotalCount');
                expect(response.body.Data.UserRecords).to.have.property('RetrievedCount');
                expect(response.body.Data.UserRecords).to.have.property('PageIndex');
                expect(response.body.Data.UserRecords).to.have.property('ItemsPerPage');
                expect(response.body.Data.UserRecords).to.have.property('Order');
                expect(response.body.Data.UserRecords.TotalCount).to.greaterThan(0);
                expect(response.body.Data.UserRecords.RetrievedCount).to.greaterThan(0);
                expect(response.body.Data.UserRecords.Items.length).to.greaterThan(0);
            })
            .expect(200, done);
    });

    it('07:04 -> Update user', function(done) {
        loadUserUpdateModel();
        const updateModel = getTestData("userUpdateModel");
        agent
            .put(`/api/v1/user/${getTestData("userId_1")}`)
            .set('Content-Type', 'application/json')
            .send(updateModel)
            .expect(response => {
                expect(response.body.Data.User).to.have.property('FirstName');
                expect(response.body.Data.User).to.have.property('LastName');
                expect(response.body.Data.User).to.have.property('Email');
                expect(response.body.Data.User).to.have.property('Phone');

                expect(response.body.Data.User.FirstName).to.equal(getTestData("userUpdateModel").FirstName);
                expect(response.body.Data.User.LastName).to.equal(getTestData("userUpdateModel").LastName);
                expect(response.body.Data.User.Email).to.equal(getTestData("userUpdateModel").Email);
                expect(response.body.Data.User.Phone).to.equal(getTestData("userUpdateModel").Phone);

            })
            .expect(200, done);
    });
    
    it('07:05 -> Delete user', function(done) {
        agent
            .delete(`/api/v1/user/${getTestData("userId_1")}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body).to.have.property('Status');
                expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

    it('07:01 -> Create user again', function(done) {
        loadUserCreateModel();
        const createModel = getTestData("userCreateModel");
        agent
            .post(`/api/v1/user/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData(response.body.Data.User.id, "userId");

                expect(response.body.Data.User).to.have.property('FirstName');
                expect(response.body.Data.User).to.have.property('LastName');
                expect(response.body.Data.User).to.have.property('Email');
                expect(response.body.Data.User).to.have.property('Phone');

                expect(response.body.Data.User.FirstName).to.equal(getTestData("userCreateModel").FirstName);
                expect(response.body.Data.User.LastName).to.equal(getTestData("userCreateModel").LastName);
                expect(response.body.Data.User.Email).to.equal(getTestData("userCreateModel").Email);
                expect(response.body.Data.User.Phone).to.equal(getTestData("userCreateModel").Phone);

            })
            .expect(201, done);
    });

 });

// ///////////////////////////////////////////////////////////////////////////

export const loadUserCreateModel = async (
) => {
    const model = {
        FirstName: faker.person.firstName(),
        LastName: faker.person.lastName(),
        Email: faker.internet.email(),
        Phone: "8926728909",
        
     };
    setTestData(model, "userCreateModel");
};

export const loadUserUpdateModel = async (
) => {
    const model = {
        FirstName: faker.person.firstName(),
        LastName: faker.person.lastName(),
        Email: faker.internet.email(),
        Phone: "9783456701",
        
     };
    setTestData(model, "userUpdateModel");
};

function loadUserQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '';
    return queryString;
}

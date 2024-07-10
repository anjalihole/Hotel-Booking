import  request  from 'supertest';
import { expect } from 'chai';
import  Application  from '../../../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from '../init';
const infra = Application.instance();

///////////////////////////////////////////////////////////////////////////

describe('07 - UserRoles tests', function() {

    var agent = request.agent(infra._app);

    it('07:01 -> Create userRoles', function(done) {
        loadUserRolesCreateModel();
        const createModel = getTestData("userRolesCreateModel");
        agent
            .post(`/api/v1/userRoles/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData(response.body.Data.UserRoles.id, 'userRolesId_1');

                expect(response.body.Data.UserRoles).to.have.property('UserId');
                expect(response.body.Data.UserRoles).to.have.property('RoleId');

                expect(response.body.Data.UserRoles.UserId).to.equal(getTestData("userRolesCreateModel").UserId);
                expect(response.body.Data.UserRoles.RoleId).to.equal(getTestData("userRolesCreateModel").RoleId);

            })
            .expect(201, done);
    })

    it('07:04 -> Get userRoles by id', function(done) {
        agent
            .get(`/api/v1/userRoles/${getTestData("userRolesId_1")}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body.Data.UserRoles).to.have.property('UserId');
                expect(response.body.Data.UserRoles).to.have.property('RoleId');

                expect(response.body.Data.UserRoles.UserId).to.equal(getTestData("userRolesCreateModel").UserId);
                expect(response.body.Data.UserRoles.RoleId).to.equal(getTestData("userRolesCreateModel").RoleId);

            })
            .expect(200, done);
    });

    it('81:03 -> Search records', function(done) {
        loadUserRolesQueryString();
        agent
            .get(`/api/v1/userRoles/search${loadUserRolesQueryString()}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body.Data.UserRolesRecords).to.have.property('TotalCount');
                expect(response.body.Data.UserRolesRecords).to.have.property('RetrievedCount');
                expect(response.body.Data.UserRolesRecords).to.have.property('PageIndex');
                expect(response.body.Data.UserRolesRecords).to.have.property('ItemsPerPage');
                expect(response.body.Data.UserRolesRecords).to.have.property('Order');
                expect(response.body.Data.UserRolesRecords.TotalCount).to.greaterThan(0);
                expect(response.body.Data.UserRolesRecords.RetrievedCount).to.greaterThan(0);
                expect(response.body.Data.UserRolesRecords.Items.length).to.greaterThan(0);
            })
            .expect(200, done);
    });

    it('07:04 -> Update userRoles', function(done) {
        loadUserRolesUpdateModel();
        const updateModel = getTestData("userRolesUpdateModel");
        agent
            .put(`/api/v1/userRoles/${getTestData("userRolesId_1")}`)
            .set('Content-Type', 'application/json')
            .send(updateModel)
            .expect(response => {
                expect(response.body.Data.UserRoles).to.have.property('UserId');
                expect(response.body.Data.UserRoles).to.have.property('RoleId');

                expect(response.body.Data.UserRoles.UserId).to.equal(getTestData("userRolesUpdateModel").UserId);
                expect(response.body.Data.UserRoles.RoleId).to.equal(getTestData("userRolesUpdateModel").RoleId);
            })
            .expect(200, done);
    });
    
    it('07:05 -> Delete userRoles', function(done) {
        agent
            .delete(`/api/v1/userRoles/${getTestData("userRolesId_1")}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body).to.have.property('Status');
                expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

    it('07:01 -> Create userRoles again', function(done) {
        loadUserRolesCreateModel();
        const createModel = getTestData("userRolesCreateModel");
        agent
            .post(`/api/v1/userRoles/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData(response.body.Data.UserRoles.id, "userRolesId");

                expect(response.body.Data.UserRoles).to.have.property('UserId');
                expect(response.body.Data.UserRoles).to.have.property('RoleId');

                expect(response.body.Data.UserRoles.UserId).to.equal(getTestData("userRolesCreateModel").UserId);
                expect(response.body.Data.UserRoles.RoleId).to.equal(getTestData("userRolesCreateModel").RoleId);
            })
            .expect(201, done);
    });

 });

// ///////////////////////////////////////////////////////////////////////////

export const loadUserRolesCreateModel = async (
) => {
    const model = {
        UserId:getTestData("userId"),
        RoleId:getTestData("roleId"),
        
     };
    setTestData(model, "userRolesCreateModel");
};

export const loadUserRolesUpdateModel = async (
) => {
    const model = {
        UserId:getTestData("userId"),
        RoleId:getTestData("roleId"),
        
     };
    setTestData(model, "userRolesUpdateModel");
};

function loadUserRolesQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '';
    return queryString;
}

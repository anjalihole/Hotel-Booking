import  request  from 'supertest';
import { expect } from 'chai';
import  Application  from '../../../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from '../init';
const infra = Application.instance();

///////////////////////////////////////////////////////////////////////////

describe('07 - Role tests', function() {

    var agent = request.agent(infra._app);

    it('07:01 -> Create role', function(done) {
        loadRoleCreateModel();
        const createModel = getTestData("roleCreateModel");
        agent
            .post(`/api/v1/role/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData(response.body.Data.Role.id, 'roleId_1');

                expect(response.body.Data.Role).to.have.property('RoleName');
                expect(response.body.Data.Role).to.have.property('Description');

                expect(response.body.Data.Role.RoleName).to.equal(getTestData("roleCreateModel").RoleName);
                expect(response.body.Data.Role.Description).to.equal(getTestData("roleCreateModel").Description);


            })
            .expect(201, done);
    })

    it('07:04 -> Get role by id', function(done) {
        agent
            .get(`/api/v1/role/${getTestData("roleId_1")}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body.Data.Role).to.have.property('RoleName');
                expect(response.body.Data.Role).to.have.property('Description');

                expect(response.body.Data.Role.RoleName).to.equal(getTestData("roleCreateModel").RoleName);
                expect(response.body.Data.Role.Description).to.equal(getTestData("roleCreateModel").Description);

            })
            .expect(200, done);
    });

    it('81:03 -> Search records', function(done) {
        loadRoleQueryString();
        agent
            .get(`/api/v1/role/search${loadRoleQueryString()}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body.Data.RoleRecords).to.have.property('TotalCount');
                expect(response.body.Data.RoleRecords).to.have.property('RetrievedCount');
                expect(response.body.Data.RoleRecords).to.have.property('PageIndex');
                expect(response.body.Data.RoleRecords).to.have.property('ItemsPerPage');
                expect(response.body.Data.RoleRecords).to.have.property('Order');
                expect(response.body.Data.RoleRecords.TotalCount).to.greaterThan(0);
                expect(response.body.Data.RoleRecords.RetrievedCount).to.greaterThan(0);
                expect(response.body.Data.RoleRecords.Items.length).to.greaterThan(0);
            })
            .expect(200, done);
    });

    it('07:04 -> Update role', function(done) {
        loadRoleUpdateModel();
        const updateModel = getTestData("roleUpdateModel");
        agent
            .put(`/api/v1/role/${getTestData("roleId_1")}`)
            .set('Content-Type', 'application/json')
            .send(updateModel)
            .expect(response => {
                expect(response.body.Data.Role).to.have.property('RoleName');
                expect(response.body.Data.Role).to.have.property('Description');

                expect(response.body.Data.Role.RoleName).to.equal(getTestData("roleUpdateModel").RoleName);
                expect(response.body.Data.Role.Description).to.equal(getTestData("roleUpdateModel").Description);


            })
            .expect(200, done);
    });
    
    it('07:05 -> Delete role', function(done) {
        agent
            .delete(`/api/v1/role/${getTestData("roleId_1")}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body).to.have.property('Status');
                expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

    it('07:01 -> Create role again', function(done) {
        loadRoleCreateModel();
        const createModel = getTestData("roleCreateModel");
        agent
            .post(`/api/v1/role/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData(response.body.Data.Role.id, "roleId");

                expect(response.body.Data.Role).to.have.property('RoleName');
                expect(response.body.Data.Role).to.have.property('Description');

                expect(response.body.Data.Role.RoleName).to.equal(getTestData("roleCreateModel").RoleName);
                expect(response.body.Data.Role.Description).to.equal(getTestData("roleCreateModel").Description);


            })
            .expect(201, done);
    });

 });

// ///////////////////////////////////////////////////////////////////////////

export const loadRoleCreateModel = async (
) => {
    const model = {
        RoleName: faker.person.firstName(),
        Description:faker.lorem.words(),
        
     };
    setTestData(model, "roleCreateModel");
};

export const loadRoleUpdateModel = async (
) => {
    const model = {
        RoleName: faker.person.firstName(),
        Description:faker.lorem.words(),
        
     };
    setTestData(model, "roleUpdateModel");
};

function loadRoleQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '';
    return queryString;
}

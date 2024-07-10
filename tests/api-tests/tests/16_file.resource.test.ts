import  request  from 'supertest';
import { expect } from 'chai';
import  Application  from '../../../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from '../init';
const infra = Application.instance();

///////////////////////////////////////////////////////////////////////////

describe('07 - FileResource tests', function() {

    var agent = request.agent(infra._app);

    it('07:01 -> Create fileResource', function(done) {
        loadFileResourceCreateModel();
        const createModel = getTestData("fileResourceCreateModel");
        agent
            .post(`/api/v1/fileResource/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData(response.body.Data.FileResource.id, 'fileResourceId_1');

                expect(response.body.Data.FileResource).to.have.property('Name');
                expect(response.body.Data.FileResource).to.have.property('MineType');
                expect(response.body.Data.FileResource).to.have.property('StorageKey');
                expect(response.body.Data.FileResource).to.have.property('IsPublic');
                expect(response.body.Data.FileResource).to.have.property('Url');

                expect(response.body.Data.FileResource.Name).to.equal(getTestData("fileResourceCreateModel").Name);
                expect(response.body.Data.FileResource.StorageKey).to.equal(getTestData("fileResourceCreateModel").StorageKey);
                expect(response.body.Data.FileResource.IsPublic).to.equal(getTestData("fileResourceCreateModel").IsPublic);
                expect(response.body.Data.FileResource.Url).to.equal(getTestData("fileResourceCreateModel").Url);

            })
            .expect(201, done);
    })

    it('07:04 -> Get fileResource by id', function(done) {
        agent
            .get(`/api/v1/fileResource/${getTestData("fileResourceId_1")}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body.Data.FileResource).to.have.property('Name');
                expect(response.body.Data.FileResource).to.have.property('MineType');
                expect(response.body.Data.FileResource).to.have.property('StorageKey');
                expect(response.body.Data.FileResource).to.have.property('IsPublic');
                expect(response.body.Data.FileResource).to.have.property('Url');

                expect(response.body.Data.FileResource.Name).to.equal(getTestData("fileResourceCreateModel").Name);
                expect(response.body.Data.FileResource.StorageKey).to.equal(getTestData("fileResourceCreateModel").StorageKey);
                expect(response.body.Data.FileResource.IsPublic).to.equal(getTestData("fileResourceCreateModel").IsPublic);
                expect(response.body.Data.FileResource.Url).to.equal(getTestData("fileResourceCreateModel").Url);
            })
            .expect(200, done);
    });

    it('81:03 -> Search records', function(done) {
        loadFileResourceQueryString();
        agent
            .get(`/api/v1/fileResource/search${loadFileResourceQueryString()}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body.Data.FileResourceRecords).to.have.property('TotalCount');
                expect(response.body.Data.FileResourceRecords).to.have.property('RetrievedCount');
                expect(response.body.Data.FileResourceRecords).to.have.property('PageIndex');
                expect(response.body.Data.FileResourceRecords).to.have.property('ItemsPerPage');
                expect(response.body.Data.FileResourceRecords).to.have.property('Order');
                expect(response.body.Data.FileResourceRecords.TotalCount).to.be.at.least(0);
                expect(response.body.Data.FileResourceRecords.RetrievedCount).to.be.at.least(0);
                expect(response.body.Data.FileResourceRecords.Items.length).to.be.at.least(0);
            })
            .expect(200, done);
    });

    it('07:04 -> Update fileResource', function(done) {
        loadFileResourceUpdateModel();
        const updateModel = getTestData("fileResourceUpdateModel");
        agent
            .put(`/api/v1/fileResource/${getTestData("fileResourceId_1")}`)
            .set('Content-Type', 'application/json')
            .send(updateModel)
            .expect(response => {
                expect(response.body.Data.FileResource).to.have.property('Name');
                expect(response.body.Data.FileResource).to.have.property('MineType');
                expect(response.body.Data.FileResource).to.have.property('StorageKey');
                expect(response.body.Data.FileResource).to.have.property('IsPublic');
                expect(response.body.Data.FileResource).to.have.property('Url');

                expect(response.body.Data.FileResource.Name).to.equal(getTestData("fileResourceUpdateModel").Name);
                expect(response.body.Data.FileResource.StorageKey).to.equal(getTestData("fileResourceUpdateModel").StorageKey);
                expect(response.body.Data.FileResource.IsPublic).to.equal(getTestData("fileResourceUpdateModel").IsPublic);
                expect(response.body.Data.FileResource.Url).to.equal(getTestData("fileResourceUpdateModel").Url);
            })
            .expect(200, done);
    });

    it('07:05 -> Delete fileResource', function(done) {
        agent
            .delete(`/api/v1/fileResource/${getTestData("fileResourceId_1")}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body).to.have.property('Status');
                expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

it('07:01 -> Create fileResource again', function(done) {
    loadFileResourceCreateModel();
    const createModel = getTestData("fileResourceCreateModel");
    agent
        .post(`/api/v1/fileResource/`)
        .set('Content-Type', 'application/json')
        .send(createModel)
        .expect(response => {
            setTestData(response.body.Data.FileResource.id, 'fileResourceId');
            expect(response.body.Data.FileResource).to.have.property('Name');
            expect(response.body.Data.FileResource).to.have.property('MineType');
            expect(response.body.Data.FileResource).to.have.property('StorageKey');
            expect(response.body.Data.FileResource).to.have.property('IsPublic');
            expect(response.body.Data.FileResource).to.have.property('Url');

            expect(response.body.Data.FileResource.Name).to.equal(getTestData("fileResourceCreateModel").Name);
            expect(response.body.Data.FileResource.StorageKey).to.equal(getTestData("fileResourceCreateModel").StorageKey);
            expect(response.body.Data.FileResource.IsPublic).to.equal(getTestData("fileResourceCreateModel").IsPublic);
            expect(response.body.Data.FileResource.Url).to.equal(getTestData("fileResourceCreateModel").Url);
        })
        .expect(201, done);
})
  });

// // ///////////////////////////////////////////////////////////////////////////

export const loadFileResourceCreateModel = async (
) => {
    const model = {
        Name: faker.person.firstName(),
        MineType:faker.system.mimeType(),
        StorageKey:"string",
        IsPublic:faker.datatype.boolean(),
        Url:"string"
     };
    setTestData(model, "fileResourceCreateModel");
};

export const loadFileResourceUpdateModel = async (
) => {
    const model = {
        Name: faker.person.firstName(),
        MineType:faker.system.mimeType(),
        StorageKey:"string",
        IsPublic:faker.datatype.boolean(),
        Url:"string"
     };
    setTestData(model, "fileResourceUpdateModel");
};

function loadFileResourceQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '';
    return queryString;
}

import  request  from 'supertest';
import { expect } from 'chai';
import  Application  from '../../../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from '../init';
const infra = Application.instance();

///////////////////////////////////////////////////////////////////////////

describe('07 - HotelReview tests', function() {

    var agent = request.agent(infra._app);

    it('07:01 -> Create hotelReview', function(done) {
        loadHotelReviewCreateModel();
        const createModel = getTestData("hotelReviewCreateModel");
        agent
            .post(`/api/v1/hotelReview/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(response => {
                setTestData(response.body.Data.HotelReview.id, 'hotelReviewId_1');

                expect(response.body.Data.HotelReview).to.have.property('HotelId');
                expect(response.body.Data.HotelReview).to.have.property('ReviewUserId');
                expect(response.body.Data.HotelReview).to.have.property('Rating');
                expect(response.body.Data.HotelReview).to.have.property('ReviewTitle');
                expect(response.body.Data.HotelReview).to.have.property('ReviewDescription');
                expect(response.body.Data.HotelReview).to.have.property('ReviewTimeStamp');

                expect(response.body.Data.HotelReview.HotelId).to.equal(getTestData("hotelReviewCreateModel").HotelId);
                expect(response.body.Data.HotelReview.Rating).to.equal(getTestData("hotelReviewCreateModel").Rating);
                expect(response.body.Data.HotelReview.ReviewTitle).to.equal(getTestData("hotelReviewCreateModel").ReviewTitle);
                expect(response.body.Data.HotelReview.ReviewDescription).to.equal(getTestData("hotelReviewCreateModel").ReviewDescription);

            })
            .expect(201, done);
    })

    it('07:04 -> Get hotelReview by id', function(done) {
        agent
            .get(`/api/v1/hotelReview/${getTestData("hotelReviewId_1")}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body.Data.HotelReview).to.have.property('HotelId');
                expect(response.body.Data.HotelReview).to.have.property('ReviewUserId');
                expect(response.body.Data.HotelReview).to.have.property('Rating');
                expect(response.body.Data.HotelReview).to.have.property('ReviewTitle');
                expect(response.body.Data.HotelReview).to.have.property('ReviewDescription');
                expect(response.body.Data.HotelReview).to.have.property('ReviewTimeStamp');

                expect(response.body.Data.HotelReview.HotelId).to.equal(getTestData("hotelReviewCreateModel").HotelId);
                expect(response.body.Data.HotelReview.Rating).to.equal(getTestData("hotelReviewCreateModel").Rating);
                expect(response.body.Data.HotelReview.ReviewTitle).to.equal(getTestData("hotelReviewCreateModel").ReviewTitle);
                expect(response.body.Data.HotelReview.ReviewDescription).to.equal(getTestData("hotelReviewCreateModel").ReviewDescription);

            })
            .expect(200, done);
    });

    it('81:03 -> Search records', function(done) {
        loadHotelReviewQueryString();
        agent
            .get(`/api/v1/hotelReview/search${loadHotelReviewQueryString()}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body.Data.HotelReviewRecords).to.have.property('TotalCount');
                expect(response.body.Data.HotelReviewRecords).to.have.property('RetrievedCount');
                expect(response.body.Data.HotelReviewRecords).to.have.property('PageIndex');
                expect(response.body.Data.HotelReviewRecords).to.have.property('ItemsPerPage');
                expect(response.body.Data.HotelReviewRecords).to.have.property('Order');
                expect(response.body.Data.HotelReviewRecords.TotalCount).to.be.at.least(0);
                expect(response.body.Data.HotelReviewRecords.RetrievedCount).to.be.at.least(0);
                expect(response.body.Data.HotelReviewRecords.Items.length).to.be.at.least(0);
            })
            .expect(200, done);
    });

    it('07:04 -> Update hotelReview', function(done) {
        loadHotelReviewUpdateModel();
        const updateModel = getTestData("hotelReviewUpdateModel");
        agent
            .put(`/api/v1/hotelReview/${getTestData("hotelReviewId_1")}`)
            .set('Content-Type', 'application/json')
            .send(updateModel)
            .expect(response => {
                
                expect(response.body.Data.HotelReview).to.have.property('HotelId');
                expect(response.body.Data.HotelReview).to.have.property('ReviewUserId');
                expect(response.body.Data.HotelReview).to.have.property('Rating');
                expect(response.body.Data.HotelReview).to.have.property('ReviewTitle');
                expect(response.body.Data.HotelReview).to.have.property('ReviewDescription');
                expect(response.body.Data.HotelReview).to.have.property('ReviewTimeStamp');

                expect(response.body.Data.HotelReview.HotelId).to.equal(getTestData("hotelReviewUpdateModel").HotelId);
                expect(response.body.Data.HotelReview.Rating).to.equal(getTestData("hotelReviewUpdateModel").Rating);
                expect(response.body.Data.HotelReview.ReviewTitle).to.equal(getTestData("hotelReviewUpdateModel").ReviewTitle);
                expect(response.body.Data.HotelReview.ReviewDescription).to.equal(getTestData("hotelReviewUpdateModel").ReviewDescription);

            })
            .expect(200, done);
    });

    it('07:05 -> Delete hotelReview', function(done) {
        agent
            .delete(`/api/v1/hotelReview/${getTestData("hotelReviewId_1")}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
                expect(response.body).to.have.property('Status');
                expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

it('07:01 -> Create hotelReview again', function(done) {
    loadHotelReviewCreateModel();
    const createModel = getTestData("hotelReviewCreateModel");
    agent
        .post(`/api/v1/hotelReview/`)
        .set('Content-Type', 'application/json')
        .send(createModel)
        .expect(response => {
            setTestData(response.body.Data.HotelReview.id, 'hotelReviewId');
            
            expect(response.body.Data.HotelReview).to.have.property('HotelId');
            expect(response.body.Data.HotelReview).to.have.property('ReviewUserId');
            expect(response.body.Data.HotelReview).to.have.property('Rating');
            expect(response.body.Data.HotelReview).to.have.property('ReviewTitle');
            expect(response.body.Data.HotelReview).to.have.property('ReviewDescription');
            expect(response.body.Data.HotelReview).to.have.property('ReviewTimeStamp');

            expect(response.body.Data.HotelReview.HotelId).to.equal(getTestData("hotelReviewCreateModel").HotelId);
            expect(response.body.Data.HotelReview.Rating).to.equal(getTestData("hotelReviewCreateModel").Rating);
            expect(response.body.Data.HotelReview.ReviewTitle).to.equal(getTestData("hotelReviewCreateModel").ReviewTitle);
            expect(response.body.Data.HotelReview.ReviewDescription).to.equal(getTestData("hotelReviewCreateModel").ReviewDescription);

        })
        .expect(201, done);
})
  });

// // ///////////////////////////////////////////////////////////////////////////

export const loadHotelReviewCreateModel = async (
) => {
    const model = {
        HotelId:getTestData("hotelId"),
        ReviewUserId:"4",
        Rating:"5.0",
        ReviewTitle:faker.lorem.words(),
        ReviewDescription:faker.lorem.words(),
        ReviewTimeStamp:"2024-April-25"
     };
    setTestData(model, "hotelReviewCreateModel");
};

export const loadHotelReviewUpdateModel = async (
) => {
    const model = {
        HotelId:getTestData("hotelId"),
        ReviewUserId:"4",
        Rating:"5.0",
        ReviewTitle:faker.lorem.words(),
        ReviewDescription:faker.lorem.words(),
        ReviewTimeStamp:"2024-April-25"
     };
    setTestData(model, "hotelReviewUpdateModel");
};

function loadHotelReviewQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '';
    return queryString;
}

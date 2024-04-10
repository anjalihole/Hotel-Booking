/* eslint-disable linebreak-style */
export interface HotelReviewDomainModel {
    id?: string;
    HotelId: string;
    ReviewUserId: string;
    Rating: string;
    ReviewTitle: string;
    ReviewDescription: string;
    ReviewTimeStamp: Date;

}
export interface ApiHotelReviewVerificationDomainModel {
    id?: string;
    HotelId: string;
    ReviewUserId: string;
    Rating: string;
    ReviewTitle: string;
    ReviewDescription: string;
    ReviewTimeStamp: string;

}

/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import { HotelReviewDto } from "./hotel.review.dto";

///////////////////////////////////////////////////////////////////////////////////

export interface HotelReviewSearchFilters {
    id?: string;
    HotelId: string;
    ReviewUserId: string;
    Rating: string;
    ReviewTitle: string;
    ReviewDescription: string;
    ReviewTimeStamp: Date;
    OrderBy      : string;
    Order        : string;
    PageIndex    : number;
    ItemsPerPage : number;
}

export interface HotelReviewSearchResults {
    TotalCount     : number;
    RetrievedCount : number;
    PageIndex      : number;
    ItemsPerPage   : number;
    Order          : string;
    OrderedBy      : string;
    Items          : HotelReviewDto[];
}

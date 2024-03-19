/* eslint-disable linebreak-style */
export interface HotelDomainModel {
    id?: string;
    Name: string;
    AddressId: string;
    Phone?: string;
    Email?: string;
    Description: string;
    CheckInTime: string;
    CheckOutTime: string;
    OwnerUserId: string;
    Photos: string;

}
export interface ApiHotelVerificationDomainModel {
    Name: string;
    AddressId: string;
    hone?: string;
    Email?: string;
    Description: string;
    CheckInTime: string;
    CheckOutTime: string;
    OwnerUserId: string;
    Photos: string;

}

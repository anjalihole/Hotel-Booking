/* eslint-disable linebreak-style */
export interface CustomerDomainModel {
    id?: string;
    FirstName: string;
    LastName: string;
    Address: string;
    Password: string;
    Phone?: string;
    Email?: string;
}
export interface ApiCustomerVerificationDomainModel {
    FirstName: string;
    LastName: string;
    Address: string;
    Password: string;
}

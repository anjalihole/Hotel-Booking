/* eslint-disable linebreak-style */
/* eslint-disable linebreak-style */
export interface UserDomainModel {
    id?: string;
    FirstName: string;
    LastName: string;
    Phone?: string;
    Email?: string;
    Password?: string;
}
export interface UserLoginDetails {
    Phone      ?: string,
    Email      ?: string,
    UserName   ?: string;
    Password   ?: string,
    Otp        ?: string,
    LoginRoleId : number
}
export interface ApiUserVerificationDomainModel {
    FirstName: string;
    LastName: string;
    Address: string;
    Password: string;
}

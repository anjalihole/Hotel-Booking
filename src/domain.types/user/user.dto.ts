/* eslint-disable linebreak-style */

export interface UserDto {
    id?: string;
    FirstName: string;
    LastName: string;
    Phone?: string;
    Email?: string;
    Password?: string;
}

export interface UserDtoToken {
    id?: string;
    FirstName: string;
    LastName: string;
    Phone?: string;
    Email?: string;
    Password?: string;
    Token?: string;
}

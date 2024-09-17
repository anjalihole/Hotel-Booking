export interface Hotel {
    id: number;
    Name: string;
    Description: string;
    Email: string;
    AddressId: string;
    CheckInTime: string;
    CheckOutTime: string;
    OwnerUserId: string;
    Photos: string;
    Phone: string;
}

export interface RegistrationForm {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
}

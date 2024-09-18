/* eslint-disable linebreak-style */
export interface RoomDomainModel {
    id?: string;
    Name: string;
    RoomNumber: string;
    RoomTypesId: string;
    HotelId: string;
    Description: string;
    Blocked: boolean;
    Status: string;
    Phone:string;
    Inventory: string;
}
export interface ApiRoomVerificationDomainModel {
    Name: string;
    RoomNumber: string;
    RoomTypesId: string;
    HotelId: string;
    Description: string;
    Blocked: boolean;
    Status: string;
    Phone:string;
    Inventory: string;
}

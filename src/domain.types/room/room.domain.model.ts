/* eslint-disable linebreak-style */
export interface RoomDomainModel {
    id?: string;
    Name: string;
    RoomNumber: string;
    RoomTypeId: string;
    Description: string;
    Blocked: string;
    Status: string;
    Phone?:string;
    Inventory: string;
}
export interface ApiRoomVerificationDomainModel {
    Name: string;
    RoomNumber: string;
    RoomTypeId: string;
    Description: string;
    Blocked: string;
    Status: string;
    Phone?:string;
    Inventory: string;
}

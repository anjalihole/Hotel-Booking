/* eslint-disable linebreak-style */
export interface RoomDomainModel {
    id?: string;
    HotelId: string;
    RoomNumber: string;
    RoomType: string;
    BedType: string;
    RoomImage: string;
    Price: string;
    Taxes: string;
    Description: string;
    BlockRoom: string;
    RoomPerPerson: string;
    CostPerDay: string;
    Phone?:string;
    Inventory: string;
}
export interface ApiRoomVerificationDomainModel {
    HotelId: string;
    RoomNumber: string;
    RoomType: string;
    BedType: string;
    RoomImage: string;
    price: string;
    Taxes: string;
}

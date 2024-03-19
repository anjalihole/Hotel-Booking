/* eslint-disable linebreak-style */
import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    IsUUID,
    PrimaryKey,
    Length,
    IsEmail,
} from 'sequelize-typescript';

import { v4 } from 'uuid';
//import { Helper } from '../../../../../common/helper';

///////////////////////////////////////////////////////////////////////

@Table({
    timestamps      : true,
    modelName       : 'HotelPhotos',
    tableName       : 'hotel.photos',
    paranoid        : true,
    freezeTableName : true,
})
export default class HotelPhotos extends Model {

    @IsUUID(4)
    @PrimaryKey
    @Column({
        type         : DataType.UUID,
        defaultValue : () => {
            return v4();
        },
        allowNull : false,
    })
    id: string;

    @Length({ min: 1, max: 256 })
    @Column({
        type      : DataType.STRING(256),
        allowNull : true,
    })
    FileResourceId: string;

    @Column({
        type      : DataType.STRING(500),
        allowNull : true,
    })
    HotelId: string;

    @IsEmail
    @Column({
        type      : DataType.STRING(500),
        allowNull : true,
    })
    RoomTypeId: string;

    @Column
    @CreatedAt
    CreatedAt: Date;

    @UpdatedAt
    UpdatedAt: Date;

    @DeletedAt
    DeletedAt: Date;

}

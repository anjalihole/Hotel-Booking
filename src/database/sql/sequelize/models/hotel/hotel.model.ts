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
    modelName       : 'Hotel',
    tableName       : 'hotel',
    paranoid        : true,
    freezeTableName : true,
})
export default class Hotel extends Model {

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

    @Length({ min: 1, max: 64 })
    @Column({
        type      : DataType.STRING(64),
        allowNull : false,
    })
    HotelName: string;

    @Length({ min: 6, max: 256 })
    @Column({
        type      : DataType.STRING(256),
        allowNull : true,
    })
    Address: string;

    @Length({ min: 10, max: 16 })
    @Column({
        type      : DataType.STRING(16),
        allowNull : true,
    })
    Phone: string;

    @Length({ min: 3, max: 128 })
    @IsEmail
    @Column({
        type      : DataType.STRING(128),
        allowNull : true,
    })
    Email: string;

    @Column
    @CreatedAt
    CreatedAt: Date;

    @UpdatedAt
    UpdatedAt: Date;

    @DeletedAt
    DeletedAt: Date;

}

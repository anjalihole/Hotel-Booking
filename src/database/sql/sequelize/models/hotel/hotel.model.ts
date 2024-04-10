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

    @Column({
        type      : DataType.STRING(64),
        allowNull : false,
    })
    Name: string;

    @Column({
        type      : DataType.STRING(256),
        allowNull : true,
    })
    AddressId: string;

    @Column({
        type      : DataType.STRING(200),
        allowNull : true,
    })
    Description: string;

    @IsEmail
    @Column({
        type      : DataType.STRING(128),
        allowNull : true,
    })
    Email: string;

    @Column({
        type      : DataType.STRING(25),
        allowNull : true,
    })
    CheckInTime: string;

    @Column({
        type      : DataType.STRING(25),
        allowNull : true,
    })
    CheckOutTime: string;

    @Column({
        type      : DataType.STRING(128),
        allowNull : true,
    })
    OwnerUserId: string;

    @Column({
        type      : DataType.STRING(128),
        allowNull : true,
    })
    Phone: string;

    @Column({
        type      : DataType.STRING(128),
        allowNull : true,
    })
    Photos: string;

    @Column
    @CreatedAt
    CreatedAt: Date;

    @UpdatedAt
    UpdatedAt: Date;

    @DeletedAt
    DeletedAt: Date;

}

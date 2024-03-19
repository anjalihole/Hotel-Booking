/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
/* eslint-disable key-spacing */
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
    timestamps: true,
    modelName: 'Address',
    tableName: 'address',
    paranoid: true,
    freezeTableName: true,
})
// eslint-disable-next-line padded-blocks
export default class Address extends Model {
    @IsUUID(4)
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: () => {
            return v4();
        },
        allowNull: false,
    })
    id: string;

    @Length({ min: 1, max: 64 })
    @Column({
        type: DataType.STRING(64),
        allowNull: false,
    })
    AddressLine1: string;

    @Length({ min: 1, max: 64 })
    @Column({
        type: DataType.STRING(64),
        allowNull: false,
    })
    AddressLine2: string;

    @Length({ min: 1, max: 50 })
    @Column({
        type: DataType.STRING(50),
        allowNull: true,
    })
    Street: string;

    @Length({ min: 1, max: 50 })
    @IsEmail
    @Column({
        type: DataType.STRING(50),
        allowNull: true,
    })
    City: string;

    @Length({ min: 1, max: 50 })
    @IsEmail
    @Column({
        type: DataType.STRING(50),
        allowNull: true,
    })
    State: string;

    @Length({ min: 1, max: 50 })
    @IsEmail
    @Column({
        type: DataType.STRING(50),
        allowNull: true,
    })
    Country: string;

    @IsEmail
    @Column({
        type: DataType.STRING(50),
        allowNull: true,
    })
    ZipCode: string;

    @Column
    @CreatedAt
    CreatedAt: Date;

    @UpdatedAt
    UpdatedAt: Date;

    @DeletedAt
    DeletedAt: Date;
}


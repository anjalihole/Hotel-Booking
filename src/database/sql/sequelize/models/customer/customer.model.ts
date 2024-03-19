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
    modelName: 'Customer',
    tableName: 'customer',
    paranoid: true,
    freezeTableName: true,
})
// eslint-disable-next-line padded-blocks
export default class Customer extends Model {
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

    @Column({
        type: DataType.STRING(64),
        allowNull: false,
    })
    UserId: string;

    @Column({
        type: DataType.STRING(64),
        allowNull: false,
    })
    AddressId: string;

    @Length({ min: 3, max: 25 })
    @Column({
        type: DataType.STRING(25),
        allowNull: true,
    })
    PAN: string;

    @Length({ min: 3, max: 25 })
    @IsEmail
    @Column({
        type: DataType.STRING(25),
        allowNull: true,
    })
    Aadhar: string;

    @Column
    @CreatedAt
    CreatedAt: Date;

    @UpdatedAt
    UpdatedAt: Date;

    @DeletedAt
    DeletedAt: Date;
}


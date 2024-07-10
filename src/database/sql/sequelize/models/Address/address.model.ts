/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
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
    HasOne,
} from 'sequelize-typescript';
import { v4 } from 'uuid';
import Hotel from '../hotel/hotel.model';

@Table({
    timestamps: true,
    modelName: 'Address',
    tableName: 'address',
    paranoid: true,
    freezeTableName: true,
})
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

    @Column({
        type: DataType.STRING(64),
        allowNull: false,
    })
    AddressLine1: string;

    @Column({
        type: DataType.STRING(64),
        allowNull: false,
    })
    AddressLine2: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: true,
    })
    Street: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: true,
    })
    City: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: true,
    })
    State: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: true,
    })
    Country: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: true,
    })
    ZipCode: number;

    @HasOne(() => Hotel)
    Hotel: Hotel;

    @Column
    @CreatedAt
    CreatedAt: Date;

    @UpdatedAt
    UpdatedAt: Date;

    @DeletedAt
    DeletedAt: Date;
}

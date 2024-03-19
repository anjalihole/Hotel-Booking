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
} from 'sequelize-typescript';

import { v4 } from 'uuid';
//import { Helper } from '../../../../../common/helper';

///////////////////////////////////////////////////////////////////////

@Table({
    timestamps: true,
    modelName: 'Room',
    tableName: 'room',
    paranoid: true,
    freezeTableName: true,
})
// eslint-disable-next-line padded-blocks
export default class Room extends Model {
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
    Name: string;

    @Length({ min: 1, max: 200 })
    @Column({
        type: DataType.STRING(200),
        allowNull: false,
    })
   Description: string;

    @Column({
        type: DataType.STRING(500),
        allowNull: false,
    })
    RoomTypeId: string;

    @Column({
        type: DataType.STRING(256),
        allowNull: true,
    })
    RoomNumber: string;

    @Column({
        type: DataType.STRING(16),
        allowNull: true,
    })
    Blocked: string;

    @Length({ min: 1, max: 500 })
    @Column({
        type: DataType.STRING(500),
        allowNull: true,
    })
    Status: string;

    @Length({ min: 1, max: 500 })
    @Column({
        type: DataType.STRING(500),
        allowNull: true,
    })
    Inventory: string;

    @Length({ min: 1, max: 500 })
    @Column({
        type: DataType.STRING(500),
        allowNull: true,
    })
    Phone: string;

    @Column
    @CreatedAt
    CreatedAt: Date;

    @UpdatedAt
    UpdatedAt: Date;

    @DeletedAt
    DeletedAt: Date;
}

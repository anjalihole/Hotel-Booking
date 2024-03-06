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
    HotelId: string;

    @Column({
        type: DataType.STRING(64),
        allowNull: false,
    })
    RoomNumber: string;

    @Column({
        type: DataType.STRING(64),
        allowNull: false,
    })
    RoomType: string;

    @Column({
        type: DataType.STRING(256),
        allowNull: true,
    })
    BedType: string;

    @Column({
        type: DataType.STRING(16),
        allowNull: true,
    })
    RoomImage: string;

    @Column({
        type: DataType.STRING(128),
        allowNull: true,
    })
    Price: string;

    @Column({
        type: DataType.STRING(128),
        allowNull: true,
    })
    Taxes: string;

    @Column({
        type: DataType.STRING(128),
        allowNull: true,
    })
    Description: string;

    @Column({
        type: DataType.STRING(128),
        allowNull: true,
    })
    BlockRoom: string;

    @Column({
        type: DataType.STRING(128),
        allowNull: true,
    })
    RoomPerPerson: string;

    @Column({
        type: DataType.STRING(128),
        allowNull: true,
    })
    CostPerDay: string;

    @Column({
        type: DataType.STRING(128),
        allowNull: true,
    })
    Inventory: string;

    @Column({
        type: DataType.STRING(16),
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

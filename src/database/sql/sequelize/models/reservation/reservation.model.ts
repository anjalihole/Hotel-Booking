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
    modelName: 'Reservation',
    tableName: 'reservation',
    paranoid: true,
    freezeTableName: true,
})
// eslint-disable-next-line padded-blocks
export default class Reservation extends Model {
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
    CustomerId: string;

    @Column({
        type: DataType.STRING(64),
        allowNull: false,
    })
    RoomId: string;

    @Column({
        type: DataType.STRING(64),
        allowNull: false,
    })
    CheckInDate: string;

    @Column({
        type: DataType.STRING(256),
        allowNull: true,
    })
    CheckOutDate: string;

    @Column({
        type: DataType.STRING(16),
        allowNull: true,
    })
    TotalCost: string;

    @Column({
        type: DataType.STRING(128),
        allowNull: true,
    })
    Status: string;

    @Column
    @CreatedAt
    CreatedAt: Date;

    @UpdatedAt
    UpdatedAt: Date;

    @DeletedAt
    DeletedAt: Date;
}

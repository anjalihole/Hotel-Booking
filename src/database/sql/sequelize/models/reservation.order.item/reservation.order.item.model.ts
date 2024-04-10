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
} from 'sequelize-typescript';

import { v4 } from 'uuid';
//import { Helper } from '../../../../../common/helper';

///////////////////////////////////////////////////////////////////////

@Table({
    timestamps: true,
    modelName: 'RservationOrderItem',
    tableName: 'reservation.order.item',
    paranoid: true,
    freezeTableName: true,
})
// eslint-disable-next-line padded-blocks
export default class RservationOrderItem extends Model {
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
        type: DataType.STRING(500),
        allowNull: false,
    })
    ReservationOrderId: string;
    
    @Column({
        type: DataType.STRING(500),
        allowNull: false,
    })
    RoomId: string;

    @Column({
        type: DataType.STRING(64),
        allowNull: false,
    })
    TotalDays: string;

    @Column({
        type: DataType.STRING(64),
        allowNull: false,
    })
    Tax: string;

    @Column({
        type: DataType.STRING(64),
        allowNull: false,
    })
    Discount: string;

    @Column({
        type: DataType.STRING(500),
        allowNull: false,
    })
    Cost: string;

    @Column
    @CreatedAt
    CreatedAt: Date;

    @UpdatedAt
    UpdatedAt: Date;

    @DeletedAt
    DeletedAt: Date;
}


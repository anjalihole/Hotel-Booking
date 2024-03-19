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
    modelName: 'ReservationOrder',
    tableName: 'reservation.order',
    paranoid: true,
    freezeTableName: true,
})
// eslint-disable-next-line padded-blocks
export default class ReservationOrder extends Model {
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
    CustomerUserId: string;

    @Column({
        type: DataType.STRING(64),
        allowNull: false,
    })
    RoomId: string;

    @Length({ min: 1, max: 60 })
    @Column({
        type: DataType.STRING(60),
        allowNull: false,
    })
    CheckInDate: string;

    @Length({ min: 1, max: 60 })
    @Column({
        type: DataType.STRING(60),
        allowNull: true,
    })
    CheckOutDate: string;

    @Column({
        type: DataType.STRING(64),
        allowNull: true,
    })
    TotalCost: string;

    @Column({
        type: DataType.STRING(128),
        allowNull: true,
    })
    Status: string;
    
    @Length({ min: 1, max: 60 })
    @Column({
        type: DataType.STRING(60),
        allowNull: true,
    })
    ReservationDateTime: string;

    @Column({
        type: DataType.STRING(128),
        allowNull: true,
    })
    Discount: string;
    
    @Length({ min: 1, max: 500 })
    @Column({
        type: DataType.STRING(500),
        allowNull: true,
    })
    Taxes: string;

    @Column({
        type: DataType.STRING(500),
        allowNull: true,
    })
    TotalPayable: string;

    @Column({
        type: DataType.STRING(500),
        allowNull: true,
    })
    AdvancePaid: string;

    @Length({ min: 1, max: 60 })
    @Column({
        type: DataType.STRING(60),
        allowNull: true,
    })
    AdvancePaymentDateTime: string;

    @Column({
        type: DataType.STRING(500),
        allowNull: true,
    })
    BookingStaffUserId: string;

    @Column({
        type: DataType.STRING(500),
        allowNull: true,
    })
    Penalties: string;

    @Column
    @CreatedAt
    CreatedAt: Date;

    @UpdatedAt
    UpdatedAt: Date;

    @DeletedAt
    DeletedAt: Date;
}

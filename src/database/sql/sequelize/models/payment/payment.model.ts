/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
/* eslint-disable lines-between-class-members */
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
    timestamps      : true,
    modelName       : 'Payment',
    tableName       : 'payment',
    paranoid        : true,
    freezeTableName : true,
})
export default class Payment extends Model {

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
    BookingId: string;

    @Column({
        type      : DataType.STRING(256),
        allowNull : true,
    })
    PaymentDate: string;

    @Column({
        type      : DataType.STRING(16),
        allowNull : true,
    })
    PaymentAmount: string;

    @Column({
        type      : DataType.STRING(128),
        allowNull : true,
    })
    PaymentMethod: string;

    @Column({
        type      : DataType.STRING(128),
        allowNull : true,
    })
    TransactionStatus: string;

    @Column
    @CreatedAt
    CreatedAt: Date;

    @UpdatedAt
    UpdatedAt: Date;

    @DeletedAt
    DeletedAt: Date;
    date: string;
    amount: string;
    metthod: string;
    status: string;

}

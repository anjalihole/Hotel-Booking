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
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';

import { v4 } from 'uuid';
import Address from '../address/address.model';

//import { Helper } from '../../../../../common/helper';

///////////////////////////////////////////////////////////////////////

@Table({
    timestamps: true,
    modelName: 'AddressHolder',
    tableName: 'address.holder',
    paranoid: true,
    freezeTableName: true,
})
// eslint-disable-next-line padded-blocks
export default class AddressHolder extends Model {
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

    @IsUUID(4)
    @ForeignKey(() => Address)
    @Column({
        type      : DataType.UUID,
        allowNull : false,
    })
    AddressId: string;

    @BelongsTo(() => Address)
    Address: Address;

    @Column({
        type: DataType.STRING(500),
        allowNull: false,
    })
    HolderId: string;

    @Column({
        type: DataType.STRING(30),
        allowNull: true,
    })
    HolderType: string;

    @Column({
        type      : DataType.STRING(32),
        allowNull : true
    })
    AddressType: string;

    @Column
    @CreatedAt
    CreatedAt: Date;

    @UpdatedAt
    UpdatedAt: Date;

    @DeletedAt
    DeletedAt: Date;
}


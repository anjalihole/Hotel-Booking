/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
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
    IsEmail,
    BelongsTo,
    ForeignKey,
    HasMany
} from 'sequelize-typescript';
import { v4 } from 'uuid';
import Address from '../address/address.model';
import HotelAminities from '../hotel.amenities/hotel.amenities.model';
import HotelReview from '../hotel.review/hotel.review.model';

@Table({
    timestamps      : true,
    modelName       : 'Hotel',
    tableName       : 'hotel',
    paranoid        : true,
    freezeTableName : true,
})
export default class Hotel extends Model {

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

    @Column({
        type      : DataType.STRING(64),
        allowNull : false,
    })
    Name: string;

    @ForeignKey(() => Address)
    @Column({
        type      : DataType.UUID,
        allowNull : true,
    })
    AddressId: string;

    @BelongsTo(() => Address)
    Address: Address;

    @Column({
        type      : DataType.STRING(200),
        allowNull : true,
    })
    Description: string;

    @IsEmail
    @Column({
        type      : DataType.STRING(128),
        allowNull : true,
    })
    Email: string;

    @Column({
        type      : DataType.STRING(25),
        allowNull : true,
    })
    CheckInTime: string;

    @Column({
        type      : DataType.STRING(25),
        allowNull : true,
    })
    CheckOutTime: string;

    @Column({
        type      : DataType.STRING(128),
        allowNull : true,
    })
    OwnerUserId: string;

    @Column({
        type      : DataType.STRING(128),
        allowNull : true,
    })
    Phone: string;

    @Column({
        type         : DataType.BOOLEAN,
        allowNull    : true,
        defaultValue : false,
    })
    Photos: boolean;

    @HasMany(() => HotelAminities)
    Aminities: HotelAminities[];

    @HasMany(() => HotelReview)
    Reviews: HotelReview[];

    @Column
    @CreatedAt
    CreatedAt: Date;

    @UpdatedAt
    UpdatedAt: Date;

    @DeletedAt
    DeletedAt: Date;
}

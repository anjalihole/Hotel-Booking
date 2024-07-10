/* eslint-disable linebreak-style */
/* eslint-disable key-spacing */
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
    Length,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { v4 } from 'uuid';
import Hotel from '../hotel/hotel.model';

@Table({
    timestamps: true,
    modelName: 'HotelReview',
    tableName: 'hotel.review',  // Corrected table name
    paranoid: true,
    freezeTableName: true,
})
export default class HotelReview extends Model {
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

    @ForeignKey(() => Hotel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    HotelId: string;

    @BelongsTo(() => Hotel)
    Hotel: Hotel;

    @Column({
        type: DataType.STRING(500),
        allowNull: false,
    })
    ReviewUserId: string;

    @Column({
        type: DataType.STRING(64),
        allowNull: false,
    })
    Rating: string;

    @Length({ max: 128 })
    @Column({
        type: DataType.STRING(128),
        allowNull: false,
    })
    ReviewTitle: string;

    @Column({
        type: DataType.STRING(1000),
        allowNull: false,
    })
    ReviewDescription: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    ReviewTimeStamp: Date;

    @Column
    @CreatedAt
    CreatedAt: Date;

    @UpdatedAt
    UpdatedAt: Date;

    @DeletedAt
    DeletedAt: Date;
}

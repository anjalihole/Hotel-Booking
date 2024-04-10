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
    modelName: 'HotelReview',
    tableName: 'hotel.review',
    paranoid: true,
    freezeTableName: true,
})
// eslint-disable-next-line padded-blocks
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

    @Column({
        type: DataType.STRING(500),
        allowNull: false,
    })
    HotelId: string;

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
        type      : DataType.STRING(128),
        allowNull : false,
    })
    ReviewTitle: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    ReviewDescription: string;

    @Column({
        type      : DataType.DATE,
        allowNull : false,
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


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
    tableName: 'hotelreview',
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

    @Length({ min: 1, max: 64 })
    @Column({
        type: DataType.STRING(64),
        allowNull: false,
    })
    Rating: string;

    @Length({ min: 1, max: 50 })
    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    ReviewTitle: string;

    @Length({ min: 1, max: 100 })
    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    ReviewDescription: string;

    @Length({ min: 1, max: 64 })
    @Column({
        type: DataType.STRING(64),
        allowNull: false,
    })
    ReviewTimeStamp: string;

    @Column
    @CreatedAt
    CreatedAt: Date;

    @UpdatedAt
    UpdatedAt: Date;

    @DeletedAt
    DeletedAt: Date;
}


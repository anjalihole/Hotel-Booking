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
    modelName: 'City',
    tableName: 'city',
    paranoid: true,
    freezeTableName: true,
})
// eslint-disable-next-line padded-blocks
export default class City extends Model {
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
    CountryId: string;

    @Column({
        type: DataType.STRING(64),
        allowNull: false,
    })
    HotelId: string;

    @Length({ min: 1, max: 128 })
    @Column({
        type: DataType.STRING(128),
        allowNull: false,
    })
    CityName: string;

    @Column({
        type: DataType.STRING(64),
        allowNull: false,
    })
   PostalCode: string;

    @Column
    @CreatedAt
    CreatedAt: Date;

    @UpdatedAt
    UpdatedAt: Date;

    @DeletedAt
    DeletedAt: Date;
}


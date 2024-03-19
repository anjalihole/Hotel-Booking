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
    modelName: 'RoomType',
    tableName: 'room.type',
    paranoid: true,
    freezeTableName: true,
})
// eslint-disable-next-line padded-blocks
export default class RoomType extends Model {
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

    @Length({ min: 1, max: 200 })
    @Column({
        type: DataType.STRING(200),
        allowNull: false,
    })
    TypeName: string;

    @Length({ min: 1, max: 200 })
    @Column({
        type: DataType.STRING(200),
        allowNull: false,
    })
   TypeDescription: string;

   @Length({ min: 1, max: 20 })
    @Column({
        type: DataType.STRING(20),
        allowNull: false,
    })
    StandardRate: string;

    @Length({ min: 1, max: 64 })
    @Column({
        type: DataType.STRING(64),
        allowNull: true,
    })
    Options: string;

    @Length({ min: 1, max: 10 })
    @Column({
        type: DataType.STRING(10),
        allowNull: true,
    })
    OccupancyAdult: string;

    @Length({ min: 1, max: 10 })
    @Column({
        type: DataType.STRING(10),
        allowNull: true,
    })
    OccupancyChildren: string;

    @Column
    @CreatedAt
    CreatedAt: Date;

    @UpdatedAt
    UpdatedAt: Date;

    @DeletedAt
    DeletedAt: Date;
}

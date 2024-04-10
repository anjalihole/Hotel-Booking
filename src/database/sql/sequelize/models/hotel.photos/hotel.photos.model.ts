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
//import { Helper } from '../../../../../common/helper';
import FileResource from '../file.resource/file.resource.model';

///////////////////////////////////////////////////////////////////////

@Table({
    timestamps      : true,
    modelName       : 'HotelPhotos',
    tableName       : 'hotel.photos',
    paranoid        : true,
    freezeTableName : true,
})
export default class HotelPhotos extends Model {

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

    @IsUUID(4)
    @ForeignKey(() => FileResource)
    @Column({
        type      : DataType.UUID,
        allowNull : true,
    })
    FileResourceId: string;

    @BelongsTo(() => FileResource)
    FileResource: FileResource;

    @Column({
        type      : DataType.STRING(500),
        allowNull : true,
    })
    HotelId: string;

    @Column({
        type      : DataType.STRING(500),
        allowNull : true,
    })
    RoomTypeId: string;

    @Column
    @CreatedAt
    CreatedAt: Date;

    @UpdatedAt
    UpdatedAt: Date;

    @DeletedAt
    DeletedAt: Date;

}

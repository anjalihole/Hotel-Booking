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
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { v4 } from 'uuid';
import Hotel from '../hotel/hotel.model';
@Table({
    timestamps: true,
    modelName: 'HotelAminities',
    tableName: 'hotel.aminities',  // Corrected table name
    paranoid: true,
    freezeTableName: true,
})
export default class HotelAminities extends Model {
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
    AminityName: string;

    @ForeignKey(() => Hotel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    HotelId: string;

    @BelongsTo(() => Hotel)
    Hotel: Hotel;

    @Column
    @CreatedAt
    CreatedAt: Date;

    @UpdatedAt
    UpdatedAt: Date;

    @DeletedAt
    DeletedAt: Date;
}

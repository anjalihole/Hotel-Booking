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
    modelName: 'Role',
    tableName: 'role',
    paranoid: true,
    freezeTableName: true,
})
// eslint-disable-next-line padded-blocks
export default class Role extends Model {
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

    @Length({ min: 1, max: 64 })
    @Column({
        type: DataType.STRING(64),
        allowNull: false,
    })
    RoleName: string;

    @Length({ min: 1, max: 100 })
    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    Description: string;

    @Column
    @CreatedAt
    CreatedAt: Date;

    @UpdatedAt
    UpdatedAt: Date;

    @DeletedAt
    DeletedAt: Date;
}


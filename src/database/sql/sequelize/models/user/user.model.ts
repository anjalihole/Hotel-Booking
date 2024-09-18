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
    IsEmail,
    BeforeCreate,
    BeforeUpdate,
} from 'sequelize-typescript';

import { v4 } from 'uuid';
import * as bcrypt from 'bcrypt';

///////////////////////////////////////////////////////////////////////

@Table({
    timestamps: true,
    modelName: 'User',
    tableName: 'user',
    paranoid: true,
    freezeTableName: true,
})
// eslint-disable-next-line padded-blocks
export default class User extends Model {
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
    FirstName: string;

    @Length({ min: 1, max: 64 })
    @Column({
        type: DataType.STRING(64),
        allowNull: false,
    })
    LastName: string;

    @Length({ min: 10, max: 16 })
    @Column({
        type: DataType.STRING(16),
        allowNull: true,
    })
    Phone: string;

    @Length({ min: 3, max: 128 })
    @IsEmail
    @Column({
        type: DataType.STRING(128),
        allowNull: true,
    })
    Email: string;

    @Length({ min: 8 }) // Ensures password has a minimum length
    @Column({
        type: DataType.STRING(256), // Increased length for hashed password
        allowNull: false,
    })
    Password: string;

    @Column
    @CreatedAt
    CreatedAt: Date;

    @UpdatedAt
    UpdatedAt: Date;

    @DeletedAt
    DeletedAt: Date;

    // @BeforeCreate
    // @BeforeUpdate
    // static async hashPassword(user: User) {
    //     if (user.changed('Password')) {
    //         const salt = await bcrypt.genSalt(10);
    //         user.Password = await bcrypt.hash(user.Password, salt);
    //     }
    // }
}

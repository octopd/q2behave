import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface UserAttributes {
    UserID?: number
    FirstName?: string
    LastName?: string
    Email: string
    EncryptedPassword?: string
    UserRole?: string
    LastLogin?: Date
    PasswordKey?: string
    PasswordDate?: Date
}

export interface UserInput extends Optional<UserAttributes, 'FirstName' | 'LastName' | 'Email' | 'EncryptedPassword'> { }
export interface UserOutput extends Required<UserAttributes> { }


class Users extends Model<UserAttributes, UserInput> implements UserAttributes {
    public UserID!: number
    public FirstName!: string
    public LastName!: string
    public Email!: string
    public EncryptedPassword!: string
    public UserRole!: string
    public LastLogin!: Date
    public PasswordKey!: string
    public PasswordDate!: Date

    // TODO: timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Users.init({
    UserID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    FirstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    LastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    EncryptedPassword: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    PasswordKey: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    UserRole: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    LastLogin: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    PasswordDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    timestamps: false,
    sequelize: sequelizeConnection,
    paranoid: true
})

export default Users

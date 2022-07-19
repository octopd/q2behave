import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface DeviceAttributes {
    DeviceID: number
    DeviceName: string
    DeployedLocation: string
}

export interface DeviceInput extends Optional<DeviceAttributes, 'DeviceName'> { }
export interface DeviceOutput extends Required<DeviceAttributes> { }


class Devices extends Model<DeviceAttributes, DeviceInput> implements DeviceAttributes {
    public DeviceID!: number
    public DeviceName!: string
    public DeployedLocation!: string
}

Devices.init({
    DeviceID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    DeviceName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    DeployedLocation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
    sequelize: sequelizeConnection,
    paranoid: true
})

export default Devices

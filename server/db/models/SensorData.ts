import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface SensorDataAttributes {
    id: number
    UTCTics: number
    DeviceID: string
    Accel_X: number
    Accel_Y: number
    Accel_Z: number
    Gyro_X: number
    Gyro_Y: number
    Gyro_Z: number
    Magno_X: number
    Magno_Y: number
    Magno_Z: number
    HeartRate: number
    AudioLevel: number
}

export interface SensorDataInput extends Optional<SensorDataAttributes, 'id'> { }
export interface SensorDataOutput extends Required<SensorDataAttributes> { }

class SensorData extends Model<SensorDataAttributes, SensorDataInput> implements SensorDataAttributes {
    public id!: number
    public UTCTics!: number
    public DeviceID!: string
    public Accel_X!: number
    public Accel_Y!: number
    public Accel_Z!: number
    public Gyro_X!: number
    public Gyro_Y!: number
    public Gyro_Z!: number
    public Magno_X!: number
    public Magno_Y!: number
    public Magno_Z!: number
    public HeartRate!: number
    public AudioLevel!: number
}

SensorData.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    UTCTics: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    DeviceID: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Accel_X: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    Accel_Y: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    Accel_Z: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    Gyro_X: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    Gyro_Y: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    Gyro_Z: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    Magno_X: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    Magno_Y: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    Magno_Z: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    AudioLevel: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    HeartRate: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
}, {
    timestamps: false,
    sequelize: sequelizeConnection,
    paranoid: true
})

export default SensorData

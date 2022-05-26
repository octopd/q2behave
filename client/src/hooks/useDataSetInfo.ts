import { RootStateOrAny, useSelector } from 'react-redux';
import { SensorParent } from '../actions/dataActions';

export const useDataSetInfo = (dataSet: string) => {
    const { sensors } = useSelector((state: RootStateOrAny) => state.sensors)

    const split = dataSet.split("-")
    const sensorIndex = Number(split[1].slice(-1))
    const sensorRowKey = Number(split[2].slice(-1))
    const sensor = sensors.find((x: SensorParent) => sensorRowKey === x.rowKey).sensors[sensorIndex - 1]

    return sensor;
}
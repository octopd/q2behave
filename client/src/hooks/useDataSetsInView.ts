import { RootStateOrAny, useSelector } from 'react-redux';
import { SensorParent } from '../actions/dataActions';

export const useDataSetsInView = () => {
    const { sensors } = useSelector((state: RootStateOrAny) => state.sensors)
    const { dataSets } = useSelector((state: RootStateOrAny) => state.data)
    const { filteredDataTypes } = useSelector((state: RootStateOrAny) => state.dataTypes)
    const { filteredDataSources } = useSelector((state: RootStateOrAny) => state.dataSources)

    const dataSetsInView = dataSets && sensors && dataSets.filter((dataSet: string) => {
        const split = dataSet.split("-")
        const sensorIndex = Number(split[1].slice(-1))
        const sensorRowKey = Number(split[2].slice(-1))

        const sensor = sensors.find((x: SensorParent) => sensorRowKey === x.rowKey).sensors[sensorIndex - 1]

        return filteredDataTypes.includes(sensor.name) && filteredDataSources.includes(dataSet)
    })

    return dataSetsInView;
}
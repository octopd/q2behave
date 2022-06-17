import { RootStateOrAny, useSelector } from 'react-redux';
import { DataSet } from '../actions/dataActions';
import { DataType } from '../components/DataControls/DataTypeSelector';

export const useDataSetsInView = () => {
    const { data } = useSelector((state: RootStateOrAny) => state.data)
    const { filteredDataTypes } = useSelector((state: RootStateOrAny) => state.dataTypes)
    const { filteredDataSources } = useSelector((state: RootStateOrAny) => state.dataSources)

    const dataSetsInView = data && data.filter((dataSet: DataSet) => {
        const dataSourceInView = filteredDataSources.includes(dataSet.deviceID)
        const dataTypeInView = filteredDataTypes.some((x: DataType) => x.key === dataSet.name)

        return dataSourceInView && dataTypeInView
    })

    return dataSetsInView;
}

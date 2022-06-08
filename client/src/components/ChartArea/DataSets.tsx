import { RootStateOrAny, useSelector } from 'react-redux'
import styled from 'styled-components'
import DataSet from './DataSet'
import { assignColor } from '../../helpers/colorHelpers'
import { DataType, dataTypesList } from '../DataControls/DataTypeSelector'

const Label = styled.div`
  font-size: 18px;
  margin: 24px 0;
`

const DataSets = () => {
  const { dataSets } = useSelector((state: RootStateOrAny) => state.data)
  // const dataSetsInView = useDataSetsInView()

  return (
    <>
      <Label>Data Sets</Label>

      {dataSets &&
        dataSets.map((dataSet: string, index: number) => (
          <div key={index}>
            <h4>{dataSet}</h4>

            {dataTypesList.map((x: DataType) => (
              <DataSet
                key={`${x.key}${index}`}
                name={x.name}
                color={assignColor(index)}
              />
            ))}
          </div>
        ))}
    </>
  )
}

export default DataSets

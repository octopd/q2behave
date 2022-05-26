import { RootStateOrAny, useSelector } from 'react-redux'
import styled from 'styled-components'
import DataSet from './DataSet'
import { useDataSetsInView } from '../../hooks/useDataSetsInView'
import { assignColor } from '../../helpers/colorHelpers'

const Label = styled.div`
  font-size: 18px;
  margin: 24px 0;
`

const DataSets = () => {
  const { dataSets } = useSelector((state: RootStateOrAny) => state.data)
  const dataSetsInView = useDataSetsInView()

  return (
    <>
      <Label>Data Sets</Label>

      {dataSets &&
        dataSetsInView &&
        dataSets.map(
          (dataSet: string, index: number) =>
            dataSetsInView.includes(dataSet) && (
              <DataSet key={index} name={dataSet} color={assignColor(index)} />
            )
        )}
    </>
  )
}

export default DataSets

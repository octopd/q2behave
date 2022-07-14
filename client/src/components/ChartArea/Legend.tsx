import { RootStateOrAny, useSelector } from 'react-redux'
import styled from 'styled-components'
import LegendItem from './LegendItem'
import { DataSet } from '../../actions/dataActions'
import { useDataSetsInView } from '../../hooks/useDataSetsInView'

const Label = styled.div`
  font-size: 18px;
  margin: 24px 0;
`

const ScrollableList = styled.div`
  overflow-y: scroll;
  max-height: calc(100% - 52px);
`

const Legend = () => {
  const { filteredDataSources } = useSelector(
    (state: RootStateOrAny) => state.dataSources
  )

  const dataSetsInView = useDataSetsInView()

  return (
    <>
      <Label>Data Sets</Label>

      <ScrollableList>
        {filteredDataSources.map((device: string, index: number) => (
          <div key={index}>
            <h4>{device}</h4>
            {dataSetsInView
              .filter((x: DataSet) => x.deviceID === device)
              .map((x: DataSet) => (
                <LegendItem key={x.name} dataSet={x} />
              ))}
          </div>
        ))}
      </ScrollableList>
    </>
  )
}

export default Legend
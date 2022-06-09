import { RootStateOrAny, useSelector } from 'react-redux'
import styled from 'styled-components'
import LegendItem from './LegendItem'
import { DataSet } from '../../actions/dataActions'
// import { DataType, dataTypesList } from '../DataControls/DataTypeSelector'

const Label = styled.div`
  font-size: 18px;
  margin: 24px 0;
`

const ScrollableList = styled.div`
  overflow-y: scroll;
  max-height: calc(100% - 52px);
`

const Legend = () => {
  const { data } = useSelector((state: RootStateOrAny) => state.data)
  const { devices } = useSelector((state: RootStateOrAny) => state.devices)

  return (
    <>
      <Label>Data Sets</Label>

      <ScrollableList>
        {devices.map((device: string, index: number) => (
          <div key={index}>
            <h4>{device}</h4>
            {data
              .filter((x: DataSet) => x.deviceId === device)
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

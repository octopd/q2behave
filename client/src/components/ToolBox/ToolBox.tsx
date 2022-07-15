import styled from '@emotion/styled'
import { Button } from '@mui/material'
import dayjs from 'dayjs'
import { useContext, useState } from 'react'
import { CSVLink } from 'react-csv'
import { RootStateOrAny, useSelector } from 'react-redux'
import { DataPoint, DataSet } from '../../modules/data'
import { Context } from '../../providers/ContextProvider'
import ChartTypeSelector from './ChartTypeSelector'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`

interface LUProps {
  isDarkTheme: boolean
}

const LastUpdated = styled.p<LUProps>`
  color: ${(props) =>
    props.isDarkTheme ? 'var(--color-primary-dark)' : 'var(--color-primary)'};
  font-size: 14px;
`

const Toolbox = () => {
  const [data, setData] = useState<any>([])
  const { isDarkTheme } = useContext(Context)
  const { loading, data: sourceData } = useSelector(
    (state: RootStateOrAny) => state.data
  )

  const lastUpdated = loading ? false : dayjs(new Date()).format('h:mm:ss a')

  const handleCSVClick = () => {
    const formatted = sourceData
      .map((dataSet: DataSet) => {
        return dataSet.dataPoints.map((dataPoint: DataPoint) => {
          const row = {
            timestamp: dayjs(dataPoint.x).subtract(4, 'hour'),
            name: dataSet.name,
            watchID: dataSet.deviceID,
            value: dataPoint.y,
          }
          return row
        })
      })
      .flat()

    setData(formatted)
  }

  return (
    <Container>
      <ChartTypeSelector />

      {lastUpdated && data && (
        <LastUpdated isDarkTheme={isDarkTheme}>
          Last updated at {lastUpdated}
        </LastUpdated>
      )}

      <Button color="primary" variant="contained">
        <CSVLink
          data={data ? data : ''}
          onClick={handleCSVClick}
          filename={'q2behave.csv'}
        >
          Download .CSV
        </CSVLink>
      </Button>
    </Container>
  )
}

export default Toolbox

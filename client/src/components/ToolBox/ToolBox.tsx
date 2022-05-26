import styled from '@emotion/styled'
import { Button } from '@mui/material'
import { RootStateOrAny, useSelector } from 'react-redux'
import { CSVLink } from 'react-csv'
import { useContext, useState } from 'react'
import dayjs from 'dayjs'
import ChartTypeSelector from './ChartTypeSelector'
import { Context } from '../../providers/ContextProvider'

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
    // const formatted = sourceData.map((x: any) => {
    //   const values = Object.values(x)[0]

    //   return {
    //     name: Object.keys(x)[1],
    //     timestamp: x.timestamp,
    //     ...(values as {}),
    //   }
    // })

    setData(sourceData)
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
          filename={'octoiq.csv'}
        >
          Download .CSV
        </CSVLink>
      </Button>
    </Container>
  )
}

export default Toolbox

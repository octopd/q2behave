import { Card, CircularProgress } from '@mui/material'
import { useContext } from 'react'
import styled from 'styled-components'
import { Context } from '../../providers/ContextProvider'
import ToolBox from './ZoomControls'
import Chart from './Chart'
import Legend from './Legend'
import { RootStateOrAny, useSelector } from 'react-redux'

interface StyledProps {
  $isDarkTheme: boolean
}

const ChartCard = styled(Card)<StyledProps>`
  background: ${(props) =>
    props.$isDarkTheme ? 'var(--color-lighter-black)' : '#ffffff'};
  height: calc(100vh - 290px);
  margin-top: 20px;
  padding: 16px 24px 30px 24px;
  display: flex;
`

const DataSetsContainer = styled.div`
  width: 300px;
  padding-left: 32px;
  border-left: 1px solid #72777e;
  height: calc(100% - 20px);
`

const LoadingSpinner = styled(CircularProgress)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const NoDataToDisplay = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const ChartArea = () => {
  const { isDarkTheme } = useContext(Context)

  const { loading, data } = useSelector((state: RootStateOrAny) => state.data)

  const noData = Object.keys(data).every(function (key) {
    return data[key].length === 0
  })

  return (
    <ChartCard $isDarkTheme={isDarkTheme}>
      {loading ? (
        <LoadingSpinner />
      ) : noData ? (
        <NoDataToDisplay>
          No results. Please select a new date range.
        </NoDataToDisplay>
      ) : (
        <>
          <div
            style={{
              width: 'calc(100% - 300px)',
              height: 'calc(100% - 40px)',
            }}
          >
            <ToolBox />
            <Chart />
          </div>

          <DataSetsContainer>
            <Legend />
          </DataSetsContainer>
        </>
      )}
    </ChartCard>
  )
}

export default ChartArea

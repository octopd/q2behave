import { Container } from '@mui/material'
import { useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { getData } from '../../modules/data'
import { getDevices } from '../../modules/devices'
import { Context } from '../../providers/ContextProvider'
import ChartArea from '../ChartArea/ChartArea'
import DataControls from '../DataControls/DataControls'
import Header from '../Header/Header'
import Toolbox from '../ToolBox/ToolBox'

const ChartContainer = styled(Container)`
  max-width: 1280px;
  margin: 0 auto;
  padding-top: 32px;
  padding-bottom: 32px;
`

const Layout = () => {
  const dispatch = useDispatch()

  const { setDataIsSet, dataIsSet } = useContext(Context)

  useEffect(() => {
    if (!dataIsSet) {
      dispatch(getDevices())
      dispatch(getData())

      setDataIsSet(true)
    }
  }, [dispatch, dataIsSet, setDataIsSet])

  return (
    <>
      <Header />
      <ChartContainer maxWidth={false}>
        <DataControls />
        <ChartArea />
        <Toolbox />
      </ChartContainer>
    </>
  )
}

export default Layout

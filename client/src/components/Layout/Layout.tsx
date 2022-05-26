import {
  Container,
  createTheme,
  PaletteMode,
  ThemeProvider,
} from '@mui/material'
import { useContext } from 'react'
import styled from 'styled-components'
import { Context } from '../../providers/ContextProvider'
import ChartArea from '../ChartArea/ChartArea'
import DataControls from '../DataControls/DataControls'
import Header from '../Header/Header'
import Toolbox from '../ToolBox/ToolBox'

const light = {
  palette: {
    mode: 'light' as PaletteMode,
    primary: {
      main: '#006397',
    },
    secondary: {
      main: '#fbfcff',
    },
  },
}

const dark = {
  palette: {
    mode: 'dark' as PaletteMode,
    primary: {
      main: '#8fcdff',
    },
    secondary: {
      main: '#505359',
    },
    info: {
      main: '#8b9198',
    },
    success: {
      main: '#cdff8f',
    },
  },
}

interface AppContainerProps {
  isDarkTheme: boolean
}

const AppContainer = styled.div<AppContainerProps>`
  background: ${(props) =>
    props.isDarkTheme ? 'var(--color-black)' : 'var(--color-white)'};
`

const ChartContainer = styled(Container)`
  max-width: 1280px;
  margin: 0 auto;
  padding-top: 32px;
  padding-bottom: 32px;
`

const Layout = () => {
  const { isDarkTheme } = useContext(Context)

  return (
    <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
      <AppContainer isDarkTheme={isDarkTheme}>
        <Header />
        <ChartContainer maxWidth={false}>
          <DataControls />
          <ChartArea />
          <Toolbox />
        </ChartContainer>
      </AppContainer>
    </ThemeProvider>
  )
}

export default Layout

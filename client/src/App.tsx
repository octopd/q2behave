import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
} from '@mui/material'
import { useContext } from 'react'
import { RootStateOrAny, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import Header from './components/Header/Header'
import Layout from './components/Layout/Layout'
import Login from './components/Login/Login'
import ContextProvider, { Context } from './providers/ContextProvider'

import './scss/App.scss'

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
  height: 100vh;
`

function App() {
  const { isDarkTheme } = useContext(Context)
  const { userInfo } = useSelector((state: RootStateOrAny) => state.userLogin)

  return (
    <ContextProvider>
      <CssBaseline />
      <ThemeProvider
        theme={isDarkTheme ? createTheme(dark) : createTheme(light)}
      >
        <AppContainer isDarkTheme={isDarkTheme}>
          <Header />

          <BrowserRouter>
            <Routes>
              <Route path="/" element={userInfo ? <Layout /> : <Login />} />
            </Routes>
          </BrowserRouter>
        </AppContainer>
      </ThemeProvider>
    </ContextProvider>
  )
}

export default App

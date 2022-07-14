import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
} from '@mui/material'
import { useContext } from 'react'
import { RootStateOrAny, useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import CreateAccount from './components/CreateAccount/CreateAccount'
import ForgotPassword from './components/ForgotPassword/ForgotPassword'
import ResetPassword from './components/ForgotPassword/ResetPassword'
import Layout from './components/Layout/Layout'
import Login from './components/Login/Login'
import { UserRoles } from './enum'
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
          <BrowserRouter>
            <Routes>
              <Route path="/" element={userInfo ? <Layout /> : <Login />} />
              <Route
                path="/create-account"
                element={
                  userInfo && userInfo.role !== UserRoles.ADMIN ? (
                    <CreateAccount />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:code" element={<ResetPassword />} />
            </Routes>
          </BrowserRouter>
        </AppContainer>
      </ThemeProvider>
    </ContextProvider>
  )
}

export default App

import styled from '@emotion/styled'
import { AccountCircle, Menu } from '@mui/icons-material'
import { AppBar, Toolbar } from '@mui/material'
import { useContext } from 'react'
import { Context } from '../../providers/ContextProvider'

const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;

  .MuiSvgIcon-root {
    font-size: 30px;
  }
`

const Logo = styled.div`
  font-size: 22px;
`

const Header = () => {
  const { isDarkTheme, setIsDarkTheme } = useContext(Context)

  const changeTheme = () => {
    setIsDarkTheme(!isDarkTheme)
  }

  return (
    <AppBar elevation={0} position="static" color="secondary">
      <StyledToolbar>
        <Menu onClick={changeTheme} />
        <Logo>OCTO IQ</Logo>
        <AccountCircle />
      </StyledToolbar>
    </AppBar>
  )
}

export default Header

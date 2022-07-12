import styled from '@emotion/styled'
import { AccountCircle } from '@mui/icons-material'
import { AppBar, Toolbar } from '@mui/material'

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
  // const { isDarkTheme, setIsDarkTheme } = useContext(Context)

  // const changeTheme = () => {
  //   setIsDarkTheme(!isDarkTheme)
  // }

  return (
    <AppBar elevation={0} position="static" color="secondary">
      <StyledToolbar>
        {/* <Menu onClick={changeTheme}  /> */}
        <Logo>Q2Behave</Logo>
        <AccountCircle />
      </StyledToolbar>
    </AppBar>
  )
}

export default Header

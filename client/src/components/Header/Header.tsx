import styled from '@emotion/styled'
import { AppBar, Toolbar } from '@mui/material'
import { RootStateOrAny, useSelector } from 'react-redux'
import AccountMenu from './AccountMenu'

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
  const { userInfo } = useSelector((state: RootStateOrAny) => state.userLogin)

  // const { isDarkTheme, setIsDarkTheme } = useContext(Context)

  // const changeTheme = () => {
  //   setIsDarkTheme(!isDarkTheme)
  // }

  return (
    <AppBar elevation={0} position="static" color="secondary">
      <StyledToolbar>
        {/* <Menu onClick={changeTheme}  /> */}
        <Logo>Q2Behave</Logo>
        <div className="flex align-center">
          <div className="m-r-6">
            {userInfo && `${userInfo.firstName} ${userInfo.lastName}`}
          </div>
          <AccountMenu />
        </div>
      </StyledToolbar>
    </AppBar>
  )
}

export default Header

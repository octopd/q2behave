import { AccountCircle, ContentCopy } from '@mui/icons-material'
import { Button, Divider } from '@mui/material'
import { FormikProps } from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { USER_CREATE_RESET } from '../../modules/createAccount'
import { NewUserValues } from './CreateAccount'
import CustomCard from './CustomCard'

const CustomPersonIcon = styled(AccountCircle)`
  &.MuiSvgIcon-root {
    background: var(--primary-blue-50);
    color: var(--primary-blue-900);
    border-radius: 50%;
    padding: 20px;
    width: 96px;
    height: 96px;
    display: block;
    margin: 0 auto;
  }
`

interface Props {
  formik: FormikProps<NewUserValues>
}

const AccountCreated = ({ formik }: Props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const copyCredentials = () => {
    navigator.clipboard.writeText(
      `Email: ${formik.values.email}, Password: ${formik.values.password}`
    )
  }

  const handleDone = () => {
    formik.resetForm()
    dispatch({ type: USER_CREATE_RESET })
  }

  const handleHomeClick = () => {
    dispatch({ type: USER_CREATE_RESET })
    navigate('/')
  }

  return (
    <CustomCard>
      <>
        <h2>Account created!</h2>

        <CustomPersonIcon />

        <p>
          Account has been successfully created. You can copy and share the new
          credentials using the button below.
        </p>

        <Divider />

        <div style={{ textAlign: 'center' }}>
          <Button
            onClick={copyCredentials}
            startIcon={<ContentCopy />}
            variant="outlined"
            sx={{ pl: 1.5, pr: 2 }}
            style={{ borderRadius: 4, margin: '0 auto' }}
          >
            Copy Credentials to Clipboard
          </Button>
        </div>

        <Divider />

        <div className="flex space-between">
          <Button
            onClick={handleHomeClick}
            variant="outlined"
            sx={{ pl: 3, pr: 3 }}
          >
            Home
          </Button>
          <Button
            onClick={handleDone}
            variant="contained"
            sx={{ pl: 3, pr: 3 }}
          >
            Add Another
          </Button>
        </div>
      </>
    </CustomCard>
  )
}

export default AccountCreated

import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Button,
  Card,
  Divider,
  Grid,
  InputAdornment,
  Link,
} from '@mui/material'
import { Formik, FormikErrors } from 'formik'
import { useState } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { login } from '../../modules/userInfo'
import TextInput from '../Form/TextInput'

export interface LoginValues {
  userName: string
  password: string
}

const CustomCard = styled(Card)`
  max-width: 500px;
  padding: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  h2 {
    font-weight: 600;
    font-size: 20px;
    margin: 8px 0 16px 0;
  }

  hr {
    margin: 32px -24px;
  }
`

const Login = () => {
  const dispatch = useDispatch()

  const [passwordVisible, setPasswordVisible] = useState(false)

  const { loading, error } = useSelector(
    (state: RootStateOrAny) => state.userLogin
  )

  const handleSubmit = (values: LoginValues) => {
    dispatch(login(values.userName, values.password))
  }

  return (
    <Formik
      validateOnChange={false}
      initialValues={{
        userName: '',
        password: '',
      }}
      validate={(values: LoginValues) => {
        let errors: FormikErrors<LoginValues> = {}

        if (!values.userName) {
          errors.userName = 'This is a required field'
        }
        if (!values.password) {
          errors.password = 'This is a required field'
        }

        return errors
      }}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <CustomCard className="center-center">
          <form onSubmit={props.handleSubmit}>
            <h2>Welcome, back!</h2>

            <p>
              For detailed support, contact{' '}
              <Link
                href="mailto:info@octopd.com"
                underline="none"
                target="_blank"
              >
                <strong>info@octopd.com.</strong>
              </Link>
            </p>

            <Divider />

            <Grid container>
              <Grid item xs={12} className="p-b-32">
                <TextInput
                  fullWidth
                  name="Username"
                  label="userName"
                  value={props.values.userName}
                  onChange={props.handleChange}
                  error={error || !!props.errors.userName}
                  helperText={props.errors.userName}
                />
              </Grid>

              <Grid item xs={12} className="p-b-32">
                <TextInput
                  fullWidth
                  type={passwordVisible ? 'text' : 'password'}
                  label="Password"
                  name="password"
                  value={props.values.password}
                  onChange={props.handleChange}
                  error={error || !!props.errors.password}
                  helperText={error ? error : props.errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                      >
                        {passwordVisible ? <Visibility /> : <VisibilityOff />}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <Divider style={{ marginBottom: 24 }} />

            <div className="flex flex-end">
              <Button
                variant="contained"
                type="submit"
                disabled={loading}
                disableElevation
              >
                Sign In
              </Button>
            </div>
          </form>
        </CustomCard>
      )}
    </Formik>
  )
}

export default Login

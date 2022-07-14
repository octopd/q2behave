import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, Divider, Grid, InputAdornment } from '@mui/material'
import { Formik, FormikErrors } from 'formik'
import { useEffect, useState } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { passwordIsNotValid } from '../../helpers/passwordValidator'
import { useBoolean } from '../../hooks/useBoolean'
import {
  resetUserPassword,
  USER_RESET_PASSWORD_RESET,
} from '../../modules/resetPassword'
import CustomCard from '../CreateAccount/CustomCard'
import TextInput from '../Form/TextInput'
import Header from '../Header/Header'

export interface PasswordResetValues {
  password: string
  confirmPassword: string
}

const ResetPassword = ({ match }: any) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { code } = useParams()

  const [password, { toggle: togglePassword }] = useBoolean()
  const [confirmPassword, { toggle: toggleConfirmPassword }] = useBoolean()

  const [resetSuccess, setResetSuccess] = useState(false)

  const { loading, error, success } = useSelector(
    (state: RootStateOrAny) => state.resetUserPassword
  )

  console.log(error)

  useEffect(() => {
    if (success) {
      setResetSuccess(true)
      dispatch({ type: USER_RESET_PASSWORD_RESET })
    }
  }, [dispatch, success])

  const handleSubmit = (values: PasswordResetValues) => {
    dispatch(resetUserPassword(values.password, code))
  }

  const handleLoginClick = () => {
    navigate('/')
  }

  return (
    <>
      <Header />
      <Formik
        validateOnChange={false}
        initialValues={{
          password: '',
          confirmPassword: '',
        }}
        validate={(values: PasswordResetValues) => {
          let errors: FormikErrors<PasswordResetValues> = {}

          if (!values.password) {
            errors.password = 'This is a required field'
          }
          if (!values.confirmPassword) {
            errors.confirmPassword = 'This is a required field'
          } else if (values.confirmPassword !== values.password) {
            errors.password = 'Passwords do not match'
            errors.confirmPassword = 'Passwords do not match'
          } else if (passwordIsNotValid(values.password)) {
            errors.password = passwordIsNotValid(values.password)
          }

          return errors
        }}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <CustomCard>
            <form onSubmit={props.handleSubmit}>
              <h2>Reset Password</h2>

              {resetSuccess ? (
                <>
                  <p>Password reset successful. Click below to login.</p>
                  <Divider />
                  <div className="flex flex-end">
                    <Button
                      onClick={handleLoginClick}
                      variant="contained"
                      sx={{ pl: 3, pr: 3 }}
                    >
                      Login
                    </Button>
                  </div>{' '}
                </>
              ) : (
                <>
                  <p>Enter your new password.</p>

                  <Divider />
                  <Grid container>
                    <Grid item xs={12} className="p-b-32">
                      <TextInput
                        fullWidth
                        type={password ? 'text' : 'password'}
                        label="Password"
                        name="password"
                        value={props.values.password}
                        onChange={props.handleChange}
                        error={error ? error : !!props.errors.password}
                        helperText={props.errors.password}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              onClick={() => togglePassword()}
                            >
                              {password ? <Visibility /> : <VisibilityOff />}
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} className="p-b-32">
                      <TextInput
                        fullWidth
                        type={confirmPassword ? 'text' : 'password'}
                        label="Confirm password"
                        name="confirmPassword"
                        value={props.values.confirmPassword}
                        onChange={props.handleChange}
                        error={error ? error : !!props.errors.confirmPassword}
                        helperText={
                          error ? error : props.errors.confirmPassword
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              onClick={() => toggleConfirmPassword()}
                            >
                              {confirmPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Divider />

                  <div className="flex flex-end">
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={loading || !props.values.password}
                      sx={{ pl: 3, pr: 3 }}
                    >
                      Send
                    </Button>
                  </div>
                </>
              )}
            </form>
          </CustomCard>
        )}
      </Formik>
    </>
  )
}

export default ResetPassword

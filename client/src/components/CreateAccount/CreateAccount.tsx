import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  InputAdornment,
} from '@mui/material'
import { Formik, FormikErrors } from 'formik'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { emailValidator } from '../../helpers/emailValidator'
import { useBoolean } from '../../hooks/useBoolean'
import { createAccount } from '../../modules/createAccount'
import TextInput from '../Form/TextInput'
import Header from '../Header/Header'
import AccountCreated from './AccountCreated'
import CustomCard from './CustomCard'

export interface NewUserValues {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  admin: false
}

const passwordIsNotValid = (password: string) => {
  const hasSpecialCharacters = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/
  const hasLowercase = /^(?=.*[a-z])/
  const hasUppercase = /^(?=.*[A-Z])/
  const hasNumber = /\d/

  let error = ''

  if (!hasLowercase.test(password)) {
    error = 'Password must contain at least one lowercase letter'
  }
  if (!hasUppercase.test(password)) {
    error = 'Password must contain at least one uppercase letter'
  }
  if (!hasSpecialCharacters.test(password)) {
    error = 'Must contain at least one special character'
  }
  if (!hasNumber.test(password)) {
    error = 'Must contain at least one number'
  }
  if (password.length < 8) {
    error = 'Password must be at least 8 characters long'
  }

  return error
}

const CreateAccount = () => {
  const dispatch = useDispatch()

  const { loading, error, success } = useSelector(
    (state: RootStateOrAny) => state.userCreate
  )

  const [password, { toggle: togglePassword }] = useBoolean()
  const [confirmPassword, { toggle: toggleConfirmPassword }] = useBoolean()

  const handleSubmit = (values: NewUserValues) => {
    dispatch(createAccount(values))
  }

  return (
    <>
      <Header />
      <Formik
        validateOnChange={false}
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          admin: false,
        }}
        validate={(values: NewUserValues) => {
          let errors: FormikErrors<NewUserValues> = {}

          if (!emailValidator(values.email)) {
            errors.email = 'Please enter a valid email'
          }
          if (!values.email) {
            errors.email = 'This is a required field'
          }
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
        {(props) =>
          success ? (
            <AccountCreated formik={props} />
          ) : (
            <CustomCard>
              <form onSubmit={props.handleSubmit}>
                <h2>Create an account</h2>

                <Divider />

                <Grid container>
                  <Grid item xs={12} className="p-b-16">
                    <TextInput
                      fullWidth
                      name="firstName"
                      label="First Name"
                      value={props.values.firstName}
                      onChange={props.handleChange}
                      error={!!props.errors.firstName}
                      helperText={props.errors.firstName}
                    />
                  </Grid>

                  <Grid item xs={12} className="p-b-16">
                    <TextInput
                      fullWidth
                      name="lastName"
                      label="Last Name"
                      value={props.values.lastName}
                      onChange={props.handleChange}
                      error={!!props.errors.lastName}
                      helperText={props.errors.lastName}
                    />
                  </Grid>
                  <Grid item xs={12} className="p-b-16">
                    <TextInput
                      fullWidth
                      name="email"
                      label="Email"
                      value={props.values.email}
                      onChange={props.handleChange}
                      error={error || !!props.errors.email}
                      helperText={error ? error : props.errors.email}
                    />
                  </Grid>

                  <Grid item xs={12} className="p-b-16">
                    <TextInput
                      fullWidth
                      type={password ? 'text' : 'password'}
                      label="Password"
                      name="password"
                      value={props.values.password}
                      onChange={props.handleChange}
                      error={!!props.errors.password}
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

                  <Grid item xs={12} className="p-b-16">
                    <TextInput
                      fullWidth
                      type={confirmPassword ? 'text' : 'password'}
                      label="Confirm password"
                      name="confirmPassword"
                      value={props.values.confirmPassword}
                      onChange={props.handleChange}
                      error={!!props.errors.confirmPassword}
                      helperText={props.errors.confirmPassword}
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

                  <FormControlLabel
                    control={<Checkbox checked={props.values.admin} />}
                    label="Admin User"
                    name="admin"
                    onChange={props.handleChange}
                  />
                </Grid>

                <Divider />

                <div className="flex flex-end">
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={
                      loading ||
                      !props.values.firstName ||
                      !props.values.lastName ||
                      !props.values.email ||
                      !props.values.password ||
                      !props.values.confirmPassword
                    }
                    sx={{ pl: 3, pr: 3 }}
                  >
                    Create
                  </Button>
                </div>
              </form>
            </CustomCard>
          )
        }
      </Formik>
    </>
  )
}

export default CreateAccount

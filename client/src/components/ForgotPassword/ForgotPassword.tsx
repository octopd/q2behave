import { Button, Divider, Grid } from '@mui/material'
import { Formik, FormikErrors } from 'formik'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { sendResetPasswordLink } from '../../modules/resetPassword'
import CustomCard from '../CreateAccount/CustomCard'
import TextInput from '../Form/TextInput'
import Header from '../Header/Header'

export interface RestPasswordValues {
  email: string
}

const ForgotPassword = () => {
  const dispatch = useDispatch()

  const { loading, error, success } = useSelector(
    (state: RootStateOrAny) => state.resetPasswordLink
  )

  const handleSubmit = (values: RestPasswordValues) => {
    dispatch(sendResetPasswordLink(values.email))
  }

  return (
    <>
      <Header />
      <Formik
        validateOnChange={false}
        initialValues={{
          email: '',
        }}
        validate={(values: RestPasswordValues) => {
          let errors: FormikErrors<RestPasswordValues> = {}

          if (!values.email) {
            errors.email = 'This is a required field'
          }

          return errors
        }}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <CustomCard>
            <form onSubmit={props.handleSubmit}>
              <h2>Reset Password</h2>

              <p>Enter your email to receive a reset password link.</p>

              <Divider />

              <Grid container>
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
              </Grid>

              <Divider />

              {success && <p>Email sent.</p>}

              <div className="flex flex-end">
                <Button
                  variant="contained"
                  type="submit"
                  disabled={loading || !props.values.email || success}
                  sx={{ pl: 3, pr: 3 }}
                >
                  Send
                </Button>
              </div>
            </form>
          </CustomCard>
        )}
      </Formik>
    </>
  )
}

export default ForgotPassword

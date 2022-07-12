import { TextField } from '@mui/material'
import styled from 'styled-components'

const CustomInput = styled(TextField)``

const TextInput = ({ ...restProps }) => {
  return <CustomInput color="primary" {...restProps} />
}

export default TextInput

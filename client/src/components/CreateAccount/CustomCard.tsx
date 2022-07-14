import { Card } from '@mui/material'
import { ReactChild } from 'react'
import styled from 'styled-components'

const StyledCard = styled(Card)`
  position: absolute;
  left: 50%;
  top: 50%;
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

interface Props {
  children: ReactChild
}

const CustomCard = ({ children, ...restProps }: Props) => {
  return (
    <StyledCard
      elevation={8}
      sx={{ p: 3, borderRadius: 4, maxWidth: 500, minWidth: 500 }}
      {...restProps}
    >
      {children}
    </StyledCard>
  )
}

export default CustomCard

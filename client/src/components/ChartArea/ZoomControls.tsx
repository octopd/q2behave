import styled from '@emotion/styled'
import { Crop, Refresh } from '@mui/icons-material'
import { Button } from '@mui/material'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { ZOOM_ENABLE, ZOOM_RESET } from '../../constants/dataConstants'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 54px 0px 0;
`

const ZoomControls = () => {
  const dispatch = useDispatch()

  const { enabled } = useSelector((state: RootStateOrAny) => state.zoom)

  const handleEnableZoom = () => {
    dispatch({ type: ZOOM_ENABLE, payload: !enabled })
  }

  const handleResetZoom = () => {
    dispatch({ type: ZOOM_RESET, payload: true })
  }

  return (
    <Container>
      <div>
        <Button
          color={enabled ? 'success' : 'primary'}
          startIcon={<Crop />}
          onClick={handleEnableZoom}
        >
          Zoom
        </Button>
        <Button
          startIcon={<Refresh />}
          onClick={handleResetZoom}
          disabled={!enabled}
        >
          Reset
        </Button>
      </div>
    </Container>
  )
}

export default ZoomControls

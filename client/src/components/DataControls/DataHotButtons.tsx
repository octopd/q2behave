import { DateRange } from '@mui/lab'
import { Button } from '@mui/material'
import { useContext } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { HotButtonValues } from '../../enum'
import { DATE_RANGE_UPDATE, HOT_BUTTON_SELECTION } from '../../modules/dateRange'
import { Context } from '../../providers/ContextProvider'

interface Props {
  handleClose: () => void
}

const Buttons = styled.div`
  padding: 16px;

  button {
    padding: 4px 12px 2px 12px;
    border-radius: 6px;
    margin-bottom: 8px;
    display: block;
  }

  &.dark {
    background-color: #242a30 !important;
  }

  &.light {
    background-color: rgba(0, 0, 0, 0.6);
  }
`

const DataHotButtons = ({ handleClose }: Props) => {
  const dispatch = useDispatch()

  const { setDataIsSet, setDate, isDarkTheme } = useContext(Context)

  const { selection: selectedButton } = useSelector(
    (state: RootStateOrAny) => state.hotButton
  )

  const handleButtonClick = (selection: HotButtonValues) => {
    let hours: number = 0

    switch (selection) {
      case HotButtonValues.HOUR:
        hours = 1
        break
      case HotButtonValues.THREE_HOURS:
        hours = 3
        break
      case HotButtonValues.SIX_HOURS:
        hours = 6
        break
      case HotButtonValues.DAY:
        hours = 24
        break
      default:
        break
    }

    const newRange: DateRange<Date> = [
      new Date(new Date().setHours(new Date().getHours() - hours)),
      new Date(),
    ]

    dispatch({ type: DATE_RANGE_UPDATE, payload: newRange })
    dispatch({ type: HOT_BUTTON_SELECTION, payload: selection })

    setDate(newRange)
    setDataIsSet(false)

    handleClose()
  }

  return (
    <Buttons className={isDarkTheme ? 'dark' : 'light'}>
      <Button
        color={selectedButton === HotButtonValues.DAY ? 'secondary' : 'info'}
        variant={
          selectedButton === HotButtonValues.DAY ? 'contained' : 'outlined'
        }
        size="small"
        onClick={() => handleButtonClick(HotButtonValues.DAY)}
      >
        {HotButtonValues.DAY}
      </Button>
      <Button
        color={
          selectedButton === HotButtonValues.SIX_HOURS ? 'secondary' : 'info'
        }
        variant={
          selectedButton === HotButtonValues.SIX_HOURS
            ? 'contained'
            : 'outlined'
        }
        size="small"
        onClick={() => handleButtonClick(HotButtonValues.SIX_HOURS)}
      >
        {HotButtonValues.SIX_HOURS}
      </Button>
      <Button
        color={
          selectedButton === HotButtonValues.THREE_HOURS ? 'secondary' : 'info'
        }
        variant={
          selectedButton === HotButtonValues.THREE_HOURS
            ? 'contained'
            : 'outlined'
        }
        size="small"
        onClick={() => handleButtonClick(HotButtonValues.THREE_HOURS)}
      >
        {HotButtonValues.THREE_HOURS}
      </Button>
      <Button
        color={selectedButton === HotButtonValues.HOUR ? 'secondary' : 'info'}
        variant={
          selectedButton === HotButtonValues.HOUR ? 'contained' : 'outlined'
        }
        size="small"
        onClick={() => handleButtonClick(HotButtonValues.HOUR)}
      >
        {HotButtonValues.HOUR}
      </Button>
    </Buttons>
  )
}

export default DataHotButtons

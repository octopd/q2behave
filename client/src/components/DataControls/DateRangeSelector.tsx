import { useContext, useEffect, useRef, useState } from 'react'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DateRange, StaticDateRangePicker, TimePicker } from '@mui/lab'
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Popover,
  Select,
} from '@mui/material'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import {
  DATE_RANGE_UPDATE,
  HOT_BUTTON_RESET,
} from '../../constants/dataConstants'
import styled from '@emotion/styled'
import { DateRangeOutlined } from '@mui/icons-material'
import dayjs from 'dayjs'
import { Context } from '../../providers/ContextProvider'
import DataHotButtons from './DataHotButtons'

interface StyledProps {
  $isDarkTheme: boolean
}

interface TimeInputProps {
  error: boolean
}

const DateRangeContainer = styled.div<StyledProps>`
  .Mui-disabled {
    color: ${(props) =>
      props.$isDarkTheme ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)'};
    -webkit-text-fill-color: ${(props) =>
      props.$isDarkTheme ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)'};
  }
`

const DateRangePopover = styled(Popover)`
  &.dark {
    .MuiPickerStaticWrapper-root,
    .MuiContainer-root {
      background-color: #242a30 !important;
    }
  }

  &.light {
    .MuiPickerStaticWrapper-root,
    .MuiContainer-root {
      background-color: rgba(0, 0, 0, 0.6) !important;
    }
  }

  .MuiPickerStaticWrapper-root {
    max-height: 340px;
  }
`

const PopoverTrigger = styled.div<{ active: boolean }>`
  display: flex;
  align-items: align-center;
  cursor: pointer;

  * {
    cursor: pointer;
  }

  label {
    color: ${(props) =>
      props.active
        ? 'var(--color-primary-dark) !important'
        : 'rgba(255, 255, 255, 0.7)'};
    -webkit-text-fill-color: ${(props) =>
      props.active
        ? 'var(--color-primary-dark) !important'
        : 'rgba(255, 255, 255, 0.7)'};
  }

  fieldset {
    border-color: ${(props) =>
      props.active
        ? 'var(--color-primary-dark) !important'
        : 'rgba(255, 255, 255, 0.7)'};
  }
`

const TimePickerWrapper = styled.div<TimeInputProps>`
  fieldset {
    border-color: ${(props) =>
      props.error
        ? '#f44336 !important'
        : 'var(--color-primary-dark) !important'};
  }
`

const DateRangeSelector = () => {
  const dispatch = useDispatch()

  const nowDate = new Date()

  const { dateRange } = useSelector((state: RootStateOrAny) => state.dateRange)

  const { setDataIsSet, date, setDate, isDarkTheme } = useContext(Context)

  const [start, setStart] = useState<Date>(
    new Date(new Date(nowDate).setHours(nowDate.getHours() - 1))
  )
  const [startError, setStartError] = useState(false)
  const [startAmPm, setStartAmPm] = useState('AM')
  const [end, setEnd] = useState<Date>(new Date())
  const [endError, setEndError] = useState(false)
  const [endAmPm, setEndAmPm] = useState('AM')

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)
  const divRef = useRef<HTMLDivElement | null>(null)

  const open = Boolean(anchorEl)
  const startH = start.getHours()
  const startM = start.getMinutes()
  const endH = end.getHours()
  const endM = end.getMinutes()
  const newStartDate = date[0]
  const newEndDate = date[1]
  const timeIsValid =
    newStartDate && start.getTime() && newEndDate && end.getTime()

  // When the date range changes...
  // TODO: add comments
  useEffect(() => {
    if (date[0] && date[1]) {
      const newStartHours = date[0].getHours()
      const newEndHours = date[1].getHours()
      const isZeroOClock = newStartHours === 0 && newEndHours === 0

      if (isZeroOClock) {
        setStart(new Date(date[0].setHours(date[0].getHours() + 12)))
        setEnd(new Date(date[1].setHours(11, 59, 59, 0)))
        setStartAmPm('AM')
        setEndAmPm('PM')
      } else {
        setStartAmPm(date[0].getHours() < 12 ? 'AM' : 'PM')
        setEndAmPm(date[1].getHours() < 12 ? 'AM' : 'PM')
      }
    }
  }, [date])

  const handleChange = (newValue: DateRange<Date>) => {
    if (newValue[0] && newValue[1]) {
      setDate([newValue[0], newValue[1]])
    }
  }

  const handleApply = () => {
    if (timeIsValid) {
      const startOffset = startAmPm === 'PM' && startH < 12 ? 12 : 0
      const endOffset = endAmPm === 'PM' && endH < 12 ? 12 : 0
      const first = new Date(
        newStartDate.setHours(startH + startOffset, startM, 0, 0)
      )
      const second = new Date(newEndDate.setHours(endH + endOffset, endM, 0, 0))

      if (first.getTime() > second.getTime()) {
        alert('Start time cannot be later than the end time.')
        return
      } else {
        dispatch({ type: DATE_RANGE_UPDATE, payload: date })
        dispatch({ type: HOT_BUTTON_RESET })

        setDate([first, second])
        setDataIsSet(false)

        handleClose()
      }
    } else {
      alert('Invalid time selection.')
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClick = () => {
    setAnchorEl(divRef.current)
  }

  const handleCancel = () => {
    handleClear()
    handleClose()
  }

  const handleClear = () => {
    setDate(dateRange)
  }

  const formatTime = (value: Date) => {
    const newValue =
      value.getHours() < 13
        ? value
        : new Date(value.setHours(value.getHours() - 12))

    return newValue
  }

  return (
    <DateRangeContainer $isDarkTheme={isDarkTheme}>
      <PopoverTrigger ref={divRef} onClick={handleClick} active={!!anchorEl}>
        <IconButton disabled>
          <DateRangeOutlined />
        </IconButton>

        <Grid container spacing={2} className="p-l-12">
          <Grid item xs={6}>
            <TextField
              disabled
              label="Start Date"
              value={dayjs(date[0]).format('MMM D, YYYY h:mm A')}
              size="small"
              className="Mui-focused"
              sx={{ minWidth: 200 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              disabled
              label="End Date"
              value={dayjs(date[1]).format('MMM D, YYYY h:mm A')}
              size="small"
              sx={{ minWidth: 200 }}
            />
          </Grid>
        </Grid>
      </PopoverTrigger>

      <DateRangePopover
        className={isDarkTheme ? 'dark' : 'light'}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div className="flex">
            <DataHotButtons handleClose={handleClose} />
            <div className="container">
              <StaticDateRangePicker
                displayStaticWrapperAs="desktop"
                startText="Start Date"
                endText="End Date"
                maxDate={new Date()}
                value={date}
                onChange={handleChange}
                allowSameDateSelection
                renderInput={(startProps, endProps) => (
                  <>
                    <TextField {...startProps} />
                    <Box sx={{ mx: 2 }}> to </Box>
                    <TextField {...endProps} />
                  </>
                )}
              />

              <Container className="p-t-16 p-b-16">
                <Grid container spacing={3} className="m-b-16">
                  <Grid item xs={6} className="time-picker">
                    <TimePickerWrapper error={startError}>
                      <TimePicker
                        value={formatTime(start)}
                        onChange={(value: any) => {
                          setStartError(value.getHours() > 12)
                          setStart(value || new Date())
                        }}
                        renderInput={(params) => <TextField {...params} />}
                        disableOpenPicker
                        ampm={false}
                      />
                      <FormControl size="small">
                        <Select
                          value={startAmPm}
                          onChange={(e) => setStartAmPm(e.target.value)}
                        >
                          <MenuItem value="AM">AM</MenuItem>
                          <MenuItem value="PM">PM</MenuItem>
                        </Select>
                      </FormControl>
                    </TimePickerWrapper>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    className="flex flex-end align-center time-picker"
                  >
                    <TimePickerWrapper error={endError}>
                      <TimePicker
                        value={formatTime(end)}
                        onChange={(value: any) => {
                          setEndError(value.getHours() > 12)
                          setEnd(value || new Date())
                        }}
                        renderInput={(params) => <TextField {...params} />}
                        disableOpenPicker
                        ampm={false}
                      />
                      <FormControl size="small">
                        <Select
                          value={endAmPm}
                          onChange={(e) => setEndAmPm(e.target.value)}
                        >
                          <MenuItem value="AM">AM</MenuItem>
                          <MenuItem value="PM">PM</MenuItem>
                        </Select>
                      </FormControl>
                    </TimePickerWrapper>
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={12} className="flex flex-end align-center">
                    <Button
                      color="primary"
                      style={{ marginRight: 16 }}
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleApply}
                      disabled={startError || endError}
                    >
                      Apply
                    </Button>
                  </Grid>
                </Grid>
              </Container>
            </div>
          </div>
        </LocalizationProvider>
      </DateRangePopover>
    </DateRangeContainer>
  )
}

export default DateRangeSelector

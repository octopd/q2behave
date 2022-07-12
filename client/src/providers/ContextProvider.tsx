import { DateRange } from '@mui/lab'
import { createContext, FC, useState } from 'react'
import { RootStateOrAny, useSelector } from 'react-redux'

export type ContextState = {
  dataIsSet: boolean
  setDataIsSet: (val: boolean) => void
  date: DateRange<Date>
  setDate: (val: DateRange<Date>) => void
  timeStart: Date | null
  setTimeStart: (val: Date | null) => void
  timeEnd: Date | null
  setTimeEnd: (val: Date | null) => void
  isDarkTheme: boolean
  setIsDarkTheme: (val: boolean) => void
}

const contextDefaultValues: ContextState = {
  dataIsSet: false,
  setDataIsSet: () => {},
  date: [new Date(), new Date()],
  setDate: () => {},
  timeStart: new Date(),
  setTimeStart: () => {},
  timeEnd: new Date(),
  setTimeEnd: () => {},
  isDarkTheme: true,
  setIsDarkTheme: () => {},
}

export const Context = createContext<ContextState>(contextDefaultValues)

const ContextProvider: FC = ({ children }) => {
  const { dateRange } = useSelector((state: RootStateOrAny) => state.dateRange)

  const [date, setDate] = useState<DateRange<Date>>(dateRange)
  const [timeStart, setTimeStart] = useState(dateRange[0])
  const [timeEnd, setTimeEnd] = useState<Date | null>(dateRange[1])
  const [isDarkTheme, setIsDarkTheme] = useState(true)
  const [dataIsSet, setDataIsSet] = useState(false)

  return (
    <Context.Provider
      value={{
        dataIsSet,
        setDataIsSet,
        date,
        setDate,
        timeStart,
        setTimeStart,
        timeEnd,
        setTimeEnd,
        isDarkTheme,
        setIsDarkTheme,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default ContextProvider

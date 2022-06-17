import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from '@mui/material'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { DATA_TYPES_FILTERED } from '../../constants/dataConstants'
import { SelectAll } from './DataSourceSelector'

export interface DataType {
  name: string
  key: string
}

export const dataTypesList: DataType[] = [
  { name: 'Acceleration X', key: 'Accel_X' },
  { name: 'Acceleration Y', key: 'Accel_Y' },
  { name: 'Acceleration Z', key: 'Accel_Z' },
  { name: 'Audio Level', key: 'AudioLevel' },
  { name: 'Gyro X', key: 'Gyro_X' },
  { name: 'Gyro Y', key: 'Gyro_Y' },
  { name: 'Gyro Z', key: 'Gyro_Z' },
  { name: 'Heart Rate', key: 'HeartRate' },
  { name: 'Magno X', key: 'Magno_X' },
  { name: 'Magno Y', key: 'Magno_Y' },
  { name: 'Magno Z', key: 'Magno_Z' },
]

const DataTypeSelector = () => {
  const dispatch = useDispatch()

  const { dataTypes, filteredDataTypes } = useSelector(
    (state: RootStateOrAny) => state.dataTypes
  )

  const someChecked = filteredDataTypes && filteredDataTypes.length > 0
  const allChecked =
    filteredDataTypes && filteredDataTypes.length >= dataTypes.length
  const displayValue =
    filteredDataTypes && !allChecked ? filteredDataTypes : ['All']

  const handleAllClick = () => {
    if (allChecked) {
      dispatch({ type: DATA_TYPES_FILTERED, payload: [] })
    } else {
      dispatch({ type: DATA_TYPES_FILTERED, payload: dataTypes })
    }
  }

  const handleMenuClick = (type: DataType) => {
    const newDataTypes = [...filteredDataTypes]

    const exists = filteredDataTypes.some((x: DataType) => x.key === type.key)

    if (exists) {
      const index = newDataTypes.findIndex((x: any) => x.key === type.key)

      if (index !== -1) {
        newDataTypes.splice(index, 1)
      }
    } else {
      newDataTypes.push(type)
    }

    dispatch({ type: DATA_TYPES_FILTERED, payload: newDataTypes })
  }

  return (
    <FormControl size="small" fullWidth>
      <InputLabel>Data Type</InputLabel>
      <Select
        multiple
        value={displayValue}
        renderValue={(val: DataType[]) =>
          allChecked ? 'All' : val.map((x) => x.name).join(', ')
        }
        label="Data Type"
      >
        <SelectAll value="all">
          <MenuItem component="div" onClick={handleAllClick}>
            <Checkbox
              checked={someChecked}
              indeterminate={someChecked && !allChecked}
              color="primary"
            />
            <ListItemText primary="All" />
          </MenuItem>
        </SelectAll>

        {filteredDataTypes &&
          dataTypesList.map((type: DataType, index: number) => (
            <MenuItem
              key={index}
              value={type.key}
              onClick={() => handleMenuClick(type)}
            >
              <Checkbox
                checked={filteredDataTypes.some(
                  (x: DataType) => x.key === type.key
                )}
                color="primary"
              />
              <ListItemText primary={type.name} />
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  )
}

export default DataTypeSelector

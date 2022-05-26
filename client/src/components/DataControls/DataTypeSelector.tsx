import { useEffect, useState } from 'react'
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from '@mui/material'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { DATA_TYPES, DATA_TYPES_FILTERED } from '../../constants/dataConstants'
import _ from 'lodash'
import { SelectAll } from './DataSourceSelector'
import { SensorParent } from '../../actions/dataActions'

const DataTypeSelector = () => {
  const dispatch = useDispatch()
  const [options, setOptions] = useState<string[]>(['All'])

  const { dataTypes, filteredDataTypes } = useSelector(
    (state: RootStateOrAny) => state.dataTypes
  )

  const { sensors } = useSelector((state: RootStateOrAny) => state.sensors)

  const someChecked = filteredDataTypes && filteredDataTypes.length > 0
  const allChecked =
    filteredDataTypes && filteredDataTypes.length >= dataTypes.length
  const displayValue =
    filteredDataTypes && !allChecked ? filteredDataTypes : ['All']

  useEffect(() => {
    if (sensors && sensors.length) {
      const menuOptions = [
        ...new Set(
          _.flatMap(sensors, (x: SensorParent) => {
            return [...x.sensors]
          }).map((x) => x.name)
        ),
      ]

      dispatch({ type: DATA_TYPES, payload: menuOptions })
      setOptions(menuOptions)
    }
  }, [dispatch, sensors])

  const handleAllClick = () => {
    if (allChecked) {
      dispatch({ type: DATA_TYPES_FILTERED, payload: [] })
    } else {
      dispatch({ type: DATA_TYPES_FILTERED, payload: dataTypes })
    }
  }

  const handleMenuClick = (value: string) => {
    const newDataTypes = [...filteredDataTypes]
    const exists = filteredDataTypes.indexOf(value) > -1

    if (exists) {
      const index = newDataTypes.indexOf(value)
      if (index !== -1) {
        newDataTypes.splice(index, 1)
      }
    } else {
      newDataTypes.push(value)
    }

    dispatch({ type: DATA_TYPES_FILTERED, payload: newDataTypes })
  }

  return (
    <FormControl size="small" fullWidth>
      <InputLabel>Data Type</InputLabel>
      <Select
        multiple
        value={displayValue}
        renderValue={(val: string[]) => val.join(', ')}
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
          options.map((option: string, index: number) => (
            <MenuItem
              key={index}
              value={option}
              onClick={() => handleMenuClick(option)}
            >
              <Checkbox
                checked={filteredDataTypes.indexOf(option) > -1}
                color="primary"
              />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  )
}

export default DataTypeSelector

import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
} from '@mui/material'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { SensorParent } from '../../actions/dataActions'
import {
  DATA_SOURCES,
  DATA_SOURCES_FILTERED,
} from '../../constants/dataConstants'
import DataSourceParent from './DataSourceParent'

export const SelectAll = styled(ListSubheader)`
  &.MuiListSubheader-root {
    padding: 0;
    background: transparent;
  }
`
const DSFormControl = styled(FormControl)`
  .MuiSelect-select {
    max-width: 240px;
  }
`

export interface MenuOption {
  name: string
  id: number
  children: string[]
}

interface Device {
  DeviceID: number
  DeviceName: string
}

const DataSourceSelector = () => {
  const dispatch = useDispatch()
  const [options, setOptions] = useState<MenuOption[]>([])

  const { dataSets } = useSelector((state: RootStateOrAny) => state.data)
  const { dataSources, filteredDataSources } = useSelector(
    (state: RootStateOrAny) => state.dataSources
  )
  const { devices } = useSelector((state: RootStateOrAny) => state.devices)
  const { sensors } = useSelector((state: RootStateOrAny) => state.sensors)

  const sensorNamesInView = () => {
    let nameArr: string[] = []

    filteredDataSources.forEach((dataSet: any) => {
      const split = dataSet.split('-')

      if (split.length > 2) {
        const sensorIndex = Number(split[1].slice(-1))
        const sensorRowKey = Number(split[2].slice(-1))

        const sensor = sensors.find(
          (x: SensorParent) => sensorRowKey === x.rowKey
        ).sensors[sensorIndex - 1]

        nameArr.push(sensor.name)
      }
    })

    return nameArr
  }

  const someChecked =
    filteredDataSources && filteredDataSources.length >= 0 + options.length
  const allChecked =
    filteredDataSources && filteredDataSources.length >= dataSources.length
  const displayValue =
    filteredDataSources && !allChecked ? sensorNamesInView() : ['All']

  useEffect(() => {
    if (Array.isArray(devices)) {
      const menuOptions = devices.map((device: Device) => {
        const children = dataSets
          ? dataSets.filter((set: string) => {
              const deviceId = Number(set.split('-')[0].slice(-1))

              return deviceId === device.DeviceID
            })
          : null

        const value = { name: device.DeviceName, id: device.DeviceID, children }

        return value
      })

      const flattenedOptions = _.flatMapDeep(menuOptions, (x) =>
        x.children ? [x.name, ...x.children] : [x.name]
      )

      dispatch({ type: DATA_SOURCES, payload: flattenedOptions })
      setOptions(menuOptions)
    }
  }, [dataSets, devices, dispatch])

  const handleChange = () => {
    if (allChecked) {
      dispatch({ type: DATA_SOURCES_FILTERED, payload: [] })
    } else {
      dispatch({ type: DATA_SOURCES_FILTERED, payload: dataSources })
    }
  }

  return (
    <DSFormControl size="small" fullWidth>
      <InputLabel>Data Source</InputLabel>
      <Select
        multiple
        value={displayValue}
        onChange={handleChange}
        renderValue={(val) => val.join(', ')}
        label="Data Source"
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 'calc(100vh - 220px)',
            },
          },
        }}
      >
        <SelectAll value="all">
          <MenuItem component="div" divider>
            <Checkbox
              checked={someChecked}
              indeterminate={someChecked && !allChecked}
              color="primary"
            />
            <ListItemText primary="All" />
          </MenuItem>
        </SelectAll>

        {options.map((option: MenuOption, index: number) => (
          <div key={index}>
            {dataSources && option.children && option.children.length ? (
              <DataSourceParent key={index} option={option} />
            ) : null}
          </div>
        ))}
      </Select>
    </DSFormControl>
  )
}
export default DataSourceSelector

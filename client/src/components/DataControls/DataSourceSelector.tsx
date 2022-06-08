import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
} from '@mui/material'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { DATA_SOURCES_FILTERED } from '../../constants/dataConstants'
import DataSourceChild from './DataSourceChild'

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

const DataSourceSelector = () => {
  const dispatch = useDispatch()

  const { filteredDataSources } = useSelector(
    (state: RootStateOrAny) => state.dataSources
  )
  const { devices } = useSelector((state: RootStateOrAny) => state.devices)

  const someChecked =
    filteredDataSources && filteredDataSources.length ? true : false
  const allChecked =
    filteredDataSources &&
    devices &&
    filteredDataSources.length === devices.length
  const displayValue =
    filteredDataSources && !allChecked ? filteredDataSources : ['All']

  const handleChange = () => {
    if (allChecked) {
      dispatch({ type: DATA_SOURCES_FILTERED, payload: [] })
    } else {
      dispatch({ type: DATA_SOURCES_FILTERED, payload: devices })
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

        {devices &&
          devices.map((device: string, index: number) => (
            <DataSourceChild key={index} dataSet={device} />
          ))}
      </Select>
    </DSFormControl>
  )
}
export default DataSourceSelector

import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as AreaChart } from '../../assets/icons/area-chart.svg'
import { ReactComponent as BarChart } from '../../assets/icons/bar-chart.svg'
import { ReactComponent as LineChartWithNodes } from '../../assets/icons/line-chart-with-nodes.svg'
import { ReactComponent as LineChart } from '../../assets/icons/line-chart.svg'

const CustomFormControl = styled(FormControl)`
  width: 240px;

  .MuiSelect-select {
    padding: 10px 32px 7px 12px;
    display: flex;
    align-items: flex-end;
  }

  .MuiFilledInput-root {
    background: #505359;
    color: var(--color-text-gray-dark);
  }

  svg {
    margin-right: 12px;
  }
`

export default function ChartTypeSelector() {
  const [chartType, setChartType] = useState('Line Chart')

  const handleChange = (event: SelectChangeEvent) => {
    setChartType(event.target.value)
  }

  return (
    <CustomFormControl size="small" variant="filled" color="primary">
      <Select value={chartType} onChange={handleChange}>
        <MenuItem value="Line Chart">
          <LineChart /> Line Chart
        </MenuItem>
        <MenuItem value="Line Chart + Nodes" disabled>
          <LineChartWithNodes />
          Line Chart + Nodes
        </MenuItem>
        <MenuItem value="Area Chart" disabled>
          <AreaChart />
          Area Chart
        </MenuItem>
        <MenuItem value="Area Chart" disabled>
          <BarChart />
          Bar Chart
        </MenuItem>
      </Select>
    </CustomFormControl>
  )
}

import { Grid } from '@mui/material'
import DataSourceSelector from './DataSourceSelector'
import DataTypeSelector from './DataTypeSelector'
import DateRangeSelector from './DateRangeSelector'
import { ReactComponent as Data } from '../../assets/icons/data.svg'
import styled from 'styled-components'

const DataIcon = styled(Data)`
  min-width: 24px;
  margin-right: 20px;
`

const DataControls = () => {
  return (
    <div className="flex align-center">
      <DataIcon />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <DataSourceSelector />
            </Grid>
            <Grid item xs={6}>
              <DataTypeSelector />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} className="flex flex-end">
          <DateRangeSelector />
        </Grid>
      </Grid>
    </div>
  )
}

export default DataControls

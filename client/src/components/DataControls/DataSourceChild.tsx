import { Checkbox, ListItemText, MenuItem } from '@mui/material'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { DATA_SOURCES_FILTERED } from '../../constants/dataConstants'
import { useDataSetInfo } from '../../hooks/useDataSetInfo'

interface Props {
  dataSet: string
}

const DataSourceChild = ({ dataSet }: Props) => {
  const dispatch = useDispatch()
  const dataSetInfo = useDataSetInfo(dataSet)

  const { filteredDataSources } = useSelector(
    (state: RootStateOrAny) => state.dataSources
  )

  const handleMenuClick = (value: string) => {
    const newDataSources = [...filteredDataSources]

    const exists = filteredDataSources.indexOf(value) > -1

    if (exists) {
      const index = newDataSources.indexOf(value)
      if (index !== -1) {
        newDataSources.splice(index, 1)
      }
    } else {
      newDataSources.push(value)
    }

    dispatch({ type: DATA_SOURCES_FILTERED, payload: newDataSources })
  }

  return (
    <MenuItem value={dataSetInfo.name} onClick={() => handleMenuClick(dataSet)}>
      <Checkbox
        checked={filteredDataSources.indexOf(dataSet) > -1}
        color="primary"
      />
      <ListItemText primary={dataSetInfo.name} />
    </MenuItem>
  )
}

export default DataSourceChild

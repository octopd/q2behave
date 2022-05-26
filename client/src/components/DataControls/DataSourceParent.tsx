import { ChevronRight } from '@mui/icons-material'
import {
  Checkbox,
  Collapse,
  IconButton,
  ListItemText,
  MenuItem,
} from '@mui/material'
import { MouseEvent, useState } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { DATA_SOURCES_FILTERED } from '../../constants/dataConstants'
import DataSourceChild from './DataSourceChild'
import { MenuOption } from './DataSourceSelector'

interface ArrowProps {
  $isOpen: boolean
}

const ArrowButton = styled(IconButton)<ArrowProps>`
  transform: rotate(${(props) => (props.$isOpen ? 270 : 90)}deg);
  transition: transform 250ms ease-in-out;
`

interface Props {
  option: MenuOption
}

const DataSourceParent = ({ option }: Props) => {
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(true)

  const { filteredDataSources } = useSelector(
    (state: RootStateOrAny) => state.dataSources
  )

  const someChecked = option.children.some((x: string) =>
    filteredDataSources.includes(x)
  )
  const allChecked = option.children.every((x: string) =>
    filteredDataSources.includes(x)
  )

  const handleMenuClick = (value: string) => {
    let newDataSources = [...filteredDataSources]

    if (allChecked) {
      option.children.map((x: string) => {
        newDataSources = newDataSources.filter((x) => !x.includes(value))
        return true
      })
    } else {
      newDataSources = [...new Set([...newDataSources, ...option.children])]
    }

    dispatch({ type: DATA_SOURCES_FILTERED, payload: newDataSources })
  }

  const handleToggleClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    setIsOpen(!isOpen)
  }

  return (
    <>
      <MenuItem
        value={option.name}
        onClick={() => handleMenuClick(option.name)}
        divider
      >
        <Checkbox
          checked={someChecked}
          color="primary"
          indeterminate={someChecked && !allChecked}
        />
        <ListItemText
          primary={<span style={{ fontWeight: 500 }}>{option.name}</span>}
        />
        <ArrowButton $isOpen={isOpen} onClick={handleToggleClick}>
          <ChevronRight />
        </ArrowButton>
      </MenuItem>
      <Collapse in={isOpen}>
        {option.children.map((dataSet: string, index: number) => (
          <DataSourceChild key={index} dataSet={dataSet} />
        ))}
      </Collapse>
    </>
  )
}

export default DataSourceParent

import styled from '@emotion/styled'
import { useContext } from 'react'
import { DataSet } from '../../actions/dataActions'
import { Units } from '../../enum'
import { Context } from '../../providers/ContextProvider'
import { dataTypesList } from '../DataControls/DataTypeSelector'

interface Props {
  dataSet: DataSet
}

interface RowProps {
  isDarkTheme: boolean
  color: string
}

const DataSetRow = styled.div<RowProps>`
  display: flex;
  justify-content: space-between;
  padding-left: 28px;
  position: relative;
  color: var(--color-text-gray);
  margin-bottom: 12px;

  &:after {
    content: '';
    position: absolute;
    left: 0px;
    top: 5px;
  }

  &.square {
    &:after {
      background-color: ${(props) => props.color};
      height: 12px;
      width: 12px;
    }
  }

  &.triangle {
    &:after {
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 12px solid ${(props) => props.color};
    }
  }

  &.circle {
    &:after {
      background-color: ${(props) => props.color};
      height: 12px;
      width: 12px;
      border-radius: 50%;
    }
  }

  &.cross {
    &:before,
    &:after {
      content: ' ';
      position: absolute;
      height: 12px;
      width: 3px;
      background-color: ${(props) => props.color};
    }

    &:before {
      transform: rotate(45deg);
      left: 6px;
      top: 5px;
    }
    &:after {
      transform: rotate(-45deg);
      left: 6px;
    }
  }

  .name {
    color: ${(props) =>
      props.isDarkTheme
        ? 'var(--color-text-gray-dark)'
        : 'var(--color-text-gray)'};
  }

  .unit {
    color: ${(props) => props.color};
  }
`

const LegendItem = ({ dataSet }: Props) => {
  const { isDarkTheme } = useContext(Context)

  const mostRecentValue = dataSet.dataPoints.length
    ? dataSet.dataPoints[dataSet.dataPoints.length - 1].y
    : 'n/a'

  const name = dataTypesList.find((x) => x.key === dataSet.name)

  return (
    <DataSetRow
      color={dataSet.color}
      isDarkTheme={isDarkTheme}
      className={dataSet.markerType}
    >
      <div className="name">{name && name.name}</div>
      <div className="unit">
        {mostRecentValue} {Units[dataSet.name as keyof typeof Units]}
      </div>
    </DataSetRow>
  )
}

export default LegendItem

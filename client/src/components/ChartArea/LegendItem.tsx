import styled from '@emotion/styled'
import { useContext } from 'react'
import { DataSet } from '../../actions/dataActions'
import { Context } from '../../providers/ContextProvider'

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
    top: 3px;
    height: 12px;
    width: 12px;
    border-radius: 3px;
    background-color: ${(props) => props.color};
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

  console.log(dataSet)

  return (
    <DataSetRow color={dataSet.color} isDarkTheme={isDarkTheme}>
      <div className="dot name">{dataSet.dataType}</div>
      <div className="unit">Unit...</div>
    </DataSetRow>
  )
}

export default LegendItem

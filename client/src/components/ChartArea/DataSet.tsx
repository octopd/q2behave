import styled from '@emotion/styled'
import { useContext } from 'react'
import { useDataSetInfo } from '../../hooks/useDataSetInfo'
import { Context } from '../../providers/ContextProvider'

interface Props {
  name: string
  color: string
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

const DataSet = ({ name, color }: Props) => {
  const dataSetInfo = useDataSetInfo(name)
  const { isDarkTheme } = useContext(Context)

  return (
    <DataSetRow color={color} isDarkTheme={isDarkTheme}>
      <div className="dot name">{dataSetInfo.name}</div>
      <div className="unit">{dataSetInfo.unit}</div>
    </DataSetRow>
  )
}

export default DataSet

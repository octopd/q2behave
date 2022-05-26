import { Line } from 'recharts'
import { assignColor } from '../../helpers/colorHelpers'
import { useDataSetInfo } from '../../hooks/useDataSetInfo'

interface Props {
  dataSet: string
  index: number
}

const DataSetLine = ({ dataSet, index }: Props) => {
  const color = assignColor(index)
  const dataSetInfo = useDataSetInfo(dataSet)

  return (
    <Line
      dataKey={dataSet}
      stroke={color}
      strokeWidth={2}
      isAnimationActive={false}
      dot={false}
      unit={dataSetInfo.unit}
      name={dataSetInfo.name}
      yAxisId="1"
    />
  )
}

export default DataSetLine

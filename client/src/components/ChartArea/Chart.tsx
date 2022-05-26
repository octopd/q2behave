import { useContext, useEffect, useState } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
} from 'recharts'
import dayjs from 'dayjs'
import styled from '@emotion/styled'
import { Context } from '../../providers/ContextProvider'
import { useDataSetsInView } from '../../hooks/useDataSetsInView'
import { assignColor } from '../../helpers/colorHelpers'
import { SensorParent } from '../../actions/dataActions'
import { ZOOM_RESET, ZOOM_SET } from '../../constants/dataConstants'

const ChartContainer = styled(ResponsiveContainer)`
  user-select: none;

  .recharts-responsive-container {
    height: 300px;
  }
`

const Chart = () => {
  const dispatch = useDispatch()

  const { setDate, setTimeStart, setTimeEnd } = useContext(Context)

  const [left, setLeft] = useState<number | string>('dataMin')
  const [right, setRight] = useState<number | string>('dataMax')
  const [refAreaLeft, setRefAreaLeft] = useState<number>()
  const [refAreaRight, setRefAreaRight] = useState<number>()

  const dataSetsInView = useDataSetsInView()

  const { data, dataSets } = useSelector((state: RootStateOrAny) => state.data)

  const { sensors } = useSelector((state: RootStateOrAny) => state.sensors)
  const { reset, enabled } = useSelector((state: RootStateOrAny) => state.zoom)

  useEffect(() => {
    if (reset) {
      setLeft('dataMin')
      setRight('dataMax')
      dispatch({ type: ZOOM_RESET, payload: false })
    }
  }, [dispatch, reset])

  const formatXAxis = (tickItem: string) => {
    return dayjs.unix(parseFloat(tickItem)).format('h:mm a')
  }

  const zoom = () => {
    dispatch({ type: ZOOM_SET })

    const _refAreaLeft = refAreaLeft
    const _refAreaRight = refAreaRight

    if (_refAreaLeft === _refAreaRight || _refAreaRight === undefined) {
      setRefAreaLeft(undefined)
      setRefAreaRight(undefined)
      return
    }

    // xAxis domain
    if (_refAreaLeft && _refAreaLeft > _refAreaRight) {
      //Flip direction if dragged from right to right
      setRefAreaLeft(_refAreaRight)
      setRefAreaRight(_refAreaLeft)
    }

    if (_refAreaLeft) {
      setLeft(_refAreaLeft > _refAreaRight ? _refAreaRight : _refAreaLeft)
      setRight(_refAreaLeft > _refAreaRight ? _refAreaLeft : _refAreaRight)
    }

    if (_refAreaLeft && _refAreaRight) {
      const right = new Date(_refAreaRight * 1000)
      const left = new Date(_refAreaLeft * 1000)

      if (_refAreaLeft > _refAreaRight) {
        //Flip direction if dragged from right to right
        setDate([right, left])
        setTimeStart(right)
        setTimeEnd(left)
      } else {
        setDate([left, right])
        setTimeStart(left)
        setTimeEnd(right)
      }
    }

    setRefAreaLeft(undefined)
    setRefAreaRight(undefined)
  }

  const dataSetInfo = (dataSet: string) => {
    const split = dataSet.split('-')
    const sensorIndex = Number(split[1].slice(-1))
    const sensorRowKey = Number(split[2].slice(-1))

    const sensor = sensors.find((x: SensorParent) => sensorRowKey === x.rowKey)
      .sensors[sensorIndex - 1]

    return sensor
  }

  return (
    <ChartContainer width="100%" height="100%">
      <LineChart
        data={data}
        onMouseDown={(e) => {
          if (!enabled) return
          setRefAreaLeft(Number(e.activeLabel))
        }}
        onMouseMove={(e) => {
          if (!enabled) return
          setRefAreaRight(Number(e.activeLabel))
        }}
        onMouseUp={() => {
          if (!enabled) return
          zoom()
        }}
        margin={{ top: 5, right: 0, bottom: 5, left: 5 }}
      >
        <CartesianGrid strokeDasharray="0" stroke="#2b3137" />

        <XAxis
          domain={[left, right]}
          type="number"
          scale="time"
          dataKey="timestamp"
          tickFormatter={formatXAxis}
          allowDuplicatedCategory={true}
          minTickGap={80}
          axisLine={{ stroke: '#2b3137' }}
          tickLine={{ stroke: 'transparent' }}
          stroke="#c2c7ce"
          allowDataOverflow
        />

        <YAxis
          yAxisId="1"
          scale="linear"
          domain={[-1, 50]}
          allowDataOverflow
          type="number"
          orientation="right"
          tickCount={5}
          tickLine={{ stroke: 'transparent' }}
          stroke="transparent"
          width={24}
        />

        <Tooltip
          labelFormatter={(t) =>
            dayjs.unix(parseFloat(t)).format('MMM D [at] h:mm:ssa')
          }
        />

        {dataSets &&
          dataSets.map(
            (x: string, index: number) =>
              dataSetsInView.includes(x) && (
                <Line
                  key={x}
                  dataKey={x}
                  stroke={assignColor(index)}
                  strokeWidth={2}
                  isAnimationActive={false}
                  dot={false}
                  unit={dataSetInfo(x).unit}
                  name={dataSetInfo(x).name}
                  yAxisId="1"
                />
              )
          )}

        <Tooltip cursor={false} />

        {refAreaLeft && refAreaRight && (
          <ReferenceArea
            yAxisId="1"
            x1={refAreaLeft}
            x2={refAreaRight}
            strokeOpacity={0.3}
          />
        )}
      </LineChart>
    </ChartContainer>
  )
}

export default Chart

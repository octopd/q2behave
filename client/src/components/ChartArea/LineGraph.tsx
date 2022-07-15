import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'
import { RootStateOrAny, useSelector } from 'react-redux'
import CanvasJSReact from '../../assets/canvasjs-3.6.5/canvasjs.react'
import { useDataSetsInView } from '../../hooks/useDataSetsInView'

const CanvasJSChart = CanvasJSReact.CanvasJSChart

const yAxes = Array(3).fill({
  tickLength: 0,
  tickThickness: 0,
  lineThickness: 0,
  labelFormatter: () => '',
  margin: 0,
})

interface ViewPort {
  x: {
    min: number
    max: number
  }
  y: {
    min: number
    max: number
  }
}

const LineGraph = () => {
  const chart = useRef<any>() //TODO: find type for this

  const [viewPort, setViewPort] = useState<ViewPort>({
    x: {
      min: 0,
      max: 0,
    },
    y: {
      min: 0,
      max: 0,
    },
  })

  const { enabled, reset } = useSelector((state: RootStateOrAny) => state.zoom)
  const dataSetsInView = useDataSetsInView()

  const options = {
    zoomEnabled: enabled,
    zoomType: 'xy',
    data: dataSetsInView,
    backgroundColor: 'transparent',
    axisY: yAxes,
    axisX: {
      labelFontColor: '#c2c7ce',
      labelFontSize: 12,
      labelFormatter: (t: any) => dayjs(t.value).format('MMM D [at] h:mm:ssa'),
    },
  }

  const containerProps = {
    height: 'calc(100% - 50px)',
  }

  useEffect(() => {
    if (chart.current.axisX[0] !== undefined) {
      const xMin = chart.current.axisX[0].get('viewportMinimum')
      const xMax = chart.current.axisX[0].get('viewportMaximum')
      const yMin = chart.current.axisY[0].get('viewportMinimum')
      const yMax = chart.current.axisY[0].get('viewportMaximum')

      setViewPort({ x: { min: xMin, max: xMax }, y: { min: yMin, max: yMax } })
    }
  }, [chart])

  useEffect(() => {
    if (reset) {
      chart.current.axisX[0].set('viewportMinimum', viewPort.x.min)
      chart.current.axisX[0].set('viewportMaximum', viewPort.x.max)
      chart.current.axisY[0].set('viewportMinimum', viewPort.y.min)
      chart.current.axisY[0].set('viewportMaximum', viewPort.y.max)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset])

  return (
    <CanvasJSChart
      options={options}
      containerProps={containerProps}
      onRef={(ref: any) => (chart.current = ref)}
    />
  )
}

export default LineGraph

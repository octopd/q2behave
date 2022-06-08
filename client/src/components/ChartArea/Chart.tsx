import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
// import { useContext, useEffect, useState } from 'react'
import { RootStateOrAny, useSelector } from 'react-redux'

// import dayjs from 'dayjs'
// import { useEffect, useState } from 'react'
// import _ from 'lodash'
import { assignColor } from '../../helpers/colorHelpers'
// import styled from '@emotion/styled'
// import { Context } from '../../providers/ContextProvider'
// import { useDataSetsInView } from '../../hooks/useDataSetsInView'
// import { assignColor } from '../../helpers/colorHelpers'
// import { SensorParent } from '../../actions/dataActions'
// import { ZOOM_RESET, ZOOM_SET } from '../../constants/dataConstants'
// import { ResponsiveLineCanvas } from '@nivo/line'

// const ChartContainer = styled.div`
//   user-select: none;

//   .recharts-responsive-container {
//     height: 300px;
//   }
// `

const Chart = () => {
  //   const dispatch = useDispatch()

  // const [formattedData, setFormattedData] = useState([])

  //   const { setDate, setTimeStart, setTimeEnd } = useContext(Context)

  //   const [left, setLeft] = useState<number | string>('dataMin')
  //   const [right, setRight] = useState<number | string>('dataMax')
  //   const [refAreaLeft, setRefAreaLeft] = useState<number>()
  //   const [refAreaRight, setRefAreaRight] = useState<number>()

  //   // const dataSetsInView = useDataSetsInView()

  const { data, dataSets } = useSelector((state: RootStateOrAny) => state.data)

  const formattedData = dataSets.map((x: string, index: number) => ({
    name: x,
    data: data[x],
    showInLegend: false,
    color: assignColor(index),
  }))

  console.log(formattedData)

  const options = {
    chart: {
      type: 'spline',
      zoomType: 'x',
      backgroundColor: 'transparent',
      height: '630',
    },
    title: {
      text: null,
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Date',
      },
    },
    // yAxis: {
    //   min: 0,
    //   max: 2500,
    // },
    series: formattedData,

    colors: ['#6CF', '#39F', '#06C', '#036', '#000'],
  }

  //   const { sensors } = useSelector((state: RootStateOrAny) => state.sensors)
  //   const { reset, enabled } = useSelector((state: RootStateOrAny) => state.zoom)

  //   const formatXAxis = (tickItem: string) => {
  //     return dayjs.unix(parseFloat(tickItem)).format('h:mm a')
  //   }

  //   // const dataSetInfo = (dataSet: string) => {
  //   //   const split = dataSet.split('-')
  //   //   const sensorIndex = Number(split[1].slice(-1))
  //   //   const sensorRowKey = Number(split[2].slice(-1))

  //   //   const sensor = sensors.find((x: SensorParent) => sensorRowKey === x.rowKey)
  //   //     .sensors[sensorIndex - 1]

  //   //   return sensor
  //   // }

  return <HighchartsReact highcharts={Highcharts} options={options} />
}

export default Chart

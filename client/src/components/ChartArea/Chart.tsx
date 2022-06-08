import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { RootStateOrAny, useSelector } from 'react-redux'

const Chart = () => {
  const { data } = useSelector((state: RootStateOrAny) => state.data)

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
    series: data,
    colors: ['#6CF', '#39F', '#06C', '#036', '#000'],
  }

  return <HighchartsReact highcharts={Highcharts} options={options} />
}

export default Chart

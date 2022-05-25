/* eslint-disable no-console */
import { useEffect } from 'react'
import { VictoryAxis, VictoryBar, VictoryChart, VictoryStack, VictoryTheme } from 'victory'
import { ChartData, IChartData } from '../../../types/mediaAds.d'
import { dummydata } from './dummy'

// import CHART_STYLE from './chartStyle'

interface Props {
  // chartData: ChartData
}
const dataStructure = [
  { value: 0, category: '광고비' },
  { value: 0, category: '매출' },
  { value: 0, category: '노출 수' },
  { value: 0, category: '클릭 수' },
  { value: 0, category: '전환 수' },
]

const init = {
  facebook: [...dataStructure],
  google: [...dataStructure],
  kakao: [...dataStructure],
  naver: [...dataStructure],
}

const getData = () => {
  const data: ChartData = {
    google: [...dataStructure],
    facebook: [...dataStructure],
    naver: [...dataStructure],
    kakao: [...dataStructure],
  }

  // for (const key in data) {
  //   console.log(key === dummydata[0].channel)
  //   // if (key === dummydata[key]) {
  //   //   data[key][0].value += dummydata[key].cost
  //   //   data[key][1].value += dummydata[key].roas
  //   // }
  // }

  // dummydata.forEach((detaObj) => {
  //   data[detaObj.channel].find((item) => item.category === '광고비')!.value += detaObj.cost
  //   data[detaObj.channel].find((item) => item.category === '매출')!.value += detaObj.roas
  //   data[detaObj.channel].find((item) => item.category === '노출 수')!.value += detaObj.imp
  //   data[detaObj.channel].find((item) => item.category === '클릭 수')!.value += detaObj.ctr
  //   data[detaObj.channel].find((item) => item.category === '전환 수')!.value += detaObj.cvr
  // })

  // console.log(data)
}

const tickFormat = ['광고비', '매출', '노출 수', '클릭 수', '전환 수']

const MediaAdsChart = ({}: Props) => {
  useEffect(() => {
    getData()
  }, [])
  return (
    <div>
      <VictoryChart width={1500} theme={VictoryTheme.material} domainPadding={90}>
        <VictoryAxis tickValues={tickFormat} tickFormat={tickFormat} />
        <VictoryAxis
          dependentAxis
          // tickFormat specifies how ticks should be displayed
          tickFormat={(x) => `${x / 1000_000}k`}
        />
        <VictoryStack colorScale={['#AC8AF8', '#85DA47', '#4FADF7', '#FFEB00']}>
          {/* <VictoryBar data={chartData.google} x='category' y='value' /> */}
          {/* <VictoryBar data={chartData.facebook} x='category' y='value' /> */}
          {/* <VictoryBar data={chartData.naver} x='category' y='value' /> */}
          {/* <VictoryBar data={chartData.kakao} x='category' y='value' cornerRadius={{ top: 4 }} /> */}
        </VictoryStack>
      </VictoryChart>
    </div>
  )
}

export default MediaAdsChart

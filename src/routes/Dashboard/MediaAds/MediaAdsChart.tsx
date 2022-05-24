import { VictoryAxis, VictoryBar, VictoryChart, VictoryStack, VictoryTheme } from 'victory'
import { ChartData, IChartData } from '../../../types/mediaAds.d'

// import CHART_STYLE from './chartStyle'

interface Props {
  chartData: ChartData
}

const tickFormat = ['광고비', '매출', '노출 수', '클릭 수', '전환 수']

const MediaAdsChart = ({ chartData }: Props) => {
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
          <VictoryBar data={chartData.google} x='category' y='value' />
          <VictoryBar data={chartData.facebook} x='category' y='value' />
          <VictoryBar data={chartData.naver} x='category' y='value' />
          <VictoryBar data={chartData.kakao} x='category' y='value' cornerRadius={{ top: 4 }} />
        </VictoryStack>
      </VictoryChart>
    </div>
  )
}

export default MediaAdsChart

import { BigNumber } from 'bignumber.js'
import { VictoryAxis, VictoryBar, VictoryChart, VictoryStack, VictoryTheme } from 'victory'

import { IMediaAds } from 'types/mediaAds'

import CHART_STYLE from './chartStyle'
import styles from './corona.module.scss'

interface Props {
  dateFilterData: IMediaAds[]
}

// const google = dataStructure.concat()

const MediaAdsChartCopy = ({ dateFilterData }: Props) => {
  const result = (arr: IMediaAds[]) => {
    const data: Record<string, { value: number; category: string }[]> = {
      data: [
        { value: 0, category: '광고비' },
        { value: 0, category: '매출' },
        { value: 0, category: '노출 수' },
        { value: 0, category: '클릭 수' },
        { value: 0, category: '전환 수' },
      ],
    }
    return findCategory(data, arr)
  }
  const findCategory = (data: Record<string, { value: number; category: string }[]>, arr: IMediaAds[]) => {
    arr.forEach((d) => {
      const bigNum: BigNumber = new BigNumber(d.roas).dividedBy(100).multipliedBy(d.cost)
      const sales = Math.round(bigNum.toNumber() * 100) / 100
      data.data.find((item) => item.category === '광고비')!.value += d.cost
      data.data.find((item) => item.category === '매출')!.value += sales
      data.data.find((item) => item.category === '노출 수')!.value += d.imp
      data.data.find((item) => item.category === '클릭 수')!.value += d.ctr
      data.data.find((item) => item.category === '전환 수')!.value += d.cvr
    })
    return data
  }

  const getFuck = () => {
    const google = dateFilterData.filter((item: { channel: string }) => {
      return item.channel === 'google'
    })
    const resultGoogle = result(google)

    const naver = dateFilterData.filter((item: { channel: string }) => {
      return item.channel === 'naver'
    })
    const resultNaver = result(naver)

    const facebook = dateFilterData.filter((item: { channel: string }) => {
      return item.channel === 'facebook'
    })
    const resultFacebook = result(facebook)

    const kakao = dateFilterData.filter((item: { channel: string }) => {
      return item.channel === 'kakao'
    })
    const resultKakao = result(kakao)

    const total = result(dateFilterData)

    return { resultNaver, resultKakao, resultFacebook, resultGoogle, total }
  }

  const tickFormat = ['광고비', '매출', '노출 수', '클릭 수', '전환 수']

  const { resultNaver, resultKakao, resultFacebook, resultGoogle, total } = getFuck()

  const percentCalculation = (arr: Record<string, { value: number; category: string }[]>) => {
    const percent: { value: number; category: string }[] = []
    total.data.forEach((item: { value: number; category: string }, index: number) => {
      percent.push({ value: arr.data[index].value / item.value, category: item.category })
    })
    return percent
  }
  return (
    <div>
      <VictoryChart width={900} theme={VictoryTheme.material} domainPadding={20}>
        <VictoryAxis tickValues={tickFormat} tickFormat={tickFormat} />
        <VictoryAxis
          dependentAxis
          // tickFormat specifies how ticks should be displayed
          tickFormat={(x) => `${x * 100}%`}
        />
        <VictoryStack colorScale={['#AC8AF8', '#85DA47', '#4FADF7', '#FFEB00']}>
          <VictoryBar data={percentCalculation(resultGoogle)} {...CHART_STYLE.bar} />
          <VictoryBar data={percentCalculation(resultNaver)} {...CHART_STYLE.bar} />
          <VictoryBar data={percentCalculation(resultFacebook)} {...CHART_STYLE.bar} />
          <VictoryBar data={percentCalculation(resultKakao)} {...CHART_STYLE.bar} cornerRadius={{ top: 6 }} />
        </VictoryStack>
      </VictoryChart>
    </div>
  )
}

export default MediaAdsChartCopy

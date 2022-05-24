export interface IChartDataObject {
  value: number
  category: string
}

export interface IChartData {
  facebook: IChartDataObject[]
  google: IChartDataObject[]
  kakao: IChartDataObject[]
  naver: IChartDataObject[]
}

export type ChartData = Record<string, { value: number; category: string }[]>

export interface IMediaAds {
  channel: string
  click: number
  convValue: number
  cost: number
  cpa: number
  cpc: number
  ctr: number
  cvr: number
  date: string
  imp: number
  roas: number
}

export type TableData = Record<
  string,
  { cost: number; sales: number; roas: number; imp: number; click: number; ctr: number; cpc: number }
>

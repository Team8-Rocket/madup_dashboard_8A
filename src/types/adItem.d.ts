export interface IAdList {
  adItem: IAdItem
}

export interface IAdItem {
  id: number
  adType: string
  title: string
  budget: number
  status: string
  startDate: string
  endDate: string | null
  report: {
    cost: number
    convValue: number
    roas: number
  }
}

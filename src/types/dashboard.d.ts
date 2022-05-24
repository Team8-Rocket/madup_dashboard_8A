export interface IItems {
  daily: IItem[]
}

export interface IItem {
  // [key: string]: string
  imp: number
  click: number
  cost: number
  conv: number
  convValue: number
  ctr: number
  cvr: number
  cpc: number
  cpa: number
  roas: number
  date: string
  sales: number
}

export interface IItemResult {
  // [key: string]: string
  roas: number
  cost: number
  imp: number
  click: number
  conv: number
  sales: number
}

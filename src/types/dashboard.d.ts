export interface IItems {
  daily: IItem[]
}

export interface IItem {
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
  roas: number
  cost: number
  imp: number
  click: number
  conv: number
  sales: number
  date: string
}

export interface IItemDateResult {
  roas: number
  cost: number
  imp: number
  click: number
  conv: number
  sales: number
  date: string
}

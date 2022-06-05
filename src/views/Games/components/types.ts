// eslint-disable react-hooks/exhaustive-deps import/no-cycle
import { Game } from 'state/types'

export type TableProps = {
  data?: TableDataTypes[]
  selectedFilters?: string
  sortBy?: string
  sortDir?: string
  onSort?: (value: string) => void
}

export type ColumnsDefTypes = {
  id: number
  label: string
  name: string
  sortable: boolean
}

export type ScrollBarProps = {
  ref: string
  width: number
}

export type TableDataTypes = {
  POOL: string
  APR: string
  EARNED: string
  STAKED: string
  DETAILS: string
  LINKS: string
}

export const DesktopColumnSchema: ColumnsDefTypes[] = [
  {
    id: 1,
    name: 'game',
    sortable: true,
    label: '',
  }, // this is needed by pancakeswap uikit useTable
]

export type ChainProps = {
  chain: string
  address: string
}

export type GameProps = Omit<Game, 'address' | 'chain'> & {
  chain: ChainProps[]
  price?: {
    bnb: number
    usd: number
  }
}

export enum Categories {
  ACTION = 'Action',
  BREEDING = 'Breeding',
  CARDGAME = 'Card Game',
  RPG = 'RPG',
  SIMULATION = 'Simulation',
}

export enum Platforms {
  WEB = 'Web',
  ANDROID = 'Android',
  APPLE = 'Apple',
}

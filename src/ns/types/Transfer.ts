import { Account } from './Account';

export interface Transfer {
  externalId: string
  date: Date
  amount: number
  from: Account
  to: Account
  memo: string | undefined
}

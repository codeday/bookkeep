import { Account } from './Account';
import { Region } from './Region';
import { Program } from './Program';

export interface Transaction {
  externalId: string
  date: Date
  amount: number
  memo: string | undefined
  program: Program | undefined
  region: Region | undefined
}

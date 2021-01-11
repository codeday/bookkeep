import { Account } from './Account';
import { Transaction } from './Transaction';
import { Customer } from './Customer';

export interface CashSale extends Transaction {
  customer: Customer
  depositAccount: Account
  item: string
  quantity: number
}

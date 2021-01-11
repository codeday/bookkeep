import { Account } from './Account';
import { Transaction } from './Transaction';
import { Customer } from './Customer';

export interface CashRefund extends Transaction {
  customer: Customer
  withdrawlAccount: Account
  item: string
  quantity: number
}

import { Account, Customer, Program, Region, CashSale as CashSaleType } from '../types';
import {
  buildRenderer,
  renderAccount,
  renderAmount,
  renderDate,
  renderCustomer,
  renderProgram,
  renderRegion,
} from './render';

export interface CashSale {
  'External ID': string
  Date: Date
  Customer: Customer
  'Item ID': string
  'Item Quantity': number
  'Item Amount': number
  'Deposit Account': Account
  Memo: string | undefined
  Program: Program | undefined
  Region: Region | undefined
}

export const renderCashSale = buildRenderer({
  Date: renderDate,
  Customer: renderCustomer,
  'Item Amount': renderAmount,
  'Deposit Account': renderAccount,
  Program: renderProgram,
  Region: renderRegion,
})

export function convertCashSale(cashRefund: CashSaleType): CashSale {
  return {
    'External ID': cashRefund.externalId,
    Date: cashRefund.date,
    Customer: cashRefund.customer,
    'Item ID': cashRefund.item,
    'Item Quantity': cashRefund.quantity,
    'Item Amount': cashRefund.amount,
    'Deposit Account': cashRefund.depositAccount,
    Memo: cashRefund.memo,
    Program: cashRefund.program,
    Region: cashRefund.region,
  };
}

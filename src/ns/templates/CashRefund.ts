import { Account, Customer, Program, Region, CashRefund as CashRefundType } from '../types';
import {
  buildRenderer,
  renderAccount,
  renderAmount,
  renderDate,
  renderCustomer,
  renderProgram,
  renderRegion
} from './render';

export interface CashRefund {
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

export const renderCashRefund = buildRenderer<CashRefund>({
  Date: renderDate,
  Customer: renderCustomer,
  'Item Amount': renderAmount,
  'Deposit Account': renderAccount,
  Program: renderProgram,
  Region: renderRegion,
});

export function convertCashRefund(cashRefund: CashRefundType): CashRefund {
  return {
    'External ID': cashRefund.externalId,
    Date: cashRefund.date,
    Customer: cashRefund.customer,
    'Item ID': cashRefund.item,
    'Item Quantity': cashRefund.quantity,
    'Item Amount': cashRefund.amount,
    'Deposit Account': cashRefund.withdrawlAccount,
    Memo: cashRefund.memo,
    Program: cashRefund.program,
    Region: cashRefund.region,
  };
}

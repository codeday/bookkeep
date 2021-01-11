import { TransactionType } from '../types/TransactionType';
import { buildRenderer, renderDate, renderAmount, renderTransactionType } from './render';

export interface BankStatementTransaction {
  Date: Date
  'Payer/Payee Name': string
  'Transaction Id': string
  'Transaction Type': TransactionType
  Amount: number
  Memo: string | undefined
  'NS Internal Customer Id': string | undefined
  'NS Customer Name': string | undefined
  'Invoice Number(s)': string | undefined
}

export function renderBankStatementTransaction(obj: BankStatementTransaction): Record<string, string> {
  const { Date, ...rest } = buildRenderer({
    Date: renderDate,
    'Transaction Type': renderTransactionType,
    Amount: renderAmount,
  })(obj);

  return {
    'Date (MM/DD/YYYY)': Date, // Account for weird field name in Netsuite
    ...rest,
  };
}

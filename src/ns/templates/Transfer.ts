import { Account, Transfer as TransferType } from '../types';
import { buildRenderer, renderDate, renderAmount, renderAccount } from './render';

export interface Transfer {
  'External ID': string
  Date: Date
  Amount: number
  'From Account': Account
  'To Account': Account
  Memo: string | undefined
}

export const renderTransfer = buildRenderer<Transfer>({
  Date: renderDate,
  Amount: renderAmount,
  'From Account': renderAccount,
  'To Account': renderAccount,
});

export function convertTransfer(transfer: TransferType): Transfer {
  return {
    'External ID': transfer.externalId,
    Date: transfer.date,
    Amount: transfer.amount,
    'From Account': transfer.from,
    'To Account': transfer.to,
    Memo: transfer.memo,
  }
}

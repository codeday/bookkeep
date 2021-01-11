import config from '../../config';
import { Account, Vendor, Subsidiary, Region, Program, Bill as BillType } from '../types';
import {
  buildRenderer,
  renderAccount,
  renderVendor,
  renderSubsidiary,
  renderAmount,
  renderRegion,
  renderProgram,
  renderDate
} from './render';

export interface Bill {
  'External ID': string | undefined
  Date: Date
  Vendor: Vendor
  'Expenses Amount': number
  Account: Account
  Subsidiary: Subsidiary
  Memo: string | undefined
  Reference: string | undefined
  'Business Purpose': string
  Region: Region | undefined
  Program: Program | undefined
}

export const renderBill = buildRenderer<Bill>({
  Date: renderDate,
  Vendor: renderVendor,
  Account: renderAccount,
  Subsidiary: renderSubsidiary,
  Amount: renderAmount,
  Region: renderRegion,
  Program: renderProgram,
});

export function convertBill(bill: BillType): Bill {
  return {
    'External ID': bill.externalId,
    Date: bill.date,
    Vendor: bill.vendor,
    'Expenses Amount': bill.amount,
    Account: bill.account,
    Subsidiary: bill.subsidiary || config.netsuite.defaultSubsidiary,
    Memo: bill.memo,
    Reference: bill.reference,
    'Business Purpose': bill.businessPurpose,
    Region: bill.region,
    Program: bill.program,
  };
}

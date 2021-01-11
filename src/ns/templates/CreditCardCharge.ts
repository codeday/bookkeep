import config from '../../config';
import { Account, Subsidiary, Vendor, Region, Program, CreditCardCharge as CreditCardChargeType } from '../types';
import {
  buildRenderer,
  renderDate,
  renderVendor,
  renderAccount,
  renderSubsidiary,
  renderAmount,
  renderRegion,
  renderProgram,
} from './render';

export interface CreditCardCharge {
  'External ID': string
  Date: Date
  Vendor: Vendor
  'Expenses Amount': number
  Account: Account
  'Expenses Account': Account
  Subsidiary: Subsidiary
  Memo: string | undefined
  Reference: string | undefined
  'Business Purpose': string
  Region: Region | undefined
  Program: Program | undefined
}

export const renderCreditCardCharge = buildRenderer<CreditCardCharge>({
  Date: renderDate,
  Vendor: renderVendor,
  'Expenses Amount': renderAmount,
  Account: renderAccount,
  'Expenses Account': renderAccount,
  Subsidiary: renderSubsidiary,
  Region: renderRegion,
  Program: renderProgram,
});

export function convertCreditCardCharge(creditCardCharge: CreditCardChargeType): CreditCardCharge {
  return {
    'External ID': creditCardCharge.externalId,
    Date: creditCardCharge.date,
    Vendor: creditCardCharge.vendor,
    'Expenses Amount': creditCardCharge.amount,
    Account: creditCardCharge.paymentAccount,
    'Expenses Account': creditCardCharge.expenseAccount,
    Subsidiary: creditCardCharge.subsidiary || config.netsuite.defaultSubsidiary,
    Memo: creditCardCharge.memo,
    Reference: creditCardCharge.reference,
    'Business Purpose': creditCardCharge.businessPurpose,
    Region: creditCardCharge.region,
    Program: creditCardCharge.program,
  };
}

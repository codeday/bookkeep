import { Account } from './Account';
import { Subsidiary } from './Subsidiary';
import { Transaction } from './Transaction';
import { Vendor } from './Vendor';

export interface Bill extends Transaction {
  vendor: Vendor
  reference: string
  account: Account
  businessPurpose: string
  subsidiary: Subsidiary
}

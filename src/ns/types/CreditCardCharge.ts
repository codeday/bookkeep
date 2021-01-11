import { Transaction } from './Transaction';
import { Vendor } from './Vendor';
import { Account } from './Account';
import { Subsidiary} from './Subsidiary';

export interface CreditCardCharge extends Transaction {
  vendor: Vendor
  expenseAccount: Account
  paymentAccount: Account
  reference: string
  businessPurpose: string
  subsidiary: Subsidiary
}

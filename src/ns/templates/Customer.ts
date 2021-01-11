import { Subsidiary } from '../types';
import { buildRenderer, renderSubsidiary } from './render';

export interface Customer {
  'Company Name': string
  'Customer ID': string
  'External ID': string
  'Primary Subsidiary': Subsidiary
}

export const renderCustomer = buildRenderer<Customer>({
  'Primary Subsidiary': renderSubsidiary,
});

import { Account, Customer, Region, Program, Vendor, Subsidiary, TransactionType } from '../types';

export function renderDate(date: Date): string {
  const mm = ('0' + (date.getMonth() + 1)).slice(-2);
  const dd = ('0' + date.getDate()).slice(-2);
  const yyyy = date.getFullYear();

  return `${mm}/${dd}/${yyyy}`;
}

export function renderAccount({ Number, Name }: Account): string {
  return `${Number} ${typeof Name === 'string' ? Name : Name.join(' : ')}`;
}

export function renderRegion(regionComponents: Region): string {
  return regionComponents.join(' : ');
}

const allVendors: Vendor[] = [];
export function renderVendor(vendor: Vendor): string {
  if (!allVendors.includes(vendor)) allVendors.push(vendor);
  return vendor.toString();
}
export function getAllVendors() {
  return allVendors;
}

const allCustomers: Customer[] = [];
export function renderCustomer(customer: Customer): string {
  if (!allCustomers.includes(customer)) allCustomers.push(customer);
  return customer.toString();
}
export function getAllCustomers() {
  return allCustomers;
}

export function renderSubsidiary(subsidiary: Subsidiary): string {
  return subsidiary.toString();
}

export function renderAmount(amount: number): string {
  return amount.toFixed(2);
}

export function renderProgram(program: Program): string {
  return program.toString();
}

export function renderTransactionType(transactionType: TransactionType): string {
  return transactionType.toString();
}

export function buildRenderer<T extends Record<string, any>>(config: Record<string, (value: any) => string>) {
  return function renderer(obj: T): Record<string, string> {
    return Object.keys(obj)
      .reduce((accum, k) => ({
        ...accum,
        [k]: k in config ? config[k](obj[k]) : <string><any> obj[k],
      }), {});
  }
}

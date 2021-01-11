import fs from 'fs';
import path from 'path';
import csvStringify from 'csv-stringify/lib/sync';
import config from '../../config';
import {
  Bill as BillType,
  CashRefund as CashRefundType,
  CashSale as CashSaleType,
  CreditCardCharge as CreditCardChargeType,
  Transfer as TransferType,
} from '../types';
import { renderBill, convertBill } from './Bill';
import { renderCashRefund, convertCashRefund } from './CashRefund';
import { renderCashSale, convertCashSale } from './CashSale';
import { renderCreditCardCharge, convertCreditCardCharge } from './CreditCardCharge';
import { renderTransfer, convertTransfer } from './Transfer';
import { BankStatementTransaction, renderBankStatementTransaction } from './BankStatementTransaction';
import { renderCustomer } from './Customer';
import { renderVendor } from './Vendor';
import { getAllCustomers, getAllVendors } from './render';

const OUT_DIR = path.join(path.dirname(path.dirname(path.dirname(__dirname))), 'out');

async function saveCsv(file: string, records: Record<string, string>[]): Promise<void> {
  const value = csvStringify(records, { header: true });
  return fs.writeFileSync(path.join(OUT_DIR, `${file}.csv`), value);
}

async function saveMetaCsvs() {
  await saveCsv('Customers', getAllCustomers()
    .map((name) => renderCustomer({
      'Company Name': name,
      'Customer ID': name,
      'External ID': name,
      'Primary Subsidiary': config.netsuite.defaultSubsidiary,
    }),
  ));

  await saveCsv('Vendors', getAllVendors()
    .map((name) => renderVendor({
      'Company Name': name,
      'Vendor ID': name,
      'External ID': name,
      'Primary Subsidiary': config.netsuite.defaultSubsidiary,
    })
  ));
}

export default class TemplateGenerator {
  files: Record<string, Record<string, string>[]>;

  constructor(accountType: 'DEBIT' | 'CREDIT') {
    this.files = {
      bills: [],
      cashRefunds: [],
      cashSales: [],
      creditCardCharges: [],
      transfers: [],
    }
  }

  addBill(bill: BillType) {
    this.files.bills.push(renderBill(convertBill(bill)));
  }

  addCashRefund(cashRefund: CashRefundType) {
    this.files.cashRefunds.push(renderCashRefund(convertCashRefund(cashRefund)));
  }

  addCashSale(cashSale: CashSaleType) {
    this.files.cashSales.push(renderCashSale(convertCashSale(cashSale)));
  }

  addCreditCardCharge(creditCardCharge: CreditCardChargeType) {
    this.files.creditCardCharges.push(renderCreditCardCharge(convertCreditCardCharge(creditCardCharge)))
  }

  addTransfer(transfer: TransferType) {
    this.files.transfers.push(renderTransfer(convertTransfer(transfer)));
  }

  async save(prefix: string) {
    await Promise.all(
      Object.keys(this.files)
        .map((name) => saveCsv(`${prefix}${name}`, this.files[name])),
    );
  }
}

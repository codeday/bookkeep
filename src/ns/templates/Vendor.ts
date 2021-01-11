import { Subsidiary } from '../types';
import { buildRenderer, renderSubsidiary } from './render';

export interface Vendor {
  'Company Name': string
  'Vendor ID': string
  'External ID': string
  'Primary Subsidiary': Subsidiary
}

export const renderVendor = buildRenderer<Vendor>({
  'Primary Subsidiary': renderSubsidiary,
});

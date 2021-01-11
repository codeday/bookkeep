import { Subsidiary } from './ns/types';

const envRequired = [
  'NS_ACCOUNT_ID',
  'NS_MAX_CONCURRENCY',
  'NS_CONSUMER_ID',
  'NS_CONSUMER_SECRET',
  'NS_DEFAULT_SUBSIDIARY',
  'DIVVY_COMPANY_ID',
];

for (const req of envRequired) {
  if (typeof process.env[req] === 'undefined') {
    throw new Error(`The envronment variable ${req} is required.`);
  }
}

export default {
  netsuite: {
    accountId: Number.parseInt(<string>process.env.NS_ACCOUNT_ID) || 0,
    accountApiBase: `https://${<string>process.env.NS_ACCOUNT_ID}.suitetalk.api.netsuite.com/services/rest`,
    maxConcurrency: Number.parseInt(<string>process.env.NS_MAX_CONCURRENCY) || 1,
    consumerId: <string>process.env.NS_CONSUMER_ID,
    consumerSecret: <string>process.env.NS_CONSUMER_SECRET,
    tokenId: <string>process.env.NS_TOKEN_ID,
    tokenSecret: <string>process.env.TOKEN_SECRET,
    defaultSubsidiary: <Subsidiary>process.env.NS_DEFAULT_SUBSIDIARY,
  },
  divvy: {
    username: process.env.DIVVY_USERNAME,
    password: process.env.DIVVY_PASSWORD,
    companyId: <string>process.env.DIVVY_COMPANY_ID,
  }
}

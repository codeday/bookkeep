import puppeteer from 'puppeteer-extra';
import { Page, Frame, Browser } from 'puppeteer';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { decode } from 'jsonwebtoken';
import { DivvyToken, DivvyTokenAndSignedString } from './DivvyToken';
import { INIT_LOGIN_URL } from './constants';
import { getQueryVariable } from '../../utils/queryString';

puppeteer.use(StealthPlugin());

const MATCH_PARAM = 'access_token';
const USERNAME_FIELD_QUERY = 'input[name="email"]';
const PASSWORD_FIELD_QUERY = 'input[name="password"]';
const SUBMIT_BUTTON_QUERY = 'button[name="submit"]'

/**
 * Uses the Puppeteer event API to watch for the token exchange to complete, and extracts the token
 * from the URL.
 */
async function waitForToken(page: Page): Promise<DivvyTokenAndSignedString> {
  let checkRequestForToken: undefined | ((frame: Frame) => void);
  let accessToken: string;

  do {
    // Start monitoring requests.
    accessToken = await new Promise<string>((resolve) => {
      checkRequestForToken = (frame) => {
        const fragment = frame.url().split('#', 2)[1] || '';
        const accessToken = getQueryVariable(fragment, MATCH_PARAM);
        if (accessToken) resolve(accessToken);
      };
      page.on('framenavigated', checkRequestForToken);
    });

    // URL which should contain access token was found, stop monitoring the requests.
    if (typeof checkRequestForToken !== 'undefined') page.off('framenavigated', checkRequestForToken);
  } while (!accessToken);

  // Verify the access token looks correct
  if (typeof accessToken === 'undefined' || accessToken.length === 0) {
    throw new Error('Divvy access token is invalid.');
  }

  // Decode the access token
  const token = <DivvyToken>decode(accessToken);
  return {
    token,
    signedString: accessToken,
  };
}

/**
 * Gets the token from the page
 */
export async function login(username?: string, password?: string): Promise<DivvyTokenAndSignedString> {
  // Launch a Chrome browser and navigate to the login page.
  const browser = <Browser><unknown> await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(INIT_LOGIN_URL);

  // Autofill form fields if specified. (Will probably still require OTP, so browser is still shown.)
  if (typeof username !== 'undefined') await page.type(USERNAME_FIELD_QUERY, username);
  if (typeof password !== 'undefined') await page.type(PASSWORD_FIELD_QUERY, password);
  if (typeof username !== 'undefined' && typeof password !== 'undefined') await page.click(SUBMIT_BUTTON_QUERY);

  // Wait for the user to complete the login process.
  // We can tell the login is complete when the user is redirected back with their access token in the URL fragment.
  const result = await waitForToken(page);

  // Login is complete
  await browser.close();

  return result;
}

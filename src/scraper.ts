import puppeteer, { Browser, ElementHandle, Page } from 'puppeteer';
import ExtendedHandle from './ExtendedHandle.js';

export class Scraper {
  baseUrl!: string;
  browser!: Browser;
  page!: Page;

  constructor() {}

  init = async (baseUrl: string) => {
    if (!baseUrl) {
      console.error('baseUrl is: ', baseUrl);
    }
    console.info('Initializing scraper');

    this.baseUrl = baseUrl;
    this.browser = await puppeteer.launch({ headless: 'new' });
    this.page = await this.browser.newPage();
  };

  goto = async (path: string): Promise<void> => {
    if (this.matchesPath(path)) {
      console.error(`Path ${path} does not match path regex`);
    }

    console.info('Going to path');

    await this.page.goto(`${this.baseUrl}/${path}`);
  };

  matchesPath = (path: string): boolean => {
    console.info('Checking if path matches regex');

    const pathRegex = /^(\/[\w-]+)*\/?$/; // matches /path/to/resource
    const result = path.match(pathRegex);
    return !!result && result[0] === path;
  };

  getHandleBySelector = async (
    selector: string,
  ): Promise<ElementHandle | null> => {
    console.info('Getting content by selector');

    return await this.page.waitForSelector(selector);
  };

  getExtendedHandleBySelector = async (selector: string) => {
    const handle = await this.getHandleBySelector(selector);
    if (handle === null) {
      console.error('Handle is null');
      return;
    }
    return new ExtendedHandle(handle);
  };
}

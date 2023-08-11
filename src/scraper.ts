import puppeteer, { Browser, ElementHandle, Page } from 'puppeteer';
import ExtendedHandle from './ExtendedHandle.ts';

export class Scraper {
  baseUrl: string;
  browser!: Browser;
  page!: Page;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  init = async () => {
    console.info('Initializing scraper');
    this.browser = await puppeteer.launch({ headless: 'new' });
    this.page = await this.browser.newPage();
  };

  goto = async (path: string): Promise<void> => {
    console.info('Going to path');

    if (this.matchesPath(path)) {
      console.error(`Path ${path} does not match path regex`);
    }
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

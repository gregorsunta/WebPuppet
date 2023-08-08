import puppeteer from 'puppeteer';
import ExtendedHandle from './ExtendedHandle.js';
class Scraper {
    constructor(baseUrl) {
        this.init = async () => {
            console.info('Initializing scraper');
            this.browser = await puppeteer.launch({ headless: 'new' });
            this.page = await this.browser.newPage();
        };
        this.goto = async (path) => {
            console.info('Going to path');
            if (this.matchesPath(path)) {
                console.error(`Path ${path} does not match path regex`);
            }
            await this.page.goto(`${this.baseUrl}/${path}`);
        };
        this.matchesPath = (path) => {
            console.info('Checking if path matches regex');
            const pathRegex = /^(\/[\w-]+)*\/?$/; // matches /path/to/resource
            const result = path.match(pathRegex);
            return !!result && result[0] === path;
        };
        this.getHandleBySelector = async (selector) => {
            console.info('Getting content by selector');
            return await this.page.waitForSelector(selector);
        };
        this.getExtendedHandleBySelector = async (selector) => {
            const handle = await this.getHandleBySelector(selector);
            if (handle === null) {
                console.error('Handle is null');
                return;
            }
            return new ExtendedHandle(handle);
        };
        this.baseUrl = baseUrl;
    }
}
export default Scraper;

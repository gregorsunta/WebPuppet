import assert from 'node:assert/strict';
import Scraper from '../src/scraper.js';
describe('Scraper', function () {
    const ScraperInstance = new Scraper('https://www.google.com/');
    describe('baseUrl', function () {
        it('returns the correct baseUrl', function () {
            assert.equal(ScraperInstance.baseUrl, 'https://www.google.com/');
        });
    });
    describe('matchesPath', function () {
        const tests = [
            {
                description: 'leading /',
                args: '/path/to/some/resource',
                expected: true,
            },
            {
                description: 'query',
                args: '/some/path?query=string',
                expected: false,
            },
            { description: 'trailing //', args: '/path//', expected: false },
        ];
        tests.forEach(({ description, args, expected }) => {
            it(`Test with ${description} is evaluated correctly`, function () {
                assert.equal(ScraperInstance.matchesPath(args), expected);
            });
        });
    });
});

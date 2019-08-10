/* global page, jestPuppeteer */

const port = process.env.PORT || '8080';

const names = [
  'react-redux',
  'reactive-react-redux',
  'react-tracked',
  'constate',
  'unstated-next',
  'zustand',
  'react-sweet-state',
  'storeon',
  'react-hooks-global-state',
  'use-context-selector',
  'mobx-react-lite',
  'use-subscription',
];

const sleep = ms => new Promise(r => setTimeout(r, ms));
jest.setTimeout(15 * 1000);
const REPEAT = 8;
const NUM_COMPONENTS = 50;

names.forEach((name) => {
  describe(name, () => {
    let delays;

    beforeAll(async () => {
      await page.goto(`http://localhost:${port}/${name}`);
      const title = await page.title();
      if (title !== name) throw new Error('initial name mismatch');
    });

    it('check1: updated properly', async () => {
      await expect(page).toMatchElement('.count', {
        text: '0',
      });
      delays = [];
      for (let i = 0; i < REPEAT; ++i) {
        const start = Date.now();
        await Promise.all([ // eslint-disable-line no-await-in-loop
          page.click('#button1'),
          sleep(10).then(() => page.click('#button2')),
        ]);
        delays.push(Date.now() - start);
      }
      console.log(name, delays);
      await Promise.all([...Array(NUM_COMPONENTS).keys()].map(async (i) => {
        await expect(page).toMatchElement(`.count:nth-of-type(${i + 1})`, {
          text: `${REPEAT * 2}`,
          timeout: 10 * 1000,
        });
      }));
    });

    it('check2: no tearing during update', async () => {
      await expect(page.title()).resolves.toBe(name); // check if not "failed"
    });

    it('check3: ability to interrupt render', async () => {
      const avg = delays.reduce((a, b) => a + b) / delays.length;
      expect(avg).toBeLessThan(200); // rough estimate
    });

    it('check4: proper update after interrupt', async () => {
      await Promise.all([
        page.click('#button1'),
        page.click('#button2'),
        page.click('#forceupdate'),
      ]);
      await expect(page).toMatchElement('.parentCount', {
        text: `${REPEAT * 2 + 2}`,
        timeout: 5 * 1000,
      });
      await Promise.all([...Array(NUM_COMPONENTS).keys()].map(async (i) => {
        await expect(page).toMatchElement(`.count:nth-of-type(${i + 1})`, {
          text: `${REPEAT * 2 + 2}`,
          timeout: 5 * 1000,
        });
      }));
    });

    afterAll(async () => {
      await jestPuppeteer.resetBrowser();
    });
  });
});

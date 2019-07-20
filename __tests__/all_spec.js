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
];

jest.setTimeout(15 * 1000);
const REPEAT = 5;

names.forEach((name) => {
  describe(name, () => {
    let delays;

    beforeAll(async () => {
      await page.goto(`http://localhost:${port}/${name}`);
      const title = await page.title();
      if (title !== name) throw new Error('initial name mismatch');
      const ele = await page.$('.count');
      const text = await page.evaluate(e => e.textContent, ele);
      if (text !== '0') throw new Error('initial count mismatch');

      delays = [];
      for (let i = 0; i < REPEAT; ++i) {
        const start = Date.now();
        await Promise.all([ // eslint-disable-line no-await-in-loop
          page.click('#button1'),
          page.click('#button2'),
        ]);
        delays.push(Date.now() - start);
      }
      console.log(name, delays);
    });

    it('check1: updated properly', async () => {
      await expect(page).toMatchElement('.count', {
        text: `${REPEAT * 2}`,
        timeout: 10 * 1000,
      });
    });

    it('check2: no tearing during update', async () => {
      await expect(page.title()).resolves.toBe(name);
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
      await expect(page).toMatchElement('.count', {
        text: `${REPEAT * 2 + 2}`,
        timeout: 5 * 1000,
      });
    });

    afterAll(async () => {
      await jestPuppeteer.resetBrowser();
    });
  });
});

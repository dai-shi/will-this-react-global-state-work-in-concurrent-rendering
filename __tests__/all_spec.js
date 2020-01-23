/* global page, jestPuppeteer */

const port = process.env.PORT || '8080';

const names = [
  'react-redux',
  'reactive-react-redux',
  'react-tracked',
  'constate',
  'zustand',
  'react-sweet-state',
  'storeon',
  'react-hooks-global-state',
  'use-context-selector',
  'mobx-react-lite',
  'use-subscription',
  'mobx-use-sub',
  'react-state',
  'simplux',
  'react-apollo',
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
jest.setTimeout(15 * 1000);
const REPEAT = 5;
const DOUBLE = 2; // two clicks to increment one
const NUM_COMPONENTS = 50 + 1; // defined in src/common.js plus count in <Main>

names.forEach((name) => {
  describe(name, () => {
    describe('check with events from outside', () => {
      let delays;

      beforeAll(async () => {
        await page.goto(`http://localhost:${port}/${name}/index.html`);
        const title = await page.title();
        if (title === 'failed') throw new Error('failed to reset title');
        // wait until all counts become zero
        await Promise.all([...Array(NUM_COMPONENTS).keys()].map(async (i) => {
          await expect(page).toMatchElement(`.count:nth-of-type(${i + 1})`, {
            text: '0',
            timeout: 5 * 1000,
          });
        }));
      });

      it('check 1: updated properly', async () => {
        delays = [];
        for (let loop = 0; loop < REPEAT * DOUBLE; loop += 1) {
          const start = Date.now();
          // click buttons three times
          await Promise.all([
            page.click('#remoteIncrement'),
            page.click('#remoteIncrement'),
            sleep(50).then(() => page.click('#remoteIncrement')), // a bit delayed
          ]);
          delays.push(Date.now() - start);
        }
        console.log(name, delays);
        // check if all counts become REPEAT * 3
        await Promise.all([...Array(NUM_COMPONENTS).keys()].map(async (i) => {
          await expect(page).toMatchElement(`.count:nth-of-type(${i + 1})`, {
            text: `${REPEAT * 3}`,
            timeout: 10 * 1000,
          });
        }));
      });

      it('check 2: no tearing during update', async () => {
        // check if there's inconsistency during update
        // see useCheckTearing() in src/common.js
        await expect(page.title()).resolves.not.toBe('failed');
      });

      it('check 3: ability to interrupt render', async () => {
        // check delays taken by clicking buttons in check1
        // each render takes at least 20ms and there are 50 components,
        // it triggers triple clicks, so 300ms on average.
        const avg = delays.reduce((a, b) => a + b) / delays.length;
        expect(avg).toBeLessThan(300);
      });

      it('check 4: proper update after interrupt', async () => {
        // click both buttons to update local count during updating shared count
        await Promise.all([
          page.click('#remoteIncrement'),
          page.click('#remoteIncrement'),
          page.click('#localIncrement'),
          page.click('#remoteIncrement'),
          page.click('#remoteIncrement'),
          page.click('#localIncrement'),
        ]);
        // check if all counts become REPEAT * 3 + 2
        await Promise.all([...Array(NUM_COMPONENTS).keys()].map(async (i) => {
          await expect(page).toMatchElement(`.count:nth-of-type(${i + 1})`, {
            text: `${REPEAT * 3 + 2}`,
            timeout: 5 * 1000,
          });
        }));
      });

      afterAll(async () => {
        await jestPuppeteer.resetBrowser();
      });
    });

    describe('check with useTransaction', () => {
      beforeAll(async () => {
        await page.goto(`http://localhost:${port}/${name}/index.html`);
        const title = await page.title();
        if (title === 'failed') throw new Error('failed to reset title');
        // wait until all counts become zero
        await Promise.all([...Array(NUM_COMPONENTS).keys()].map(async (i) => {
          await expect(page).toMatchElement(`.count:nth-of-type(${i + 1})`, {
            text: '0',
            timeout: 5 * 1000,
          });
        }));
        await sleep(1000); // to make it stable
      });

      it('check 5: updated properly with transition', async () => {
        // click a button with transition
        await page.click('#transitionIncrement');
        await sleep(10).then(() => page.click('#transitionIncrement'));
        await sleep(20).then(() => page.click('#transitionIncrement'));
        await sleep(30).then(() => page.click('#transitionIncrement'));
        // wait for pending
        await expect(page).toMatchElement('#pending', {
          text: 'Pending...',
          timeout: 5 * 1000,
        });
        // check if all counts become button clicks / 2
        await Promise.all([...Array(NUM_COMPONENTS).keys()].map(async (i) => {
          await expect(page).toMatchElement(`.count:nth-of-type(${i + 1})`, {
            text: '2',
            timeout: 5 * 1000,
          });
        }));
        // check if pending is clear
        await sleep(1000); // to make it stable
        await expect(page.evaluate(() => document.getElementById('pending').innerHTML)).resolves.not.toBe('Pending...');
      });

      it('check 6: no tearing with transition', async () => {
        // check if there's inconsistency during update
        // see useCheckTearing() in src/common.js
        await expect(page.title()).resolves.not.toBe('failed');
      });

      it('check 7: proper branching with transition', async () => {
        // click a button with transition
        await Promise.all([
          page.click('#transitionIncrement'),
          page.click('#transitionIncrement'),
          sleep(50).then(() => page.click('#transitionIncrement')), // a bit delayed
          sleep(50).then(() => page.click('#transitionIncrement')), // a bit delayed
        ]);
        // click a button without transition
        await Promise.all([
          page.click('#normalIncrement'),
          page.click('#normalIncrement'),
        ]);
        // wait for pending
        await expect(page).toMatchElement('#pending', {
          text: 'Pending...',
          timeout: 5 * 1000,
        });
        // check if all counts become button +1 by normal increment
        await Promise.all([...Array(NUM_COMPONENTS).keys()].map(async (i) => {
          await expect(page).toMatchElement(`.count:nth-of-type(${i + 1})`, {
            text: '3',
            timeout: 5 * 1000,
          });
        }));
        // check if pending is still active
        await expect(page.evaluate(() => document.getElementById('pending').innerHTML)).resolves.toBe('Pending...');
        // check if all counts become button +2 by transition increment
        await Promise.all([...Array(NUM_COMPONENTS).keys()].map(async (i) => {
          await expect(page).toMatchElement(`.count:nth-of-type(${i + 1})`, {
            text: '5',
            timeout: 5 * 1000,
          });
        }));
        // check if pending is clear
        await expect(page.evaluate(() => document.getElementById('pending').innerHTML)).resolves.not.toBe('Pending...');
      });

      afterAll(async () => {
        await jestPuppeteer.resetBrowser();
      });
    });
  });
});

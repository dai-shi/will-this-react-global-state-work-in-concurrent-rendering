/* global page, jestPuppeteer */

import {
  COUNT_PER_DUMMY,
  NUM_CHILD_COMPONENTS,
} from '../src/common';

const port = process.env.PORT || '8080';

const names = [
  'react-redux',
  'redux-use-mutable-source',
  'reactive-react-redux',
  'react-tracked',
  'constate',
  'zustand',
  'react-hooks-global-state',
  'use-context-selector',
  'use-subscription',
  'react-state',
  'simplux',
  'apollo-client',
  'recoil',
  'jotai',
  'effector',
  'react-rxjs',
  'valtio',
  'proxily',
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
jest.setTimeout(15 * 1000);
const REPEAT = 3;
const NUM_COMPONENTS = NUM_CHILD_COMPONENTS + 1; // plus one in <Main>
const TRANSITION_REPEAT_1 = 3;
const TRANSITION_REPEAT_2 = 2;

names.forEach((name) => {
  describe(name, () => {
    /*
    describe('check with events from outside', () => {
      let delays;

      beforeAll(async () => {
        await page.goto(`http://localhost:${port}/${name}/index.html`);
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
        for (let loop = 0; loop < REPEAT * COUNT_PER_DUMMY; loop += 1) {
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
        await expect(page.title()).resolves.not.toMatch(/TEARED/);
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
          ...([...Array(COUNT_PER_DUMMY)].map(() => (
            page.click('#remoteIncrement')
          ))),
          page.click('#localIncrement'),
          ...([...Array(COUNT_PER_DUMMY)].map(() => (
            page.click('#remoteIncrement')
          ))),
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
    */

    describe('with useTransition', () => {
      let delays;

      beforeAll(async () => {
        await page.goto(`http://localhost:${port}/${name}/index.html`);
        // wait until all counts become zero
        await Promise.all([...Array(NUM_COMPONENTS).keys()].map(async (i) => {
          await expect(page).toMatchElement(`.count:nth-of-type(${i + 1})`, {
            text: '0',
            timeout: 5 * 1000,
          });
        }));
        await sleep(2000); // to make it stable
      });

      it('test 1: updated properly with transition', async () => {
        delays = [];
        // click a button with transition
        for (let loop = 0; loop < TRANSITION_REPEAT_1 * COUNT_PER_DUMMY; loop += 1) {
          const start = Date.now();
          await page.click('#transitionIncrement');
          delays.push(Date.now() - start);
          await sleep(100);
        }
        console.log(name, delays);
        // wait for pending
        await expect(page).toMatchElement('#pending', {
          text: 'Pending...',
          timeout: 2 * 1000,
        });
        await sleep(1000); // this is a magic number (better way?)
        // wait until pending disappers
        await expect(page).toMatchElement('#pending', {
          text: '',
          timeout: 10 * 1000,
        });
        // the first one should be changed
        await expect(page.evaluate(() => document.querySelector('.count:first-of-type').innerHTML)).resolves.not.toBe('0');
      });

      it('test 2: no tearing with transition', async () => {
        // check if all counts become button clicks / 2
        await Promise.all([...Array(NUM_COMPONENTS).keys()].map(async (i) => {
          await expect(page).toMatchElement(`.count:nth-of-type(${i + 1})`, {
            text: `${TRANSITION_REPEAT_1}`,
            timeout: 5 * 1000,
          });
        }));
        // check if there's inconsistency during update
        // see useCheckTearing() in src/common.js
        await expect(page.title()).resolves.not.toMatch(/TEARED/);
      });

      it('test 3: ability to interrupt render', async () => {
        // check delays taken by clicking buttons in check1
        // each render takes at least 20ms and there are 50 components,
        // it triggers triple clicks, so 300ms on average.
        const avg = delays.reduce((a, b) => a + b) / delays.length;
        expect(avg).toBeLessThan(300);
      });

      it('test 4: proper branching with transition', async () => {
        // click a button with transition
        for (let loop = 0; loop < TRANSITION_REPEAT_2 * COUNT_PER_DUMMY; loop += 1) {
          await page.click('#transitionIncrement');
          await sleep(100);
        }
        // wait for pending
        await expect(page).toMatchElement('#pending', {
          text: 'Pending...',
          timeout: 2 * 1000,
        });
        // click normal double button
        await page.click('#normalDouble');
        // check if all counts become doubled before increment
        await Promise.all([...Array(NUM_COMPONENTS).keys()].map(async (i) => {
          await expect(page).toMatchElement(`.count:nth-of-type(${i + 1})`, {
            text: `${TRANSITION_REPEAT_1 * 2}`,
            timeout: 5 * 1000,
          });
        }));
        // check if all counts become doubled after increment
        await Promise.all([...Array(NUM_COMPONENTS).keys()].map(async (i) => {
          await expect(page).toMatchElement(`.count:nth-of-type(${i + 1})`, {
            text: `${(TRANSITION_REPEAT_1 + TRANSITION_REPEAT_2) * 2}`,
            timeout: 5 * 1000,
          });
        }));
      });

      afterAll(async () => {
        await jestPuppeteer.resetBrowser();
      });
    });

    describe('with intensive auto increment', () => {
      beforeAll(async () => {
        await page.goto(`http://localhost:${port}/${name}/index.html`);
        // wait until all counts become zero
        await Promise.all([...Array(NUM_COMPONENTS).keys()].map(async (i) => {
          await expect(page).toMatchElement(`.count:nth-of-type(${i + 1})`, {
            text: '0',
            timeout: 5 * 1000,
          });
        }));
        await page.evaluate((count) => {
          document.getElementById('autoIncrementCount').value = count;
        }, REPEAT * COUNT_PER_DUMMY);
      });

      it('test 5: updated properly with auto increment', async () => {
        for (let loop = 0; loop < COUNT_PER_DUMMY; loop += 1) {
          await page.click('#remoteIncrement');
        }
        // check if all counts become REPEAT + 1
        await Promise.all([...Array(NUM_COMPONENTS).keys()].map(async (i) => {
          await expect(page).toMatchElement(`.count:nth-of-type(${i + 1})`, {
            text: `${REPEAT + 1}`,
            timeout: 10 * 1000,
          });
        }));
      });

      it('test 6: no tearing with auto increment', async () => {
        // check if there's inconsistency during update
        // see useCheckTearing() in src/common.js
        await expect(page.title()).resolves.not.toMatch(/TEARED/);
      });

      afterAll(async () => {
        await jestPuppeteer.resetBrowser();
      });
    });
  });
});

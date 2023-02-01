/* global page, jestPuppeteer */

import { NUM_CHILD_COMPONENTS } from '../src/common';

const NUM_COMPONENTS = NUM_CHILD_COMPONENTS + 1; // plus one in <Main>
const ids = [...Array(NUM_COMPONENTS).keys()];
const REPEAT = 5;

const port = process.env.PORT || '8080';

const sleep = (ms) => new Promise((r) => {
  setTimeout(r, ms);
});
jest.setTimeout(20 * 1000);

const names = [
  // 'react-state',
  'react-redux',
  'zustand',
  'react-tracked',
  'constate',
  'react-hooks-global-state',
  'use-context-selector-base',
  'use-context-selector',
  'use-subscription',
  'apollo-client',
  'recoil',
  'recoil_UNSTABLE',
  'jotai',
  'use-atom',
  'valtio',
  'effector',
  'react-rxjs',
  'simplux',
  'react-query',
];

names.forEach((name) => {
  describe(name, () => {
    beforeEach(async () => {
      await page.goto(`http://localhost:${port}/${name}/index.html`);
      await sleep(1000); // to make it stable
    });

    afterEach(async () => {
      await jestPuppeteer.resetBrowser();
    });

    describe('With useTransition', () => {
      describe('Level 1', () => {
        it('No tearing finally on update', async () => {
          await page.click('#transitionShowCounter');
          // wait until all counts become zero
          await Promise.all(ids.map(async (i) => {
            await expect(page).toMatchElement(`.count:nth-of-type(${i + 1})`, {
              text: '0',
              timeout: 5 * 1000,
            });
          }));
          for (let loop = 0; loop < REPEAT; loop += 1) {
            await page.click('#transitionIncrement');
            await sleep(100);
          }
          // check if all counts become REPEAT
          await Promise.all(ids.map(async (i) => {
            await expect(page).toMatchElement(`.count:nth-of-type(${i + 1})`, {
              text: `${REPEAT}`,
              timeout: 10 * 1000,
            });
          }));
        });

        it('No tearing finally on mount', async () => {
          await page.click('#startAutoIncrement');
          await sleep(100);
          await page.click('#transitionShowCounter');
          await sleep(1000);
          await page.click('#stopAutoIncrement');
          await sleep(2000);
          const count = page.evaluate(() => document.querySelector('.count:first-of-type'));
          await Promise.all(ids.map(async (i) => {
            await expect(page).toMatchElement(`.count:nth-of-type(${i + 1})`, {
              text: count,
              timeout: 10 * 1000,
            });
          }));
        });
      });

      describe('Level 2', () => {
        it('No tearing temporarily on update', async () => {
          await page.click('#transitionShowCounter');
          // wait until all counts become zero
          await Promise.all(ids.map(async (i) => {
            await expect(page).toMatchElement(`.count:nth-of-type(${i + 1})`, {
              text: '0',
              timeout: 5 * 1000,
            });
          }));
          for (let loop = 0; loop < REPEAT; loop += 1) {
            await page.click('#transitionIncrement');
            await sleep(100);
          }
          await sleep(5000);
          // check if there's inconsistency during update
          // see useCheckTearing() in src/common.js
          await expect(page.title()).resolves.not.toMatch(/TEARED/);
        });

        it('No tearing temporarily on mount', async () => {
          await page.click('#startAutoIncrement');
          await sleep(100);
          await page.click('#transitionShowCounter');
          await sleep(1000);
          await page.click('#stopAutoIncrement');
          await sleep(2000);
          // check if there's inconsistency during update
          // see useCheckTearing() in src/common.js
          await expect(page.title()).resolves.not.toMatch(/TEARED/);
        });
      });

      describe('Level 3', () => {
        it('Can interrupt render (time slicing)', async () => {
          await page.click('#transitionShowCounter');
          // wait until all counts become zero
          await Promise.all(ids.map(async (i) => {
            await expect(page).toMatchElement(`.count:nth-of-type(${i + 1})`, {
              text: '0',
              timeout: 5 * 1000,
            });
          }));
          const delays = [];
          for (let loop = 0; loop < REPEAT; loop += 1) {
            const start = Date.now();
            await page.click('#transitionIncrement');
            delays.push(Date.now() - start);
            await sleep(100);
          }
          console.log(name, delays);
          // check delays taken by clicking buttons in check1
          // each render takes at least 20ms and there are 50 components,
          // it triggers triple clicks, so 300ms on average.
          const avg = delays.reduce((a, b) => a + b) / delays.length;
          expect(avg).toBeLessThan(300);
        });

        it('Can branch state (wip state)', async () => {
          await page.click('#transitionShowCounter');
          await page.click('#transitionIncrement');
          await Promise.all(ids.map(async (i) => {
            await expect(page).toMatchElement(`.count:nth-of-type(${i + 1})`, {
              text: '1',
              timeout: 5 * 1000,
            });
          }));
          await page.click('#transitionIncrement');
          await sleep(100);
          await page.click('#transitionIncrement');
          // wait for pending
          await expect(page).toMatchElement('#pending', {
            text: 'Pending...',
            timeout: 2 * 1000,
          });
          // Make sure that while isPending true, previous state displayed
          await expect(page.evaluate(() => document.querySelector('#mainCount').innerHTML)).resolves.toBe('1');
          await expect(page.evaluate(() => document.querySelector('.count:first-of-type').innerHTML)).resolves.toBe('1');
          // click normal double button
          await page.click('#normalDouble');
          // check if all counts become doubled before increment
          await Promise.all(ids.map(async (i) => {
            await expect(page).toMatchElement(`.count:nth-of-type(${i + 1})`, {
              text: '2',
              timeout: 5 * 1000,
            });
          }));
          // check if all counts become doubled after increment
          await Promise.all(ids.map(async (i) => {
            await expect(page).toMatchElement(`.count:nth-of-type(${i + 1})`, {
              text: '6',
              timeout: 5 * 1000,
            });
          }));
        });
      });
    });

    describe('With useDeferredValue', () => {
      describe('Level 1', () => {
        it('No tearing finally on update', async () => {
          await page.click('#transitionShowDeferred');
          // wait until all counts become zero
          await Promise.all(ids.map(async (i) => {
            await expect(page).toMatchElement(`.count:nth-of-type(${i + 1})`, {
              text: '0',
              timeout: 5 * 1000,
            });
          }));
          for (let loop = 0; loop < REPEAT; loop += 1) {
            await page.click('#normalIncrement');
            await sleep(100);
          }
          // check if all counts become REPEAT
          await Promise.all(ids.map(async (i) => {
            await expect(page).toMatchElement(`.count:nth-of-type(${i + 1})`, {
              text: `${REPEAT}`,
              timeout: 10 * 1000,
            });
          }));
        });

        it('No tearing finally on mount', async () => {
          await page.click('#startAutoIncrement');
          await sleep(100);
          await page.click('#transitionShowDeferred');
          await sleep(1000);
          await page.click('#stopAutoIncrement');
          await sleep(2000);
          const count = page.evaluate(() => document.querySelector('.count:first-of-type'));
          await Promise.all(ids.map(async (i) => {
            await expect(page).toMatchElement(`.count:nth-of-type(${i + 1})`, {
              text: count,
              timeout: 10 * 1000,
            });
          }));
        });
      });

      describe('Level 2', () => {
        it('No tearing temporarily on update', async () => {
          await page.click('#transitionShowDeferred');
          // wait until all counts become zero
          await Promise.all(ids.map(async (i) => {
            await expect(page).toMatchElement(`.count:nth-of-type(${i + 1})`, {
              text: '0',
              timeout: 5 * 1000,
            });
          }));
          for (let loop = 0; loop < REPEAT; loop += 1) {
            await page.click('#normalIncrement');
            await sleep(100);
          }
          await sleep(5000);
          // check if there's inconsistency during update
          // see useCheckTearing() in src/common.js
          await expect(page.title()).resolves.not.toMatch(/TEARED/);
        });

        it('No tearing temporarily on mount', async () => {
          await page.click('#startAutoIncrement');
          await sleep(100);
          await page.click('#transitionShowDeferred');
          await sleep(1000);
          await page.click('#stopAutoIncrement');
          await sleep(2000);
          // check if there's inconsistency during update
          // see useCheckTearing() in src/common.js
          await expect(page.title()).resolves.not.toMatch(/TEARED/);
        });
      });
    });
  });
});

/* global page */

const port = process.env.PORT || '8080';

const names = [
  'react-redux',
  'reactive-react-redux',
  'react-tracked',
  'constate',
  'unstated-next',
  'zustand',
  'react-sweet-state',
];

names.forEach((name) => {
  describe(name, () => {
    beforeAll(async () => {
      await page.goto(`http://localhost:${port}/#${name}`);
    });

    afterAll(async () => {
      await page.goto('about:blank');
    });

    it('title check', async () => {
      await expect(page.title()).resolves.toBe(name);
    });

    it('init check', async () => {
      await expect(page).toMatchElement('.count', {
        text: '0',
      });
    });

    it('multiple click', async () => {
      for (let i = 0; i < 50; ++i) {
        page.click('#button');
      }
      await page.click('#button');
    });

    it('count check', async () => {
      await expect(page).toMatchElement('.count', {
        text: '51',
      });
    });

    it('title check (not failed)', async () => {
      await expect(page.title()).resolves.toBe(name);
    });
  });
});

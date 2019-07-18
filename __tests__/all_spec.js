/* global page, context */

jest.setTimeout(15 * 1000);

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

names.forEach((name) => {
  describe(name, () => {
    let delays;

    beforeAll(async () => {
      await page.goto(`http://localhost:${port}/#${name}`);
      const title = await page.title();
      if (title !== name) throw new Error('initial name mismatch');
      const ele = await page.$('.count');
      const text = await page.evaluate(e => e.textContent, ele);
      if (text !== '0') throw new Error('initial count mismatch');

      delays = [];
      for (let i = 0; i < 5; ++i) {
        const start = Date.now();
        await Promise.all([ // eslint-disable-line no-await-in-loop
          page.click('#button1'),
          page.click('#button2'),
        ]);
        delays.push(Date.now() - start);
      }
      console.log(name, delays);
    });

    it('check no tearing', async () => {
      await expect(page.title()).resolves.toBe(name);
    });

    it('check avg delay < 300ms', async () => {
      const avg = delays.reduce((a, b) => a + b) / delays.length;
      expect(avg).toBeLessThan(300);
    });

    afterAll(async () => {
      await page.close();
      // eslint-disable-next-line no-global-assign
      page = await context.newPage();
    });
  });
});

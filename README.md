# Will this React global state work in concurrent mode?

Checking tearing in React concurrent mode

## Introduction

In react-redux, there's a theoretical issue called "tearing"
that might occur in React concurrent mode.

Let's try to check it!

## How to run

```bash
git clone https://github.com/dai-shi/will-this-react-global-state-work-in-concurrent-mode.git
cd will-this-react-global-state-work-in-concurrent-mode
npm install
PORT=8080 npm run dev-server &
PORT=8080 npm run jest
```

You can also test it by opening `http://localhost:8080/#react-redux`
in your browser, and click the button very quickly. (check the console log)

## Result

```
  react-redux
    ✓ title check (16ms)
    ✓ init check (132ms)
    ✕ multiple click (482ms)
    ✕ count check (766ms)
    ✕ title check (not failed) (173ms)
  reactive-react-redux
    ✓ title check (3ms)
    ✓ init check (27ms)
    ✓ multiple click (143ms)
    ✓ count check (441ms)
    ✓ title check (not failed) (1ms)
  react-tracked
    ✓ title check (1ms)
    ✓ init check (35ms)
    ✓ multiple click (577ms)
    ✓ count check (429ms)
    ✓ title check (not failed) (1ms)
  constate
    ✓ title check (3ms)
    ✓ init check (10ms)
    ✓ multiple click (339ms)
    ✓ count check (471ms)
    ✓ title check (not failed) (2ms)
```

## Caution

Do no believe the result too much.
The test is done in a very limited way.
Something might be wrong.

## Caution2

We are not yet sure what the final conurrent mode would be.
It's likely that there could be some issues other than "tearing."

## If you are interested

The reason why I created this is to promote my projects!

- [react-tracked](https://github.com/dai-shi/react-tracked)
- [reactive-react-redux](https://github.com/dai-shi/reactive-react-redux)

The feature of these libraries is not only concurrent mode friendly,
but also state usage tracking.

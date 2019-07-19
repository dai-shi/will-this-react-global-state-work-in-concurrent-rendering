# Will this React global state work in concurrent mode?

Checking tearing in React concurrent mode

## Introduction

In react-redux, there's a theoretical issue called "tearing"
that might occur in React concurrent mode.

Let's try to check it!

## What is tearing?

- [Stack Overflow](https://stackoverflow.com/questions/54891675/what-is-tearing-in-the-context-of-the-react-redux)
- [Talk by Mark Erikson](https://www.youtube.com/watch?v=yOZ4Ml9LlWE&t=933s)
- [Talk by Flarnie Marchan](https://www.youtube.com/watch?v=V1Ly-8Z1wQA&t=1079s)

## How does it work?

A small app is implemented with each library.
The state has one count.
The app shows the count in fifty components.

There's a button outside of React and
if it's clicked it will trigger state mutation.
This is to emulate mutating an external state outside of React,
for example updating state by Redux middleware.

The render has intentionaly expensive computation.
If the mutation happens during rendering with in a tree,
there could be an inconsistency in the state.
If it finds the inconsistency, the test will fail.

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

## Screencast

![rr-tearing](https://user-images.githubusercontent.com/490574/61502196-ce109200-aa0d-11e9-9efc-6203545d367c.gif)

## Result

```
  react-redux
    ✕ check no tearing (11ms)
    ✓ check avg delay < 300ms (1ms)
  reactive-react-redux
    ✓ check no tearing (2ms)
    ✕ check avg delay < 300ms (1ms)
  react-tracked
    ✓ check no tearing (1ms)
    ✕ check avg delay < 300ms
  constate
    ✓ check no tearing (27ms)
    ✓ check avg delay < 300ms (1ms)
  unstated-next
    ✓ check no tearing (52ms)
    ✓ check avg delay < 300ms
  zustand
    ✕ check no tearing (36ms)
    ✓ check avg delay < 300ms (1ms)
  react-sweet-state
    ✕ check no tearing (39ms)
    ✓ check avg delay < 300ms (1ms)
  storeon
    ✕ check no tearing (39ms)
    ✓ check avg delay < 300ms (1ms)
  react-hooks-global-state
    ✓ check no tearing (36ms)
    ✓ check avg delay < 300ms (1ms)
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

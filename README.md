# Will this React global state work in concurrent rendering?

Test tearing and branching in React concurrent rendering

- [Discussion in React 18 WG](https://github.com/reactwg/react-18/discussions/116)

## Introduction

React 18 is coming with a new feature called "concurrent rendering".
With global state, there's a theoretical issue called "tearing"
that might occur in React concurrent rendering.

Let's test the behavior!

## What is tearing?

- [What is tearing in React 18 WG](https://github.com/reactwg/react-18/discussions/69)
- [Stack Overflow](https://stackoverflow.com/questions/54891675/what-is-tearing-in-the-context-of-the-react-redux)
- [Talk by Mark Erikson](https://www.youtube.com/watch?v=yOZ4Ml9LlWE&t=933s)
- [Talk by Flarnie Marchan](https://www.youtube.com/watch?v=V1Ly-8Z1wQA&t=1079s)
- Some other resources
  - https://github.com/reactjs/rfcs/pull/147
  - https://gist.github.com/bvaughn/054b82781bec875345bd85a5b1344698

## What is branching?

- Old resources
  - https://reactjs.org/docs/concurrent-mode-intro.html

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
git clone https://github.com/dai-shi/will-this-react-global-state-work-in-concurrent-rendering.git
cd will-this-react-global-state-work-in-concurrent-rendering
yarn install
yarn run build-all
yarn run jest
```

To automatically run tests and update the README.md on OSX:
```
yarn jest:json
yarn jest:update
```

## Screencast (old)

<img src="https://user-images.githubusercontent.com/490574/61502196-ce109200-aa0d-11e9-9efc-6203545d367c.gif" alt="Preview" width="350" />

## Test scenario

- With useTransition
  - Level 1
    - 1: No tearing finally on update
    - 2: No tearing finally on mount
  - Level 2
    - 3: No tearing temporarily on update
    - 4: No tearing temporarily on mount
  - Level 3
    - 5: Can interrupt render (time slicing)
    - 6: Can branch state (wip state)
- With useDeferredValue
  - Level 1
    - 7: No tearing finally on update
    - 8: No tearing finally on mount
  - Level 2
    - 9: No tearing temporarily on update
    - 10: No tearing temporarily on mount

## Results

<details>
<summary>Raw Output</summary>

```
   With useTransition
     Level 1
       ✓ No tearing finally on update (7940 ms)
       ✓ No tearing finally on mount (4606 ms)
     Level 2
       ✓ No tearing temporarily on update (12873 ms)
       ✓ No tearing temporarily on mount (4546 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7871 ms)
       ✕ Can branch state (wip state) (6609 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9633 ms)
       ✓ No tearing finally on mount (4593 ms)
     Level 2
       ✓ No tearing temporarily on update (14510 ms)
       ✓ No tearing temporarily on mount (4494 ms)
 zustand
   With useTransition
     Level 1
       ✓ No tearing finally on update (7816 ms)
       ✓ No tearing finally on mount (4487 ms)
     Level 2
       ✓ No tearing temporarily on update (12757 ms)
       ✓ No tearing temporarily on mount (4532 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7844 ms)
       ✕ Can branch state (wip state) (6547 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9520 ms)
       ✓ No tearing finally on mount (4562 ms)
     Level 2
       ✓ No tearing temporarily on update (14519 ms)
       ✓ No tearing temporarily on mount (4453 ms)
 mobx
   With useTransition
     Level 1
       ✓ No tearing finally on update (4476 ms)
       ✓ No tearing finally on mount (8305 ms)
     Level 2
       ✕ No tearing temporarily on update (8544 ms)
       ✕ No tearing temporarily on mount (9275 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3533 ms)
       ✕ Can branch state (wip state) (2854 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9527 ms)
       ✓ No tearing finally on mount (5538 ms)
     Level 2
       ✓ No tearing temporarily on update (14504 ms)
       ✕ No tearing temporarily on mount (5455 ms)
 react-tracked
   With useTransition
     Level 1
       ✓ No tearing finally on update (5483 ms)
       ✓ No tearing finally on mount (15345 ms)
     Level 2
       ✓ No tearing temporarily on update (8544 ms)
       ✓ No tearing temporarily on mount (15293 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3520 ms)
       ✓ Can branch state (wip state) (8149 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (15304 ms)
       ✓ No tearing finally on mount (8365 ms)
     Level 2
       ✓ No tearing temporarily on update (19344 ms)
       ✓ No tearing temporarily on mount (8286 ms)
 constate
   With useTransition
     Level 1
       ✓ No tearing finally on update (4478 ms)
       ✓ No tearing finally on mount (10319 ms)
     Level 2
       ✓ No tearing temporarily on update (8507 ms)
       ✓ No tearing temporarily on mount (9257 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3510 ms)
       ✓ Can branch state (wip state) (5081 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9520 ms)
       ✓ No tearing finally on mount (5537 ms)
     Level 2
       ✓ No tearing temporarily on update (14513 ms)
       ✓ No tearing temporarily on mount (5432 ms)
 react-hooks-global-state
   With useTransition
     Level 1
       ✓ No tearing finally on update (5434 ms)
       ✓ No tearing finally on mount (8302 ms)
     Level 2
       ✓ No tearing temporarily on update (8495 ms)
       ✕ No tearing temporarily on mount (8245 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3504 ms)
       ✕ Can branch state (wip state) (10157 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11261 ms)
       ✓ No tearing finally on mount (5622 ms)
     Level 2
       ✓ No tearing temporarily on update (15495 ms)
       ✕ No tearing temporarily on mount (5532 ms)
 use-context-selector
   With useTransition
     Level 1
       ✓ No tearing finally on update (5535 ms)
       ✓ No tearing finally on mount (11413 ms)
     Level 2
       ✓ No tearing temporarily on update (8616 ms)
       ✓ No tearing temporarily on mount (15376 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3626 ms)
       ✓ Can branch state (wip state) (8180 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (15364 ms)
       ✓ No tearing finally on mount (6388 ms)
     Level 2
       ✓ No tearing temporarily on update (19347 ms)
       ✓ No tearing temporarily on mount (6292 ms)
 use-subscription
   With useTransition
     Level 1
       ✓ No tearing finally on update (5492 ms)
       ✓ No tearing finally on mount (9313 ms)
     Level 2
       ✓ No tearing temporarily on update (8528 ms)
       ✕ No tearing temporarily on mount (9255 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3532 ms)
       ✕ Can branch state (wip state) (10076 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11151 ms)
       ✓ No tearing finally on mount (5580 ms)
     Level 2
       ✓ No tearing temporarily on update (15233 ms)
       ✕ No tearing temporarily on mount (5439 ms)
 apollo-client
   With useTransition
     Level 1
       ✓ No tearing finally on update (7962 ms)
       ✓ No tearing finally on mount (4550 ms)
     Level 2
       ✕ No tearing temporarily on update (12926 ms)
       ✓ No tearing temporarily on mount (4540 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7917 ms)
       ✕ Can branch state (wip state) (6626 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (10177 ms)
       ✓ No tearing finally on mount (4449 ms)
     Level 2
       ✕ No tearing temporarily on update (14283 ms)
       ✓ No tearing temporarily on mount (4483 ms)
 recoil
   With useTransition
     Level 1
       ✓ No tearing finally on update (7870 ms)
       ✓ No tearing finally on mount (4518 ms)
     Level 2
       ✓ No tearing temporarily on update (12831 ms)
       ✓ No tearing temporarily on mount (4460 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7792 ms)
       ✕ Can branch state (wip state) (6517 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9516 ms)
       ✓ No tearing finally on mount (4478 ms)
     Level 2
       ✓ No tearing temporarily on update (14523 ms)
       ✓ No tearing temporarily on mount (4533 ms)
 recoil_UNSTABLE
   With useTransition
     Level 1
       ✓ No tearing finally on update (5560 ms)
       ✓ No tearing finally on mount (10452 ms)
     Level 2
       ✓ No tearing temporarily on update (8631 ms)
       ✕ No tearing temporarily on mount (9385 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3640 ms)
       ✕ Can branch state (wip state) (10169 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11302 ms)
       ✓ No tearing finally on mount (5652 ms)
     Level 2
       ✓ No tearing temporarily on update (15350 ms)
       ✕ No tearing temporarily on mount (5573 ms)
 jotai
   With useTransition
     Level 1
       ✓ No tearing finally on update (6577 ms)
       ✓ No tearing finally on mount (12415 ms)
     Level 2
       ✓ No tearing temporarily on update (9632 ms)
       ✕ No tearing temporarily on mount (11282 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4543 ms)
       ✕ Can branch state (wip state) (11035 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (16316 ms)
       ✓ No tearing finally on mount (6382 ms)
     Level 2
       ✓ No tearing temporarily on update (20414 ms)
       ✕ No tearing temporarily on mount (6287 ms)
 jotai-versioned-write
   With useTransition
     Level 1
       ✓ No tearing finally on update (5483 ms)
       ✓ No tearing finally on mount (9330 ms)
     Level 2
       ✓ No tearing temporarily on update (9556 ms)
       ✓ No tearing temporarily on mount (8310 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4552 ms)
       ✓ Can branch state (wip state) (6126 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11372 ms)
       ✓ No tearing finally on mount (5569 ms)
     Level 2
       ✓ No tearing temporarily on update (15414 ms)
       ✓ No tearing temporarily on mount (5498 ms)
 use-atom
   With useTransition
     Level 1
       ✓ No tearing finally on update (7487 ms)
       ✓ No tearing finally on mount (14333 ms)
     Level 2
       ✓ No tearing temporarily on update (9525 ms)
       ✓ No tearing temporarily on mount (14289 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4531 ms)
       ✕ Can branch state (wip state) (18109 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (16491 ms)
       ✓ No tearing finally on mount (9465 ms)
     Level 2
       ✓ No tearing temporarily on update (20654 ms)
       ✓ No tearing temporarily on mount (10359 ms)
 valtio
   With useTransition
     Level 1
       ✓ No tearing finally on update (7937 ms)
       ✓ No tearing finally on mount (4600 ms)
     Level 2
       ✓ No tearing temporarily on update (12879 ms)
       ✓ No tearing temporarily on mount (4596 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7883 ms)
       ✕ Can branch state (wip state) (6629 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9601 ms)
       ✓ No tearing finally on mount (4534 ms)
     Level 2
       ✓ No tearing temporarily on update (14569 ms)
       ✓ No tearing temporarily on mount (4553 ms)
 effector
   With useTransition
     Level 1
       ✓ No tearing finally on update (4463 ms)
       ✓ No tearing finally on mount (9333 ms)
     Level 2
       ✕ No tearing temporarily on update (8550 ms)
       ✕ No tearing temporarily on mount (9283 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3575 ms)
       ✕ Can branch state (wip state) (2850 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9549 ms)
       ✓ No tearing finally on mount (5565 ms)
     Level 2
       ✓ No tearing temporarily on update (14609 ms)
       ✕ No tearing temporarily on mount (5566 ms)
 react-rxjs
   With useTransition
     Level 1
       ✓ No tearing finally on update (7939 ms)
       ✓ No tearing finally on mount (9377 ms)
     Level 2
       ✓ No tearing temporarily on update (12864 ms)
       ✕ No tearing temporarily on mount (9404 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7877 ms)
       ✕ Can branch state (wip state) (6593 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9654 ms)
       ✓ No tearing finally on mount (5580 ms)
     Level 2
       ✓ No tearing temporarily on update (14535 ms)
       ✕ No tearing temporarily on mount (5489 ms)
 simplux
   With useTransition
     Level 1
       ✓ No tearing finally on update (4482 ms)
       ✓ No tearing finally on mount (9322 ms)
     Level 2
       ✓ No tearing temporarily on update (8525 ms)
       ✓ No tearing temporarily on mount (9275 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3547 ms)
       ✕ Can branch state (wip state) (10096 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9526 ms)
       ✓ No tearing finally on mount (5569 ms)
     Level 2
       ✓ No tearing temporarily on update (14508 ms)
       ✓ No tearing temporarily on mount (5488 ms)

```
</details>

<table>
<tr><th>Test</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th></tr>
	<tr>
		<th><a href="https://react-redux.js.org">react-redux</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/pmndrs/zustand">zustand</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/mobxjs/mobx">mobx</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
	</tr>
	<tr>
		<th><a href="https://react-tracked.js.org">react-tracked</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/diegohaz/constate">constate</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/dai-shi/react-hooks-global-state">react-hooks-global-state</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/dai-shi/use-context-selector">use-context-selector</a> (w/ useReducer)</th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/facebook/react/tree/master/packages/use-subscription">use-subscription</a> (w/ redux)</th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/apollographql/apollo-client">apollo-client</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://recoiljs.org">recoil</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://recoiljs.org">recoil (UNSTABLE)</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/pmndrs/jotai">jotai</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/pmndrs/jotai">jotai (experimental versioned write)</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/dai-shi/use-atom">use-atom</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/pmndrs/valtio">valtio</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/zerobias/effector">effector</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
	</tr>
	<tr>
		<th><a href="https://react-rxjs.org">react-rxjs</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/MrWolfZ/simplux">simplux</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>

</table>

## Caveats

- Tearing and state branching may not be an issue depending on app requirements.
- The test is done in a very limited way.
  - Passing tests don't guarantee anything.
- The results may not be accurate.
  - Do not fully trust the results.

## If you are interested

The reason why I created this is to test my projects.

- [react-tracked](https://github.com/dai-shi/react-tracked)
- [use-context-selector](https://github.com/dai-shi/use-context-selector)
- and so on

## Contributing

This repository is a tool for us to test some of global state libraries.
While it is totally fine to use the tool for other libraries under the license,
we don't generally accept adding a new library to the repository.

However, we are interested in various approaches.
If you have any suggestions feel free to open issues or pull requests.
We may consider adding (and removing) libraries.
Questions and discussions are also welcome in issues.

For listing global state libraries, we have another repository
https://github.com/dai-shi/lets-compare-global-state-with-react-hooks
in which we accept contributions. It's recommended to run this tool
and we put the result there, possibly a reference link to a PR
in this repository or a fork of this repository.

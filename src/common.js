import React from 'react';

const fib = i => (i <= 1 ? i : fib(i - 1) + fib(i - 2));
export const syncBlock = () => fib(30);

export const useRegisterClickHandler = (handler) => {
  React.useEffect(() => {
    const ele1 = document.getElementById('button1');
    ele1.addEventListener('click', handler);
    const ele2 = document.getElementById('button2');
    ele2.addEventListener('click', handler);
    return () => {
      ele1.removeEventListener('click', handler);
      ele2.removeEventListener('click', handler);
    };
  }, [handler]);
};

export const initialState = { count: 0 };

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
};

export const ids = [...Array(50).keys()];

export const useCheckTearing = (count) => {
  React.useLayoutEffect(() => {
    const counts = ids.map(i => Number(
      document.querySelector(`.count:nth-of-type(${i + 1})`).innerHTML,
    ));
    if (!counts.every(c => c === count)) {
      console.error('count mismatch', counts);
      document.title = 'failed';
    }
  });
};

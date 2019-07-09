import React from 'react';

const fib = i => (i <= 1 ? i : fib(i - 1) + fib(i - 2));
export const syncBlock = () => fib(35);

export const useRegisterClickHandler = (handler) => {
  React.useEffect(() => {
    const ele = document.getElementById('button');
    ele.addEventListener('click', handler);
    return () => ele.removeEventListener('click', handler);
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

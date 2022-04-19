import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery, useQueryClient,
} from 'react-query';

import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  doubleAction,
  createApp,
} from '../common';

const queryKey = ['counter'];

const client = new QueryClient();

const useCount = () => {
  const { data } = useQuery(
    queryKey,
    () => {
      throw new Error('should never be called');
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      initialData: initialState,
    },
  );
  return selectCount(data);
};

const useIncrement = () => {
  const queryClient = useQueryClient();
  const increment = () => queryClient.setQueryData(
    queryKey,
    (prev) => reducer(prev, incrementAction),
  );
  return increment;
};

const useDouble = () => {
  const queryClient = useQueryClient();
  const doDouble = () => queryClient.setQueryData(
    queryKey,
    (prev) => reducer(prev, doubleAction),
  );
  return doDouble;
};

const Root = ({ children }) => (
  <QueryClientProvider client={client}>
    {children}
  </QueryClientProvider>
);

export default createApp(useCount, useIncrement, useDouble, Root);

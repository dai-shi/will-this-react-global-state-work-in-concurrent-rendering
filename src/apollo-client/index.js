import React from 'react';
import {
  ApolloClient,
  gql,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  makeVar,
} from '@apollo/client';

import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  doubleAction,
  createApp,
} from '../common';

const COUNT_QUERY = gql`
  query CountQuery {
    count @client
  }
`;

const currentState = makeVar(initialState);

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          count() {
            return currentState().count;
          },
        },
      },
    },
  }),
});

const useCount = () => {
  const { loading, error, data } = useQuery(COUNT_QUERY);
  return (!loading && !error && data) ? selectCount(data) : 0;
};

const useIncrement = () => {
  const increment = () => currentState(reducer(currentState(), incrementAction));
  return increment;
};

const useDouble = () => {
  const doDouble = () => currentState(reducer(currentState(), doubleAction));
  return doDouble;
};

const Root = ({ children }) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
);

export default createApp(useCount, useIncrement, useDouble, Root);

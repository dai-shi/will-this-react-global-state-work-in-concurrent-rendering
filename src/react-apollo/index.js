import React, { useTransition } from 'react';
import ApolloClient, { gql, InMemoryCache } from 'apollo-boost';
import { ApolloProvider, useQuery, useMutation } from '@apollo/react-hooks';

import {
  syncBlock,
  useRegisterIncrementDispatcher,
  ids,
  useCheckTearing,
  shallowEqual,
} from '../common';

const typeDefs = gql`
  type Query {
    count: Int!
  }
  type Mutation {
    increment: Bool!
  }
`;

const COUNT_QUERY = gql`
  query CountQuery {
    count @client
  }
`;

const INCREMENT_MUTATION = gql`
  mutation IncrementMutation {
    increment @client
  }
`;

const cacheInstance = new InMemoryCache();
cacheInstance.writeQuery({
  query: COUNT_QUERY,
  data: {
    count: 0,
  },
});

const client = new ApolloClient({
  cache: cacheInstance,
  clientState: {
    typeDefs,
    resolvers: {
      Query: {
        count(root, args, { cache }) {
          const { count } = cache.readQuery({
            query: COUNT_QUERY,
          });
          return count;
        },
      },
      Mutation: {
        increment(root, args, { cache }) {
          const { count } = cache.readQuery({
            query: COUNT_QUERY,
          });
          cache.writeQuery({
            query: COUNT_QUERY,
            data: {
              count: count + 1,
            },
          });
          return true;
        },
      },
    },
  },
});

const Counter = React.memo(() => {
  const { loading, error, data } = useQuery(COUNT_QUERY, { fetchPolicy: 'cache-only' });
  syncBlock();
  return <div className="count">{(!loading && !error && data) ? data.count : 0}</div>;
}, shallowEqual);

const Main = () => {
  const [increment] = useMutation(INCREMENT_MUTATION);
  const { loading, data, error } = useQuery(COUNT_QUERY, { fetchPolicy: 'cache-only' });
  useCheckTearing();
  useRegisterIncrementDispatcher(React.useCallback(() => {
    increment();
  }, [increment]));
  const [localCount, localIncrement] = React.useReducer((c) => c + 1, 0);
  const normalIncrement = () => {
    increment();
  };
  const [startTransition, isPending] = useTransition();
  const transitionIncrement = () => {
    startTransition(() => {
      increment();
    });
  };
  return (
    <div>
      <button type="button" id="normalIncrement" onClick={normalIncrement}>Increment shared count normally (two clicks to increment one)</button>
      <button type="button" id="transitionIncrement" onClick={transitionIncrement}>Increment shared count in transition (two clicks to increment one)</button>
      <span id="pending">{isPending && 'Pending...'}</span>
      <h1>Shared Count</h1>
      {ids.map((id) => <Counter key={id} />)}
      <div className="count">
        {(!loading && !error && data) ? data.count : 0}
      </div>
      <h1>Local Count</h1>
      {localCount}
      <button type="button" id="localIncrement" onClick={localIncrement}>Increment local count</button>
    </div>
  );
};

const App = () => (
  <ApolloProvider client={client}>
    <Main />
  </ApolloProvider>
);

export default App;

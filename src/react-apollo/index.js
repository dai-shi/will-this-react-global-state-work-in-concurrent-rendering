import React, { useTransition } from 'react';
import ApolloClient, { gql, InMemoryCache } from 'apollo-boost';
import { ApolloProvider, useQuery, useMutation } from '@apollo/react-hooks';

import {
  syncBlock,
  useRegisterIncrementDispatcher,
  reducer,
  ids,
  useCheckTearing,
  initialState,
} from '../common';

const typeDefs = gql`
  type Query {
    dummy: Int!
    count: Int!
  }
  type Mutation {
    increment: Bool!
  }
`;

const STATE_QUERY = gql`
  query StateQuery {
    count @client
    dummy @client
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
  query: STATE_QUERY,
  data: initialState,
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
          const currentState = cache.readQuery({
            query: STATE_QUERY,
          });
          console.log(currentState);
          cache.writeQuery({
            query: STATE_QUERY,
            data: reducer(currentState, { type: 'increment' }),
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
});

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

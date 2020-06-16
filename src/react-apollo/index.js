import React from 'react';
import ApolloClient, { gql, InMemoryCache } from 'apollo-boost';
import { ApolloProvider, useQuery, useMutation } from '@apollo/react-hooks';

import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  createApp,
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
          cache.writeQuery({
            query: STATE_QUERY,
            data: reducer(currentState, incrementAction),
          });
          return true;
        },
      },
    },
  },
});

const useCount = () => {
  const { loading, error, data } = useQuery(COUNT_QUERY, { fetchPolicy: 'cache-only' });
  return (!loading && !error && data) ? selectCount(data) : 0;
};

const useIncrement = () => {
  const [increment] = useMutation(INCREMENT_MUTATION);
  return increment;
};


const Root = ({ children }) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
);

export default createApp(useCount, useIncrement, Root);

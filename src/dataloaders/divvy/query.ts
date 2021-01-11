import { print, ASTNode } from 'graphql';
import fetch from 'node-fetch';
import { GRAPHQL_URL, GRAPHQL_AUTHORIZATION_HEADER, GENERIC_HEADERS } from './constants';

export async function query(token: string, gql: ASTNode | string, operationName: string, variables = {}) {
  const renderedGql = typeof gql === 'string' ? gql : print(gql);
  const result = await fetch(GRAPHQL_URL, {
    headers: {
      [GRAPHQL_AUTHORIZATION_HEADER]: `Bearer ${token}`,
      'content-type': 'application/json',
      ...GENERIC_HEADERS,
    },
    body: JSON.stringify({
      operationName,
      query: renderedGql,
      variables,
    }),
  });

  return result.json();
}

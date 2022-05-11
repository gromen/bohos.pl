import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        email
      }
    }
  }
`;

export function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);

  return data?.authenticatedItem;
}

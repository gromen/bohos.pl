import { gql, useMutation } from '@apollo/client';
import Router from 'next/router';
import { CURRENT_USER_QUERY } from './User';

const SIGNOUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

export default function SignOut() {
  const [signOut] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <button
      type="button"
      onClick={async () => {
        const response = await signOut();

        if (response) {
          Router.push('/zaloguj');
        }
        // window.location.reload();
      }}
    >
      Wyloguj
    </button>
  );
}

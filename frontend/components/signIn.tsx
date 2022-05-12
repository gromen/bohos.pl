import { gql, useMutation } from '@apollo/client';
import Router from 'next/router';
import useForm from './hooks/useForm';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
        code
      }
    }
  }
`;

export default function SignIn() {
  const { formData, onChangeInput, resetForm } = useForm({
    email: '',
    password: '',
  });

  const [signIn, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: formData,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const onSubmitForm = async (event) => {
    event.preventDefault();
    await signIn();
    Router.push('/');
    resetForm();
  };

  const error =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;

  if (loading) return <p>Loading...</p>;

  return (
    <Form method="post" onSubmit={onSubmitForm}>
      <h2>Zaloguj się na swoje konto</h2>
      <ErrorMessage error={error} />
      <fieldset>
        <label htmlFor="email">
          Email
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Wprowadź email"
            autoComplete="email"
            onChange={onChangeInput}
            value={formData.email}
          />
        </label>
        <label htmlFor="password">
          Hasło
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Wprowadź hasło"
            onChange={onChangeInput}
            value={formData.password}
          />
        </label>
      </fieldset>
      <button type="submit">Zaloguj się</button>
    </Form>
  );
}

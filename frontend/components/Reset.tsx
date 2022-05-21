import { gql, useMutation } from '@apollo/client';
import Link from 'next/link';
import useForm from './hooks/useForm';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';

type ComponentsProps = {
  token: string;
};

const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION(
    $email: String!
    $token: String!
    $password: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

export default function Reset({ token }: ComponentsProps) {
  const { formData, onChangeInput, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });
  // eslint-disable-next-line

  console.log(token);

  const [resetPassword, { data, error, loading }] = useMutation(
    RESET_PASSWORD_MUTATION,
    {
      variables: formData,
    }
  );

  const successfullError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;

  const onSubmitForm = async (event) => {
    event.preventDefault();
    await resetPassword();

    resetForm();
  };

  return (
    <Form method="post" onSubmit={onSubmitForm}>
      <h2>Resetuj hasło</h2>
      <ErrorMessage error={error || successfullError} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.redeemUserPasswordResetToken === null && (
          <div>
            <p>Pomyślnie zresetowano hasło! Możesz się teraz zalogować</p>
            <Link href="/zaloguj">Zaloguj</Link>
          </div>
        )}
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            name="email"
            pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
            autoComplete="email"
            placeholder="Podaj email"
            onChange={onChangeInput}
            value={formData.email}
          />
        </label>
        <label htmlFor="password">
          Nowe hasło
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Podaj hasło"
            onChange={onChangeInput}
            value={formData.password}
          />
        </label>
      </fieldset>
      <button type="submit">Resetuj hasło</button>
    </Form>
  );
}

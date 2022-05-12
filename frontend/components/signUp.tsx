import { gql, useMutation } from '@apollo/client';
import useForm from './hooks/useForm';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $password: String!
    $name: String!
  ) {
    createUser(data: { email: $email, password: $password, name: $name }) {
      id
      name
      email
    }
  }
`;

export default function SignUp() {
  const { formData, onChangeInput, resetForm } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const [signUp, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: formData,
  });

  const onSubmitForm = async (event) => {
    event.preventDefault();
    await signUp();

    resetForm();
  };

  if (data?.createUser) {
    return (
      <p>
        Pomyślnie utworzono konto na adres {data.createUser?.email} - możesz się
        teraz zalogować
      </p>
    );
  }

  return (
    <Form method="post" onSubmit={onSubmitForm}>
      <h2>Nie masz konta ? Zarejestruj się</h2>
      <ErrorMessage error={error} />
      <fieldset>
        <label htmlFor="name">
          Nick
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Podaj nick"
            onChange={onChangeInput}
            value={formData.name}
          />
        </label>
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
          Hasło
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
      <button type="submit">Zarejestruj się</button>
    </Form>
  );
}

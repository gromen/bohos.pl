import { gql, useMutation } from '@apollo/client';
import useForm from './hooks/useForm';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset() {
  const { formData, onChangeInput, resetForm } = useForm({
    email: '',
  });

  const [requestReset, { data, error }] = useMutation(REQUEST_RESET_MUTATION, {
    variables: formData,
  });

  const onSubmitForm = async (event) => {
    event.preventDefault();
    await requestReset();

    resetForm();
  };

  if (data?.sendUserPasswordResetLink === null) {
    return <p>Pomyślnie zresetowano hasło! Na twój email wysłaliśmy link</p>;
  }

  return (
    <Form method="post" onSubmit={onSubmitForm}>
      <h2>Nie pamiętasz hasła ?</h2>
      <ErrorMessage error={error} />
      <fieldset>
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
      </fieldset>
      <button type="submit">Resetuj hasło</button>
    </Form>
  );
}

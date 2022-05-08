import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from './hooks/useForm';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';
import { PRODUCT_DETAILS_QUERY } from './ProductDetails';

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

type ComponentProps = {
  id: string;
};

export default function UpdateProduct({ id }: ComponentProps) {
  const { data, loading, error } = useQuery(PRODUCT_DETAILS_QUERY, {
    variables: { id },
  });
  const [
    updateProduct,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);
  const { formData, onChangeInput } = useForm(data?.Product);
  const onSubmitForm = async (event) => {
    event.preventDefault();
    await updateProduct({
      variables: {
        id,
        name: formData.name,
        description: formData.description,
        price: formData.price,
      },
    });
  };

  if (loading) return <p>Loading....</p>;

  return (
    <Form onSubmit={onSubmitForm}>
      <h1>Edit product</h1>
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <ErrorMessage error={error} />
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="name"
            value={formData.name ?? ''}
            onChange={onChangeInput}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="price"
            value={formData.price ?? ''}
            onChange={onChangeInput}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            rows={5}
            id="description"
            name="description"
            placeholder="Description"
            value={formData.description ?? ''}
            onChange={onChangeInput}
          />
        </label>
        <button type="submit">Update product</button>
      </fieldset>
    </Form>
  );
}

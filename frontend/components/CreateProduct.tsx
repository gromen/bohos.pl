import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Router from 'next/router';
import useForm from './hooks/useForm';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './ProductsList';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        description: $description
        name: $name
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      name
      description
      price
    }
  }
`;

export default function CreateProduct() {
  const { formData, onChangeInput, clearForm } = useForm({
    name: '',
    price: '',
    image: '',
    description: '',
  });

  const [createProduct, { data, loading, error }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: formData,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );

  const onSubmitForm = async (event) => {
    event.preventDefault();
    await createProduct();
    clearForm();
    Router.push({
      pathname: `/product/${data.createProduct.id}`,
    });
  };

  return (
    <Form onSubmit={onSubmitForm}>
      <fieldset disabled={loading} aria-busy={loading}>
        <ErrorMessage error={error} />
        <label htmlFor="file">
          File
          <input
            required
            type="file"
            id="image"
            name="image"
            onChange={onChangeInput}
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="name"
            value={formData.name}
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
            value={formData.price}
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
            value={formData.description}
            onChange={onChangeInput}
          />
        </label>
        <button type="submit">+ Add product</button>
      </fieldset>
    </Form>
  );
}

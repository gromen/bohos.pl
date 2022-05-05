import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import useForm from './hooks/useForm';
import Form from './styles/Form';

const CREATE_PRODUCT = gql`
  mutation {
    createProduct(data: { description: "sasas", name: "name", price: 200 }) {
      description
      id
      price
      name
    }
  }
`;

export default function CreateProduct() {
  const { formData, onChangeInput } = useForm({
    name: '',
    price: '',
    image: '',
    description: '',
  });

  const [createProduct, { data, loading, error }] = useMutation(
    CREATE_PRODUCT,
    {
      variables: {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        image: formData.image,
      },
    }
  );

  function onSubmitForm() {
    createProduct({
      variables: {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        image: formData.image,
      },
    });
  }

  return (
    <Form onSubmit={onSubmitForm}>
      <fieldset>
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
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            // eslint-disable-next-line
            console.log(formData);
          }}
        >
          + Add product
        </button>
      </fieldset>
    </Form>
  );
}

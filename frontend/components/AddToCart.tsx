import { gql, useMutation, useQuery } from '@apollo/client';
import { CURRENT_USER_QUERY } from './User';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
      quantity
    }
  }
`;

export default function AddToCart({ id }) {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: {
      id,
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <button disabled={loading} type="button" onClick={addToCart}>
      Dodaj{loading && 'ę'} do koszyka ➕
    </button>
  );
}

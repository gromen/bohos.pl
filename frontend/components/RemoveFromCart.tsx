import styled from 'styled-components';
import { gql, useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from './User';

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

const ButtonStyles = styled.button`
  padding: 0.5rem;
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteCartItem));
}

export default function RemoveFromCart({ id }) {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: {
      id,
    },
    update,
    // optimisticResponse: {
    //   deleteCartItem: {
    //     __typename: 'CartItem',
    //     id,
    //   },
    // },
  });

  return (
    <ButtonStyles
      onClick={removeFromCart}
      disabled={loading}
      type="button"
      title="Remove this item from cart"
    >
      ✖️
    </ButtonStyles>
  );
}

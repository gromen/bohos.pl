import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import React from 'react';

type ComponentProps = {
  id: string;
  children: React.ReactNode;
};

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

export default function DeleteProduct({ id, children }: ComponentProps) {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    update(cache, payload) {
      // TODO TS error
      cache.evict(cache.identify(payload.data.deleteProduct));
      cache.gc();
    },
  });
  const onClickButton = async () => {
    if (confirm('Deleting product. Are you sure ?')) {
      await deleteProduct();
    }
  };

  return (
    <>
      <button disabled={loading} type="button" onClick={onClickButton}>
        {children}
      </button>
    </>
  );
}

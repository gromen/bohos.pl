import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import styled from 'styled-components';
import ErrorMessage from './ErrorMessage';
import formatMoney from '../lib/formatMoney';

type Props = {
  id: string;
};

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  max-width: var(--maxWidth);
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

export const PRODUCT_DETAILS_QUERY = gql`
  query GET_PRODUCT_DETAILS($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function ProductDetails({ id }: Props) {
  const { data, loading, error } = useQuery(PRODUCT_DETAILS_QUERY, {
    variables: {
      id,
    },
  });

  if (loading) return <p>Loading....</p>;
  if (error) return <ErrorMessage error={error} />;

  const { Product } = data;

  return (
    <ProductStyles>
      <Head>
        <title>Bohus | {Product.name}</title>
      </Head>
      <img
        src={Product.photo.image.publicUrlTransformed}
        alt={Product.photo.altText}
      />
      <div>
        <h2>{Product.name}</h2>
        <p>{Product.description}</p>
        <p>Price: {formatMoney(Product.price)}</p>
      </div>
    </ProductStyles>
  );
}

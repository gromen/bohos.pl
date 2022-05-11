import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Product from './Product';
import { PER_PAGE } from '../config';
import ErrorMessage from './ErrorMessage';

type ComponentProps = {
  page: number;
};

interface allProducts {
  id: string;
  name: string;
  price: number;
  photo: string;
}

interface ProductsData {
  allProducts: allProducts[];
}

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(first: $first, skip: $skip) {
      id
      name
      description
      price
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function ProductsList({ page }: ComponentProps) {
  const { data, error, loading /* fetchMore */ } = useQuery<ProductsData>(
    ALL_PRODUCTS_QUERY,
    {
      variables: {
        skip: page * PER_PAGE - PER_PAGE,
        first: PER_PAGE,
      },
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <ProductsListStyles>
        {data &&
          data.allProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
      </ProductsListStyles>
    </div>
  );
}

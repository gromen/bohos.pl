import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Product from './Product';

const ALL_PRODUCTS_QUERY = gql`
  query {
    allProducts {
      id
      name
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

interface allProducts {
  id: string;
  name: string;
  price: number;
  photo: string;
}

interface ProductsData {
  allProducts: allProducts[];
}

export default function ProductsList() {
  const { data, error, loading } = useQuery<ProductsData>(ALL_PRODUCTS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{`Error: ${error.message}`}</p>;

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

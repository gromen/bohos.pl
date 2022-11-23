import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Head from 'next/head';
import ErrorMessage from '../../components/ErrorMessage';
import OrderStyles from '../../components/styles/OrderStyles';
import formatMoney from '../../lib/formatMoney';

type Props = {
  query: {
    id: string;
  };
};

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order: Order(where: { id: $id }) {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

export default function SingleOrderPage({ query }: Props) {
  const { data, error, loading } = useQuery(SINGLE_ORDER_QUERY, {
    variables: {
      id: query.id,
    },
  });

  if (loading) return <div>Ładowanie...</div>;
  if (error) return <ErrorMessage error={error} />;
  const { order } = data;

  return (
    <OrderStyles>
      <Head>
        <title>Bohus.pl | {order.id}</title>
      </Head>
      <p>
        <span>Order charge:</span>
        <span>{order.charge}</span>
      </p>
      <p>
        <span>Order id:</span>
        <span>{order.id}</span>
      </p>
      <p>
        <span>Order total:</span>
        <span>{formatMoney(order.total)}</span>
      </p>
      <p>
        <span>Order count:</span>
        <span>{order.items.length}</span>
      </p>
      <div className="items">
        {order.items.map((item) => (
          <div className="order-item" key={item.name}>
            <img src={item.photo.image.publicUrlTransformed} alt={item.name} />
            <div className="item-details">
              <h2>{item.name}</h2>
              <p>Ilość: {item.quantity}</p>
              <p>Cena: {formatMoney(item.price)}</p>
              <p>Razem: {formatMoney(item.price * item.quantity)}</p>
              <p>Opis: {item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </OrderStyles>
  );
}

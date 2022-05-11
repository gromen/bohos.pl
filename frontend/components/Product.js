import Link from 'next/link';
import formatMoney from '../lib/formatMoney';
import DeleteProduct from './DeleteProduct';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import Title from './styles/Title';

export default function Product({ product }) {
  return (
    <ItemStyles>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product?.name}
      />
      <Title>
        <Link href={`/produkt/${product.id}`}>{product?.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      <div className="buttonList">
        <Link
          href={{
            pathname: '/edycja',
            query: {
              id: product.id,
            },
          }}
        >
          Edytuj 📝
        </Link>
        <DeleteProduct id={product.id}>Usuń produkt ⛔️</DeleteProduct>
      </div>
    </ItemStyles>
  );
}

import Link from 'next/link';
import formatMoney from '../lib/formatMoney';
import DeleteProduct from './DeleteProduct';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import Title from './styles/Title';
import { useUser } from './User';
import AddToCart from './AddToCart';

type ComponentProps = {
  product: {
    id: string;
    photo: {
      image: {
        publicUrlTransformed: string;
      };
    };
    price: number;
    name: string;
    description: string;
  };
};

export default function Product({ product }: ComponentProps) {
  const user = useUser();

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

      {user && (
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
          <AddToCart id={product.id} />
          <DeleteProduct id={product.id}>Usuń produkt ⛔️</DeleteProduct>
        </div>
      )}
    </ItemStyles>
  );
}

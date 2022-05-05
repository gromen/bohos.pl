import ProductDetails from '../../components/ProductDetails';

type Props = {
  query: {
    id: string;
  };
};

export default function ProductPage({ query }: Props) {
  return <ProductDetails id={query.id} />;
}

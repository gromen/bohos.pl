import ProductsList from '../../components/ProductsList';
import Pagination from '../../components/Pagination';

type ComponentProps = {
  query: {
    page: number;
  };
};

export default function ProduktyPage({ query }: ComponentProps) {
  // const { query } = useRouter();
  const page = +query.page;

  return (
    <>
      <Pagination page={page || 1} />
      <ProductsList page={page || 1} />
      <Pagination page={page || 1} />
    </>
  );
}

import UpdateProduct from '../components/UpdateProduct';

type PageProps = {
  query: {
    id: string;
  };
};

export default function UpdatePage({ query }: PageProps) {
  const { id } = query;

  return <UpdateProduct id={id} />;
}

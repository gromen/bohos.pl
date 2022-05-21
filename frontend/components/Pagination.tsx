import Head from 'next/head';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import PaginationStyles from './styles/PaginationStyles';
import ErrorMessage from './ErrorMessage';
import { PER_PAGE } from '../config';

type ComponentProps = {
  page: number;
};

export const PAGINATION_QUERY = gql`
  query {
    _allProductsMeta {
      count
    }
  }
`;

export default function Pagination({ page }: ComponentProps) {
  const { data, loading, error } = useQuery(PAGINATION_QUERY);

  if (loading) return <p>Loading ....</p>;
  if (error) return <ErrorMessage error={error} />;

  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count / PER_PAGE);

  return (
    <PaginationStyles>
      <Head>
        <title>
          Bohus.pl | Strona {page} z {pageCount}
        </title>
      </Head>
      <Link href={`/produkty/${page - 1}`} passHref>
        <a aria-disabled={page <= 1}>poprzednia</a>
      </Link>
      <p>
        Strona {page} z {pageCount}
      </p>
      <p>{count} Produktów</p>
      <Link href={`/produkty/${page + 1}`} passHref>
        <a aria-disabled={page >= pageCount}>następna</a>
      </Link>
    </PaginationStyles>
  );
}

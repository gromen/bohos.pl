import Head from 'next/head';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import PaginationStyles from './styles/PaginationStyles';
import ErrorMessage from './ErrorMessage';
import { perPage } from '../config';

const PAGINATION_QUERY = gql`
  query {
    _allProductsMeta {
      count
    }
  }
`;

export default function Pagination() {
  const { query } = useRouter();
  const { data, loading, error } = useQuery(PAGINATION_QUERY);

  if (loading) return <p>Loading ....</p>;
  if (error) return <ErrorMessage error={error} />;

  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count / perPage);
  const page = +query.page;

  return (
    <PaginationStyles>
      <Head>Bohus.pl | Page {page}</Head>
      <Link href={`/produkty/${+page - 1}`}>
        <a aria-disabled={page <= 1}>poprzednia</a>
      </Link>
      <p>
        Strona {page} z {pageCount}
      </p>
      <p>{count} Produktów</p>
      <Link href={`/produkty/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>następna</a>
      </Link>
    </PaginationStyles>
  );
}

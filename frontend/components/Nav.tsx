import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';

export default function Nav() {
  const user = useUser();

  return (
    <NavStyles>
      <Link href="/produkty">Produkty</Link>
      {user && (
        <>
          <Link href="/sprzedaz">Sprzedaż</Link>
          <Link href="/zamowienia">Zamówienia</Link>
          <Link href="/konto">Konto</Link>
        </>
      )}
      {!user && <Link href="/logowanie">Zaloguj się</Link>}
    </NavStyles>
  );
}

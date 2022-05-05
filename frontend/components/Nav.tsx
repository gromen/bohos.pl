import Link from 'next/link';
import NavStyles from './styles/NavStyles';

export default function Nav() {
  return (
    <NavStyles>
      <Link href="/produkty">Produkty</Link>
      <Link href="/sprzedaz">Sprzedaż</Link>
      <Link href="/zamowienia">Zamówienia</Link>
      <Link href="/konto">Account</Link>
    </NavStyles>
  );
}

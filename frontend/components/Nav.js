import Link from 'next/link';

export default function Nav() {
  return (
    <nav>
      <Link href="/produkty">Produkty</Link>
      <Link href="/zamowienia">Zamówienia</Link>
      <Link href="/konto">Account</Link>
    </nav>
  );
}

import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';
import SignOut from './SignOut';
import { useCart } from '../lib/cartState';
import Dot from './CartCount';

export default function Nav() {
  const user = useUser();
  const { openCart } = useCart();

  return (
    <NavStyles>
      <Link href="/produkty">Produkty</Link>
      {user && (
        <>
          <Link href="/sprzedaz">Sprzedaż</Link>
          <Link href="/zamowienia">Zamówienia</Link>
          <Link href="/konto">Konto</Link>
          <SignOut />
          <button type="button" onClick={openCart}>
            Koszyk
            <Dot
              count={user.cart.reduce(
                (tally, cartItem) => tally + cartItem.quantity,
                0
              )}
            />
          </button>
        </>
      )}
      {!user && <Link href="/zaloguj">Zaloguj się</Link>}
    </NavStyles>
  );
}

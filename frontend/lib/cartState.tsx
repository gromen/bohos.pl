import { createContext, useContext, useState } from 'react';

const initailState = {
  cartOpen: false,
  toggleCartOpen: () => {},
  closeCart: () => {},
  openCart: () => {},
};
const LocalStateContext = createContext(initailState);
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false);

  const toggleCartOpen = () => setCartOpen(!cartOpen);
  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  return (
    <LocalStateProvider
      value={{ cartOpen, toggleCartOpen, openCart, closeCart }}
    >
      {children}
    </LocalStateProvider>
  );
}

function useCart() {
  const data = useContext(LocalStateContext);

  return data;
}

export { CartStateProvider, useCart };

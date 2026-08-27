
'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

export interface CartProduct {
  id: string;
  title: string;
  price: number;
  image: string;
}

interface CartContextType {
  cart: CartProduct[];
  addToCart: (product: CartProduct) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart when website opens
  useEffect(() => {
    const savedCart = localStorage.getItem('artsy-cart');

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Could not load cart', error);
      }
    }

    setIsLoaded(true);
  }, []);

  // Save cart automatically
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('artsy-cart', JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  function addToCart(product: CartProduct) {
    setCart((currentCart) => {
      const alreadyExists = currentCart.some(
        (item) => item.id === product.id
      );

      if (alreadyExists) {
        return currentCart;
      }

      return [...currentCart, product];
    });
  }

  function removeFromCart(id: string) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  }

  function clearCart() {
    setCart([]);
  }

  const cartCount = cart.length;

  const cartTotal = cart.reduce(
    (total, item) => total + item.price,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
}

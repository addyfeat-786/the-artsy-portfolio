'use client';

import { ReactNode } from 'react';
import { CartProvider } from '@/context/cart-context';

export default function Providers({
  children,
}: {
  children: ReactNode;
}) {
  return <CartProvider>{children}</CartProvider>;
}

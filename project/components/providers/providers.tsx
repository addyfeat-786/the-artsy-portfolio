'use client';

import { type ReactNode } from 'react';
import SmoothScroll from './smooth-scroll';
import Cursor from '../ui/cursor';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      {children}
    </>
  );
}

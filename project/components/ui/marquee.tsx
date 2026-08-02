'use client';

import { type ReactNode } from 'react';

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export default function Marquee({ children, className }: MarqueeProps) {
  return (
    <div className={`relative flex overflow-hidden ${className ?? ''}`}>
      <div className="flex shrink-0 animate-marquee items-center">
        {children}
        {children}
      </div>
    </div>
  );
}

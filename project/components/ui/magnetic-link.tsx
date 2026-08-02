'use client';

import Link from 'next/link';
import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import Magnetic from './magnetic';

interface MagneticLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function MagneticLink({ href, children, className }: MagneticLinkProps) {
  return (
    <Magnetic strength={0.25}>
      <Link href={href} className={className}>
        <span className="relative inline-flex items-center">
          {children}
          <motion.span
            className="absolute -bottom-0.5 left-0 h-px w-full origin-left bg-current"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </span>
      </Link>
    </Magnetic>
  );
}

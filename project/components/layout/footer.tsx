'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const columns = [
  {
    title: 'Studio',
    links: [
      { href: '/about', label: 'About' },
      { href: '/services', label: 'Services' },
      { href: '/portfolio', label: 'Work' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Shop',
    links: [
      { href: '/marketplace', label: 'Marketplace' },
      { href: '/dashboard', label: 'Account' },
      { href: '/dashboard/downloads', label: 'Downloads' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy-policy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms' },
    ],
  },
];

const socials = [
  { label: 'Instagram', href: '#' },
  { label: 'Vimeo', href: '#' },
  { label: 'Behance', href: '#' },
  { label: 'LinkedIn', href: '#' },
];

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-background px-6 pb-10 pt-24 md:px-10">
      <div className="mx-auto max-w-[1600px]">
        {/* Big CTA line */}
        <div className="mb-20 border-b border-hairline pb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-balance font-display text-display font-medium tracking-tightest"
          >
            Let’s make something
            <br />
            <span className="italic">worth remembering.</span>
          </motion.h2>
          <Link
            href="/contact"
            className="group mt-10 inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em]"
          >
            Start a project
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="font-display text-xl font-semibold tracking-tightest"
            >
              THE<span className="italic"> ARTSY</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              A multidisciplinary studio for motion, film, design, and photography.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm transition-opacity hover:opacity-60"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-hairline pt-8 md:flex-row md:items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} The Artsy Studio. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-xs uppercase tracking-[0.18em] transition-opacity hover:opacity-60"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/cart-context';

const links = [
  { href: '/', label: 'Index' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Work' },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/blog', label: 'Journal' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { cartCount } = useCart();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    onScroll();

    window.addEventListener('scroll', onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass border-b border-hairline'
            : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 md:h-20 md:px-10">

          {/* LOGO */}
          <Link
            href="/"
            className="flex items-baseline gap-1 font-display text-lg font-semibold tracking-tightest"
          >
            <span>
              NO<span className="italic">FILTER</span>
            </span>

            <span className="text-[8px] font-sans font-normal uppercase tracking-[0.18em] opacity-60">
              BY ARTSY
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden items-center md:flex">
            <ul className="flex items-center gap-8">
              {links.map((l) => {
                const active =
                  l.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(l.href);

                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className={`relative text-xs uppercase tracking-[0.18em] transition-opacity ${
                        active
                          ? 'opacity-100'
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      {l.label}

                      {active && (
                        <motion.span
                          layoutId="nav-dot"
                          className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-foreground"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* CART ICON */}
            <Link
              href="/cart"
              aria-label="Shopping Cart"
              className="relative ml-8 flex h-9 w-9 items-center justify-center opacity-70 transition-opacity hover:opacity-100"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[9px] font-medium text-background">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            aria-label="Menu"
            onClick={() => setOpen(true)}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-background md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex h-16 items-center justify-between px-6">

              <Link
                href="/"
                className="flex items-baseline gap-1 font-display text-lg font-semibold"
              >
                <span>
                  NO<span className="italic">FILTER</span>
                </span>

                <span className="text-[8px] font-sans font-normal uppercase tracking-[0.18em] opacity-60">
                  BY ARTSY
                </span>
              </Link>

              <div className="flex items-center gap-5">

                {/* MOBILE CART */}
                <Link
                  href="/cart"
                  aria-label="Shopping Cart"
                  className="relative flex h-8 w-8 items-center justify-center"
                >
                  <ShoppingBag className="h-5 w-5" />

                  {cartCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[9px] font-medium text-background">
                      {cartCount > 99 ? '99+' : cartCount}
                    </span>
                  )}
                </Link>

                <button
                  aria-label="Close"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <motion.ul
              className="flex flex-col gap-2 px-6 pt-8"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.06,
                    delayChildren: 0.1,
                  },
                },
              }}
            >
              {links.map((l) => (
                <motion.li
                  key={l.href}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 20,
                    },
                    show: {
                      opacity: 1,
                      y: 0,
                    },
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={l.href}
                    className="font-display text-5xl font-medium tracking-tightest"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

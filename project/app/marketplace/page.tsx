'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Star, Heart } from 'lucide-react';
import Reveal from '@/components/ui/reveal';
import { products, productCategories } from '@/data/products';

type Filter = 'All' | string;

export default function MarketplacePage() {
  const [filter, setFilter] = useState<Filter>('All');
  const [query, setQuery] = useState('');
  const [wishlist, setWishlist] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = filter === 'All' || p.category === filter;
      const q = query.toLowerCase();
      const matchQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [filter, query]);

  const toggleWish = (id: string) => {
    setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));
  };

  const filters: Filter[] = ['All', ...productCategories];

  return (
    <main className="grain pt-32 md:pt-40">
      <section className="px-6 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Marketplace — Digital goods
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-8 text-balance font-display text-display font-medium tracking-tightest">
              Tools for the <span className="italic">trade</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-pretty text-muted-foreground">
              Motion templates, LUTs, presets, fonts, and mockups — the exact tools
              behind the studio’s own work.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CONTROLS */}
      <section className="px-6 py-12 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-col gap-6 border-y border-hairline py-6">
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.15em] transition-colors ${
                    filter === f
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-foreground/15 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products…"
                className="w-full rounded-full border border-foreground/15 bg-transparent py-2 pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/40"
              />
            </div>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="px-6 pb-32 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          {filtered.length === 0 ? (
            <p className="py-32 text-center text-muted-foreground">No products found.</p>
          ) : (
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.05}>
                  <div className="group">
                    <Link href={`/marketplace/${p.slug}`}>
                      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                        <Image
                          src={p.thumbnail}
                          alt={p.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    </Link>
                    <div className="mt-4 flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                          {p.category}
                        </p>
                        <h3 className="mt-1 font-display text-xl font-medium tracking-tight">
                          {p.title}
                        </h3>
                        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                          <Star className="h-3 w-3 fill-foreground text-foreground" />
                          <span>{p.rating.toFixed(1)}</span>
                          <span>·</span>
                          <span>{p.reviews} reviews</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        <span className="font-display text-xl">${p.price}</span>
                        <button
                          onClick={() => toggleWish(p.id)}
                          aria-label="Wishlist"
                          className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <Heart
                            className={`h-4 w-4 ${
                              wishlist.includes(p.id) ? 'fill-foreground text-foreground' : ''
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

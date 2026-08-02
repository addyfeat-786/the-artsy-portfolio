'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import Reveal from '@/components/ui/reveal';
import ProjectCard from '@/components/portfolio/project-card';
import { projects, categories, type Category } from '@/data/projects';

type Filter = 'All' | Category;

export default function PortfolioPage() {
  const [filter, setFilter] = useState<Filter>('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = filter === 'All' || p.category === filter;
      const q = query.toLowerCase();
      const matchQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [filter, query]);

  const filters: Filter[] = ['All', ...categories];

  return (
    <main className="grain pt-32 md:pt-40">
      <section className="px-6 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Portfolio — Selected work
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-8 text-balance font-display text-display font-medium tracking-tightest">
              The <span className="italic">archive</span>.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* CONTROLS */}
      <section className="px-6 py-12 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-col gap-6 border-y border-hairline py-6 md:flex-row md:items-center md:justify-between">
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
                placeholder="Search work, client, category…"
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
            <p className="py-32 text-center text-muted-foreground">
              No projects match your search.
            </p>
          ) : (
            <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
              {filtered.map((p, i) => (
                <ProjectCard key={p.slug} project={p} index={i} size="large" />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

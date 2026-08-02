'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/ui/reveal';
import SectionHeader from '@/components/layout/section-header';
import FeaturedCarousel from '@/components/portfolio/featured-carousel';
import Marquee from '@/components/ui/marquee';
import { getFeaturedProjects } from '@/data/projects';
import { services } from '@/data/services';
import { testimonials, clients } from '@/data/testimonials';

const HeroSculpture = dynamic(() => import('@/components/three/hero-sculpture'), {
  ssr: false,
});

const featured = getFeaturedProjects();

const heroWords = ['Motion Designer', 'Visual Storyteller', 'Creative Director'];

export default function Home() {
  const [flash, setFlash] = useState(0);

  return (
    <main className="grain">
      {/* HERO */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0">
          <HeroSculpture onFlash={() => setFlash((f) => f + 1)} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />

        {/* White flash overlay — fires once per hover */}
        <motion.div
          key={flash}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.85, 0] }}
          transition={{ duration: 0.5, times: [0, 0.08, 1], ease: 'easeOut' }}
          className="pointer-events-none absolute inset-0 z-20 bg-white"
        />

        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-6 text-xs uppercase tracking-[0.3em] text-muted-foreground"
          >
            THE ARTSY — STUDIO
          </motion.span>

          <motion.h1
            animate={flash > 0 ? { filter: ['drop-shadow(0 0 0px rgba(255,255,255,0))', 'drop-shadow(0 0 28px rgba(255,255,255,0.85))', 'drop-shadow(0 0 0px rgba(255,255,255,0))'] } : {}}
            transition={{ duration: 0.6, times: [0, 0.1, 1], ease: 'easeOut' }}
            className="text-balance font-display text-hero font-medium tracking-tightest"
          >
            THE{' '}
            <span className="italic">ARTSY</span>
          </motion.h1>

          <div className="mt-8 flex h-7 overflow-hidden">
            {heroWords.map((w, i) => (
              <motion.span
                key={w}
                className="text-sm uppercase tracking-[0.25em] text-muted-foreground"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.7,
                  delay: 0.6 + i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ marginRight: i < heroWords.length - 1 ? '1.5rem' : 0 }}
              >
                {w}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-12 flex items-center gap-6"
          >
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-foreground hover:text-background"
            >
              View Work
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/contact"
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground transition-opacity hover:opacity-60"
            >
              Contact
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </section>

      {/* INTRO STATEMENT */}
      <section className="px-6 py-32 md:py-48">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <p className="max-w-4xl text-balance font-display text-3xl font-light leading-tight tracking-tight md:text-5xl md:leading-[1.1]">
              A multidisciplinary studio crafting{' '}
              <span className="italic text-muted-foreground">motion</span>,{' '}
              <span className="italic text-muted-foreground">film</span>,{' '}
              <span className="italic text-muted-foreground">design</span>, and{' '}
              <span className="italic text-muted-foreground">photography</span> for
              brands that refuse to be ignored.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FEATURED WORK CAROUSEL */}
      <section className="py-24">
        <div className="mb-12 px-6 md:px-10">
          <div className="mx-auto max-w-[1600px]">
            <SectionHeader
              index="01 — Selected"
              title={
                <>
                  Featured <span className="italic">work</span>
                </>
              }
              description="A rotating selection of recent films, identities, and series. Drag, or let it breathe."
            />
          </div>
        </div>
        <FeaturedCarousel projects={featured} />
      </section>

      {/* SERVICES */}
      <section className="border-t border-hairline px-6 py-32 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <SectionHeader
            index="02 — Practice"
            title={
              <>
                What we <span className="italic">do</span>
              </>
            }
          />
          <div className="mt-16 grid gap-px border-t border-hairline md:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.number} delay={i * 0.05}>
                <div className="group flex flex-col gap-4 border-b border-hairline p-8 transition-colors hover:bg-secondary/40 md:p-12">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {s.number}
                    </span>
                    <Link
                      href="/services"
                      className="text-muted-foreground transition-opacity group-hover:opacity-100 md:opacity-0"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <h3 className="font-display text-3xl font-medium tracking-tightest md:text-4xl">
                    {s.title}
                  </h3>
                  <p className="max-w-md text-pretty text-muted-foreground">
                    {s.description}
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    {s.deliverables.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENT LOGOS MARQUEE */}
      <section className="border-y border-hairline py-16">
        <Marquee>
          {clients.map((c) => (
            <span
              key={c}
              className="mx-12 font-display text-3xl font-light tracking-tightest text-muted-foreground/60 md:text-4xl"
            >
              {c}
            </span>
          ))}
        </Marquee>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-6 py-32 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <SectionHeader
            index="03 — Voices"
            title={
              <>
                What clients <span className="italic">say</span>
              </>
            }
          />
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <figure className="flex h-full flex-col justify-between border border-hairline p-8 md:p-12">
                  <blockquote className="text-balance font-display text-2xl font-light leading-snug tracking-tight md:text-3xl">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-10 flex items-center gap-3 text-sm">
                    <span className="h-px w-8 bg-foreground/40" />
                    <span className="font-medium">{t.name}</span>
                    <span className="text-muted-foreground">
                      {t.role}, {t.company}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

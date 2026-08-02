'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useAnimationFrame, type PanInfo } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { type Project } from '@/data/projects';

interface FeaturedCarouselProps {
  projects: Project[];
}

export default function FeaturedCarousel({ projects }: FeaturedCarouselProps) {
  const x = useMotionValue(0);
  const [width, setWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const dragging = useRef(false);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current && itemRef.current) {
        const itemW = itemRef.current.offsetWidth + 32; // gap
        setWidth(itemW);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useAnimationFrame((_, delta) => {
    if (paused || dragging.current || width === 0) return;
    const move = delta * 0.04;
    let next = x.get() - move;
    if (next <= -width) {
      next += width;
    }
    x.set(next);
  });

  const onDragStart = () => {
    dragging.current = true;
  };
  const onDragEnd = (_: unknown, info: PanInfo) => {
    dragging.current = false;
    let next = x.get();
    // snap to nearest item
    next = Math.round(next / width) * width;
    // wrap
    if (next <= -width) next += width;
    if (next > 0) next -= width;
    x.set(next);
  };

  // duplicate items for infinite effect
  const items = [...projects, ...projects];

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        className="flex gap-8"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -width * (items.length / 2), right: 0 }}
        dragElastic={0.1}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        {items.map((p, i) => (
          <div
            key={`${p.slug}-${i}`}
            ref={i === 0 ? itemRef : undefined}
            className="relative w-[85vw] shrink-0 sm:w-[60vw] lg:w-[42vw]"
          >
            <Link href={`/portfolio/${p.slug}`} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                <Image
                  src={p.thumbnail}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                    {p.category} — {p.year}
                  </p>
                  <div className="mt-2 flex items-end justify-between gap-4">
                    <h3 className="font-display text-3xl font-medium tracking-tightest text-white md:text-4xl">
                      {p.title}
                    </h3>
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/40 text-white transition-all group-hover:bg-white group-hover:text-background">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

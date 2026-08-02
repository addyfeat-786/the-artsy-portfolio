'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { type Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  index?: number;
  size?: 'default' | 'large';
}

export default function ProjectCard({
  project,
  index = 0,
  size = 'default',
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/portfolio/${project.slug}`} className="group block">
        <div
          className={`relative w-full overflow-hidden bg-secondary ${
            size === 'large' ? 'aspect-[16/10]' : 'aspect-[4/3]'
          }`}
        >
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-background/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <span className="inline-flex items-center gap-2 border border-white/60 bg-background/30 px-4 py-2 text-xs uppercase tracking-widest text-white backdrop-blur-sm">
              View Case Study
              <ArrowUpRight className="h-3 w-3" />
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {project.category}
            </p>
            <h3 className="mt-1 font-display text-xl font-medium tracking-tightest">
              {project.title}
            </h3>
          </div>
          <span className="shrink-0 text-xs text-muted-foreground">{project.year}</span>
        </div>
      </Link>
    </motion.div>
  );
}

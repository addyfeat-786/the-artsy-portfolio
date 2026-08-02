import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/ui/reveal';
import { projects, getProject, getNextProject } from '@/data/projects';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) return { title: 'Case Study — THE ARTSY' };
  return {
    title: `${project.title} — THE ARTSY`,
    description: project.description,
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();
  const next = getNextProject(params.slug);

  return (
    <main className="grain pt-32 md:pt-40">
      {/* HEADER */}
      <section className="px-6 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-opacity hover:opacity-60"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All work
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-12 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              {project.category} — {project.year}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 className="mt-4 max-w-4xl text-balance font-display text-display font-medium tracking-tightest">
              {project.title}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-2xl text-pretty text-lg text-muted-foreground">
              {project.description}
            </p>
          </Reveal>
        </div>
      </section>

      {/* HERO MEDIA */}
      <section className="mt-16">
        <Reveal>
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-secondary">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </Reveal>
      </section>

      {/* META */}
      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-[1600px] gap-8 border-y border-hairline py-10 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Client</p>
            <p className="mt-2 font-display text-xl">{project.client}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Year</p>
            <p className="mt-2 font-display text-xl">{project.year}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Software</p>
            <p className="mt-2 font-display text-xl">{project.software.join(', ')}</p>
          </div>
        </div>
      </section>

      {/* STORY */}
      {project.story && (
        <section className="px-6 py-16 md:px-10">
          <div className="mx-auto grid max-w-[1600px] gap-10 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                The story
              </p>
            </div>
            <div className="md:col-span-8 md:col-start-5">
              <Reveal>
                <h2 className="text-balance font-display text-3xl font-light leading-snug tracking-tight md:text-4xl">
                  {project.story.challenge}
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-8 max-w-xl text-pretty text-muted-foreground">
                  {project.story.process}
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-6 max-w-xl text-pretty text-muted-foreground">
                  {project.story.output}
                </p>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* GALLERY */}
      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-8 md:grid-cols-2">
            {project.galleryImages.map((img, i) => (
              <Reveal key={img + i} delay={i * 0.08}>
                <div
                  className={`relative overflow-hidden bg-secondary ${
                    i % 3 === 0 ? 'aspect-[4/5]' : 'aspect-[4/3]'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${project.title} — ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      {project.results && (
        <section className="px-6 py-16 md:px-10">
          <div className="mx-auto max-w-[1600px]">
            <div className="grid gap-8 border-t border-hairline pt-12 md:grid-cols-3">
              {project.results.map((r, i) => (
                <Reveal key={r} delay={i * 0.1}>
                  <p className="font-display text-3xl font-light tracking-tightest md:text-5xl">
                    {r}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* NEXT PROJECT */}
      {next && (
        <section className="border-t border-hairline px-6 py-24 md:px-10">
          <div className="mx-auto max-w-[1600px]">
            <Link
              href={`/portfolio/${next.slug}`}
              className="group flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Next project
                </p>
                <h2 className="mt-4 font-display text-4xl font-medium tracking-tightest md:text-6xl">
                  {next.title}
                </h2>
              </div>
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-foreground/20 transition-all group-hover:bg-foreground group-hover:text-background">
                <ArrowRight className="h-5 w-5" />
              </span>
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}

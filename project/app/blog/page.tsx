import Link from 'next/link';
import Image from 'next/image';
import Reveal from '@/components/ui/reveal';
import { blogPosts } from '@/data/blog';

export const metadata = {
  title: 'Journal — THE ARTSY',
  description: 'Notes on motion, film, design, and photography from the studio.',
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <main className="grain pt-32 md:pt-40">
      <section className="px-6 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Journal — Notes from the studio
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-8 text-balance font-display text-display font-medium tracking-tightest">
              The <span className="italic">journal</span>.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* FEATURED */}
      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                  <Image
                    src={featured.cover}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {featured.category} — {featured.readTime}
                  </p>
                  <h2 className="mt-4 text-balance font-display text-4xl font-medium tracking-tightest md:text-5xl">
                    {featured.title}
                  </h2>
                  <p className="mt-4 max-w-md text-pretty text-muted-foreground">
                    {featured.excerpt}
                  </p>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* LIST */}
      <section className="border-t border-hairline px-6 py-16 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <div className="border-t border-hairline">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.05}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid gap-4 border-b border-hairline py-10 md:grid-cols-12"
                >
                  <div className="md:col-span-1">
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                  <div className="md:col-span-7">
                    <h3 className="font-display text-2xl font-medium tracking-tight md:text-3xl">
                      {post.title}
                    </h3>
                  </div>
                  <div className="md:col-span-3">
                    <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                  </div>
                  <div className="md:col-span-1 md:justify-self-end">
                    <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground transition-opacity group-hover:opacity-100 md:opacity-40">
                      Read
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

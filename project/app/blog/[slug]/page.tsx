import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Reveal from '@/components/ui/reveal';
import { blogPosts, getPost } from '@/data/blog';

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) return { title: 'Journal — THE ARTSY' };
  return { title: `${post.title} — THE ARTSY`, description: post.excerpt };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <main className="grain pt-32 md:pt-40">
      <article className="px-6 md:px-10">
        <div className="mx-auto max-w-[760px]">
          <Reveal>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-opacity hover:opacity-60"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Journal
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-12 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {post.category} — {post.readTime}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 className="mt-4 text-balance font-display text-4xl font-medium tracking-tightest md:text-6xl">
              {post.title}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-pretty text-lg text-muted-foreground">
              {post.excerpt}
            </p>
          </Reveal>

          <div className="mt-16 space-y-8">
            {post.content.map((para, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className="text-pretty text-lg leading-relaxed text-foreground/90">
                  {para}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}

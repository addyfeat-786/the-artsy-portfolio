import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Reveal from '@/components/ui/reveal';
import { products, getProduct } from '@/data/products';
import ProductClient from './product-client';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) return { title: 'Product — THE ARTSY' };
  return { title: `${product.title} — THE ARTSY`, description: product.description };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  return (
    <main className="grain pt-32 md:pt-40">
      <section className="px-6 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-opacity hover:opacity-60"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Marketplace
            </Link>
          </Reveal>

          <div className="mt-12 grid gap-12 md:grid-cols-2">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {product.category}
                </p>
                <h1 className="mt-3 font-display text-4xl font-medium tracking-tightest md:text-5xl">
                  {product.title}
                </h1>
                <ProductClient product={product} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}

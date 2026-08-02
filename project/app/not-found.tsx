import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="grain flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Error 404
      </p>
      <h1 className="mt-8 font-display text-hero font-medium tracking-tightest">
        404
      </h1>
      <p className="mt-6 max-w-md text-pretty text-muted-foreground">
        The page you’re looking for has been moved, removed, or never existed.
      </p>
      <Link
        href="/"
        className="group mt-12 inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-foreground hover:text-background"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Return home
      </Link>
    </main>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Reveal from '@/components/ui/reveal';
import Magnetic from '@/components/ui/magnetic';

export default function RegisterPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  return (
    <main className="grain flex min-h-screen flex-col justify-center px-6 pt-32 pb-16 md:pt-40">
      <section className="mx-auto w-full max-w-md">
        <Reveal>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-opacity hover:opacity-60"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Home
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Account — Create
            </p>
            <h1 className="mt-6 font-display text-5xl font-medium tracking-tightest md:text-6xl">
              Join the <span className="italic">studio</span>.
            </h1>
          </div>
        </Reveal>

        {submitted ? (
          <Reveal delay={0.15}>
            <div className="mt-12 border border-hairline p-8">
              <h2 className="font-display text-2xl font-medium tracking-tight">Welcome.</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Your account has been created. You can now sign in.
              </p>
              <Link
                href="/login"
                className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em]"
              >
                Sign in
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>
        ) : (
          <Reveal delay={0.15}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="mt-12 space-y-8"
            >
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Name
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-3 w-full border-b border-foreground/20 bg-transparent py-3 text-lg outline-none transition-colors focus:border-foreground"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Email
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-3 w-full border-b border-foreground/20 bg-transparent py-3 text-lg outline-none transition-colors focus:border-foreground"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Password
                </label>
                <input
                  required
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="mt-3 w-full border-b border-foreground/20 bg-transparent py-3 text-lg outline-none transition-colors focus:border-foreground"
                />
              </div>

              <Magnetic strength={0.2}>
                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-8 py-4 text-xs uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-90"
                >
                  Create account
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </Magnetic>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link href="/login" className="underline underline-offset-4 transition-opacity hover:opacity-60">
                  Sign in
                </Link>
              </p>
            </form>
          </Reveal>
        )}
      </section>
    </main>
  );
}

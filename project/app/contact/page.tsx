'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/ui/reveal';
import Magnetic from '@/components/ui/magnetic';

const socials = [
  { label: 'Instagram', href: '#' },
  { label: 'Vimeo', href: '#' },
  { label: 'Behance', href: '#' },
  { label: 'LinkedIn', href: '#' },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="grain pt-32 md:pt-40">
      <section className="px-6 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Contact — Start a conversation
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-8 text-balance font-display text-display font-medium tracking-tightest">
              Let’s make <br />
              <span className="italic">something</span>.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-24 md:px-10">
        <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-12">
          {/* FORM */}
          <div className="md:col-span-7">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex h-full flex-col justify-center border border-hairline p-12"
              >
                <h2 className="font-display text-3xl font-medium tracking-tightest">
                  Thank you.
                </h2>
                <p className="mt-4 max-w-md text-muted-foreground">
                  Your message has reached the studio. We reply to every enquiry
                  personally, usually within two working days.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
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
                    Project details
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="mt-3 w-full resize-none border-b border-foreground/20 bg-transparent py-3 text-lg outline-none transition-colors focus:border-foreground"
                  />
                </div>
                <Magnetic strength={0.2}>
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-xs uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-90"
                  >
                    Send message
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </Magnetic>
              </form>
            )}
          </div>

          {/* DETAILS */}
          <div className="md:col-span-4 md:col-start-9">
            <div className="space-y-10">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Studio
                </p>
                <p className="mt-3 text-lg">
                  14 Rue Vingt
                  <br />
                  75003 Paris, France
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Email
                </p>
                <a
                  href="mailto:studio@theartsy.co"
                  className="mt-3 block text-lg transition-opacity hover:opacity-60"
                >
                  studio@theartsy.co
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Elsewhere
                </p>
                <ul className="mt-3 space-y-2">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        className="inline-flex items-center gap-1 text-lg transition-opacity hover:opacity-60"
                      >
                        {s.label}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/ui/reveal';
import SectionHeader from '@/components/layout/section-header';
import { services } from '@/data/services';

export const metadata = {
  title: 'Services — THE ARTSY',
  description: 'Motion design, video editing, graphic design, photography, brand identity, and creative direction.',
};

const process = [
  { n: '01', t: 'Discovery', d: 'We start with a conversation. What is the idea, who is it for, what should it feel like.' },
  { n: '02', t: 'Direction', d: 'A written and visual direction — references, tone, and the shape of the work.' },
  { n: '03', t: 'Craft', d: 'The making. Frames, cuts, type, and light, refined until the work is itself.' },
  { n: '04', t: 'Delivery', d: 'Masters, source files, and guidance. The work, ready to live in the world.' },
];

export default function ServicesPage() {
  return (
    <main className="grain pt-32 md:pt-40">
      <section className="px-6 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Services — What we do
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-8 text-balance font-display text-display font-medium tracking-tightest">
              Six disciplines, <span className="italic">one standard</span>.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* SERVICE LIST */}
      <section className="px-6 py-24 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <div className="border-t border-hairline">
            {services.map((s, i) => (
              <Reveal key={s.number} delay={i * 0.05}>
                <div className="group grid gap-6 border-b border-hairline py-10 md:grid-cols-12 md:py-16">
                  <div className="md:col-span-1">
                    <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {s.number}
                    </span>
                  </div>
                  <div className="md:col-span-5">
                    <h2 className="font-display text-4xl font-medium tracking-tightest md:text-6xl">
                      {s.title}
                    </h2>
                  </div>
                  <div className="md:col-span-5">
                    <p className="text-pretty text-muted-foreground">{s.description}</p>
                    <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                      {s.deliverables.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="md:col-span-1 md:justify-self-end">
                    <Link href="/contact" className="inline-block text-muted-foreground transition-opacity group-hover:opacity-100 md:opacity-40">
                      <ArrowUpRight className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-t border-hairline px-6 py-32 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <SectionHeader index="Process" title={<>How we work</>} />
          <div className="mt-16 grid gap-px border-t border-hairline md:grid-cols-4">
            {process.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.08}>
                <div className="border-b border-hairline p-8 md:border-b-0 md:border-r md:p-10">
                  <span className="font-display text-4xl font-light tracking-tightest text-muted-foreground">
                    {p.n}
                  </span>
                  <h3 className="mt-6 text-base font-medium">{p.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

import Image from 'next/image';
import Reveal from '@/components/ui/reveal';
import SectionHeader from '@/components/layout/section-header';

const timeline = [
  {
    year: '2018',
    title: 'Studio founded',
    desc: 'Began as a one-person motion practice in a borrowed edit suite.',
  },
  {
    year: '2020',
    title: 'First brand film',
    desc: 'The Aurora project set the studio’s tone — quiet, cinematic, considered.',
  },
  {
    year: '2022',
    title: 'Multidisciplinary',
    desc: 'Expanded into identity, photography, and creative direction.',
  },
  {
    year: '2024',
    title: 'Now',
    desc: 'A small studio working with brands and filmmakers across Europe.',
  },
];

const skills = [
  { group: 'Motion', items: ['After Effects', 'Cinema 4D', 'Houdini', 'DaVinci Resolve'] },
  { group: 'Editing', items: ['Premiere Pro', 'Pro Tools', 'Avid'] },
  { group: 'Design', items: ['Illustrator', 'InDesign', 'Glyphs', 'Figma'] },
  { group: 'Photography', items: ['Capture One', 'Photoshop', 'Phase One'] },
];

export const metadata = {
  title: 'About — THE ARTSY',
  description: 'A multidisciplinary studio for motion, film, design, and photography.',
};

export default function AboutPage() {
  return (
    <main className="grain pt-32 md:pt-40">
      {/* HERO */}
      <section className="px-6 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              About — The Studio
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-8 text-balance font-display text-display font-medium tracking-tightest">
              A studio for the <span className="italic">considered</span>.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* PORTRAIT + STATEMENT */}
      <section className="px-6 py-24 md:px-10">
        <div className="mx-auto grid max-w-[1600px] gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                <Image
                  src="/images/project-05.jpg"
                  alt="The studio"
                  fill
                  className="object-cover grayscale"
                  sizes="40vw"
                />
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7 md:pt-16">
            <Reveal delay={0.1}>
              <p className="text-balance font-display text-2xl font-light leading-snug tracking-tight md:text-3xl">
                The Artsy is a small, multidisciplinary studio working across motion
                graphics, video editing, graphic design, and photography. We believe
                craft is a form of respect — for the work, the audience, and the idea.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-md text-pretty text-muted-foreground">
                We work with a short list of clients at a time, so every frame, every
                cut, and every letterform can be made with the attention it deserves.
                No templates. No noise. Only the work.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="border-t border-hairline px-6 py-32 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <SectionHeader index="01" title={<>The path so far</>} />
          <div className="mt-16 grid gap-px border-t border-hairline md:grid-cols-4">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.08}>
                <div className="border-b border-hairline p-8 md:border-b-0 md:border-r md:p-10">
                  <span className="font-display text-4xl font-light tracking-tightest text-muted-foreground">
                    {t.year}
                  </span>
                  <h3 className="mt-6 text-base font-medium">{t.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="border-t border-hairline px-6 py-32 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <SectionHeader index="02" title={<>Tools of the trade</>} />
          <div className="mt-16 grid gap-8 md:grid-cols-4">
            {skills.map((s, i) => (
              <Reveal key={s.group} delay={i * 0.06}>
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {s.group}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {s.items.map((item) => (
                      <li key={item} className="font-display text-xl font-light tracking-tight">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

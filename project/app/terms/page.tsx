import Reveal from '@/components/ui/reveal';

export const metadata = {
  title: 'Terms — THE ARTSY',
  description: 'The terms governing use of The Artsy website and digital products.',
};

const sections = [
  {
    h: '1. Use of the site',
    p: 'By accessing this site you agree to use it for lawful purposes only and not to attempt to disrupt, reverse-engineer, or misuse any part of the service.',
  },
  {
    h: '2. Digital products',
    p: 'Products purchased from the marketplace are licensed, not sold, for a single user unless otherwise stated. Licences are non-transferable. Resale, redistribution, or sub-licensing of unmodified product files is prohibited.',
  },
  {
    h: '3. Refunds',
    p: 'Due to the nature of digital goods, all sales are final. If a product is demonstrably defective we will, at our discretion, replace the file or issue a refund.',
  },
  {
    h: '4. Intellectual property',
    p: 'All studio work, portfolio content, and site design remain the property of The Artsy. You may not reproduce, redistribute, or present studio work as your own without written permission.',
  },
  {
    h: '5. Liability',
    p: 'The Artsy provides the site and products on an “as is” basis. To the extent permitted by law, we are not liable for any indirect or consequential loss arising from use of the site or its products.',
  },
  {
    h: '6. Changes',
    p: 'We may update these terms from time to time. Continued use of the site after changes constitutes acceptance of the revised terms.',
  },
];

export default function TermsPage() {
  return (
    <main className="grain pt-32 md:pt-40">
      <section className="px-6 md:px-10">
        <div className="mx-auto max-w-[760px]">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Legal — Terms
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-8 font-display text-display font-medium tracking-tightest">
              Terms of <span className="italic">use</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-muted-foreground">
              Last updated 30 July 2026.
            </p>
          </Reveal>

          <div className="mt-16 space-y-12">
            {sections.map((s, i) => (
              <Reveal key={s.h} delay={i * 0.05}>
                <div>
                  <h2 className="font-display text-xl font-medium tracking-tight">{s.h}</h2>
                  <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                    {s.p}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

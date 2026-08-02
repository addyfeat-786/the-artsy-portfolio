import Reveal from '@/components/ui/reveal';

export const metadata = {
  title: 'Privacy Policy — THE ARTSY',
  description: 'How The Artsy collects, uses, and protects your data.',
};

const sections = [
  {
    h: '1. Information we collect',
    p: 'We collect the information you provide directly — such as your name and email when you contact us or create an account — and technical data like your browser type and pages visited, collected automatically through cookies.',
  },
  {
    h: '2. How we use your information',
    p: 'Your information is used to respond to enquiries, deliver purchased products, improve the website, and send occasional studio updates where you have opted in. We never sell your data.',
  },
  {
    h: '3. Data storage',
    p: 'Data is stored with trusted third-party providers (including Supabase and payment processors) who act as processors under appropriate data-protection agreements. Payment details are handled entirely by our payment provider and never stored on our servers.',
  },
  {
    h: '4. Your rights',
    p: 'You may request access to, correction of, or deletion of your personal data at any time by writing to studio@theartsy.co. Where applicable, you also have the right to data portability and to object to processing.',
  },
  {
    h: '5. Cookies',
    p: 'We use essential cookies for the site to function and optional analytics cookies to understand how the site is used. You can control cookies through your browser settings.',
  },
  {
    h: '6. Contact',
    p: 'Questions about this policy can be sent to studio@theartsy.co. We will respond within a reasonable timeframe.',
  },
];

export default function PrivacyPage() {
  return (
    <main className="grain pt-32 md:pt-40">
      <section className="px-6 md:px-10">
        <div className="mx-auto max-w-[760px]">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Legal — Privacy
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-8 font-display text-display font-medium tracking-tightest">
              Privacy <span className="italic">policy</span>.
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

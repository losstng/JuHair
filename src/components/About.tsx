interface Props {
  t: typeof import('../../i18n/en').default;
}

export default function About({ t }: Props) {
  return (
    <section id="about" className="max-w-3xl mx-auto px-4 py-12 text-center">
      <h2 className="text-2xl font-bold tracking-wide">{t.about.heading}</h2>
      <p className="mt-4 text-neutral-700 leading-relaxed">{t.about.copy}</p>
    </section>
  );
}

interface Props {
  t: typeof import('../../i18n/en').default;
}

export default function Hero({ t }: Props) {
  return (
    <section id="home" className="text-center py-20">
      <h1 className="text-4xl font-extrabold tracking-wider">
        {t.hero.heading}
      </h1>
      <p className="mt-2 uppercase tracking-widest">
        {t.hero.subheading}
      </p>
      <p className="mt-4">{t.hero.address}</p>
      <div className="mt-6 flex justify-center gap-4">
        <a
          href="#book"
          className="px-6 py-3 bg-black text-white rounded-full"
        >
          {t.hero.ctaPrimary}
        </a>
        <a
          href="#"
          className="px-6 py-3 border border-black rounded-full"
        >
          {t.hero.ctaSecondary}
        </a>
      </div>
    </section>
  );
}

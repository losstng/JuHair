import { Lang } from '../../i18n';
import { BOOKING_LINK } from '../data';

interface Props {
  t: typeof import('../../i18n/en').default;
  lang: Lang;
  setLang: (l: Lang) => void;
}

export default function Nav({ t, lang, setLang }: Props) {
  return (
    <nav className="flex items-center justify-between bg-[#EFE8DD] px-5 py-4 sticky top-0 text-sm">
      <div className="flex items-center gap-2 font-semibold">
        <span aria-hidden>✂️</span>
        <span>JuHair</span>
      </div>
      <ul className="flex gap-4">
        <li><a className="flex items-center gap-1" href="#home"><span aria-hidden>🏠</span>{t.nav.home}</a></li>
        <li><a className="flex items-center gap-1" href="#prices"><span aria-hidden>💲</span>{t.nav.prices}</a></li>
        <li><a className="flex items-center gap-1" href="#gallery"><span aria-hidden>🖼️</span>{t.nav.gallery}</a></li>
      </ul>
      <div className="flex items-center gap-3">
        <button onClick={() => setLang(lang === 'en' ? 'vi' : 'en')} className="uppercase">
          {lang === 'en' ? 'VI' : 'EN'}
        </button>
        <a
          href={BOOKING_LINK}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 px-3 py-1 rounded-full bg-black text-white"
        >
          <span aria-hidden>📅</span> {t.hero.ctaPrimary}
        </a>
      </div>
    </nav>
  );
}

import { Lang } from '../../i18n';
import { BOOKING_LINK } from '../data';
import { Calendar, DollarSign, House, Image as ImageIcon, Scissors } from 'lucide-react';

interface Props {
  t: typeof import('../../i18n/en').default;
  lang: Lang;
  setLang: (l: Lang) => void;
}

export default function Nav({ t, lang, setLang }: Props) {
  return (
    <nav className="flex items-center justify-between bg-[#EFE8DD] px-5 py-4 sticky top-0 text-sm">
      <div className="flex items-center gap-2 font-semibold">
        <Scissors className="w-5 h-5" />
        <span>JuHair</span>
      </div>
      <ul className="flex gap-4">
        <li><a className="flex items-center gap-1" href="#home"><House className="w-4 h-4" />{t.nav.home}</a></li>
        <li><a className="flex items-center gap-1" href="#prices"><DollarSign className="w-4 h-4" />{t.nav.prices}</a></li>
        <li><a className="flex items-center gap-1" href="#gallery"><ImageIcon className="w-4 h-4" />{t.nav.gallery}</a></li>
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
          <Calendar className="w-4 h-4" /> {t.hero.ctaPrimary}
        </a>
      </div>
    </nav>
  );
}

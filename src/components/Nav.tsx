import { Lang } from '../../i18n';

interface Props {
  t: typeof import('../../i18n/en').default;
  lang: Lang;
  setLang: (l: Lang) => void;
}

export default function Nav({ t, lang, setLang }: Props) {
  return (
    <nav className="flex items-center justify-between bg-[#EFE8DD] px-5 py-4 sticky top-0 uppercase text-sm tracking-wider">
      <ul className="flex gap-4">
        <li><a href="#home">{t.nav.home}</a></li>
        <li><a href="#book">{t.nav.book}</a></li>
        <li><a href="#about">{t.nav.about}</a></li>
        <li><a href="#price">{t.nav.price}</a></li>
        <li><a href="#warranty">{t.nav.warranty}</a></li>
        <li><a href="#news">{t.nav.news}</a></li>
      </ul>
      <button onClick={() => setLang(lang === 'en' ? 'vi' : 'en')}>
        {lang === 'en' ? 'VI' : 'EN'}
      </button>
    </nav>
  );
}

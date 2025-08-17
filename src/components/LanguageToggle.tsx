import { useState } from 'preact/hooks';
import type { Lang } from '../../i18n';

interface Props {
  lang: Lang;
}

export default function LanguageToggle({ lang }: Props) {
  const [current, setCurrent] = useState<Lang>(lang);
  const toggle = () => {
    const next = current === 'en' ? 'vi' : 'en';
    const nextPath = next === 'vi' ? '/' : '/en/';
    window.location.pathname = nextPath;
    setCurrent(next);
  };
  return (
    <button onClick={toggle} aria-label="toggle language">
      {current === 'en' ? 'VI' : 'EN'}
    </button>
  );
}

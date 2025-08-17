import { useState } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Footer from './components/Footer';
import { ui, Lang } from '../i18n';

export default function App() {
  const [lang, setLang] = useState<Lang>('vi');
  const t = ui[lang];

  return (
    <>
      <Nav t={t} lang={lang} setLang={setLang} />
      <main>
        <Hero t={t} />
      </main>
      <Footer t={t} />
    </>
  );
}

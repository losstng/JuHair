import { ADDRESS, GOOGLE_MAPS_LINK, HOTLINE } from '../data';

interface Props {
  t: typeof import('../../i18n/en').default;
}

export default function Footer({ t }: Props) {
  return (
    <footer className="bg-[#EFE8DD] mt-10 p-6 text-center">
      <p>
        <strong>{t.footer.hotline}:</strong> <a href={`tel:${HOTLINE.replace(/\s/g, '')}`}>{HOTLINE}</a>
      </p>
      <p className="mt-2">
        <strong>{t.footer.address}:</strong> {ADDRESS}
      </p>
      <p className="mt-2">
        <a href={GOOGLE_MAPS_LINK} target="_blank" rel="noopener noreferrer">
          {t.footer.openMap}
        </a>
      </p>
      <p className="mt-2">© JuHair</p>
    </footer>
  );
}

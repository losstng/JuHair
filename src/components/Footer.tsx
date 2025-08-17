interface Props {
  t: typeof import('../../i18n/en').default;
}

export default function Footer({ t }: Props) {
  return (
    <footer className="bg-[#EFE8DD] mt-10 p-6 text-center">
      <p>
        <strong>{t.footer.hotline}:</strong> <a href="tel:+84999999999">+84 999 999 999</a>
      </p>
      <p className="mt-2">
        <strong>{t.footer.address}:</strong> 407/3 Lê Văn Sỹ, Quận 3
      </p>
      <p className="mt-2">
        <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
          {t.footer.openMap}
        </a>
      </p>
      <p className="mt-2">© JuHair</p>
    </footer>
  );
}

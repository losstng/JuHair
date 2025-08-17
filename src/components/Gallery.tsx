import { GALLERY } from '../data';

interface Props {
  t: typeof import('../../i18n/en').default;
}

export default function Gallery({ t }: Props) {
  return (
    <section id="gallery" className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-center mb-6">{t.gallery.heading}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {GALLERY.map((img) => (
          <img
            key={img.url}
            src={img.url}
            alt={img.alt}
            className="w-full h-48 object-cover rounded-xl border"/>
        ))}
      </div>
    </section>
  );
}

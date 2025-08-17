import { PRICE_LIST } from '../data';
import { Lang } from '../../i18n';

interface Props {
  t: typeof import('../../i18n/en').default;
  lang: Lang;
}

export default function PriceList({ t, lang }: Props) {
  const fmt = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  });

  return (
    <section id="prices" className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-center mb-4">{t.prices.heading}</h2>
      <p className="text-center text-neutral-600 mb-6">{t.prices.note}</p>
      <div className="overflow-hidden rounded-2xl border">
        <table className="w-full text-left">
          <thead className="bg-neutral-50">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold">{t.prices.service}</th>
              <th className="px-4 py-3 text-sm font-semibold">{t.prices.price}</th>
            </tr>
          </thead>
          <tbody>
            {PRICE_LIST.map((row, i) => (
              <tr key={row.key} className={i % 2 ? 'bg-white' : 'bg-neutral-50/50'}>
                <td className="px-4 py-3">{lang === 'en' ? row.name_en : row.name_vi}</td>
                <td className="px-4 py-3 font-medium">{fmt.format(row.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

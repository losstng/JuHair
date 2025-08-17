import React, { createContext, useContext, useMemo, useState } from "react";

// Simple emoji-based icons so the app runs without extra dependencies
const ICONS = {
  phone: "📞",
  map: "📍",
  instagram: "📸",
  facebook: "📘",
  youtube: "▶️",
  calendar: "📅",
  languages: "🌐",
  menu: "☰",
  close: "✖️",
  image: "🖼️",
  dollar: "💲",
  scissors: "✂️",
  house: "🏠",
};

function Icon({ label, symbol }: { label?: string; symbol: string }) {
  return (
    <span role="img" aria-label={label} className="inline-block mr-1 align-[-0.125em]">
      {symbol}
    </span>
  );
}

// ----------------------
// Minimal i18n utilities
// ----------------------

type Lang = "en" | "vi";

type I18nCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: string) => string;
};

const STRINGS: Record<Lang, Record<string, string>> = {
  en: {
    "brand.name": "Salon Lumière",
    "nav.home": "Home",
    "nav.prices": "Prices",
    "nav.gallery": "Gallery",
    "cta.book": "Book Appointment",
    "hero.title": "Cut. Color. Care.",
    "hero.subtitle": "Modern hair artistry in District 1, Saigon.",
    "section.about": "About",
    "about.copy":
      "Precision cuts, bespoke color, and restorative treatments delivered by stylists who listen.",
    "gallery.title": "Latest looks",
    "prices.title": "Price Menu",
    "prices.note": "Indicative pricing in VND · Final quote after consultation.",
    "prices.altimage": "Price list image",
    "prices.table.toggleImage": "Show price image",
    "prices.table.toggleTable": "Show as table",
    "footer.hotline": "Hotline",
    "footer.address": "Address",
    "footer.hours": "Hours",
    "footer.follow": "Follow",
    "footer.map": "Open in Google Maps",
    "hours.copy": "Mon–Sun 9:00–20:00",
    "toast.copied": "Copied!",
    "contact.title": "Contact Us",
    "contact.booking": "Booking",
  },
  vi: {
    "brand.name": "Salon Lumière",
    "nav.home": "Trang chủ",
    "nav.prices": "Bảng giá",
    "nav.gallery": "Bộ sưu tập",
    "cta.book": "Đặt lịch",
    "hero.title": "Cắt · Nhuộm · Chăm sóc",
    "hero.subtitle": "Tạo kiểu hiện đại tại Quận 1, Sài Gòn.",
    "section.about": "Giới thiệu",
    "about.copy":
      "Cắt tỉa chuẩn xác, màu nhuộm theo ý và liệu trình phục hồi – chúng tôi lắng nghe bạn.",
    "gallery.title": "Kiểu tóc mới",
    "prices.title": "Bảng giá",
    "prices.note": "Giá tham khảo (VND) · Báo giá cuối sau tư vấn.",
    "prices.altimage": "Ảnh bảng giá",
    "prices.table.toggleImage": "Xem ảnh bảng giá",
    "prices.table.toggleTable": "Xem dạng bảng",
    "footer.hotline": "Hotline",
    "footer.address": "Địa chỉ",
    "footer.hours": "Giờ mở cửa",
    "footer.follow": "Mạng xã hội",
    "footer.map": "Mở trên Google Maps",
    "hours.copy": "Thứ 2–CN 9:00–20:00",
    "toast.copied": "Đã sao chép!",
    "contact.title": "Liên hệ",
    "contact.booking": "Đặt lịch",
  },
};

const I18nContext = createContext<I18nCtx>({
  lang: "en",
  setLang: () => {},
  t: (k: string) => STRINGS.en[k] ?? k,
});

function useI18n() {
  return useContext(I18nContext);
}

// ----------------------
// Design tokens & data
// ----------------------

const HOTLINE = "+84 90 123 4567";
const ADDRESS_LINE = "42 Nguyễn Huệ, Quận 1, TP.HCM";
const GOOGLE_MAPS_LINK =
  "https://www.google.com/maps/place/42+Nguy%E1%BB%85n+Hu%E1%BB%87,+B%E1%BA%BFn+Ngh%C3%A9,+Qu%E1%BA%ADn+1,+H%E1%BB%93+Ch%C3%AD+Minh";
const BOOKING_LINK = "https://cal.com/your-salon/booking"; // replace with your real booking URL

// Google Maps Embed URL (iframe src) — get this from Google Maps → Share → Embed a map → Copy HTML → extract the src value
const GOOGLE_MAPS_EMBED_SRC = "PASTE_YOUR_IFRAME_SRC_HERE";

// Social profiles
const SOCIALS = { facebook: "#", instagram: "#", tiktok: "#" }; // replace with your real booking URL

// Placeholder gallery images — replace with your own.
const GALLERY: { url: string; alt: string }[] = [
  {
    url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop",
    alt: "Textured bob with soft waves",
  },
  {
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
    alt: "Rich brunette color with shine finish",
  },
  {
    url: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1600&auto=format&fit=crop",
    alt: "Precision scissor cut, short style",
  },
  {
    url: "https://images.unsplash.com/photo-1519415387722-a1c3bbef7160?q=80&w=1600&auto=format&fit=crop",
    alt: "Balayage highlights on long hair",
  },
];

const PRICE_IMAGE =
  "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1400&auto=format&fit=crop"; // swap for your uploaded price menu image

const PRICE_TABLE = [
  { key: "cut", name_en: "Cut & Style", name_vi: "Cắt & Tạo kiểu", price: 350_000 },
  { key: "color", name_en: "Color (Short)", name_vi: "Nhuộm (Ngắn)", price: 900_000 },
  { key: "color-long", name_en: "Color (Long)", name_vi: "Nhuộm (Dài)", price: 1_200_000 },
  { key: "treatment", name_en: "Repair Treatment", name_vi: "Phục hồi", price: 650_000 },
  { key: "perm", name_en: "Perm", name_vi: "Uốn", price: 1_300_000 },
];

// ----------------------
// UI Helpers
// ----------------------

function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function copyToClipboard(text: string) {
  navigator.clipboard?.writeText(text);
}

// ----------------------
// App Shell
// ----------------------

type Page = "home" | "prices" | "gallery";

function Nav({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);

  const NavLink = ({ p, children }: { p: Page; children: React.ReactNode }) => (
    <button
      onClick={() => {
        setPage(p);
        setOpen(false);
      }}
      className={classNames(
        "px-3 py-2 rounded-xl text-sm font-medium",
        page === p ? "bg-black text-white" : "hover:bg-black/5"
      )}
    >
      {children}
    </button>
  );

  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Icon symbol={ICONS.scissors} />
            <span className="font-semibold tracking-wide">{t("brand.name")}</span>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <NavLink p="home">
              <Icon symbol={ICONS.house} /> {t("nav.home")}
            </NavLink>
            <NavLink p="prices">
              <Icon symbol={ICONS.dollar} /> {t("nav.prices")}
            </NavLink>
            <NavLink p="gallery">
              <Icon symbol={ICONS.image} /> {t("nav.gallery")}
            </NavLink>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "en" ? "vi" : "en")}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border hover:bg-black/5"
              aria-label="Toggle language"
            >
              <Icon symbol={ICONS.languages} />
              <span className="uppercase text-xs font-semibold">{lang}</span>
            </button>
            <a
              href={BOOKING_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-black text-white hover:bg-black/90"
            >
              <Icon symbol={ICONS.calendar} /> {t("cta.book")}
            </a>
          </div>

          <button className="md:hidden p-2" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            <span aria-hidden="true">{open ? ICONS.close : ICONS.menu}</span>
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t">
            <div className="py-3 flex flex-col gap-2">
              <NavLink p="home">{t("nav.home")}</NavLink>
              <NavLink p="prices">{t("nav.prices")}</NavLink>
              <NavLink p="gallery">{t("nav.gallery")}</NavLink>
              <button
                onClick={() => setLang(lang === "en" ? "vi" : "en")}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border w-max"
              >
                <Icon symbol={ICONS.languages} />
                <span className="uppercase text-xs font-semibold">{lang}</span>
              </button>
              <a
                href={BOOKING_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-black text-white w-max"
              >
                <Icon symbol={ICONS.calendar} /> {t("cta.book")}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Footer() {
  const { t } = useI18n();

  // Minimal TikTok icon
  const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M16.9 4.5c.8 1.1 2 2 3.4 2.3v3.1a7.6 7.6 0 01-4.1-1.2v6.1a6.25 6.25 0 11-6.3-6.2c.3 0 .6 0 .9.1v3.2a3.1 3.1 0 00-.9-.1 3 3 0 103 3V2.5h3.1v2z"/>
    </svg>
  );

  return (
    <footer className="bg-[#0f1613] text-white">
      <div className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-10 items-start">
        {/* Left: Contact panel */}
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">{t("contact.title")}</h2>

          <div className="mt-5">
            <a
              href={BOOKING_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-white text-black font-medium shadow-sm hover:bg-white/90 border"
            >
              {t("contact.booking")}
            </a>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold">{t("footer.hotline")}</h3>
              <a
                href={`tel:${HOTLINE.replaceAll(' ', '')}`}
                className="underline underline-offset-4 mt-2 inline-block"
              >
                {HOTLINE}
              </a>
            </div>

            <div>
              <h3 className="text-lg font-semibold">{t("footer.follow")}</h3>
              <div className="mt-2 flex items-center gap-4">
                <a href={SOCIALS.facebook} aria-label="Facebook" className="p-2 rounded-full bg-white/5 hover:bg-white/10">
                  <Icon symbol={ICONS.facebook} />
                </a>
                <a href={SOCIALS.instagram} aria-label="Instagram" className="p-2 rounded-full bg-white/5 hover:bg-white/10">
                  <Icon symbol={ICONS.instagram} />
                </a>
                <a href={SOCIALS.tiktok} aria-label="TikTok" className="p-2 rounded-full bg-white/5 hover:bg-white/10">
                  <TikTokIcon className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="sm:col-span-2">
              <h3 className="text-lg font-semibold">{t("footer.address")}</h3>
              <p className="mt-2">{ADDRESS_LINE}</p>
              <a
                href={GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noreferrer"
                className="text-sm underline underline-offset-4 mt-1 inline-block"
              >
                {t("footer.map")}
              </a>
            </div>
          </div>
        </div>

        {/* Right: Map */}
        <div className="rounded-xl overflow-hidden w-full h-[300px] border border-white/10">
          <iframe
            title="Google Map"
            src={GOOGLE_MAPS_EMBED_SRC}
            width="100%"
            height="100%"
            loading="lazy"
            className="w-full h-full"
            style={{ border: 0 }}
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </footer>
  );
}

function GalleryStrip({ title = "" }: { title?: string }) {
  const { t } = useI18n();
  const label = title || t("gallery.title");
  return (
    <section className="mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{label}</h2>
          <a
            href="#"
            className="text-sm text-blue-600 hover:underline"
            onClick={(e) => e.preventDefault()}
          >
            Instagram →
          </a>
        </div>
        <div className="overflow-x-auto">
          <div className="flex gap-4 min-w-max">
            {GALLERY.map((img) => (
              <img
                key={img.url}
                src={img.url}
                alt={img.alt}
                loading="lazy"
                className="h-56 w-40 sm:h-64 sm:w-48 object-cover rounded-2xl border shadow-sm"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------------------
// Pages
// ----------------------

function HomePage() {
  const { t } = useI18n();

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
              {t("hero.title")}
            </h1>
            <p className="mt-4 text-neutral-600 text-lg">{t("hero.subtitle")}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={BOOKING_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-black text-white hover:bg-black/90"
              >
                <Icon symbol={ICONS.calendar} /> {t("cta.book")}
              </a>
              <a
                href={`tel:${HOTLINE.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border hover:bg-black/5"
              >
                <Icon symbol={ICONS.phone} /> {HOTLINE}
              </a>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1800&auto=format&fit=crop"
              alt="Salon interior"
              className="rounded-3xl border shadow-md"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-lg font-semibold mb-2">{t("section.about")}</h2>
        <p className="text-neutral-700 leading-relaxed">{t("about.copy")}</p>
      </section>

      <GalleryStrip />
    </main>
  );
}

function PricesPage() {
  const { t, lang } = useI18n();
  const [mode, setMode] = useState<"image" | "table">("table");
  const fmt = useMemo(
    () => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }),
    []
  );

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-semibold">{t("prices.title")}</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode("image")}
            className={classNames(
              "px-3 py-2 rounded-xl border text-sm",
              mode === "image" && "bg-black text-white border-black"
            )}
          >
            {t("prices.table.toggleImage")}
          </button>
          <button
            onClick={() => setMode("table")}
            className={classNames(
              "px-3 py-2 rounded-xl border text-sm",
              mode === "table" && "bg-black text-white border-black"
            )}
          >
            {t("prices.table.toggleTable")}
          </button>
        </div>
      </div>

      <p className="text-neutral-600 mb-6">{t("prices.note")}</p>

      {mode === "image" ? (
        <img
          src={PRICE_IMAGE}
          alt={t("prices.altimage")}
          className="w-full rounded-2xl border shadow-sm"
          loading="lazy"
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border">
          <table className="w-full text-left">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold">Service</th>
                <th className="px-4 py-3 text-sm font-semibold">Price</th>
              </tr>
            </thead>
            <tbody>
              {PRICE_TABLE.map((row, i) => (
                <tr key={row.key} className={i % 2 ? "bg-white" : "bg-neutral-50/40"}>
                  <td className="px-4 py-3">
                    {lang === "en" ? row.name_en : row.name_vi}
                  </td>
                  <td className="px-4 py-3 font-medium">{fmt.format(row.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <GalleryStrip title={t("gallery.title")} />
    </main>
  );
}

function GalleryPage() {
  const { t } = useI18n();
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6">{t("nav.gallery")}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {GALLERY.concat(GALLERY).map((img, i) => (
          <img
            key={`${img.url}-${i}`}
            src={img.url}
            alt={img.alt}
            loading="lazy"
            className="w-full h-56 object-cover rounded-2xl border shadow-sm"
          />
        ))}
      </div>

      <GalleryStrip title={t("gallery.title")} />
    </main>
  );
}

// ----------------------
// Root Component
// ----------------------

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [page, setPage] = useState<Page>("home");

  const t = (k: string) => STRINGS[lang][k] ?? k;

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      <div className="min-h-dvh flex flex-col">
        <Nav page={page} setPage={setPage} />

        <div className="flex-1">
          {page === "home" && <HomePage />}
          {page === "prices" && <PricesPage />}
          {page === "gallery" && <GalleryPage />}
        </div>

        <Footer />

        {/* Floating hotline / book CTA */}
        <div className="fixed bottom-4 right-4 flex flex-col gap-2">
          <a
            href={BOOKING_LINK}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl shadow-lg bg-black text-white hover:bg-black/90"
          >
            <Icon symbol={ICONS.calendar} /> {t("cta.book")}
          </a>
          <button
            onClick={() => copyToClipboard(HOTLINE)}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl shadow-lg border bg-white hover:bg-black/5"
            title={t("footer.hotline")}
          >
            <Icon symbol={ICONS.phone} /> {HOTLINE}
          </button>
        </div>
      </div>
    </I18nContext.Provider>
  );
}

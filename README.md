# روزنامه پوشاک · Editorial Newspaper Clothing Store

یک فروشگاه اینترنتی کامل با هویت **Editorial / Newspaper** برای برند پوشاک ایرانی — RTL، فارسی، طراحی چاپی-روزنامه‌ای.

> برند: **روزنامه پوشاک** (استودیو ۲۵) — «پوشاک را روزنامه می‌دانیم که هر روز روی تن شهر چسبانده می‌شود»

## 🎨 Design System

**Palette (مطابق بریف):**
- ` #1A1A1E ` charcoal — نوار، فوتر، دارک
- ` #E8E3D8 ` paper — پس‌زمینه کاغذ کهنه
- ` #1F1D1B ` ink — متن اصلی
- ` #6B6963 ` muted — متن ثانویه
- ` #B33A2E ` accent — قرمز تحریریه / CTA
- ` #3A3A40 / #C9C2B0 ` border lines
- ` #2E5339 ` success — موجودی

**Typo:**
- Headings: Vazirmatn Black 900، tight tracking
- Body: Vazirmatn 400-500، leading relaxed
- Masthead meta: small caps Persian "دوره سوم · شماره ۲۵"
- Drop-cap reinterpreted for RTL (حرف اول درشت سمت راست)

**UI Rules:**
- No bubbly / no gradients / sharp 4px radius max
- 1px ruled dividers (single & double)
- Hover: sharp fades, not bouncy
- Newspaper columns for editorial pages

## 🗂 Site Structure

- **Homepage `/`** : Front page hero, featured grid (4 col desktop / 2 mobile), brand story with drop-cap, categories as sections, classified newsletter
- **Shop `/shop`** : Right sidebar filters (دسته، سایز، رنگ، قیمت) RTL, sort, pagination like page numbers
- **Product Detail `/product/:id`** : Gallery + thumbs, size chips, color swatches, qty stepper, tabs (توضیحات | سایز | نظرات), related as "مطالب مرتبط"
- **Cart `/cart`** : Line items with image, size/color, qty, remove, summary (جمع، ارسال، تخفیف، نهایی)
- **Checkout `/checkout`** : Multi-step (اطلاعات ارسال → پرداخت → بازبینی) Persian address form, mock gateways
- **About `/about`** : Editorial layout, drop-cap, pull-quote, timeline (تاریخچه چاپ)
- **Journal `/journal`** : Newspaper articles grid, byline "توسط تیم تحریریه", most-read sidebar
- **Contact `/contact`** : Form + imprint box (نشانی، تلفن، ایمیل)

## 🛠 Admin Panel `/admin` (Demo Mock Data Only)

Separate layout, sidebar nav, same palette but dashboard-like.

- **داشبورد** : Cards (فروش امروز، سفارشات، مشتریان، AOV) + Sales line chart (Recharts) + Best sellers bar chart
- **محصولات** : Table of 10 demo products with image, name, category, price, stock, edit/delete · Add button opens modal (no persist)
- **سفارشات** : Mock orders table with status badges (color-coded: پردازش paper, ارسال charcoal, تحویل success, لغو accent)
- **مشتریان** : Mock customers table
- **تنظیمات** : Store info, shipping, payment toggle — static UI

No backend / no DB — all hardcoded.

## 📦 Demo Products (10 exact as brief)

1. تیشرت یقه گرد بیسیک مشکی — ۴۸۵,۰۰۰ تومان — تیشرت
2. تیشرت اورسایز طرح‌دار سفید — ۵۹۰,۰۰۰ تومان — تیشرت
3. هودی مشکی کلاسیک — ۹۸۰,۰۰۰ تومان — هودی
4. هودی طوسی با پرینت مینیمال — ۱,۰۵۰,۰۰۰ تومان — هودی
5. شلوار جین راسته آبی تیره — ۱,۲۵۰,۰۰۰ تومان — شلوار
6. شلوار کتان بژ — ۹۲۰,۰۰۰ تومان — شلوار (ناموجود)
7. تیشرت پولو سرمه‌ای — ۶۷۰,۰۰۰ تومان — تیشرت
8. کاپشن بمبر مشکی — ۱,۸۹۰,۰۰۰ تومان — اکسسوری
9. کلاه بیسبال طرح لوگو — ۳۲۰,۰۰۰ تومان — اکسسوری
10. کیف دستی بوم مشکی — ۴۵۰,۰۰۰ تومان — اکسسوری

Each: sizes S/M/L/XL, 2-3 colors, stock, Persian description.

## 🧩 Tech

- Vite + React + TypeScript
- React Router DOM
- Tailwind CSS 3.4 (custom colors, editorial radius)
- Recharts (admin charts styled with palette)
- Context API for Cart (localStorage persist)
- `dir="rtl"` throughout, mirrored icons
- Vazirmatn via Google Fonts CDN
- Responsive mobile-first, sharp print-inspired transitions

## 🚀 Run

```bash
npm install
npm run dev    # http://localhost:5173
npm run build
npm run preview
```

## 📝 Notes

- All monetary values formatted `toLocaleString('fa-IR') + ' تومان'`
- Classified newsletter box styled like newspaper ad
- Pagination as newspaper page numbers
- Accessible contrast despite muted palette

## 📸 Credits

Images from Unsplash (placeholder). Fonts: Vazirmatn.

---

ساخته شده برای دمو پورتفولیو — تمام داده‌ها Mock است.

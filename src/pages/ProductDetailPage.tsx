import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { products, formatPrice, Product } from '../data/products';
import Rule from '../components/ui/Rule';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProductCard from '../components/ui/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  const { toggle: toggleWish, isWished } = useWishlist();

  // 404 handling instead of fallback
  if (!product) {
    return (
      <div className="bg-paper min-h-[70vh] flex items-center justify-center px-4">
        <div className="border-2 border-border-paper rounded-[4px] p-8 bg-[#EFE9DD] text-center max-w-md">
          <div className="text-[48px]">📰</div>
          <h1 className="font-black text-[20px] mt-3">محصول یافت نشد</h1>
          <p className="text-[13px] text-muted mt-2 leading-6">شماره {id} در آرشیو موجود نیست. شاید چاپش تمام شده باشد.</p>
          <Link to="/shop" className="inline-block mt-5"><Button>بازگشت به فروشگاه</Button></Link>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "خانه", "item": "/" }, { "@type": "ListItem", "position": 2, "name": "فروشگاه", "item": "/shop" }] }) }} />
        </div>
      </div>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0,3);

  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [tab, setTab] = useState<'desc' | 'size' | 'reviews'>('desc');
  const [showZoom, setShowZoom] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [added, setAdded] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    setSelectedSize(product.sizes[0]);
    setSelectedColor(product.colors[0]);
    setQty(1);
    setActiveImage(0);
    // recently viewed tracking
    try {
      const key = 'rooznameh-recent';
      const existing: string[] = JSON.parse(localStorage.getItem(key) || '[]');
      const filtered = existing.filter(x => x !== product.id);
      filtered.unshift(product.id);
      const sliced = filtered.slice(0, 4);
      localStorage.setItem(key, JSON.stringify(sliced));
      const recentProducts = sliced.filter(rid => rid !== product.id).map(rid => products.find(p => p.id === rid)!).filter(Boolean);
      setRecentlyViewed(recentProducts);
    } catch {}
    window.scrollTo(0,0);
  }, [product.id]);

  const handleAdd = () => {
    if (product.status === 'ناموجود' || product.stock <=0) return;
    addToCart(product, selectedSize, selectedColor, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const outOfStock = product.status === 'ناموجود' || product.stock <= 0;

  const allReviews = [
    { name: 'آرش', date: '۲۲ تیر', text: 'کیفیت چاپ فوق‌العاده است. بعد از ۳ بار شستشو هنوز مثل روز اول.', rating: 5, verified: true },
    { name: 'سارا', date: '۱۹ تیر', text: 'سایز L دقیقا اندازه بود. بسته بندی روزنامه‌ای هم خیلی باحال بود.', rating: 5, verified: true },
    { name: 'مهدی', date: '۱۸ تیر', text: 'پارچه خیلی نرم و لطیفه، برای تابستان عالیه. پیشنهاد میکنم.', rating: 5, verified: true },
    { name: 'نگار', date: '۱۵ تیر', text: 'رنگ مشکی بعد از شستشو کمی بور شد ولی هنوز قابل قبوله.', rating: 4, verified: true },
    { name: 'علی', date: '۱۲ تیر', text: 'سایز 3XL برای قد ۱۹۵ عالی بود. بالاخره یه برند پیدا شد که سایز بزرگ درست بزنه.', rating: 5, verified: true },
    { name: 'پریا', date: '۱۰ تیر', text: 'طرح چاپی خیلی خاصه، همه میپرسن از کجا خریدی.', rating: 5, verified: false },
    { name: 'کیان', date: '۸ تیر', text: 'ارسال سریع بود، بسته‌بندی شیک. فقط ای کاش رنگ سرمه‌ای هم موجود بود.', rating: 4, verified: true },
    { name: 'سحر', date: '۵ تیر', text: 'دومین خریدمه، کیفیت همیشگی. ممنون از تیم TpapaT', rating: 5, verified: true },
  ];

  // JSON-LD for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.images,
    "sku": `RN-1404-${product.id.padStart(4,'0')}`,
    "brand": { "@type": "Brand", "name": "روزنامه پوشاک" },
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "IRT",
      "availability": outOfStock ? "https://schema.org/OutOfStock" : "https://schema.org/InStock"
    }
  };

  return (
    <div className="bg-paper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="px-4 md:px-8 lg:px-12 py-4 border-b border-border-paper bg-[#EFE9DD] text-[11px] font-bold tracking-wide flex items-center gap-2 flex-wrap">
        <Link to="/" className="hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/20 rounded-[2px]">صفحه اصلی</Link>
        <span className="text-muted">/</span>
        <Link to="/shop" className="hover:text-accent">فروشگاه</Link>
        <span className="text-muted">/</span>
        <Link to={`/shop?cat=${product.category}`} className="hover:text-accent">{product.category}</Link>
        <span className="text-muted">/</span>
        <span className="text-ink" aria-current="page">{product.name}</span>
        <span className="mr-auto hidden md:inline-flex items-center gap-2 text-[10px] tracking-[0.2em]">
          <Badge variant="paper">شماره {product.id.padStart(2,'0')}</Badge>
          <span>چاپ {product.stock > 0 ? 'موجود در آرشیو' : 'ناموجود'}</span>
        </span>
      </nav>

      <div className="px-4 md:px-8 lg:px-12 py-8 grid grid-cols-12 gap-8">
        {/* Images with zoom */}
        <div className="col-span-12 lg:col-span-7 grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-10 aspect-[4/5] bg-[#DDD7C7] rounded-[4px] border border-border-paper overflow-hidden relative order-1 md:order-2 group">
            <button
              aria-label="بزرگنمایی تصویر"
              onClick={() => setShowZoom(true)}
              className="w-full h-full block focus:outline-none focus:ring-2 focus:ring-ink"
            >
              <img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-cover object-center" decoding="async" />
            </button>
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              {product.status === 'موجود' ? <Badge variant="success">موجود · {product.stock} عدد</Badge> : <Badge variant="accent">ناموجود</Badge>}
            </div>
            <div className="absolute bottom-3 left-3 bg-paper/90 backdrop-blur border border-border-paper rounded-[4px] px-2.5 py-1 text-[10px] font-bold tracking-wide flex items-center gap-2">
              <span>عکس {activeImage+1} از {product.images.length}</span>
              <span className="w-px h-3 bg-border-paper" />
              <button onClick={() => setShowZoom(true)} className="underline">زوم</button>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-charcoal/60 text-paper rounded-full w-10 h-10 hidden group-hover:flex items-center justify-center pointer-events-none">
              ⊕
            </div>
          </div>
          <div className="col-span-12 md:col-span-2 flex md:flex-col gap-3 order-2 md:order-1 overflow-x-auto md:overflow-visible pb-1">
            {product.images.map((img, i) => (
              <button
                key={i}
                aria-label={`تصویر ${i+1}`}
                aria-current={activeImage===i}
                onClick={() => setActiveImage(i)}
                className={`shrink-0 w-20 h-20 md:w-full md:h-24 rounded-[4px] overflow-hidden border-2 transition focus:outline-none focus:ring-2 focus:ring-accent ${activeImage===i ? 'border-ink' : 'border-border-paper hover:border-muted'}`}
              >
                <img src={img} alt={`${product.name} ${i+1}`} className="w-full h-full object-cover object-center" decoding="async" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="col-span-12 lg:col-span-5 space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] tracking-[0.2em] font-black text-accent uppercase">Section: {product.category}</span>
              <Rule className="flex-1" />
              <span className="text-[10px] font-bold text-muted">Vol. 3 · No. {product.id}</span>
            </div>
            <h1 className="font-black text-[28px] md:text-[36px] leading-[0.95] tracking-[-0.04em]">{product.name}</h1>
            <p className="text-[13px] text-muted font-medium mt-3 leading-6 border-r-2 border-accent pr-3">{product.description}</p>
          </div>

          <div className="flex items-center gap-3 border-y border-border-paper py-3.5">
            <span className="font-black text-[26px] tracking-tight">{formatPrice(product.price)}</span>
            <span className="text-[11px] font-bold text-success border border-success/20 bg-success/5 px-2.5 py-1 rounded-[4px]">✓ ارسال ۲۴ ساعته تهران</span>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-black text-[12px] tracking-[0.15em] uppercase">انتخاب سایز</h4>
              <button
                onClick={() => setShowSizeGuide(true)}
                className="text-[11px] font-bold underline decoration-dotted hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/20 rounded-[2px] px-1"
                aria-label="باز کردن راهنمای سایز"
              >
                راهنمای سایز ←
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map(s => (
                <button
                  key={s}
                  aria-label={`سایز ${s}`}
                  aria-pressed={selectedSize===s}
                  onClick={() => setSelectedSize(s)}
                  className={`h-11 rounded-[4px] border text-[13px] font-black transition focus:outline-none focus:ring-2 focus:ring-ink/20 ${selectedSize===s ? 'bg-charcoal text-paper border-charcoal' : 'bg-paper border-border-paper hover:border-ink'}`}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="mt-2 text-[11px] text-muted font-medium">سایز {selectedSize} · موجودی: {product.stock.toLocaleString('fa-IR')}</div>
          </div>

          <div>
            <h4 className="font-black text-[12px] tracking-[0.15em] uppercase mb-3">رنگ: {selectedColor.label}</h4>
            <div className="flex gap-2.5">
              {product.colors.map(c => (
                <button
                  key={c.name}
                  aria-label={`رنگ ${c.label}${selectedColor.name===c.name ? ' انتخاب شده' : ''}`}
                  aria-pressed={selectedColor.name===c.name}
                  onClick={() => {
                    setSelectedColor(c);
                    if (product.colorImages && product.colorImages[c.name]) {
                      const targetImg = product.colorImages[c.name][0];
                      const idx = product.images.findIndex(img => img === targetImg);
                      if (idx >= 0) setActiveImage(idx);
                    } else {
                      const idx = product.colors.findIndex(col => col.name === c.name);
                      if (idx >= 0) setActiveImage(idx % product.images.length);
                    }
                  }}
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition focus:outline-none focus:ring-2 focus:ring-ink/30 ${selectedColor.name===c.name ? 'border-ink scale-110' : 'border-border-paper hover:border-muted'}`}
                >
                  <span className="w-7 h-7 rounded-full border border-black/10 block" style={{ background: c.hex }} />
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-black text-[12px] tracking-[0.15em] uppercase">تعداد</span>
            <div className="flex items-center border border-border-paper rounded-[4px] h-11 bg-paper">
              <button aria-label="کاهش تعداد" onClick={() => setQty(Math.max(1, qty-1))} className="w-11 h-full font-black hover:bg-[#EFE9DD] transition focus:outline-none focus:ring-1 focus:ring-inset focus:ring-ink/20">−</button>
              <input aria-label="تعداد" value={qty.toLocaleString('fa-IR')} readOnly className="w-12 text-center bg-transparent font-black text-[14px]" />
              <button aria-label="افزایش تعداد" onClick={() => setQty(Math.min(product.stock, qty+1))} className="w-11 h-full font-black hover:bg-[#EFE9DD] transition focus:outline-none focus:ring-1 focus:ring-inset focus:ring-ink/20">+</button>
            </div>
            <span className="text-[11px] text-muted font-bold">{product.stock.toLocaleString('fa-IR')} در بایگانی</span>
          </div>

          <div className="grid grid-cols-12 gap-3 items-center">
            <div className="col-span-9">
              <Button
                fullWidth
                size="lg"
                disabled={outOfStock}
                onClick={handleAdd}
                aria-label={outOfStock ? "ناموجود" : "افزودن به سبد خرید"}
                className={`${added ? '!bg-success !border-success' : ''} font-black tracking-tight`}
              >
                {outOfStock ? 'ناموجود در آرشیو' : added ? '✓ افزوده شد' : 'افزودن به سبد خرید'}
              </Button>
            </div>
            <div className="col-span-3">
              <Button
                fullWidth
                size="sm"
                variant={isWished(product.id) ? "secondary" : "ghost"}
                onClick={() => toggleWish(product)}
                aria-label={isWished(product.id) ? "حذف از علاقه‌مندی" : "افزودن به علاقه‌مندی"}
                aria-pressed={isWished(product.id)}
                className={`!h-11 !text-[12px] border ${isWished(product.id) ? '!bg-accent !text-white !border-accent' : 'border-border-paper'}`}
              >
                {isWished(product.id) ? '♥' : '♡'} علاقه
              </Button>
            </div>
          </div>

          {/* Trust badges near CTA */}
          <div className="grid grid-cols-3 gap-2 text-[10px] font-bold text-center">
            <div className="border border-border-paper rounded-[4px] p-2.5 bg-[#EFE9DD] flex flex-col items-center gap-1">
              <span className="text-[16px]">✓</span><span>ضمانت اصالت</span><span className="text-muted text-[9px] font-medium">چاپ دستی اصل</span>
            </div>
            <div className="border border-border-paper rounded-[4px] p-2.5 bg-paper flex flex-col items-center gap-1">
              <span className="text-[16px]">↩</span><span>۷ روز بازگشت</span><span className="text-muted text-[9px] font-medium">بدون قید</span>
            </div>
            <div className="border border-border-paper rounded-[4px] p-2.5 bg-paper flex flex-col items-center gap-1">
              <span className="text-[16px]">✦</span><span>پرداخت امن</span><span className="text-muted text-[9px] font-medium">شاپرک</span>
            </div>
          </div>

          <div className="border border-border-paper rounded-[4px] p-3.5 bg-[#EFE9DD] text-[11px] leading-5 font-medium flex justify-between items-center">
            <div className="flex gap-5">
              <span><span className="text-muted">کد:</span> <span className="font-black">RN-۱۴۰۴-{product.id.padStart(4,'0')}</span></span>
              <span><span className="text-muted">موجودی:</span> <span className="font-bold">{product.stock.toLocaleString('fa-IR')} عدد</span></span>
            </div>
            <span className="text-[10px] tracking-wide text-muted hidden sm:inline">چاپ محدود</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 md:px-8 lg:px-12 pb-12">
        <div className="border border-border-paper rounded-[4px] bg-paper overflow-hidden">
          <div className="flex border-b border-border-paper bg-[#EFE9DD] overflow-x-auto" role="tablist">
            {[
              { k: 'desc', l: 'توضیحات محصول' },
              { k: 'size', l: 'جدول سایز' },
              { k: 'reviews', l: 'نظرات · ۱۲' },
            ].map(t => (
              <button
                key={t.k}
                role="tab"
                aria-selected={tab===t.k}
                onClick={() => setTab(t.k as any)}
                className={`whitespace-nowrap px-6 py-3.5 text-[13px] font-black border-l border-border-paper transition focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ink/20 ${tab===t.k ? 'bg-paper text-ink' : 'text-muted hover:text-ink'}`}
              >
                {t.l}
              </button>
            ))}
            <div className="mr-auto hidden md:flex items-center px-4 text-[10px] font-bold tracking-[0.2em] text-muted uppercase">Technical Sheet</div>
          </div>

          <div className="p-6 md:p-8">
            {tab==='desc' && (
              <div className="grid md:grid-cols-12 gap-8">
                <div className="md:col-span-8 space-y-4 text-[14px] leading-[1.9] font-medium">
                  <p>{product.longDescription}</p>
                  <p className="text-muted text-[13px]">هر محصول با کارت شناسنامه چاپ و شماره سریال دستی عرضه می‌شود. به دلیل چاپ دستی، اختلاف جزئی رنگ طبیعی است.</p>
                  <div className="text-[12px] text-muted border-r-2 border-border-paper pr-3 py-1 mt-4">
                    شستشو سرد، پشت و رو · اتو متوسط از پشت · بدون سفیدکننده
                  </div>
                </div>
                <div className="md:col-span-4 border border-border-paper rounded-[4px] p-4 bg-[#EFE9DD] h-fit space-y-3">
                  <div className="font-black text-[12px] tracking-[0.2em] uppercase">جزئیات چاپ و دوخت</div>
                  <Rule />
                  <div className="text-[11.5px] leading-6 space-y-1.5 font-medium">
                    <div className="flex justify-between"><span className="text-muted">روش چاپ:</span><span className="font-bold">سیلک اسکرین دستی</span></div>
                    <div className="flex justify-between"><span className="text-muted">مرکب:</span><span className="font-bold">پایه آب، ضدحساسیت</span></div>
                    <div className="flex justify-between"><span className="text-muted">تعداد رنگ چاپ:</span><span className="font-bold">۲ رنگ</span></div>
                    <div className="flex justify-between"><span className="text-muted">محل چاپ:</span><span className="font-bold">استودیو ۲۵</span></div>
                    <Rule />
                    <div className="flex justify-between"><span className="text-muted">جنس:</span><span className="font-bold">پنبه ۱۰۰٪ · ۱۸۰ گرم</span></div>
                    <div className="flex justify-between"><span className="text-muted">دوخت:</span><span className="font-bold">تهران، انقلاب</span></div>
                    <div className="flex justify-between"><span className="text-muted">تیراژ:</span><span className="font-bold">محدود ۱۰۰ عدد</span></div>
                  </div>
                </div>
              </div>
            )}
            {tab==='size' && (
              <div className="overflow-x-auto">
                <table className="w-full text-[13px] font-medium border border-border-paper rounded-[4px] overflow-hidden">
                  <thead className="bg-charcoal text-paper text-[11px] tracking-[0.15em] uppercase font-black">
                    <tr><th className="p-3 text-right">سایز</th><th className="p-3">عرض سینه</th><th className="p-3">قد</th><th className="p-3">آستین</th></tr>
                  </thead>
                  <tbody className="divide-y divide-border-paper">
                    {[
                      ['L','۵۶','۷۲','۲۲'],
                      ['XL','۵۹','۷۴','۲۳'],
                      ['2XL','۶۲','۷۶','۲۴'],
                      ['3XL','۶۵','۷۸','۲۵'],
                    ].map(row => (
                      <tr key={row[0]} className={row[0]===selectedSize ? 'bg-[#EFE9DD] font-black' : 'bg-paper'}><td className="p-3">{row[0]}</td><td className="p-3">{row[1]} سم</td><td className="p-3">{row[2]} سم</td><td className="p-3">{row[3]} سم</td></tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-[11px] text-muted font-bold mt-3">ابعاد با خطای ۱-۲ سانتی‌متر به دلیل دوخت دستی است. سایزها از L تا 3XL - اورسایز ایرانی.</p>
              </div>
            )}
            {tab==='reviews' && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="text-[36px] font-black">۴.۸</div>
                  <div><div className="font-bold text-[13px]">از {allReviews.length} نظر</div><div className="text-[11px] text-muted">★★★★★ · ۹۲٪ پیشنهاد می‌کنند</div></div>
                  <Button variant="ghost" size="sm" className="mr-auto">نوشتن نظر</Button>
                </div>
                <Rule />
                {(showAllReviews ? allReviews : allReviews.slice(0,2)).map((r,i) => (
                  <div key={i} className="border-b border-border-paper/60 pb-4 last:border-0">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-[11px] font-black">{r.name[0]}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-[13px]">{r.name}</span>
                            {r.verified && <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-[9px] font-black px-2 py-0.5 rounded-full">تایید خرید ✓</span>}
                          </div>
                          <div className="flex items-center gap-1 mt-0.5">
                            <span className="text-amber-400 text-[11px]">{'★'.repeat(r.rating)}</span>
                            <span className="text-[11px] text-muted">{r.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-[13px] leading-6 mt-3 font-medium pr-10">{r.text}</p>
                  </div>
                ))}
                {!showAllReviews && allReviews.length > 2 && (
                  <button onClick={() => setShowAllReviews(true)} className="w-full py-3 border border-black rounded-full text-[13px] font-bold hover:bg-black hover:text-white transition">
                    دیدن {allReviews.length - 2} نظر بیشتر ↓
                  </button>
                )}
                {showAllReviews && (
                  <button onClick={() => setShowAllReviews(false)} className="w-full py-3 border border-gray-200 rounded-full text-[13px] font-bold hover:bg-gray-50 transition">
                    نمایش کمتر ↑
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {related.length>0 && (
          <div className="mt-12">
            <div className="flex items-center gap-3 mb-6">
              <h3 className="font-black text-[20px] tracking-tight">مطالب مرتبط</h3>
              <span className="text-[11px] tracking-[0.2em] font-bold text-muted border border-border-paper px-2 py-1 rounded-[4px]">RELATED · از همین بخش</span>
              <Rule className="flex-1" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}

        {recentlyViewed.length>0 && (
          <div className="mt-12">
            <div className="flex items-center gap-3 mb-6">
              <h3 className="font-black text-[18px] tracking-tight">اخیرا دیده‌اید</h3>
              <span className="text-[10px] font-bold text-muted border border-border-paper px-2 py-1 rounded-[4px]">{recentlyViewed.length} محصول</span>
              <Rule className="flex-1" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {recentlyViewed.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>

      {/* Mobile sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-paper/95 backdrop-blur border-t border-border-paper p-3 flex items-center gap-3 z-30 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
        <div className="flex-1">
          <div className="font-black text-[14px] leading-none">{formatPrice(product.price)}</div>
          <div className="text-[10px] text-muted font-bold mt-1">{product.stock} موجود · {selectedSize} · {selectedColor.label}</div>
        </div>
        <Button size="md" disabled={outOfStock} onClick={handleAdd} className="shrink-0 px-6 font-black">
          {outOfStock ? 'ناموجود' : added ? '✓ افزوده شد' : 'افزودن به سبد'}
        </Button>
      </div>

      {/* Zoom Modal */}
      {showZoom && (
        <div className="fixed inset-0 z-[60] bg-charcoal/90 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setShowZoom(false)}>
          <div className="relative max-w-4xl w-full max-h-[90vh] bg-paper rounded-[4px] overflow-hidden border-2 border-paper" onClick={e=>e.stopPropagation()}>
            <img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-contain max-h-[85vh]" />
            <button onClick={() => setShowZoom(false)} className="absolute top-3 left-3 bg-charcoal text-paper w-9 h-9 rounded-full flex items-center justify-center font-black" aria-label="بستن زوم">×</button>
            <div className="absolute bottom-3 right-3 bg-paper/90 px-3 py-1.5 rounded-[4px] text-[11px] font-bold border border-border-paper">
              {product.name} · {activeImage+1}/{product.images.length}
            </div>
          </div>
        </div>
      )}

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-[60] bg-charcoal/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowSizeGuide(false)}>
          <div className="bg-paper border-2 border-charcoal rounded-[4px] w-full max-w-lg p-6 shadow-[8px_8px_0_#1F1D1B]" onClick={e=>e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-[18px]">راهنمای سایز · {product.category}</h3>
              <button onClick={() => setShowSizeGuide(false)} className="w-8 h-8 border border-border-paper rounded-[4px] font-black" aria-label="بستن">×</button>
            </div>
            <Rule className="mb-4" />
            <table className="w-full text-[13px] font-medium border border-border-paper rounded-[4px] overflow-hidden">
              <thead className="bg-charcoal text-paper text-[11px] tracking-[0.15em] uppercase font-black">
                <tr><th className="p-2.5 text-right">سایز</th><th className="p-2.5">سینه</th><th className="p-2.5">قد</th><th className="p-2.5">قد شما</th></tr>
              </thead>
              <tbody className="divide-y divide-border-paper">
                {[
                  ['L','۵۶','۷۲','۱۷۵-۱۸۲'],
                  ['XL','۵۹','۷۴','۱۸۲-۱۹۰'],
                  ['2XL','۶۲','۷۶','۱۸۸-۱۹۵'],
                  ['3XL','۶۵','۷۸','۱۹۳-۲۰۰'],
                ].map(row => (
                  <tr key={row[0]} className={row[0]===selectedSize ? 'bg-[#EFE9DD] font-black' : 'bg-paper'}><td className="p-2.5">{row[0]}</td><td className="p-2.5">{row[1]} سم</td><td className="p-2.5">{row[2]} سم</td><td className="p-2.5">{row[3]}</td></tr>
                ))}
              </tbody>
            </table>
            <div className="mt-3 text-[11px] text-muted font-medium leading-5">
              قاعده کلی: اگر بین دو سایز هستید، سایز بزرگتر را انتخاب کنید. پارچه پنبه‌ای ۲٪ جذب آب دارد.
            </div>
            <Button fullWidth className="mt-4" onClick={() => setShowSizeGuide(false)}>متوجه شدم</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;

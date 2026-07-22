import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ui/ProductCard';
import Button from '../components/ui/Button';
import MastheadMeta from '../components/ui/MastheadMeta';
import AmazingSection from '../components/ui/AmazingSection';

const HomePage: React.FC = () => {
  const latest = [...products].sort((a,b) => parseInt(b.id) - parseInt(a.id)).slice(0,8);
  const [activeCat, setActiveCat] = useState('همه');
  const filteredLatest = activeCat === 'همه' ? latest : latest.filter(p => p.category === activeCat);

  const categories = ['همه', 'تیشرت', 'پیراهن', 'هودی'];

  return (
    <div className="bg-[#FFFCF5] overflow-x-hidden max-w-[100vw]">
      {/* Hero - Minimal: one message + one CTA + one image, no floating badges */}
      <section className="px-4 md:px-8 lg:px-12 py-12 md:py-20 overflow-hidden max-w-[100vw]">
        <MastheadMeta />
        
        <div className="mt-12 md:mt-20 grid grid-cols-12 gap-10 lg:gap-16 items-center max-w-[1280px] mx-auto">
          {/* Text - single message */}
          <div className="col-span-12 lg:col-span-6 order-1">
            <h1 className="font-black text-[42px] sm:text-[56px] lg:text-[68px] leading-[0.9] tracking-[-0.05em] text-black">
              پوشاکی که
              <span className="block text-[#B33A2E]">حرف می‌زند</span>
            </h1>
            <p className="text-[15px] leading-[1.9] font-medium text-gray-600 mt-6 max-w-[440px]">
              فقط بالا‌تنه‌های یونیسکس — تیشرت، پیراهن و هودی — از L تا 3XL. چاپ دستی تهران، تیراژ محدود.
            </p>
            <div className="mt-8">
              <Link to="/shop">
                <Button variant="primary" size="lg" className="rounded-full px-10 h-[52px] text-[14px] bg-black text-white border-black hover:bg-gray-900">مشاهده فروشگاه</Button>
              </Link>
            </div>
          </div>

          {/* Image - single, no badges */}
          <div className="col-span-12 lg:col-span-6 order-2">
            <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-[#F0EBDC]">
              <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=1500&fit=crop&auto=format&q=80" alt="TpapaT hero" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Transition - soft neutral bar between hero and amazing */}
      <div className="h-12 md:h-20 bg-gradient-to-b from-[#FFFCF5] to-[#E8DDC5] border-y border-[#E8DDC5]/50" />

      {/* Amazing - single row, simpler timer, no live badge */}
      <AmazingSection />

      {/* Newest with quick category filter */}
      <section className="px-4 md:px-8 lg:px-12 py-20 md:py-28 bg-white overflow-hidden max-w-[100vw]">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <h2 className="font-black text-[32px] md:text-[40px] tracking-[-0.04em] leading-none text-black">جدیدترین ها</h2>
              <p className="text-[13px] text-gray-500 font-medium mt-3">فقط بالا‌تنه · یونیسکس · L تا 3XL</p>
            </div>
            <Link to="/shop" className="text-[13px] font-bold underline underline-offset-4">مشاهده همه</Link>
          </div>

          {/* Quick category filter above grid */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`shrink-0 px-5 py-2.5 rounded-full text-[13px] font-bold border transition ${activeCat===cat ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:border-black hover:text-black'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
            {filteredLatest.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story - only narrative + image, no specs table */}
      <section className="px-4 md:px-8 lg:px-12 py-20 md:py-28 bg-[#F6F1E6] overflow-hidden max-w-[100vw]">
        <div className="max-w-[1280px] mx-auto grid grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="col-span-12 lg:col-span-6">
            <h2 className="font-black text-[28px] md:text-[40px] leading-[0.9] tracking-[-0.04em] text-black">
              ما بالا‌تنه را<br/>خبرنامه می‌دانیم
            </h2>
            <p className="text-[15px] leading-[1.9] font-medium text-gray-600 mt-6 max-w-[480px]">
              TpapaT در زمستان ۱۴۰۱ در خیابان انقلاب متولد شد. فقط تیشرت، پیراهن و هودی یونیسکس می‌دوزیم — بدون تفکیک زنانه و مردانه. چاپ دستی، تیراژ محدود ۱۰۰ عدد، دوخت تهران. هر لباس شناسنامه دارد و فردا نسخه‌اش عوض می‌شود.
            </p>
            <Link to="/about" className="inline-block mt-8 text-[13px] font-bold border-b border-black pb-1">درباره ما ←</Link>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <div className="aspect-[4/5] rounded-[24px] overflow-hidden bg-white border border-gray-100">
              <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&h=1000&fit=crop&auto=format&q=80" alt="Brand story" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories - Shop by Category */}
      <section className="px-4 md:px-8 lg:px-12 py-20 md:py-28 bg-white overflow-hidden max-w-[100vw]">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="font-black text-[22px] tracking-tight text-black mb-8">خرید بر اساس دسته‌بندی</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: 'تیشرت', count: '۴ محصول', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=400&fit=crop' },
              { title: 'پیراهن', count: '۲ محصول', img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=400&fit=crop' },
              { title: 'هودی', count: '۲ محصول', img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=400&fit=crop' },
            ].map(cat => (
              <Link key={cat.title} to={`/shop?cat=${cat.title}`} className="group relative aspect-[4/3] rounded-[20px] overflow-hidden bg-gray-50 border border-gray-100">
                <img src={cat.img} alt={cat.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white flex justify-between items-end">
                  <div><div className="font-black text-[18px]">{cat.title}</div><div className="text-[12px] opacity-80">{cat.count}</div></div>
                  <span className="bg-white text-black text-[11px] font-bold px-3 py-1 rounded-full">مشاهده</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

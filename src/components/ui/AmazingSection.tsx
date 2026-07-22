import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getDiscountedProducts } from '../../data/products';
import ProductCard from './ProductCard';

const AmazingSection: React.FC = () => {
  const amazingProducts = getDiscountedProducts();
  const [timeLeft, setTimeLeft] = useState({ h: 5, m: 42, s: 18 });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { h, m, s } = prev;
        if (s > 0) s--;
        else if (m > 0) { m--; s = 59; }
        else if (h > 0) { h--; m = 59; s = 59; }
        else { h = 5; m = 42; s = 18; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const absLeft = Math.abs(scrollLeft);
    setCanScrollLeft(absLeft + clientWidth < scrollWidth - 10);
    setCanScrollRight(absLeft > 10);
  };

  useEffect(() => {
    checkScroll();
    const ref = scrollRef.current;
    if (ref) ref.addEventListener('scroll', checkScroll);
    return () => { if (ref) ref.removeEventListener('scroll', checkScroll); };
  }, [amazingProducts]);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    // For RTL, left arrow should scroll to show more hidden on left (negative direction)
    // Right arrow goes back
    const amount = 320;
    if (dir === 'left') {
      scrollRef.current.scrollBy({ left: -amount, behavior: 'smooth' });
    } else {
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftPos(scrollRef.current.scrollLeft);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftPos - walk;
  };
  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeftPos(scrollRef.current.scrollLeft);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftPos - walk;
  };
  const handleTouchEnd = () => setIsDragging(false);

  if (amazingProducts.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-[#E8DDC5] relative overflow-hidden">
      {/* Amazing background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#953026]/10 via-[#953026]/5 to-transparent rounded-full blur-[80px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-amber-200/20 to-transparent rounded-full blur-[60px] animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] md:text-[200px] font-black opacity-[0.03] tracking-tighter pointer-events-none select-none">٪</div>
      </div>
      
      <div className="relative px-4 md:px-8 lg:px-12">
        <div className="max-w-[1280px] mx-auto">
          {/* Header with more amazing feeling */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#953026] rounded-full flex items-center justify-center text-white text-[18px] shadow-[0_4px_12px_rgba(149,48,38,0.3)] animate-pulse">⚡</div>
                <h2 className="font-black text-[28px] md:text-[36px] tracking-[-0.03em] text-black">
                  فروش <span className="text-[#953026] relative">شگفت‌انگیز<span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#953026]/20 rounded-full" /></span>
                </h2>
                <span className="bg-[#953026] text-white text-[11px] font-black px-3 py-1 rounded-full shadow-md animate-bounce">تا ٪۳۰</span>
              </div>
              <p className="text-[13px] text-black/60 font-medium">فقط بالا‌تنه‌های منتخب · موجودی محدود · بدون تمدید</p>
            </div>
            
            <div className="flex items-center gap-4 bg-white border border-black/5 rounded-full px-5 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <span className="text-[11px] font-bold text-black/50">پایان تخفیف:</span>
              <div className="flex items-center gap-1.5">
                {[
                  { v: timeLeft.s, l: 'ثانیه' },
                  { v: timeLeft.m, l: 'دقیقه' },
                  { v: timeLeft.h, l: 'ساعت' },
                ].map((t, i) => (
                  <React.Fragment key={i}>
                    <div className="bg-[#953026] text-white rounded-[10px] px-3 py-2 min-w-[48px] text-center shadow-[0_2px_8px_rgba(149,48,38,0.25)]">
                      <div className="font-mono font-black text-[15px] leading-none tracking-widest">{String(t.v).padStart(2,'0')}</div>
                      <div className="text-[8px] font-bold mt-1 opacity-80">{t.l}</div>
                    </div>
                    {i < 2 && <span className="text-[#953026] font-black text-[14px]">:</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Single row carousel - fixed cut bug */}
          <div className="relative group/carousel">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`absolute left-2 md:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white text-black border border-black/10 flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-all ${canScrollLeft ? 'opacity-100 hover:bg-black hover:text-white hover:border-black hover:scale-105' : 'opacity-0 pointer-events-none'} hidden md:flex`}
              aria-label="قبلی"
            >
              ‹
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`absolute right-2 md:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white text-black border border-black/10 flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-all ${canScrollRight ? 'opacity-100 hover:bg-black hover:text-white hover:border-black hover:scale-105' : 'opacity-0 pointer-events-none'} hidden md:flex`}
              aria-label="بعدی"
            >
              ›
            </button>

            <div
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className={`flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory px-1 py-3 -mx-1 ${isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {amazingProducts.map((p) => (
                <div key={p.id} className="snap-start shrink-0 w-[270px] md:w-[300px] relative group/card">
                  {/* Card glow on hover */}
                  <div className="absolute -inset-1 bg-[#953026]/0 group-hover/card:bg-[#953026]/10 rounded-[20px] blur-[8px] transition-all duration-500" />
                  <div className="relative bg-white rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-black/5 overflow-hidden group-hover/card:shadow-[0_16px_40px_rgba(0,0,0,0.12)] group-hover/card:-translate-y-1 transition-all duration-500">
                    <ProductCard product={p} hideDiscountBadge={true} />
                  </div>
                  {/* Big discount badge more prominent - only one discount per card now */}
                  <div className="absolute -top-3 -right-3 bg-[#953026] text-white w-14 h-14 rounded-full flex flex-col items-center justify-center shadow-[0_4px_16px_rgba(149,48,38,0.4)] border-2 border-white rotate-3 z-10 group-hover/card:rotate-6 group-hover/card:scale-110 transition-all duration-300">
                    <span className="font-black text-[14px] leading-none">٪{p.discount}</span>
                    <span className="text-[8px] font-bold">تخفیف</span>
                  </div>
                </div>
              ))}
              {/* See all products card */}
              <div className="snap-start shrink-0 w-[270px] md:w-[300px]">
                <Link to="/shop?filter=amazing" className="w-full h-full min-h-[420px] bg-white border-2 border-dashed border-[#953026]/30 rounded-[16px] flex flex-col items-center justify-center p-6 hover:border-[#953026] hover:bg-[#953026]/5 transition-all group">
                  <div className="w-16 h-16 bg-[#953026] rounded-full flex items-center justify-center text-white text-[24px] group-hover:scale-110 transition">→</div>
                  <div className="font-black text-[16px] mt-4">دیدن همه محصولات</div>
                  <div className="text-[12px] text-gray-500 mt-1">{amazingProducts.length * 2} محصول شگفت‌انگیز</div>
                  <div className="mt-4 bg-black text-white px-5 py-2 rounded-full text-[12px] font-bold group-hover:bg-[#953026] transition">مشاهده همه</div>
                </Link>
              </div>
            </div>

            {/* Progress dots */}
            <div className="mt-6 flex items-center justify-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-8 h-1.5 bg-[#953026] rounded-full" />
                <div className="w-4 h-1.5 bg-black/10 rounded-full" />
                <div className="w-4 h-1.5 bg-black/10 rounded-full" />
              </div>
              <span className="text-[11px] font-bold text-black/40 mr-3 hidden md:inline">← درگ کنید</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmazingSection;

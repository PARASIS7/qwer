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
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);

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
    const ref = scrollRef.current;
    if (!ref) return;
    const onScroll = () => requestAnimationFrame(checkScroll);
    ref.addEventListener('scroll', onScroll, { passive: true });
    checkScroll();
    return () => ref.removeEventListener('scroll', onScroll);
  }, [amazingProducts]);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 320;
    if (dir === 'left') {
      scrollRef.current.scrollBy({ left: -amount, behavior: 'smooth' });
    } else {
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDown.current = true;
    scrollRef.current.classList.add('cursor-grabbing');
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftPos.current = scrollRef.current.scrollLeft;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftPos.current - walk;
  };
  const onMouseUp = () => {
    isDown.current = false;
    if (scrollRef.current) scrollRef.current.classList.remove('cursor-grabbing');
  };
  const onTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    isDown.current = true;
    startX.current = e.touches[0].pageX - scrollRef.current.offsetLeft;
    scrollLeftPos.current = scrollRef.current.scrollLeft;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDown.current || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftPos.current - walk;
  };
  const onTouchEnd = () => { isDown.current = false; };

  if (amazingProducts.length === 0) return null;

  return (
    <section className="py-14 md:py-20 bg-[#E8DDC5] relative">
      <div className="px-4 md:px-8 lg:px-12">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <h2 className="font-black text-[22px] md:text-[28px] tracking-tight text-black">فروش شگفت‌انگیز</h2>
              <span className="bg-[#953026] text-white text-[11px] font-black px-3 py-1 rounded-full">تا ٪۳۰ تخفیف</span>
            </div>
            
            <div className="flex items-center gap-2 bg-white border border-black/10 rounded-full px-4 py-2 shadow-sm">
              <span className="text-[10px] font-bold text-black/50">پایان در:</span>
              <div className="flex items-center gap-1">
                {[
                  { v: timeLeft.s, l: 'ثانیه' },
                  { v: timeLeft.m, l: 'دقیقه' },
                  { v: timeLeft.h, l: 'ساعت' },
                ].map((t, i) => (
                  <React.Fragment key={i}>
                    <span className="bg-[#953026] text-white rounded-full px-2.5 py-1 text-[12px] font-mono font-black min-w-[32px] text-center">
                      {String(t.v).padStart(2,'0')}
                    </span>
                    {i < 2 && <span className="text-[#953026] font-bold text-[12px]">:</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`absolute left-0 md:-left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-black/10 shadow-md flex items-center justify-center transition ${canScrollLeft ? 'opacity-100 hover:bg-black hover:text-white' : 'opacity-0 pointer-events-none'} hidden md:flex`}
              aria-label="بعدی - دیدن باقی محصولات"
            >
              ‹
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`absolute right-0 md:-right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-black/10 shadow-md flex items-center justify-center transition ${canScrollRight ? 'opacity-100 hover:bg-black hover:text-white' : 'opacity-0 pointer-events-none'} hidden md:flex`}
              aria-label="قبلی"
            >
              ›
            </button>

            <div
              ref={scrollRef}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory px-1 py-1 cursor-grab active:cursor-grabbing select-none"
              style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } as any}
            >
              {amazingProducts.map((p) => (
                <div key={p.id} className="snap-start shrink-0 w-[260px] md:w-[280px]">
                  <ProductCard product={p} hideDiscountBadge={true} />
                  <div className="mt-2 flex justify-center">
                    <span className="bg-[#953026] text-white text-[11px] font-black px-3 py-1 rounded-full">٪{p.discount} تخفیف</span>
                  </div>
                </div>
              ))}
              <div className="snap-start shrink-0 w-[260px] md:w-[280px]">
                <Link to="/shop" className="w-full h-full min-h-[380px] bg-white border-2 border-dashed border-black/10 rounded-[16px] flex flex-col items-center justify-center p-6 hover:border-[#953026]/50 hover:bg-[#FFFBF0] transition group">
                  <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-[20px] group-hover:bg-[#953026] transition">←</div>
                  <div className="font-black text-[15px] mt-4">دیدن همه محصولات</div>
                  <div className="text-[11px] text-gray-500 mt-1">{amazingProducts.length} محصول شگفت‌انگیز</div>
                  <div className="mt-4 bg-black text-white px-5 py-2 rounded-full text-[11px] font-bold group-hover:bg-[#953026] transition">مشاهده همه ←</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmazingSection;

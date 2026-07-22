import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, categories, sizes, Product } from '../data/products';
import ProductCard from '../components/ui/ProductCard';
import Rule from '../components/ui/Rule';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const ITEMS_PER_PAGE = 9;

const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get('cat') as Product['category'] | null;
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCat || 'همه');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000]);
  const [sortBy, setSortBy] = useState<'newest' | 'cheapest' | 'expensive' | 'bestseller'>('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [currentPage, setCurrentPage] = useState(1);

  // Sync search query from URL
  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  useEffect(() => {
    if (initialCat) setSelectedCategory(initialCat);
  }, [initialCat]);

  // All unique colors from products
  const allColors = useMemo(() => {
    const map = new Map<string, { label: string; hex: string; count: number }>();
    products.forEach(p => {
      p.colors.forEach(c => {
        const existing = map.get(c.label);
        if (existing) existing.count += 1;
        else map.set(c.label, { label: c.label, hex: c.hex, count: 1 });
      });
    });
    return Array.from(map.values()).sort((a,b) => b.count - a.count);
  }, []);

  const filtered = useMemo(() => {
    let result = [...products];
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tagline?.toLowerCase().includes(q)
      );
    }
    if (selectedCategory && selectedCategory !== 'همه') {
      result = result.filter(p => p.category === selectedCategory);
    }
    if (selectedSizes.length > 0) {
      result = result.filter(p => p.sizes.some(s => selectedSizes.includes(s)));
    }
    if (selectedColors.length > 0) {
      result = result.filter(p => p.colors.some(c => selectedColors.includes(c.label)));
    }
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (sortBy === 'cheapest') result.sort((a,b) => a.price - b.price);
    if (sortBy === 'expensive') result.sort((a,b) => b.price - a.price);
    if (sortBy === 'bestseller') result.sort((a,b) => b.stock - a.stock);

    return result;
  }, [selectedCategory, selectedSizes, selectedColors, priceRange, sortBy, searchQuery]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedSizes, selectedColors, priceRange, sortBy, searchQuery]);

  const toggleSize = (s: string) => {
    setSelectedSizes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };
  const toggleColor = (label: string) => {
    setSelectedColors(prev => prev.includes(label) ? prev.filter(x => x !== label) : [...prev, label]);
  };

  const updateSearchParams = (newCat: string, newSearch?: string) => {
    const params: Record<string, string> = {};
    if (newCat !== 'همه') params.cat = newCat;
    if (newSearch) params.search = newSearch;
    else if (searchQuery) params.search = searchQuery;
    setSearchParams(params);
  };

  const activeFiltersCount = selectedSizes.length + selectedColors.length + (selectedCategory !== 'همه' ? 1 : 0) + (priceRange[0] > 0 || priceRange[1] < 2000000 ? 1 : 0) + (searchQuery ? 1 : 0);

  return (
    <div className="bg-paper min-h-screen">
      <div className="px-4 md:px-8 lg:px-12 pt-6">
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
          <div className="flex items-center gap-3">
            <h1 className="font-black text-[32px] md:text-[40px] tracking-[-0.03em] leading-none">فروشگاه</h1>
            <Badge variant="charcoal">آرشیو کامل · {products.length} عنوان</Badge>
          </div>
          <div className="md:mr-auto flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-[280px]">
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') updateSearchParams(selectedCategory, searchQuery); }}
                placeholder="جستجو نام، دسته، تگ..."
                className="w-full bg-[#EFE9DD] border border-border-paper rounded-[4px] pl-10 pr-3 py-2.5 text-[13px] font-bold placeholder:text-muted/60 focus:outline-none focus:border-ink"
                aria-label="جستجو در فروشگاه"
              />
              <button
                onClick={() => updateSearchParams(selectedCategory, searchQuery)}
                className="absolute left-1 top-1 bottom-1 bg-charcoal text-paper px-3 rounded-[4px] text-[12px] font-bold"
                aria-label="جستجو"
              >
                ⌕
              </button>
            </div>
            {searchQuery && (
              <button onClick={() => { setSearchQuery(''); setSearchParams(selectedCategory !== 'همه' ? { cat: selectedCategory } : {}); }} className="px-3 py-2 border border-border-paper rounded-[4px] text-[12px] font-bold bg-paper">پاک</button>
            )}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 text-[11px] tracking-wide font-bold text-muted border-y border-border-paper py-2.5">
          <span>دوره سوم · شماره ۲۵ · بایگانی محصولات چاپ شده</span>
          <span className="flex items-center gap-2">
            <span>موجود: {filtered.length} عدد</span>
            {activeFiltersCount > 0 && <span className="bg-accent text-white px-2 py-0.5 rounded-[4px] text-[10px]">{activeFiltersCount} فیلتر فعال</span>}
          </span>
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-12 py-6 grid grid-cols-12 gap-6">
        <aside className={`${showFilters ? 'block' : 'hidden'} md:block col-span-12 md:col-span-3 lg:col-span-3 border border-border-paper rounded-[4px] bg-[#EFE9DD] p-5 h-fit sticky top-[88px] max-h-[calc(100vh-100px)] overflow-y-auto`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-black text-[16px] tracking-tight">فیلترها</h3>
            <button 
              onClick={() => { setSelectedCategory('همه'); setSelectedSizes([]); setSelectedColors([]); setPriceRange([0,2000000]); setSearchQuery(''); setSearchParams({}); }}
              className="text-[11px] font-bold text-accent underline underline-offset-4"
            >
              پاک کردن همه
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-black text-[12px] tracking-[0.15em] uppercase mb-3">دسته‌بندی</h4>
              <div className="space-y-1.5">
                {categories.map(cat => (
                  <button
                    key={cat}
                    aria-pressed={selectedCategory === cat}
                    onClick={() => { setSelectedCategory(cat); updateSearchParams(cat); }}
                    className={`w-full text-right px-3 py-2 rounded-[4px] text-[13px] font-bold transition flex justify-between items-center ${selectedCategory === cat ? 'bg-charcoal text-paper' : 'bg-paper border border-border-paper hover:border-ink'}`}
                  >
                    <span>{cat}</span>
                    <span className="text-[11px] opacity-60">
                      {cat === 'همه' ? products.length : products.filter(p => p.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <Rule />

            <div>
              <h4 className="font-black text-[12px] tracking-[0.15em] uppercase mb-3">سایز</h4>
              <div className="grid grid-cols-4 gap-2">
                {sizes.map(s => (
                  <button
                    key={s}
                    aria-pressed={selectedSizes.includes(s)}
                    aria-label={`سایز ${s}`}
                    onClick={() => toggleSize(s)}
                    className={`h-9 rounded-[4px] border text-[12px] font-black transition ${selectedSizes.includes(s) ? 'bg-accent text-white border-accent' : 'bg-paper border-border-paper hover:border-ink'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <Rule />

            <div>
              <h4 className="font-black text-[12px] tracking-[0.15em] uppercase mb-3">رنگ · {allColors.length} رنگ در آرشیو</h4>
              <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                {allColors.map(c => (
                  <label key={c.label} className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedColors.includes(c.label)}
                      onChange={() => toggleColor(c.label)}
                      className="w-4 h-4 accent-accent rounded-[4px]"
                      aria-label={`رنگ ${c.label}`}
                    />
                    <span className="w-5 h-5 rounded-full border border-black/10 inline-block" style={{ background: c.hex }} />
                    <span className="text-[13px] font-bold group-hover:text-accent transition flex-1">{c.label}</span>
                    <span className="text-[10px] text-muted">{c.count}</span>
                  </label>
                ))}
              </div>
            </div>

            <Rule />

            <div>
              <h4 className="font-black text-[12px] tracking-[0.15em] uppercase mb-3">محدوده قیمت</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-muted">حداقل</label>
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={e => setPriceRange([Math.min(parseInt(e.target.value)||0, priceRange[1]-50000), priceRange[1]])}
                      className="w-full bg-paper border border-border-paper rounded-[4px] px-2 py-1.5 text-[12px] font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-muted">حداکثر</label>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={e => setPriceRange([priceRange[0], Math.max(parseInt(e.target.value)||0, priceRange[0]+50000)])}
                      className="w-full bg-paper border border-border-paper rounded-[4px] px-2 py-1.5 text-[12px] font-bold"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] font-bold mb-1">
                    <span>{priceRange[0].toLocaleString('fa-IR')} ت</span>
                    <span>{priceRange[1].toLocaleString('fa-IR')} ت</span>
                  </div>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min={0}
                      max={2000000}
                      step={50000}
                      value={priceRange[0]}
                      onChange={e => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full accent-charcoal h-1"
                      aria-label="حداقل قیمت"
                    />
                    <input
                      type="range"
                      min={0}
                      max={2000000}
                      step={50000}
                      value={priceRange[1]}
                      onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full accent-accent h-1"
                      aria-label="حداکثر قیمت"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  <button onClick={() => setPriceRange([0,600000])} className={`text-[10px] font-bold border rounded-[4px] py-1.5 transition ${priceRange[1]===600000 ? 'bg-charcoal text-paper border-charcoal' : 'border-border-paper hover:bg-paper'}`}>تا ۶۰۰</button>
                  <button onClick={() => setPriceRange([600000,1200000])} className={`text-[10px] font-bold border rounded-[4px] py-1.5 transition ${priceRange[0]===600000 && priceRange[1]===1200000 ? 'bg-charcoal text-paper border-charcoal' : 'border-border-paper hover:bg-paper'}`}>۶۰۰-۱۲۰۰</button>
                  <button onClick={() => setPriceRange([1200000,2000000])} className={`text-[10px] font-bold border rounded-[4px] py-1.5 transition ${priceRange[0]===1200000 ? 'bg-charcoal text-paper border-charcoal' : 'border-border-paper hover:bg-paper'}`}>۱۲۰۰+</button>
                </div>
              </div>
            </div>

            <Rule />

            <div className="bg-charcoal text-paper rounded-[4px] p-3 text-[11px] leading-5">
              <div className="font-black mb-1">راهنمای خرید از بایگانی</div>
              <div className="text-paper/60 font-medium text-[10.5px]">
                همه محصولات در آرشیو تهران موجود است. ارسال تهران ۴۵، شهرستان ۶۵، بالای ۱ میلیون رایگان.
              </div>
            </div>
          </div>
        </aside>

        <section className="col-span-12 md:col-span-9">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 bg-[#EFE9DD] border border-border-paper rounded-[4px] p-3">
            <div className="flex items-center gap-3">
              <button
                aria-label={showFilters ? "بستن فیلترها" : "نمایش فیلترها"}
                aria-expanded={showFilters}
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden px-4 py-2 bg-charcoal text-paper rounded-[4px] text-[12px] font-bold"
              >
                {showFilters ? 'بستن فیلتر' : `فیلترها ${activeFiltersCount ? `(${activeFiltersCount})` : ''}`}
              </button>
              <span className="text-[13px] font-bold">
                نمایش <span className="text-accent">{paginated.length.toLocaleString('fa-IR')}</span> از <span>{filtered.length.toLocaleString('fa-IR')}</span> محصول
                {totalPages > 1 && <span className="text-muted"> · صفحه {currentPage.toLocaleString('fa-IR')} از {totalPages.toLocaleString('fa-IR')}</span>}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-muted tracking-wide hidden sm:inline">مرتب‌سازی:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="bg-paper border border-border-paper rounded-[4px] px-3 py-2 text-[12px] font-bold focus:outline-none focus:border-ink"
                aria-label="مرتب‌سازی محصولات"
              >
                <option value="newest">جدیدترین (شماره آخر)</option>
                <option value="cheapest">ارزان‌ترین</option>
                <option value="expensive">گران‌ترین</option>
                <option value="bestseller">پرفروش‌ترین</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="border-2 border-border-paper rounded-[4px] p-10 text-center bg-paper">
              <div className="text-[14px] font-black tracking-[0.2em] text-muted mb-2">ARCHIVE EMPTY</div>
              <h3 className="font-black text-[20px] mt-1">نتیجه‌ای در آرشیو یافت نشد</h3>
              <p className="text-[13px] text-muted mt-2 max-w-md mx-auto leading-6">
                برای عبارت «{searchQuery || selectedCategory}» نتیجه‌ای نداریم. فیلترها را سبک‌تر کنید یا دسته دیگری را امتحان کنید.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 justify-center">
                <Button variant="secondary" onClick={() => { setSelectedCategory('همه'); setSelectedSizes([]); setSelectedColors([]); setPriceRange([0,2000000]); setSearchQuery(''); setSearchParams({}); }}>
                  پاک کردن همه فیلترها
                </Button>
                <Button variant="ghost" onClick={() => { setSelectedCategory('همه'); setSearchParams({}); }}>نمایش همه {products.length} محصول</Button>
              </div>
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
                {products.slice(0,4).map(p => (
                  <div key={p.id} className="border border-border-paper rounded-[4px] p-2 bg-[#EFE9DD] text-[11px] font-bold">
                    شاید منظورتان: {p.name.slice(0,18)}...
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {paginated.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-10 flex flex-wrap items-center justify-center gap-1.5 border-t border-border-paper pt-6">
                  <span className="text-[11px] font-bold tracking-widest text-muted ml-2 hidden md:inline">صفحه:</span>
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => Math.max(1, p-1))}
                    className="h-9 px-3 rounded-[4px] border bg-paper border-border-paper text-[12px] font-bold disabled:opacity-40 hover:border-ink transition"
                    aria-label="صفحه قبلی"
                  >
                    ← قبلی
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0,5).map(n => (
                    <button
                      key={n}
                      aria-current={currentPage === n ? "page" : undefined}
                      onClick={() => setCurrentPage(n)}
                      className={`w-9 h-9 rounded-[4px] border text-[13px] font-black transition ${currentPage === n ? 'bg-charcoal text-paper border-charcoal' : 'bg-paper border-border-paper hover:border-ink'}`}
                    >
                      {n.toLocaleString('fa-IR')}
                    </button>
                  ))}
                  {totalPages > 5 && (
                    <>
                      <span className="w-9 h-9 flex items-center justify-center text-muted">…</span>
                      <button onClick={() => setCurrentPage(totalPages)} className={`w-9 h-9 rounded-[4px] border text-[13px] font-black ${currentPage === totalPages ? 'bg-charcoal text-paper border-charcoal' : 'bg-paper border-border-paper hover:border-ink'}`}>
                        {totalPages.toLocaleString('fa-IR')}
                      </button>
                    </>
                  )}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))}
                    className="h-9 px-3 rounded-[4px] border bg-paper border-border-paper text-[12px] font-bold disabled:opacity-40 hover:border-ink transition"
                    aria-label="صفحه بعدی"
                  >
                    بعدی →
                  </button>
                  <div className="mr-2 text-[11px] font-bold text-muted border border-border-paper rounded-[4px] px-3 py-2 bg-[#EFE9DD]">
                    {filtered.length} محصول · {totalPages} صفحه
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default ShopPage;

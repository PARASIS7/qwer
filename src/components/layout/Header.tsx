import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import Rule from '../ui/Rule';
import CartDrawer from '../ui/CartDrawer';

const navLinks = [
  { to: '/', label: 'صفحه اصلی' },
  { to: '/shop', label: 'فروشگاه' },
  { to: '/collections', label: 'کالکشن‌ها' },
  { to: '/about', label: 'درباره ما' },
  { to: '/journal', label: 'مجله' },
  { to: '/contact', label: 'تماس با ما' },
];

const Header: React.FC = () => {
  const { count, openDrawer } = useCart();
  const { count: wishCount } = useWishlist();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const doSearch = () => {
    if (searchValue.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchValue.trim())}`);
      setSearchOpen(false);
      setSearchValue('');
      setMobileOpen(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-charcoal text-paper border-b border-border-dark">
        <div className="px-4 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-[68px] md:h-[86px]">
            <button
              aria-label={mobileOpen ? "بستن منو" : "باز کردن منو"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 flex flex-col justify-center gap-1.5 border border-border-dark rounded-[4px] items-center focus:outline-none focus:ring-2 focus:ring-paper/20"
            >
              <span className={`w-5 h-px bg-paper transition ${mobileOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
              <span className={`w-5 h-px bg-paper transition ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`w-5 h-px bg-paper transition ${mobileOpen ? '-rotate-45 -translate-y-[3px]' : ''}`} />
            </button>

            <div className="hidden md:flex items-center gap-4">
              <button
                aria-label="جستجو"
                onClick={() => setSearchOpen(!searchOpen)}
                className="w-9 h-9 border border-border-dark rounded-[4px] flex items-center justify-center hover:bg-white/5 transition focus:outline-none focus:ring-2 focus:ring-paper/20"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6"/><path d="M21 21l-4.35-4.35"/></svg>
              </button>
              <nav className="flex items-center gap-1" aria-label="منوی اصلی">
                {navLinks.map(l => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    className={({ isActive }) => `px-3 py-2 text-[13px] font-bold tracking-tight rounded-[4px] transition focus:outline-none focus:ring-2 focus:ring-paper/20 ${isActive ? 'bg-paper text-charcoal' : 'text-paper/70 hover:text-paper hover:bg-white/5'}`}
                  >
                    {l.label}
                  </NavLink>
                ))}
              </nav>
            </div>

            <Link to="/" className="flex flex-col items-center justify-center text-center select-none focus:outline-none focus:ring-2 focus:ring-paper/20 rounded-[4px] px-2">
              <h1 className="font-black text-[28px] md:text-[36px] tracking-[-0.04em] leading-none">TpapaT</h1>
              <span className="text-[9px] md:text-[10px] tracking-[0.3em] font-bold text-paper/60 -mt-0.5 uppercase">STUDIO 25 · EST. 1401</span>
            </Link>

            <div className="flex items-center gap-2.5">
              <Link
                to="/shop"
                aria-label="علاقه‌مندی‌ها"
                className="relative w-9 h-9 border border-border-dark rounded-[4px] hidden md:flex items-center justify-center hover:bg-white/5 transition focus:outline-none focus:ring-2 focus:ring-paper/20"
              >
                <span className="text-[13px]">♡</span>
                {wishCount > 0 && (
                  <span className="absolute -top-1.5 -left-1.5 bg-paper text-charcoal text-[9px] font-black rounded-full flex items-center justify-center border border-charcoal min-w-[18px] h-[18px]">
                    {wishCount.toLocaleString('fa-IR')}
                  </span>
                )}
              </Link>
              <button
                onClick={openDrawer}
                aria-label={`سبد خرید، ${count} مورد، نمایش پیش‌نمایش`}
                className="relative w-10 h-10 md:w-11 md:h-11 border border-accent bg-accent text-white rounded-[4px] flex items-center justify-center hover:bg-[#a33429] transition focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 6h15l-1.5 9h-13z"/><path d="M6 6L5 2H2"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/>
                </svg>
                {count > 0 && (
                  <span className="absolute -top-2 -left-2 bg-paper text-charcoal text-[10px] font-black min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center border border-charcoal">
                    {count > 99 ? '۹۹+' : count.toLocaleString('fa-IR')}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <>
            <div className="fixed inset-0 bg-charcoal/80 backdrop-blur-sm z-30 md:hidden top-[68px]" onClick={() => setMobileOpen(false)} aria-hidden="true" />
            <div className="md:hidden border-t border-border-dark bg-charcoal px-4 py-6 space-y-1 relative z-40 max-h-[70vh] overflow-y-auto">
              <div className="flex gap-2 mb-4">
                <input
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') doSearch(); }}
                  placeholder="جستجو..."
                  className="flex-1 bg-[#111113] border border-border-dark rounded-[4px] px-3 py-2.5 text-[13px] text-paper placeholder:text-paper/40 focus:outline-none focus:border-paper/30"
                  aria-label="جستجو"
                />
                <button onClick={doSearch} className="bg-accent text-white px-4 rounded-[4px] text-[12px] font-bold">جستجو</button>
              </div>
              {navLinks.map(l => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) => `block px-4 py-3 text-[14px] font-bold rounded-[4px] focus:outline-none focus:ring-2 focus:ring-paper/20 ${isActive ? 'bg-paper text-charcoal' : 'text-paper/80'}`}
                >
                  {l.label}
                </NavLink>
              ))}
              <div className="pt-4 mt-4 border-t border-border-dark">
                <button onClick={() => { setMobileOpen(false); openDrawer(); }} className="w-full text-center py-3 bg-accent rounded-full text-[13px] font-bold text-white">مشاهده سبد خرید ({count.toLocaleString('fa-IR')})</button>
                <div className="mt-3 text-[10px] text-paper/40 text-center">پنل ادمین فقط از /admin با رمز عبور</div>
              </div>
            </div>
          </>
        )}

        {searchOpen && (
          <div className="border-t border-border-dark bg-[#111113] px-4 md:px-8 py-3 flex gap-3">
            <input
              autoFocus
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') doSearch(); if (e.key === 'Escape') setSearchOpen(false); }}
              placeholder="جستجو در روزنامه پوشاک... نام محصول، تیشرت، هودی"
              className="flex-1 bg-charcoal border border-border-dark rounded-[4px] px-4 py-2.5 text-[14px] text-paper placeholder:text-paper/40 focus:outline-none focus:border-paper/30"
              aria-label="جستجو در فروشگاه"
            />
            <button onClick={doSearch} className="px-5 py-2.5 bg-accent text-white rounded-[4px] text-[13px] font-bold hover:bg-[#a33429] transition">جستجو</button>
            <button onClick={() => setSearchOpen(false)} className="px-4 py-2.5 border border-border-dark rounded-[4px] text-[13px] text-paper/70 hover:text-paper">بستن</button>
          </div>
        )}

        <Rule variant="double-dark" />
      </header>
      <CartDrawer />
    </>
  );
};

export default Header;

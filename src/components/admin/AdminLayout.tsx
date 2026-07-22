import React, { useState } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';

const menu = [
  { to: '/admin', label: 'داشبورد', sub: 'Dashboard', icon: '◧', exact: true, badge: null },
  { to: '/admin/analytics', label: 'آنالیتیکس', sub: 'Analytics', icon: '◷', exact: false, badge: null },
  { to: '/admin/products', label: 'محصولات', sub: 'Products', icon: '☐', exact: false, badge: '8' },
  { to: '/admin/offers', label: 'آفرها', sub: 'Offers', icon: '◎', exact: false, badge: '3' },
  { to: '/admin/inventory', label: 'انبار', sub: 'Inventory', icon: '▤', exact: false, badge: null },
  { to: '/admin/orders', label: 'سفارشات', sub: 'Orders', icon: '☰', exact: false, badge: '12' },
  { to: '/admin/sales', label: 'فروش', sub: 'Sales', icon: '▅', exact: false, badge: null },
  { to: '/admin/customers', label: 'مشتریان', sub: 'Customer', icon: '◍', exact: false, badge: '7' },
  { to: '/admin/newsletter', label: 'خبرنامه', sub: 'Newsletter', icon: '✉', exact: false, badge: '3,284' },
  { to: '/admin/settings', label: 'تنظیمات', sub: 'Settings', icon: '⚙', exact: false, badge: null },
];

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [storeOpen, setStoreOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem('tpapat-admin-auth') === 'true' || localStorage.getItem('tpapat-admin-auth') === 'true';
    } catch { return false; }
  });
  const [loginForm, setLoginForm] = useState({ user: '', pass: '' });
  const [loginError, setLoginError] = useState('');

  const isActive = (to: string, exact?: boolean) => {
    if (exact) return location.pathname === to;
    return location.pathname.startsWith(to);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if ((loginForm.user === 'admin' && loginForm.pass === 'TpapaT123') || (loginForm.user === 'TpapaT' && loginForm.pass === 'admin') || (loginForm.user === 'admin' && loginForm.pass === 'admin')) {
      try {
        sessionStorage.setItem('tpapat-admin-auth', 'true');
        localStorage.setItem('tpapat-admin-auth', 'true');
      } catch {}
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('نام کاربری یا رمز عبور اشتباه است. (admin / TpapaT123)');
    }
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem('tpapat-admin-auth');
      localStorage.removeItem('tpapat-admin-auth');
    } catch {}
    setIsAuthenticated(false);
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8FBF8] flex items-center justify-center p-4" dir="rtl">
        <div className="bg-white border border-gray-200 rounded-[24px] p-8 w-full max-w-md shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-black text-white rounded-[16px] flex items-center justify-center mx-auto font-black text-[24px] shadow-lg">T</div>
            <h1 className="font-black text-[22px] mt-5">ورود به پنل ادمین TpapaT</h1>
            <p className="text-[12px] text-gray-500 font-medium mt-2 leading-6">این بخش محافظت شده است. برای ورود به <b>/admin</b> باید رمز عبور وارد کنید. از هدر اصلی حذف شده.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[11px] font-black">نام کاربری</label>
              <input value={loginForm.user} onChange={e => setLoginForm({ ...loginForm, user: e.target.value })} placeholder="admin" className="w-full mt-1.5 border border-gray-200 rounded-full px-4 py-3 text-[13px] bg-gray-50 focus:outline-none focus:border-black focus:bg-white transition" dir="ltr" autoFocus />
            </div>
            <div>
              <label className="text-[11px] font-black">رمز عبور</label>
              <input type="password" value={loginForm.pass} onChange={e => setLoginForm({ ...loginForm, pass: e.target.value })} placeholder="••••••••" className="w-full mt-1.5 border border-gray-200 rounded-full px-4 py-3 text-[13px] bg-gray-50 focus:outline-none focus:border-black focus:bg-white transition" dir="ltr" />
            </div>
            {loginError && <div className="text-[12px] font-bold text-red-600 bg-red-50 border border-red-200 rounded-full px-4 py-3">{loginError}</div>}
            <button type="submit" className="w-full bg-black text-white py-3.5 rounded-full font-black text-[13px] hover:bg-gray-900 transition shadow-[0_8px_24px_rgba(0,0,0,0.15)]">ورود به پنل →</button>
            <div className="bg-amber-50 border border-amber-200 rounded-[12px] p-3 text-[11px] font-bold text-amber-800">دمو: <span dir="ltr">admin / TpapaT123</span> یا <span dir="ltr">TpapaT / admin</span></div>
          </form>
          <Link to="/" className="block text-center mt-6 text-[12px] font-bold text-gray-500 hover:text-black">← بازگشت به فروشگاه</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-[#F8FBF8]'} flex font-vazir`} dir="rtl">
      {/* Mobile overlay */}
      {mobileMenuOpen && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden" onClick={() => setMobileMenuOpen(false)} />}

      {/* Sidebar */}
      <aside className={`w-[296px] ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-l flex flex-col fixed lg:sticky top-0 h-screen shadow-sm z-40 transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'} left-0 lg:left-auto right-auto lg:right-0`}>
        <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'} flex items-center justify-between`}>
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-[12px] flex items-center justify-center text-white font-black text-[18px] shadow-[0_4px_12px_rgba(16,185,129,0.3)] group-hover:scale-105 transition">T</div>
            <div className="flex-1">
              <div className={`font-black text-[16px] leading-none tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>TpapaT</div>
              <div className="text-[10px] text-gray-400 font-bold tracking-widest mt-1 flex items-center gap-1">Pixel Commerce <span className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse" /> LIVE</div>
            </div>
          </Link>
          <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">×</button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menu.map(item => {
            const active = isActive(item.to, item.exact);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-[14px] text-[13px] font-bold transition-all group relative ${active ? 'bg-[#A7F3D0] text-emerald-900 shadow-[0_2px_8px_rgba(16,185,129,0.2)]' : `${darkMode ? 'text-gray-400 hover:bg-gray-700 hover:text-white' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}`}
              >
                <span className={`text-[17px] w-6 text-center transition ${active ? 'text-emerald-700 scale-110' : 'group-hover:scale-110'}`}>{item.icon}</span>
                <div className="flex-1">
                  <div className="font-black text-[13px] flex items-center gap-2">{item.label} {item.badge && <span className={`${active ? 'bg-emerald-900 text-emerald-100' : 'bg-gray-100 text-gray-600 border border-gray-200'} text-[10px] font-black px-2 py-0.5 rounded-full`}>{item.badge}</span>}</div>
                  <div className="text-[10px] opacity-70 font-medium">{item.sub}</div>
                </div>
                {active && <span className="absolute left-2 w-1.5 h-6 bg-emerald-600 rounded-full" />}
              </NavLink>
            );
          })}
        </nav>

        <div className={`p-4 border-t ${darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100'}`}>
          <div className={`rounded-[16px] p-3 flex items-center gap-3 border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200 shadow-sm'}`}>
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop" alt="admin" className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-200" />
            <div className="flex-1 min-w-0">
              <div className={`font-black text-[13px] truncate ${darkMode ? 'text-white' : ''}`}>ادمین TpapaT</div>
              <div className="text-[11px] text-gray-500 truncate flex items-center gap-1"><span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /> آنلاین</div>
            </div>
            <button onClick={handleLogout} className="text-[10px] font-bold bg-red-50 border border-red-200 text-red-600 px-2.5 py-1 rounded-full hover:bg-red-100">خروج</button>
          </div>
          <Link to="/" className={`mt-3 block w-full text-center py-2.5 border rounded-[12px] text-[12px] font-bold transition ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}>← فروشگاه</Link>
        </div>
      </aside>

      <main className={`flex-1 min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-[#F3F6F3]'} min-w-0`}>
        <div className={`sticky top-0 z-20 backdrop-blur-xl border-b px-4 md:px-8 py-3 flex items-center justify-between gap-4 ${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'}`}>
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden w-9 h-9 bg-white border border-gray-200 rounded-full flex flex-col items-center justify-center gap-1">
              <span className="w-4 h-px bg-black" /><span className="w-4 h-px bg-black" /><span className="w-4 h-px bg-black" />
            </button>
            <h1 className={`font-black text-[18px] md:text-[20px] tracking-tight ${darkMode ? 'text-white' : ''}`}>پنل مدیریت TpapaT</h1>
            <div className="hidden md:flex items-center gap-2">
              <div className="relative">
                <button onClick={() => setStoreOpen(!storeOpen)} className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-[12px] font-black shadow-sm hover:border-black transition">
                  <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-[10px]">T</span>
                  Tehran
                  <span className="text-[10px]">▼</span>
                </button>
              </div>
              <span className="hidden lg:flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-black px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> 12 سفارش فعال
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3 py-2 w-[200px] lg:w-[280px] focus-within:border-black focus-within:bg-white transition">
              <span className="text-gray-400">⌕</span>
              <input placeholder="جستجو..." className="bg-transparent text-[12px] font-bold w-full placeholder:text-gray-400 focus:outline-none" />
            </div>
            <button onClick={() => setDarkMode(!darkMode)} className={`w-9 h-9 rounded-full border flex items-center justify-center transition ${darkMode ? 'bg-white text-black border-white' : 'bg-white border-gray-200 text-gray-600 hover:border-black'}`}>◐</button>
            <button className="relative w-9 h-9 bg-white border border-gray-200 rounded-full flex items-center justify-center">🔔<span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">3</span></button>
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-black">A</div>
          </div>
        </div>

        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;

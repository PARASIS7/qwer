import React from 'react';
import { Link } from 'react-router-dom';
import Rule from '../ui/Rule';

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);
const TelegramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 3L3 10.5l6 2.5 2.5 6L21 3z" />
    <path d="M9.5 13L21 3" />
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F0F0F] text-white border-t border-gray-800 mt-0">
      {/* Benefits bar */}
      <div className="border-b border-white/10 bg-white/[0.02]">
        <div className="px-4 md:px-8 lg:px-12 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-[12px] font-bold">
          {[
            { icon: '◧', t: 'ارسال رایگان بالای ۱M', d: 'تهران ۲۴ ساعته' },
            { icon: '↩', t: '۷ روز بازگشت', d: 'بدون قید و شرط' },
            { icon: '✓', t: 'ضمانت اصالت', d: 'چاپ دستی اصل' },
            { icon: '✦', t: 'پرداخت امن', d: 'شاپرک - زرین‌پال' },
          ].map(b => (
            <div key={b.t} className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-[14px]">{b.icon}</div>
              <div><div className="font-black text-[12px]">{b.t}</div><div className="text-[11px] text-white/50 font-medium">{b.d}</div></div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-12 py-12 md:py-16">
        <div className="text-center border-b border-white/10 pb-10 mb-10">
          <h2 className="font-black text-[36px] md:text-[56px] tracking-[-0.05em] leading-none">TpapaT</h2>
          <div className="mt-2 text-[11px] tracking-[0.3em] font-bold text-white/40 uppercase">STUDIO 25 · EST. 1401 · بالا‌تنه یونیسکس L تا 3XL</div>
          <div className="mt-6 flex justify-center gap-3">
            <a href="https://instagram.com/rooznameh.studio" target="_blank" rel="noopener noreferrer" aria-label="اینستاگرام" className="w-10 h-10 bg-white/10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition">
              <InstagramIcon />
            </a>
            <a href="https://t.me/rooznameh" target="_blank" rel="noopener noreferrer" aria-label="تلگرام" className="w-10 h-10 bg-white/10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition">
              <TelegramIcon />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-10 text-[13px] max-w-newspaper mx-auto">
          <div className="col-span-2">
            <h4 className="font-black text-[14px] tracking-tight mb-4">درباره TpapaT</h4>
            <p className="text-white/50 leading-7 text-[12.5px] font-medium max-w-sm">
              ما فقط بالا‌تنه می‌دوزیم — تیشرت، پیراهن و هودی اورسایز یونیسکس. از L تا 3XL، چاپ دستی تهران، تیراژ محدود ۱۰۰ عدد. هر لباس شناسنامه چاپ دارد.
            </p>
            <div className="mt-5 bg-white/5 border border-white/10 rounded-[16px] p-4">
              <div className="text-[11px] font-black tracking-wide mb-2">اطلاعات تماس</div>
              <div className="text-[12px] text-white/60 leading-6">
                تهران، انقلاب، کارگر شمالی، بن‌بست ادب، پ ۲۵<br/>
                ۰۲۱-۶۶۹۵-۰۰۰۰ · ۰۹۱۲-۰۰۰-۱۱۱۱<br/>
                hello@tpapat.ir
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-black text-[13px] tracking-[0.1em] uppercase mb-4 text-white/90">فروشگاه</h4>
            <ul className="space-y-2.5 text-white/50 font-medium">
              <li><Link to="/shop" className="hover:text-white transition">همه بالا‌تنه‌ها</Link></li>
              <li><Link to="/shop?cat=تیشرت" className="hover:text-white transition">تیشرت - L تا 3XL</Link></li>
              <li><Link to="/shop?cat=پیراهن" className="hover:text-white transition">پیراهن آکسفورد</Link></li>
              <li><Link to="/shop?cat=هودی" className="hover:text-white transition">هودی و سویشرت</Link></li>
              <li><Link to="/shop?filter=amazing" className="hover:text-white transition text-amber-300">شگفت‌انگیز 🔥</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-[13px] tracking-[0.1em] uppercase mb-4 text-white/90">خدمات</h4>
            <ul className="space-y-2.5 text-white/50 font-medium">
              <li><a href="#" className="hover:text-white transition">راهنمای سایز L-3XL</a></li>
              <li><a href="#" className="hover:text-white transition">شرایط بازگشت ۷ روزه</a></li>
              <li><a href="#" className="hover:text-white transition">پیگیری سفارش</a></li>
              <li><a href="#" className="hover:text-white transition">سوالات متداول</a></li>
              <li><Link to="/contact" className="hover:text-white transition">تماس با ما</Link></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="font-black text-[13px] tracking-[0.1em] uppercase mb-4 text-white/90">خبرنامه · ۱۵٪ تخفیف</h4>
            <p className="text-[11px] text-white/40 leading-5 mb-3">هفته‌نامه چاپی + کد تخفیف مخفی برای سایزهای بزرگ</p>
            <div className="flex gap-2">
              <input placeholder="ایمیل شما" aria-label="ایمیل" className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2.5 text-[12px] placeholder:text-white/30 focus:outline-none focus:border-white/40 text-white" />
              <button className="bg-white text-black px-5 py-2.5 rounded-full text-[12px] font-black hover:bg-gray-100 transition">عضویت</button>
            </div>
            <div className="mt-4 flex items-center gap-2 text-[10px] text-white/30">
              <span>✓ بدون اسپم</span><span>·</span><span>لغو یک کلیک</span>
            </div>

            <div className="mt-6">
              <div className="text-[11px] font-black tracking-wide mb-2">روش‌های پرداخت</div>
              <div className="flex flex-wrap gap-2">
                {['VISA', 'MC', 'ZP', 'AP', 'GPay'].map(p => (
                  <span key={p} className="bg-white text-black text-[9px] font-black px-2.5 py-1 rounded-full border border-white">{p}</span>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <span className="bg-white/10 border border-white/20 text-[9px] font-bold px-2.5 py-1 rounded-full">اینماد</span>
                <span className="bg-white/10 border border-white/20 text-[9px] font-bold px-2.5 py-1 rounded-full">ساماندهی</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Rule variant="dark" />
      <div className="px-4 md:px-8 lg:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] font-bold text-white/30">
        <span>© ۱۴۰۴ TpapaT — تمامی حقوق چاپ محفوظ · L تا 3XL · یونیسکس · چاپ تهران</span>
        <span className="flex items-center gap-4">
          <span className="flex items-center gap-1.5"><InstagramIcon /> @tpapat</span>
          <span>طراحی: استودیو ۲۵</span>
        </span>
      </div>
    </footer>
  );
};

export default Footer;

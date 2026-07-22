import React, { useState, useMemo } from 'react';
import Rule from '../components/ui/Rule';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const articles = [
  {
    id: '1',
    title: 'چگونه تیشرت‌های ما در انقلاب چاپ می‌شوند: گزارش تصویری از کارگاه',
    excerpt: 'از آماده‌سازی شابلون تا خشک شدن نهایی مرکب — یک روز کامل در کارگاه بن‌بست ادب را مستند کردیم.',
    content: 'گزارش کامل: صبح ساعت ۸ شابلون‌ها را آماده می‌کنیم. مرکب پایه آب با پیگمنت طبیعی مخلوط می‌شود. هر تیشرت دو بار از زیر پرس سیلک عبور می‌کند تا رنگ عمق بگیرد. بعد از چاپ، ۲۴ ساعت در دمای اتاق خشک می‌شود و سپس با حرارت ۱۶۰ درجه تثبیت می‌شود. این فرآیند دستی باعث می‌شود هر لباس بافت منحصربه‌فردی داشته باشد.',
    author: 'تیم تحریریه',
    date: '۲۵ تیر ۱۴۰۴',
    tag: 'گزارش',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=600&fit=crop',
    featured: true,
  },
  {
    id: '2',
    title: 'مصاحبه با کیوان: چرا تیراژ محدود، تنها راه نجات مد ایرانی است؟',
    excerpt: 'بنیان‌گذار روزنامه پوشاک درباره صنعت مد، تولید انبوه و اینکه چرا هر لباس باید تاریخ انقضا داشته باشد، صحبت می‌کند.',
    content: 'کیوان: ما عمداً تولید را محدود نگه می‌داریم. مد سریع زمین را نابود کرده. وقتی لباسی تاریخ انقضا داشته باشد، آدم‌ها بیشتر قدرش را می‌دانند. ما نمی‌خواهیم کمد مردم را پر کنیم، می‌خواهیم داستان تعریف کنیم.',
    author: 'نگار موسوی',
    date: '۲۰ تیر ۱۴۰۴',
    tag: 'مصاحبه',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&h=600&fit=crop',
  },
  {
    id: '3',
    title: 'پارچه‌های یزد: سفری به کارخانه‌ای که از ۱۳۲۰ پارچه می‌بافد',
    excerpt: 'پنبه ایرانی، نخ ایرانی، بافت ایرانی — داستان پارچه‌هایی که لباس‌های ما از آن‌ها ساخته می‌شود.',
    content: 'کارخانه حیدرزاده یزد از ۱۳۲۰ تا امروز بدون وقفه کار کرده. ماشین‌های قدیمی آلمانی هنوز با همان دقت کار می‌کنند. پنبه از مزارع داراب می‌آید و در همین کارخانه ریسیده و بافته می‌شود.',
    author: 'سارا رضایی',
    date: '۱۵ تیر ۱۴۰۴',
    tag: 'مستند',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=600&fit=crop',
  },
  {
    id: '4',
    title: 'راهنمای استایل: چطور یک تیشرت روزنامه را برای ۷ روز بپوشیم',
    excerpt: 'از استایل رسمی تا خیابانی — ۷ پیشنهاد برای پوشیدن یک تیشرت ساده.',
    content: 'روز اول با کت بلیزر، روز دوم با شلوار جین راسته، روز سوم لایه‌ای روی هودی...',
    author: 'آرش احمدی',
    date: '۱۰ تیر ۱۴۰۴',
    tag: 'استایل',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&h=600&fit=crop',
  },
  {
    id: '5',
    title: 'آگهی: فراخوان هنرمندان تجسمی برای کالکشن پاییز ۱۴۰۴',
    excerpt: 'اگر طراح، عکاس یا تصویرسازی — طرح خود را برای چاپ روی کالکشن بعدی بفرستید.',
    content: 'موضوع پاییز: شهر خاموش. مهلت ارسال تا ۱۵ مرداد. جایزه نفر اول: چاپ طرح روی ۱۰۰ تیشرت + ۵ میلیون تومان.',
    author: 'تحریریه',
    date: '۵ تیر ۱۴۰۴',
    tag: 'فراخوان',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=600&fit=crop',
  },
  {
    id: '6',
    title: 'چرا ما دیگر در اینستاگرام تبلیغ نمی‌کنیم؟',
    excerpt: 'بیانیه رسمی استودیو ۲۵ درباره قطع تبلیغات در شبکه‌های اجتماعی و بازگشت به کاغذ.',
    content: 'بیانیه: الگوریتم‌ها هنر را می‌کشند. ما ترجیح می‌دهیم ۱۰۰ خواننده واقعی داشته باشیم تا ۱۰هزار فالوئر غیرواقعی.',
    author: 'کیوان راد',
    date: '۱ تیر ۱۴۰۴',
    tag: 'بیانیه',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop',
  },
];

const JournalPage: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState('همه');
  const [activeArticle, setActiveArticle] = useState<typeof articles[0] | null>(null);

  const tags = ['همه', 'گزارش', 'مصاحبه', 'استایل', 'مستند', 'بیانیه', 'فراخوان'];

  const filtered = useMemo(() => {
    if (selectedTag === 'همه') return articles;
    return articles.filter(a => a.tag === selectedTag);
  }, [selectedTag]);

  const featured = filtered.find(a => a.featured) || filtered[0];
  const rest = filtered.filter(a => a.id !== featured?.id);

  return (
    <div className="bg-paper">
      <div className="px-4 md:px-8 lg:px-12 pt-6">
        <div className="border-y-[3px] border-double border-charcoal py-4 flex items-center justify-between">
          <h1 className="font-black text-[36px] md:text-[52px] leading-none tracking-[-0.04em]">مجله</h1>
          <div className="text-right">
            <div className="text-[11px] tracking-[0.2em] font-black text-muted uppercase">Magazine · Issue 25</div>
            <div className="text-[12px] font-bold mt-1">روایت‌های چاپ شده · داستان‌های پشت پارچه</div>
          </div>
        </div>
        <div className="border-b border-border-paper py-2 flex justify-between text-[11px] font-bold text-muted">
          <span>صفحه فرهنگی روزنامه پوشاک · ویژه‌نامه مستند و مصاحبه</span>
          <span className="hidden md:inline">مدیر مسئول: استودیو ۲۵ · صاحب امتیاز: تحریریه</span>
        </div>
      </div>

      {featured && (
        <div className="px-4 md:px-8 lg:px-12 py-8">
          <div className="grid grid-cols-12 gap-6 bg-[#EFE9DD] border border-border-paper rounded-[4px] overflow-hidden">
            <div className="col-span-12 md:col-span-7 aspect-[16/10] md:aspect-[4/3] bg-[#DDD7C7]">
              <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
            </div>
            <div className="col-span-12 md:col-span-5 p-6 md:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="accent">{featured.tag}</Badge>
                <span className="text-[11px] font-bold text-muted">{featured.date}</span>
              </div>
              <h2 className="font-black text-[22px] md:text-[28px] leading-[1.15] tracking-[-0.02em]">{featured.title}</h2>
              <p className="text-[13px] leading-7 font-medium text-muted mt-4 border-r-2 border-accent pr-4">{featured.excerpt}</p>
              <div className="mt-6 flex items-center gap-2 text-[12px] font-bold">
                <span className="w-7 h-7 rounded-full bg-charcoal text-paper flex items-center justify-center text-[11px]">ت</span>
                توسط {featured.author} · ۶ دقیقه مطالعه
              </div>
              <div className="mt-6">
                <Button variant="secondary" onClick={() => setActiveArticle(featured)}>خواندن گزارش کامل →</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Rule variant="double" />

      <div className="px-4 md:px-8 lg:px-12 py-10">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <h3 className="font-black text-[20px] tracking-tight">آخرین مطالب</h3>
          <Rule className="flex-1 hidden md:block" />
          <div className="flex gap-1.5 flex-wrap">
            {tags.map(tag => (
              <button
                key={tag}
                aria-pressed={selectedTag===tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-[4px] text-[11px] font-black border transition ${selectedTag===tag ? 'bg-charcoal text-paper border-charcoal' : 'bg-paper border-border-paper hover:border-ink text-muted hover:text-ink'}`}
              >
                {tag}
              </button>
            ))}
          </div>
          <span className="text-[11px] font-bold text-muted border border-border-paper px-2.5 py-1 rounded-[4px]">{filtered.length.toLocaleString('fa-IR')} مقاله</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 grid sm:grid-cols-2 gap-6">
            {rest.map(article => (
              <article key={article.id} className="border border-border-paper rounded-[4px] bg-paper overflow-hidden group hover:shadow-[3px_3px_0_#1F1D1B] transition-all duration-200 flex flex-col">
                <div className="aspect-[16/10] bg-[#DDD7C7] overflow-hidden">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-700" loading="lazy" decoding="async" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] tracking-[0.2em] font-black text-accent uppercase">{article.tag} · {article.date}</span>
                  </div>
                  <h4 className="font-black text-[15px] leading-[1.3] tracking-tight group-hover:text-accent transition-colors line-clamp-2">{article.title}</h4>
                  <p className="text-[12px] leading-6 font-medium text-muted mt-2 line-clamp-3 flex-1">{article.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-border-paper pt-3">
                    <span className="text-[11px] font-bold flex items-center gap-2">توسط {article.author}</span>
                    <button onClick={() => setActiveArticle(article)} className="text-[11px] font-black underline underline-offset-4 hover:text-accent">ادامه →</button>
                  </div>
                </div>
              </article>
            ))}
            {rest.length===0 && (
              <div className="col-span-2 border border-dashed border-border-paper rounded-[4px] p-8 text-center bg-[#EFE9DD]">
                <p className="font-black">مقاله‌ای در دسته «{selectedTag}» یافت نشد.</p>
                <Button variant="ghost" size="sm" className="mt-3" onClick={() => setSelectedTag('همه')}>نمایش همه</Button>
              </div>
            )}
          </div>

          <aside className="md:col-span-4 space-y-6">
            <div className="border-2 border-charcoal rounded-[4px] bg-charcoal text-paper p-5">
              <div className="text-[10px] tracking-[0.25em] font-black text-paper/50 uppercase">Most Read · پربازدیدترین</div>
              <div className="mt-4 space-y-4">
                {articles.slice(0,3).map((a,i) => (
                  <button key={a.id} onClick={() => setActiveArticle(a)} className="flex gap-3 text-right w-full hover:bg-white/5 p-2 rounded-[4px] transition">
                    <span className="font-black text-[28px] leading-none text-paper/20">{(i+1).toLocaleString('fa-IR')}</span>
                    <div className="flex-1">
                      <div className="font-black text-[13px] leading-tight">{a.title}</div>
                      <div className="text-[11px] text-paper/50 mt-1">{a.date} · {a.tag}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="border border-border-paper rounded-[4px] bg-[#EFE9DD] p-5">
              <h4 className="font-black text-[14px] tracking-tight">دسته‌بندی‌ها</h4>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {tags.map(cat => (
                  <button
                    key={cat}
                    aria-pressed={selectedTag===cat}
                    onClick={() => setSelectedTag(cat)}
                    className={`text-right border rounded-[4px] px-3 py-2 text-[12px] font-bold transition ${selectedTag===cat ? 'bg-charcoal text-paper border-charcoal' : 'bg-paper border-border-paper hover:border-ink'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="border border-dashed border-border-paper rounded-[4px] bg-paper p-5 text-center">
              <div className="text-[10px] tracking-[0.2em] font-black text-muted uppercase">Advertisement</div>
              <div className="mt-3 font-black text-[16px] leading-tight">کارگاه چاپ سیلک استودیو ۲۵<br/>ثبت نام دوره تابستان</div>
              <div className="text-[11px] leading-5 font-medium text-muted mt-2">۲ روز · ۸ ساعت · مدرک چاپ · ۲,۸۰۰,۰۰۰ تومان</div>
              <Button fullWidth size="sm" variant="primary" className="mt-4">رزرو →</Button>
            </div>
          </aside>
        </div>
      </div>

      {activeArticle && (
        <div className="fixed inset-0 z-[60] bg-charcoal/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setActiveArticle(null)}>
          <div className="bg-paper border-2 border-charcoal rounded-[4px] w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-[8px_8px_0_#1F1D1B]" onClick={e=>e.stopPropagation()}>
            <div className="sticky top-0 bg-paper border-b border-border-paper p-4 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="accent">{activeArticle.tag}</Badge>
                  <span className="text-[11px] font-bold text-muted">{activeArticle.date}</span>
                </div>
                <h2 className="font-black text-[18px] leading-tight">{activeArticle.title}</h2>
                <div className="text-[11px] text-muted mt-1">توسط {activeArticle.author}</div>
              </div>
              <button onClick={() => setActiveArticle(null)} className="w-8 h-8 border border-border-paper rounded-[4px] font-black shrink-0" aria-label="بستن">×</button>
            </div>
            <img src={activeArticle.image} alt={activeArticle.title} className="w-full aspect-[16/9] object-cover" />
            <div className="p-6 space-y-4 text-[14px] leading-8 font-medium">
              <p className="font-bold border-r-2 border-accent pr-3">{activeArticle.excerpt}</p>
              <p>{activeArticle.content}</p>
              <Rule />
              <p className="text-[12px] text-muted">این مطلب در شماره ۲۵ روزنامه پوشاک چاپ شده است. برای اشتراک نسخه کاغذی با تحریریه تماس بگیرید.</p>
            </div>
            <div className="p-4 border-t border-border-paper flex justify-end">
              <Button onClick={() => setActiveArticle(null)}>بستن</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JournalPage;

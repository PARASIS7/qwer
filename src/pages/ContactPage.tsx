import React from 'react';
import Rule from '../components/ui/Rule';
import Button from '../components/ui/Button';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-paper">
      <div className="px-4 md:px-8 lg:px-12 pt-8 pb-16">
        <div className="max-w-[1100px] mx-auto">
          <div className="border-y-[3px] border-double border-charcoal py-6 text-center">
            <div className="text-[11px] tracking-[0.25em] font-black text-accent uppercase">Imprint · تماس با تحریریه</div>
            <h1 className="font-black text-[42px] md:text-[56px] leading-[0.9] tracking-[-0.04em] mt-2">تماس با ما</h1>
          </div>

          <div className="mt-8 grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-7">
              <div className="border border-border-paper rounded-[4px] bg-paper p-6 md:p-8">
                <h3 className="font-black text-[18px] tracking-tight">فرم تماس · ویژه‌نامه خوانندگان</h3>
                <p className="text-[12px] text-muted font-medium mt-2 leading-5">پیام شما مستقیما به تحریریه روزنامه پوشاک می‌رسد. معمولا تا ۲۴ ساعت پاسخ می‌دهیم — به جز روزهای چاپ.</p>
                <Rule className="my-6" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5"><label className="text-[11px] font-black">نام *</label><input className="w-full border border-border-paper rounded-[4px] px-3 py-2.5 text-[13px] bg-[#EFE9DD] focus:outline-none focus:border-ink" placeholder="نام شما" /></div>
                  <div className="space-y-1.5"><label className="text-[11px] font-black">ایمیل *</label><input className="w-full border border-border-paper rounded-[4px] px-3 py-2.5 text-[13px] bg-[#EFE9DD] focus:outline-none focus:border-ink" placeholder="you@example.com" dir="ltr" /></div>
                  <div className="space-y-1.5 md:col-span-2"><label className="text-[11px] font-black">موضوع</label><select className="w-full border border-border-paper rounded-[4px] px-3 py-2.5 text-[13px] bg-[#EFE9DD]"><option>سوال درباره سفارش</option><option>همکاری</option><option>پیشنهاد طرح</option><option>سایر</option></select></div>
                  <div className="space-y-1.5 md:col-span-2"><label className="text-[11px] font-black">پیام *</label><textarea rows={6} className="w-full border border-border-paper rounded-[4px] px-3 py-3 text-[13px] bg-[#EFE9DD] resize-none focus:outline-none focus:border-ink" placeholder="پیام خود را اینجا بنویسید..." /></div>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <Button>ارسال پیام →</Button>
                  <span className="text-[11px] text-muted font-bold">پاسخگویی: شنبه تا چهارشنبه ۱۰-۱۸</span>
                </div>
              </div>

              <div className="mt-6 border border-dashed border-border-paper rounded-[4px] p-4 bg-[#EFE9DD] text-[11px] leading-5 font-medium flex gap-3">
                <span className="text-[18px]">✦</span>
                <div>برای پیگیری سفارش، لطفا شماره سفارش (#۲۵۸۴×) را ذکر کنید. برای مرجوعی، تا ۷ روز پس از دریافت فرصت دارید.</div>
              </div>
            </div>

            <aside className="col-span-12 lg:col-span-5 space-y-6">
              {/* Imprint box */}
              <div className="border-[3px] border-double border-charcoal rounded-[4px] bg-[#EFE9DD] p-6">
                <h4 className="font-black text-[14px] tracking-[0.2em] uppercase">شناسنامه · Imprint</h4>
                <Rule className="my-4" />
                <div className="space-y-4 text-[13px] leading-6 font-medium">
                  <div>
                    <div className="font-black text-[11px] tracking-[0.2em] uppercase text-muted">نشانی کارگاه و فروشگاه حضوری</div>
                    <div className="mt-1 font-bold">تهران، خیابان انقلاب، خیابان کارگر شمالی، بن‌بست ادب، پلاک ۲۵، طبقه همکف و اول<br/>کدپستی: ۱۴۱۸۸-۴۳۹۴۵</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-y border-border-paper py-4">
                    <div><div className="text-[10px] font-black tracking-wide text-muted uppercase">تلفن تحریریه</div><div className="font-black mt-1" dir="ltr">۰۲۱-۶۶۹۵ ××××</div></div>
                    <div><div className="text-[10px] font-black tracking-wide text-muted uppercase">واتساپ</div><div className="font-black mt-1" dir="ltr">۰۹۱۲-×××-××۷۸</div></div>
                    <div><div className="text-[10px] font-black tracking-wide text-muted uppercase">ایمیل</div><div className="font-bold mt-1" dir="ltr">hello@rooznameh.studio</div></div>
                    <div><div className="text-[10px] font-black tracking-wide text-muted uppercase">اینستاگرام</div><div className="font-bold mt-1" dir="ltr">@rooznameh.studio</div></div>
                  </div>
                  <div>
                    <div className="font-black text-[11px] tracking-[0.2em] uppercase text-muted">ساعات کاری</div>
                    <div className="mt-1">شنبه تا چهارشنبه: ۱۰:۰۰ - ۲۰:۰۰<br/>پنجشنبه: ۱۰:۰۰ - ۱۸:۰۰<br/>جمعه: تعطیل (روز چاپ)</div>
                  </div>
                </div>

                <div className="mt-6 bg-charcoal text-paper rounded-[4px] p-4 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-paper text-charcoal flex items-center justify-center font-black text-[14px] shrink-0">!</div>
                  <div className="text-[11px] leading-5 font-medium">
                    <div className="font-black">نکته برای بازدید حضوری:</div>
                    کارگاه ما کوچک است و همیشه شلوغ. لطفا قبل از آمدن، هماهنگ کنید تا بتوانیم برای شما وقت بگذاریم — چای و روزنامه تازه همیشه هست.
                  </div>
                </div>
              </div>

              <div className="border border-border-paper rounded-[4px] bg-paper p-5">
                <h4 className="font-black text-[12px] tracking-[0.15em] uppercase">نقشه · دسترسی</h4>
                <div className="mt-3 aspect-[16/10] bg-[#DDD7C7] rounded-[4px] border border-border-paper overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1526772661823-04003d19dada?w=600&h=400&fit=crop" alt="map" className="w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-charcoal text-paper px-4 py-2 rounded-[4px] text-[12px] font-black border-2 border-paper shadow-lg">📍 بن‌بست ادب، پلاک ۲۵</div>
                  </div>
                </div>
                <div className="mt-3 text-[11px] leading-5 font-medium text-muted">
                  نزدیک‌ترین مترو: انقلاب. از خروجی کارگر شمالی، ۵۰۰ متر پیاده به سمت شمال. بن‌بست دوم سمت راست.
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="border border-border-paper rounded-[4px] p-3 bg-paper text-center"><div className="font-black text-[20px]">۴.۹</div><div className="text-[10px] font-bold text-muted">رضایت مشتریان · از ۲۸۴ نظر</div></div>
                <div className="border border-border-paper rounded-[4px] p-3 bg-paper text-center"><div className="font-black text-[20px]">۲۴س</div><div className="text-[10px] font-bold text-muted">میانگین پاسخگویی</div></div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

import React from 'react';
import Rule from '../components/ui/Rule';
import DropCap from '../components/ui/DropCap';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-paper">
      <div className="px-4 md:px-8 lg:px-12 pt-8 pb-16">
        <div className="max-w-[1100px] mx-auto">
          {/* Masthead header */}
          <div className="text-center border-y-[3px] border-double border-charcoal py-6 mb-8">
            <div className="text-[11px] tracking-[0.3em] font-black text-accent uppercase">About Us · درباره ما · مانیفست</div>
            <h1 className="font-black text-[48px] md:text-[72px] leading-[0.9] tracking-[-0.05em] mt-3">روزنامه پوشاک<br/><span className="font-light text-muted">Est. 1401 · Tehran</span></h1>
            <div className="mt-4 flex items-center justify-center gap-3 text-[10px] tracking-[0.2em] font-bold text-muted uppercase">
              <span>دوره سوم</span><span className="w-1 h-1 bg-muted rounded-full"/> <span>تاسیس: دی ۱۴۰۱</span><span className="w-1 h-1 bg-muted rounded-full"/> <span>تیراژ: محدود</span>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8 items-start">
            <div className="col-span-12 lg:col-span-8">
              <div className="flex gap-4 mb-6">
                <div className="hidden md:block w-[180px] shrink-0">
                  <div className="border border-border-paper rounded-[4px] bg-[#EFE9DD] p-3 sticky top-28">
                    <div className="text-[10px] tracking-[0.2em] font-black uppercase mb-2">فهرست مطالب</div>
                    <ul className="text-[12px] font-bold space-y-2 leading-5">
                      <li>۱. سرآغاز</li>
                      <li>۲. چرا روزنامه؟</li>
                      <li>۳. کارگاه چاپ</li>
                      <li>۴. تیم تحریریه</li>
                      <li>۵. تعهدات · Colophon</li>
                    </ul>
                    <Rule className="my-3" />
                    <div className="text-[10px] leading-4 text-muted font-medium">این صفحه در تاریخ ۲۸ تیر ۱۴۰۴ به‌روزرسانی شد.</div>
                  </div>
                </div>

                <div className="flex-1">
                  <DropCap accent className="text-[18px]">
                    روزنامه پوشاک از یک سوال ساده شروع شد: اگر لباس‌ها روزنامه بودند، چه تیتری می‌زدند؟ ما در زمستان ۱۴۰۱، در زیرزمینی نمور در خیابان انقلاب، با یک دستگاه چاپ سیلک دست دوم و مقداری پارچه خام، اولین شماره را چاپ کردیم. ۵۰ عدد تیشرت مشکی با تیتر «شهر شلوغ است، اما ما ساکتیم». همان ۵۰ عدد در دو روز فروش رفت — نه به خاطر پارچه یا برش، بلکه به خاطر جمله‌ای که روی سینه بود.
                  </DropCap>

                  <div className="mt-8 space-y-6 text-[15px] leading-[2] font-medium">
                    <p>
                      ما هر کالکشن را مانند یک شماره روزنامه می‌بینیم: تاریخ انتشار دارد، سرمقاله دارد، و بعد از مدتی آرشیو می‌شود. هیچ محصولی برای همیشه موجود نمی‌ماند. تیراژ هر طرح بین ۵۰ تا ۱۰۰ عدد است. وقتی تمام شد، تمام شد — تجدید چاپ نمی‌شود. همین کمیابی است که لباس را از کالای مصرفی به سندی تاریخی تبدیل می‌کند.
                    </p>

                    <blockquote className="border-y border-charcoal py-4 my-8">
                      <div className="text-center">
                        <div className="text-[48px] leading-none font-black text-accent">“</div>
                        <p className="font-black text-[20px] leading-[1.4] tracking-tight max-w-xl mx-auto">
                          ما برای برندهای بزرگ لباس تولید نمی‌کنیم — ما برای آدم‌هایی لباس تولید می‌کنیم که روزنامه می‌خوانند، حتی اگر روزنامه‌ای در کار نباشد.
                        </p>
                        <div className="mt-3 text-[11px] tracking-[0.2em] font-bold text-muted uppercase">— کیوان راد · بنیان‌گذار</div>
                      </div>
                    </blockquote>

                    <h3 className="font-black text-[22px] tracking-tight mt-8">کارگاه ما</h3>
                    <p>
                      کارگاه مرکزی ما در خیابان انقلاب، بن‌بست ادب، پلاک ۲۵ قرار دارد. طبقه همکف چاپخانه و طبقه اول خیاط‌خانه است. تمام مراحل — از طراحی تا برش و چاپ — در همین ساختمان انجام می‌شود. ما به «ساخت تهران» اعتقاد داریم. پارچه‌های ما از کارخانه‌های یزد و کاشان می‌آید، مرکب چاپ از تولیدکننده داخلی، و حتی کارت‌های آویز از کاغذ بازیافتی کارخانه چوب و کاغذ.
                    </p>

                    <div className="columns-2 gap-8 text-[14px] leading-[1.9]">
                      <p>
                        <strong>تعهد اول: تیراژ محدود.</strong> هر طرح حداکثر ۱۰۰ عدد. شماره سریال دستی روی هر لباس حک می‌شود.
                      </p>
                      <p>
                        <strong>تعهد دوم: چاپ دستی.</strong> هیچ چاپ دیجیتالی در کار نیست. هر لباس با دست چاپ می‌شود، پس اختلاف جزئی رنگ طبیعی است — نه نقص.
                      </p>
                      <p>
                        <strong>تعهد سوم: قیمت منصفانه.</strong> ما حاشیه سود را پایین نگه می‌داریم تا دانشجو هم بتواند روزنامه بخرد و بپوشد.
                      </p>
                      <p>
                        <strong>تعهد چهارم: بایگانی باز.</strong> تمام شماره‌های قدیمی در آرشیو سایت باقی می‌ماند، حتی اگر ناموجود باشد — برای تاریخ.
                      </p>
                    </div>
                  </div>

                  {/* Timeline as newspaper history column */}
                  <div className="mt-12 border-2 border-charcoal rounded-[4px] bg-[#EFE9DD] p-6">
                    <h4 className="font-black text-[14px] tracking-[0.2em] uppercase mb-4">تایم‌لاین روزنامه · تاریخچه چاپ</h4>
                    <div className="space-y-4 relative">
                      <div className="absolute right-[7px] top-0 bottom-0 w-px bg-border-paper" />
                      {[
                        { date: 'دی ۱۴۰۱', title: 'شماره صفر', desc: 'اولین تیشرت چاپ دستی · ۵۰ عدد · بازارچه انقلاب' },
                        { date: 'خرداد ۱۴۰۲', title: 'افتتاح کارگاه', desc: 'اسکان در بن‌بست ادب · خرید دستگاه دوم' },
                        { date: 'مهر ۱۴۰۲', title: 'شماره ۱۲ - کالکشن پاییز', desc: 'اولین هودی و شلوار جین · مصاحبه با مجله پیله' },
                        { date: 'اسفند ۱۴۰۲', title: 'نمایشگاه چاپ', desc: 'نمایشگاه انفرادی در گالری اُ · فروش ۳۰۰ عدد در یک هفته' },
                        { date: 'تیر ۱۴۰۴', title: 'شماره ۲۵ - کالکشن تابستان', desc: 'شما در حال خواندن این شماره هستید' },
                      ].map((ev, i) => (
                        <div key={i} className="relative flex gap-4">
                          <div className={`w-4 h-4 rounded-full border-2 bg-paper shrink-0 mt-1 z-10 ${i===4 ? 'border-accent bg-accent' : 'border-border-paper'}`} />
                          <div className="flex-1 pb-2">
                            <div className="flex items-baseline gap-3"><span className="font-black text-[12px] text-accent">{ev.date}</span><span className="font-black text-[13px]">{ev.title}</span></div>
                            <div className="text-[12px] text-muted font-medium mt-1">{ev.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4 space-y-6">
              <div className="aspect-[3/4] rounded-[4px] overflow-hidden border border-border-paper bg-[#DDD7C7] sticky top-28">
                <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&h=800&fit=crop" alt="Workshop" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-charcoal/80 text-paper p-3 text-[11px] font-bold">
                  کارگاه بن‌بست ادب · عکس: سارا رضایی · ۱۴۰۳
                </div>
              </div>

              <div className="border border-border-paper rounded-[4px] p-4 bg-paper">
                <h4 className="font-black text-[12px] tracking-[0.2em] uppercase">Colophon · شناسنامه چاپ</h4>
                <div className="mt-3 text-[11px] leading-6 font-medium space-y-1">
                  <div className="flex justify-between"><span className="text-muted">فونت متن</span><span className="font-bold">Vazirmatn</span></div>
                  <div className="flex justify-between"><span className="text-muted">فونت عنوان</span><span className="font-bold">Peyda Bold</span></div>
                  <div className="flex justify-between"><span className="text-muted">کاغذ (کارت)</span><span className="font-bold">بازیافتی ۳۰۰ گرم</span></div>
                  <div className="flex justify-between"><span className="text-muted">چاپ</span><span className="font-bold">سیلک اسکرین دستی</span></div>
                  <div className="flex justify-between"><span className="text-muted">طراحی</span><span className="font-bold">استودیو ۲۵</span></div>
                </div>
                <Rule className="my-3" />
                <div className="text-[10px] text-muted font-bold leading-4">
                  این سایت به عنوان یک پروژه دمو و نمونه‌کار طراحی شده و تمام محصولات نمایشی هستند. با این وجود، فلسفه برند کاملا واقعی است.
                </div>
              </div>

              <div className="bg-charcoal text-paper rounded-[4px] p-5">
                <div className="text-[10px] tracking-[0.25em] font-black text-paper/50 uppercase">Join The Editorial Team</div>
                <h4 className="font-black text-[18px] leading-tight mt-2">اگر روزنامه می‌خوانی،<br/>ایدئولوژی ما را می‌فهمی</h4>
                <p className="text-[12px] text-paper/60 leading-5 mt-3 font-medium">برای همکاری در بخش چاپ، دوخت یا تولید محتوا، رزومه و نمونه کار خود را بفرستید.</p>
                <button className="mt-4 w-full bg-paper text-charcoal py-2.5 rounded-[4px] text-[12px] font-black">ارسال رزومه →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

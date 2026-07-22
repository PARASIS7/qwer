import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import Rule from '../components/ui/Rule';
import Button from '../components/ui/Button';

const steps = ['اطلاعات ارسال', 'روش پرداخت', 'بازبینی و پرداخت'];

const CheckoutPage: React.FC = () => {
  const { items, total, clearCart } = useCart();
  const location = useLocation() as any;
  const initialProvince = location.state?.province as 'تهران' | 'شهرستان' | undefined;

  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [orderNumber] = useState(() => `۲۵۸${Math.floor(40 + Math.random()*50)}`);

  // Form states
  const [form, setForm] = useState({
    name: '',
    phone: '',
    province: initialProvince || 'تهران' as string,
    city: 'تهران',
    postalCode: '',
    address: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card');

  const citiesByProvince: Record<string, string[]> = {
    'تهران': ['تهران', 'اسلامشهر', 'ری'],
    'اصفهان': ['اصفهان', 'کاشان'],
    'فارس': ['شیراز', 'مرودشت'],
    'خراسان رضوی': ['مشهد', 'نیشابور'],
    'آذربایجان شرقی': ['تبریز'],
  };

  useEffect(() => {
    if (!citiesByProvince[form.province]) {
      setForm(f => ({ ...f, city: 'تهران' }));
    } else {
      if (!citiesByProvince[form.province].includes(form.city)) {
        setForm(f => ({ ...f, city: citiesByProvince[form.province][0] }));
      }
    }
  }, [form.province]);

  const shippingBase = form.province === 'تهران' ? 45000 : 65000;
  const shipping = total > 1000000 ? 0 : shippingBase;
  const finalTotal = total + shipping;

  const validateStep0 = () => {
    const newErrors: Record<string,string> = {};
    if (!form.name.trim() || form.name.trim().length < 3) newErrors.name = 'نام حداقل ۳ حرف';
    if (!/^09\d{9}$/.test(form.phone.replace(/[^0-9]/g,'').replace(/^0/, '0'))) {
      const digits = form.phone.replace(/\D/g,'');
      if (!/^09\d{9}$/.test(digits)) newErrors.phone = 'شماره موبایل معتبر: ۰۹۱۲۳۴۵۶۷۸۹';
    }
    if (!form.province) newErrors.province = 'استان الزامی';
    if (!form.city) newErrors.city = 'شهر الزامی';
    if (!/^\d{10}$/.test(form.postalCode.replace(/\D/g,''))) newErrors.postalCode = 'کد پستی ۱۰ رقمی';
    if (!form.address.trim() || form.address.trim().length < 10) newErrors.address = 'آدرس دقیق حداقل ۱۰ حرف';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (step === 0) {
      if (!validateStep0()) return;
    }
    if (step === 1 && form.province !== 'تهران' && paymentMethod === 'cod') {
      setErrors({ payment: 'پرداخت در محل فقط برای تهران فعال است' });
      return;
    }
    setErrors({});
    setStep(s => s + 1);
  };

  const handleDone = () => {
    setDone(true);
    clearCart();
  };

  if (items.length === 0 && !done) {
    return (
      <div className="bg-paper min-h-[60vh] flex items-center justify-center p-8">
        <div className="text-center border-2 border-border-paper rounded-[4px] p-8 bg-[#EFE9DD] max-w-md">
          <h2 className="font-black text-[18px]">سبد خرید خالی است</h2>
          <p className="text-[13px] text-muted mt-2">ابتدا محصولی به سبد اضافه کنید.</p>
          <Link to="/shop" className="inline-block mt-4"><Button>رفتن به فروشگاه</Button></Link>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="bg-paper min-h-[70vh] px-4 md:px-8 lg:px-12 py-16 text-center">
        <div className="max-w-xl mx-auto border-[4px] border-double border-charcoal rounded-[4px] p-8 md:p-12 bg-[#EFE9DD]">
          <div className="bg-success text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto text-[28px] font-black">✓</div>
          <h1 className="font-black text-[28px] mt-6 leading-tight">سفارش با موفقیت ثبت شد!</h1>
          <div className="mt-2 text-[13px] font-bold text-muted">شماره سفارش: <span className="text-ink font-black">#{orderNumber}</span> · {form.province}</div>
          <p className="text-[13px] leading-6 font-medium mt-4 text-muted">
            از خرید شما سپاسگزاریم. رسید و کد رهگیری تا دقایقی دیگر برای {form.phone} پیامک می‌شود.<br/>
            آدرس: {form.province}، {form.city}، {form.address.slice(0,40)}...
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3 text-[11px] font-bold">
            <div className="border border-border-paper rounded-[4px] p-3 bg-paper"><div>تحویل</div><div className="text-muted mt-1">{form.province==='تهران' ? '۲۴-۴۸ ساعته' : '۲-۳ روز'}</div></div>
            <div className="border border-border-paper rounded-[4px] p-3 bg-paper"><div>پرداخت</div><div className="text-success mt-1">{paymentMethod==='card' ? 'آنلاین موفق' : 'در محل'}</div></div>
            <div className="border border-border-paper rounded-[4px] p-3 bg-paper"><div>ارسال از</div><div className="text-muted mt-1">کارگاه تهران</div></div>
          </div>
          <Link to="/" className="inline-block mt-8"><Button variant="secondary">بازگشت به خانه</Button></Link>
          <div className="mt-6 text-[9px] tracking-[0.2em] font-bold text-muted uppercase">Thank you for reading · چاپ ۱۴۰۴</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-paper min-h-screen">
      <div className="px-4 md:px-8 lg:px-12 pt-6">
        <h1 className="font-black text-[28px] md:text-[36px] tracking-tight">تسویه حساب</h1>
        <div className="mt-4 flex items-center gap-0 border border-border-paper rounded-[4px] overflow-hidden max-w-2xl">
          {steps.map((s, i) => (
            <button
              key={s}
              disabled={i > step}
              onClick={() => { if (i < step) setStep(i); }}
              className={`flex-1 flex items-center gap-2 px-4 py-3 text-[12px] font-black transition text-right ${i===step ? 'bg-charcoal text-paper' : i < step ? 'bg-success text-white hover:bg-success/90' : 'bg-[#EFE9DD] text-muted'}`}
            >
              <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] shrink-0 ${i===step ? 'bg-paper text-charcoal border-paper' : i<step ? 'bg-white text-success border-white' : 'border-border-paper'}`}>{i<step ? '✓' : (i+1).toLocaleString('fa-IR')}</span>
              <span className="hidden sm:inline">{s}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-12 py-8 grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8">
          {step === 0 && (
            <div className="border border-border-paper rounded-[4px] bg-paper p-6 space-y-5">
              <h3 className="font-black text-[16px] flex items-center gap-2">اطلاعات ارسال <span className="text-[11px] font-bold text-muted">* ستاره‌دار الزامی</span></h3>
              <Rule />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black tracking-wide">نام و نام خانوادگی *</label>
                  <input
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="مثال: آرش احمدی"
                    className={`w-full border rounded-[4px] px-3 py-2.5 text-[13px] bg-[#EFE9DD] focus:outline-none focus:border-ink ${errors.name ? 'border-accent bg-red-50' : 'border-border-paper'}`}
                  />
                  {errors.name && <div className="text-[11px] text-accent font-bold">{errors.name}</div>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black tracking-wide">شماره تماس *</label>
                  <input
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="۰۹۱۲×××××××"
                    dir="ltr"
                    className={`w-full border rounded-[4px] px-3 py-2.5 text-[13px] bg-[#EFE9DD] focus:outline-none focus:border-ink ${errors.phone ? 'border-accent bg-red-50' : 'border-border-paper'}`}
                  />
                  {errors.phone && <div className="text-[11px] text-accent font-bold">{errors.phone}</div>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black tracking-wide">استان *</label>
                  <select value={form.province} onChange={e => setForm({ ...form, province: e.target.value })} className={`w-full border rounded-[4px] px-3 py-2.5 text-[13px] bg-[#EFE9DD] focus:outline-none focus:border-ink ${errors.province ? 'border-accent' : 'border-border-paper'}`}>
                    {Object.keys(citiesByProvince).map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                  {errors.province && <div className="text-[11px] text-accent font-bold">{errors.province}</div>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black tracking-wide">شهر *</label>
                  <select value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} className={`w-full border rounded-[4px] px-3 py-2.5 text-[13px] bg-[#EFE9DD] focus:outline-none focus:border-ink ${errors.city ? 'border-accent' : 'border-border-paper'}`}>
                    {(citiesByProvince[form.province] || ['تهران']).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[11px] font-black tracking-wide">کد پستی * (۱۰ رقمی)</label>
                  <input value={form.postalCode} onChange={e => setForm({ ...form, postalCode: e.target.value })} placeholder="۱۲۳۴۵۶۷۸۹۰" dir="ltr" className={`w-full border rounded-[4px] px-3 py-2.5 text-[13px] bg-[#EFE9DD] focus:outline-none focus:border-ink ${errors.postalCode ? 'border-accent bg-red-50' : 'border-border-paper'}`} />
                  {errors.postalCode && <div className="text-[11px] text-accent font-bold">{errors.postalCode}</div>}
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[11px] font-black tracking-wide">آدرس دقیق *</label>
                  <textarea rows={3} value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="خیابان، کوچه، پلاک، واحد" className={`w-full border rounded-[4px] px-3 py-2.5 text-[13px] bg-[#EFE9DD] resize-none focus:outline-none focus:border-ink ${errors.address ? 'border-accent bg-red-50' : 'border-border-paper'}`} />
                  {errors.address && <div className="text-[11px] text-accent font-bold">{errors.address}</div>}
                </div>
              </div>
              <div className="bg-[#EFE9DD] border border-border-paper rounded-[4px] p-3 text-[11px] font-bold flex justify-between">
                <span>برآورد ارسال: {form.province==='تهران' ? '۴۵,۰۰۰' : '۶۵,۰۰۰'} تومان {total>1000000 ? ' (رایگان شد)' : ''}</span>
                <span className="text-muted">تحویل: {form.province==='تهران' ? '۲۴-۴۸ ساعت' : '۲-۳ روز کاری'}</span>
              </div>
              <div className="flex justify-between pt-2">
                <Link to="/cart"><Button variant="ghost">بازگشت به سبد</Button></Link>
                <Button onClick={nextStep}>ادامه → روش پرداخت</Button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="border border-border-paper rounded-[4px] bg-paper p-6 space-y-5">
              <h3 className="font-black text-[16px]">روش پرداخت · {form.province} · {form.city}</h3>
              <Rule />
              <div className="space-y-3">
                {[
                  { id: 'card' as const, title: 'پرداخت آنلاین - کارت بانکی', desc: 'اتصال به درگاه شاپرک · پرداخت امن · تایید آنی', badge: 'پیشنهادی' },
                  { id: 'cod' as const, title: 'پرداخت در محل (فقط تهران)', desc: 'فقط برای تهران · پرداخت نقدی/کارتخوان درب منزل · +۱۵,۰۰۰ هزینه', badge: 'COD' },
                ].map(opt => (
                  <label key={opt.id} className={`flex items-start gap-3 border-2 rounded-[4px] p-4 cursor-pointer transition ${paymentMethod===opt.id ? 'border-charcoal bg-[#EFE9DD]' : 'border-border-paper hover:border-ink bg-paper'}`}>
                    <input type="radio" name="pay" checked={paymentMethod===opt.id} onChange={() => setPaymentMethod(opt.id)} className="mt-1 accent-charcoal" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-[13px]">{opt.title}</span>
                        <span className="text-[10px] font-bold border border-border-paper px-2 py-0.5 rounded-[4px]">{opt.badge}</span>
                        {opt.id==='cod' && form.province!=='تهران' && <span className="text-[10px] font-bold bg-accent text-white px-2 py-0.5 rounded-[4px]">غیرفعال خارج تهران</span>}
                      </div>
                      <div className="text-[11px] text-muted font-medium mt-1">{opt.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.payment && <div className="text-[12px] font-bold text-accent border border-accent/20 bg-accent/5 p-3 rounded-[4px]">{errors.payment}</div>}
              <div className="bg-[#EFE9DD] border border-border-paper rounded-[4px] p-4 text-[11px] leading-5 font-medium">
                <div className="font-black mb-1">شبیه‌ساز درگاه (دمو)</div>
                این دمو است. درگاه زرین‌پال واقعی نیست. پرداخت در محل فقط برای تهران فعال است و ۱۵,۰۰۰ تومان هزینه افزوده دارد.
              </div>
              <div className="flex justify-between pt-2">
                <Button variant="ghost" onClick={() => setStep(0)}>← بازگشت</Button>
                <Button onClick={nextStep}>ادامه → بازبینی</Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="border border-border-paper rounded-[4px] bg-paper p-6 space-y-5">
              <h3 className="font-black text-[16px]">بازبینی و پرداخت · صفحه آخر</h3>
              <Rule />
              <div className="space-y-3 text-[13px]">
                <div className="bg-[#EFE9DD] border border-border-paper rounded-[4px] p-4">
                  <div className="font-black text-[12px] tracking-wide mb-2 flex justify-between">
                    <span>آدرس تحویل</span>
                    <button onClick={() => setStep(0)} className="text-[11px] underline text-accent">ویرایش</button>
                  </div>
                  <div className="leading-6 font-medium">
                    {form.name} · {form.phone} · {form.province}، {form.city}، {form.address} · کدپستی {form.postalCode}
                  </div>
                  <div className="mt-2 text-[11px] font-bold text-muted">روش پرداخت: {paymentMethod==='card' ? 'آنلاین' : 'در محل (تهران)'}</div>
                </div>
                <div className="border border-border-paper rounded-[4px] divide-y divide-border-paper">
                  {items.map(it => (
                    <div key={`${it.product.id}-${it.size}-${it.color.name}`} className="flex justify-between p-3 gap-2">
                      <span className="font-bold flex-1">{it.product.name} · {it.size} · {it.color.label} × {it.quantity.toLocaleString('fa-IR')}</span>
                      <span className="font-black shrink-0">{formatPrice(it.product.price * it.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Rule />
              <div className="flex flex-col sm:flex-row justify-between gap-3 pt-2">
                <Button variant="ghost" onClick={() => setStep(1)}>← بازگشت</Button>
                <Button variant="primary" size="lg" onClick={handleDone}>پرداخت {formatPrice(finalTotal + (paymentMethod==='cod' ? 15000 : 0))} و ثبت سفارش</Button>
              </div>
            </div>
          )}
        </div>

        <aside className="col-span-12 lg:col-span-4">
          <div className="border-2 border-charcoal rounded-[4px] bg-[#EFE9DD] p-5 sticky top-28">
            <h4 className="font-black text-[14px]">خلاصه · شماره #۲۵۸۴۲</h4>
            <Rule className="my-3" />
            <div className="space-y-2 text-[12px] font-bold">
              <div className="flex justify-between"><span className="text-muted">جمع کالا ({items.length} نوع)</span><span>{formatPrice(total)}</span></div>
              <div className="flex justify-between"><span className="text-muted">ارسال ({form.province})</span><span className={shipping===0 ? 'text-success' : ''}>{shipping===0 ? 'رایگان' : formatPrice(shipping)}</span></div>
              {paymentMethod==='cod' && <div className="flex justify-between"><span className="text-muted">هزینه COD</span><span>{formatPrice(15000)}</span></div>}
              <Rule />
              <div className="flex justify-between text-[15px] font-black"><span>قابل پرداخت</span><span>{formatPrice(finalTotal + (paymentMethod==='cod' ? 15000 : 0))}</span></div>
              <div className="text-[10px] text-muted font-medium">استان: {form.province} · شهر: {form.city}</div>
            </div>
            <div className="mt-4 text-[10px] leading-4 text-muted font-medium border border-border-paper rounded-[4px] bg-paper p-3">
              با کلیک روی پرداخت، سفارش شما در بایگانی تحریریه ثبت و نسخه چاپی فاکتور همراه محصول ارسال خواهد شد. تحویل {form.province==='تهران' ? '۲۴-۴۸ ساعته' : '۲-۳ روز کاری'}.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CheckoutPage;

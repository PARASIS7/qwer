import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import Rule from '../components/ui/Rule';
import Button from '../components/ui/Button';

const CartPage: React.FC = () => {
  const { items, updateQuantity, removeFromCart, total, count } = useCart();
  const [province, setProvince] = useState<'تهران' | 'شهرستان'>('تهران');
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState<{ code: string; discount: number } | null>(null);
  const [couponError, setCouponError] = useState('');

  const shippingBase = province === 'تهران' ? 45000 : 65000;
  const shipping = total > 1000000 ? 0 : shippingBase;
  const volumeDiscount = total > 2000000 ? Math.round(total * 0.1) : 0;
  const couponDiscount = couponApplied ? Math.round(total * couponApplied.discount) : 0;
  const finalTotal = total + shipping - volumeDiscount - couponDiscount;

  const applyCoupon = () => {
    setCouponError('');
    const normalized = coupon.trim().toUpperCase();
    if (normalized === 'RZN15' || normalized === 'RZN۱۵') {
      setCouponApplied({ code: 'RZN15', discount: 0.15 });
    } else if (normalized === 'BAHAR04' || normalized === 'بهار۰۴') {
      setCouponApplied({ code: 'BAHAR04', discount: 0.1 });
    } else if (!normalized) {
      setCouponError('کد را وارد کنید');
    } else {
      setCouponError('کد نامعتبر است · کد فعال: RZN15');
    }
  };

  const clearCoupon = () => {
    setCouponApplied(null);
    setCoupon('');
    setCouponError('');
  };

  if (items.length === 0) {
    return (
      <div className="bg-paper min-h-[70vh] px-4 md:px-8 lg:px-12 py-16 text-center">
        <div className="max-w-lg mx-auto border-[3px] border-double border-border-paper rounded-[4px] p-10 bg-[#EFE9DD]">
          <div className="text-[12px] tracking-[0.3em] font-black text-muted uppercase">Empty Archive</div>
          <h1 className="font-black text-[28px] mt-3">سبد خرید خالی است</h1>
          <p className="text-[13px] text-muted font-medium mt-3 leading-6">
            هنوز هیچ صفحه‌ای از روزنامه را به بایگانی خود اضافه نکرده‌اید. به فروشگاه بروید و شماره‌های جدید را ورق بزنید.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-2 text-[11px] font-bold">
            <div className="border border-border-paper bg-paper rounded-[4px] p-2">✓ اصالت</div>
            <div className="border border-border-paper bg-paper rounded-[4px] p-2">↩ ۷ روز بازگشت</div>
            <div className="border border-border-paper bg-paper rounded-[4px] p-2">✦ پرداخت امن</div>
          </div>
          <Link to="/shop" className="inline-block mt-6"><Button>رفتن به فروشگاه</Button></Link>
          <div className="mt-8 text-[10px] tracking-[0.2em] font-bold text-muted uppercase">آرشیو خالی · پیشنهاد: تیشرت بیسیک مشکی</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-paper min-h-screen">
      <div className="px-4 md:px-8 lg:px-12 pt-6">
        <div className="flex items-baseline gap-4">
          <h1 className="font-black text-[30px] md:text-[38px] tracking-tight leading-none">سبد خرید</h1>
          <span className="text-[12px] font-bold text-muted">{count.toLocaleString('fa-IR')} مورد</span>
        </div>
        <div className="mt-3 border-y border-border-paper py-2 flex flex-col md:flex-row justify-between gap-1 text-[11px] font-bold tracking-wide text-muted">
          <span>فهرست خرید · فاکتور موقت: #۲۵۸۴۲ · {province} · {shipping===0 ? 'ارسال رایگان' : `ارسال ${formatPrice(shippingBase)}`}</span>
          <span>تاریخ: ۲۸ تیر ۱۴۰۴ · تحویل ۲-۳ روز کاری</span>
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-12 py-8 grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 space-y-4">
          <div className="hidden md:grid grid-cols-12 gap-4 text-[11px] font-black tracking-[0.15em] uppercase text-muted border-b border-border-paper pb-3">
            <span className="col-span-6">شرح کالا</span>
            <span className="col-span-2 text-center">تعداد (موجودی)</span>
            <span className="col-span-2 text-center">قیمت</span>
            <span className="col-span-2 text-center">حذف</span>
          </div>

          {items.map((item) => {
            const isMax = item.quantity >= item.product.stock;
            const lowStock = item.product.stock <= 3;
            return (
              <div key={`${item.product.id}-${item.size}-${item.color.name}`} className="grid grid-cols-12 gap-4 border border-border-paper rounded-[4px] bg-paper p-4 items-center">
                <div className="col-span-12 md:col-span-6 flex gap-4">
                  <Link to={`/product/${item.product.id}`} className="w-24 h-28 bg-[#DDD7C7] rounded-[4px] overflow-hidden border border-border-paper shrink-0">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover object-center" loading="lazy" decoding="async" />
                  </Link>
                  <div className="flex flex-col justify-between py-1 flex-1">
                    <div>
                      <Link to={`/product/${item.product.id}`} className="font-black text-[13.5px] leading-tight hover:text-accent transition focus:outline-none focus:ring-2 focus:ring-accent/20 rounded-[2px]">
                        {item.product.name}
                      </Link>
                      <div className="text-[11px] font-bold text-muted mt-1 flex flex-wrap gap-1.5">
                        <span className="border border-border-paper px-2 py-0.5 rounded-[4px]">سایز: {item.size}</span>
                        <span className="border border-border-paper px-2 py-0.5 rounded-[4px] flex items-center gap-1">
                          <span className="w-3 h-3 rounded-full border border-black/10 inline-block" style={{ background: item.color.hex }} />
                          {item.color.label}
                        </span>
                      </div>
                      {lowStock && <div className="mt-1.5 text-[10px] font-black text-accent">⚠ تنها {item.product.stock} عدد باقی مانده</div>}
                    </div>
                    <div className="text-[10px] font-bold tracking-wide text-muted">
                      کد: RN-۱۴۰۴-{item.product.id.padStart(4,'0')}
                    </div>
                  </div>
                </div>

                <div className="col-span-6 md:col-span-2 flex flex-col md:items-center gap-1">
                  <span className="md:hidden text-[11px] font-black tracking-wide text-muted">تعداد</span>
                  <div className="flex items-center border border-border-paper rounded-[4px] h-9 bg-[#EFE9DD]">
                    <button aria-label="کاهش" onClick={() => updateQuantity(item.product.id, item.size, item.color.name, item.quantity-1)} className="w-9 h-full font-black hover:bg-paper transition focus:outline-none focus:ring-1 focus:ring-inset focus:ring-ink/20">−</button>
                    <span className="w-10 text-center font-black text-[13px]">{item.quantity.toLocaleString('fa-IR')}</span>
                    <button aria-label="افزایش" disabled={isMax} onClick={() => updateQuantity(item.product.id, item.size, item.color.name, item.quantity+1)} className="w-9 h-full font-black hover:bg-paper transition disabled:opacity-30 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-ink/20">+</button>
                  </div>
                  <span className="text-[10px] text-muted font-bold">از {item.product.stock} موجود</span>
                </div>

                <div className="col-span-3 md:col-span-2 text-center">
                  <div className="font-black text-[13px]">{formatPrice(item.product.price * item.quantity)}</div>
                  <div className="text-[10px] text-muted font-bold">{formatPrice(item.product.price)} × {item.quantity.toLocaleString('fa-IR')}</div>
                </div>

                <div className="col-span-3 md:col-span-2 text-center">
                  <button
                    aria-label={`حذف ${item.product.name}`}
                    onClick={() => { if (confirm(`حذف ${item.product.name} از سبد؟`)) removeFromCart(item.product.id, item.size, item.color.name); }}
                    className="text-[11px] font-black tracking-widest border border-border-paper rounded-[4px] px-3 py-1.5 hover:bg-accent hover:text-white hover:border-accent transition focus:outline-none focus:ring-2 focus:ring-accent/30"
                  >
                    حذف
                  </button>
                </div>
              </div>
            );
          })}

          <div className="border border-border-paper rounded-[4px] p-4 bg-[#EFE9DD] space-y-3">
            <div className="flex items-center justify-between">
              <div className="font-black text-[12px] tracking-wide">کد تخفیف روزنامه:</div>
              <div className="text-[10px] font-bold text-muted">کد فعال: <span className="text-accent">RZN15 - ۱۵٪</span> و BAHAR04 - ۱۰٪</div>
            </div>
            <div className="flex gap-2">
              <input
                value={coupon}
                onChange={e => setCoupon(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && applyCoupon()}
                placeholder="کد را وارد کنید"
                className="flex-1 bg-paper border border-border-paper rounded-[4px] px-3 py-2 text-[12px] font-bold placeholder:text-muted/50 focus:outline-none focus:border-ink"
                aria-label="کد تخفیف"
              />
              {couponApplied ? (
                <Button variant="ghost" size="sm" onClick={clearCoupon}>حذف کد ×</Button>
              ) : (
                <Button variant="secondary" size="sm" onClick={applyCoupon}>اعمال کد</Button>
              )}
            </div>
            {couponError && <div className="text-[11px] font-bold text-accent">{couponError}</div>}
            {couponApplied && <div className="text-[11px] font-bold text-success">✓ کد {couponApplied.code} اعمال شد: {Math.round(couponApplied.discount*100)}٪ تخفیف</div>}
          </div>

          <div className="border border-border-paper rounded-[4px] p-4 bg-paper flex flex-col md:flex-row gap-3 items-start md:items-center">
            <div className="font-black text-[11px] tracking-[0.15em] uppercase">برآورد هزینه ارسال:</div>
            <div className="flex gap-2">
              <button onClick={() => setProvince('تهران')} className={`px-3 py-1.5 rounded-[4px] text-[12px] font-bold border transition ${province==='تهران' ? 'bg-charcoal text-paper border-charcoal' : 'bg-[#EFE9DD] border-border-paper'}`}>تهران: ۴۵,۰۰۰</button>
              <button onClick={() => setProvince('شهرستان')} className={`px-3 py-1.5 rounded-[4px] text-[12px] font-bold border transition ${province==='شهرستان' ? 'bg-charcoal text-paper border-charcoal' : 'bg-[#EFE9DD] border-border-paper'}`}>شهرستان: ۶۵,۰۰۰</button>
            </div>
            <span className="text-[11px] text-muted font-bold mr-auto">بالای ۱,۰۰۰,۰۰۰ تومان رایگان</span>
          </div>
        </div>

        <aside className="col-span-12 lg:col-span-4">
          <div className="border-[2px] border-charcoal rounded-[4px] bg-[#EFE9DD] p-5 sticky top-28">
            <h3 className="font-black text-[16px] tracking-tight flex items-center gap-2">
              خلاصه سفارش
              <span className="text-[10px] font-bold bg-charcoal text-paper px-2 py-0.5 rounded-[4px]">فاکتور #۲۵۸۴۲</span>
            </h3>
            <Rule className="my-4" />

            <div className="space-y-3 text-[13px] font-bold">
              <div className="flex justify-between"><span className="text-muted">جمع کل ({count.toLocaleString('fa-IR')} مورد)</span><span>{formatPrice(total)}</span></div>
              <div className="flex justify-between"><span className="text-muted">هزینه ارسال ({province})</span><span className={shipping===0 ? 'text-success' : ''}>{shipping===0 ? 'رایگان' : formatPrice(shipping)}</span></div>
              {volumeDiscount>0 && <div className="flex justify-between text-success"><span>تخفیف حجمی (۱۰٪ بالای ۲م)</span><span>-{formatPrice(volumeDiscount)}</span></div>}
              {couponDiscount>0 && <div className="flex justify-between text-success"><span>کوپن {couponApplied?.code}</span><span>-{formatPrice(couponDiscount)}</span></div>}
              <Rule />
              <div className="flex justify-between text-[16px] font-black"><span>مبلغ نهایی</span><span className="text-accent">{formatPrice(finalTotal)}</span></div>
              <div className="text-[11px] font-medium text-muted leading-5 border border-border-paper rounded-[4px] bg-paper p-3">
                با تکمیل خرید، قوانین روزنامه و بازگشت ۷ روزه را می‌پذیرید. ارسال پست سفارشی · کد رهگیری پیامک می‌شود.
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Link to="/checkout" state={{ province, shipping }} className="block"><Button fullWidth size="lg" variant="primary">ادامه فرآیند خرید →</Button></Link>
              <Link to="/shop" className="block"><Button fullWidth variant="ghost">بازگشت به فروشگاه</Button></Link>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2 text-[10px] font-bold text-center">
              <div className="border border-border-paper rounded-[4px] p-2 bg-paper"><div className="text-[16px]">✓</div>ضمانت اصالت</div>
              <div className="border border-border-paper rounded-[4px] p-2 bg-paper"><div className="text-[16px]">↩</div>۷ روز بازگشت</div>
              <div className="border border-border-paper rounded-[4px] p-2 bg-paper"><div className="text-[16px]">✦</div>پرداخت امن</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CartPage;

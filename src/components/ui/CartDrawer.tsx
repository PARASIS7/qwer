import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../data/products';
import Button from './Button';
import Rule from './Rule';

const CartDrawer: React.FC = () => {
  const { items, count, total, updateQuantity, removeFromCart, isDrawerOpen, closeDrawer } = useCart();

  if (!isDrawerOpen) return null;

  const shipping = total > 1000000 ? 0 : 65000;
  const finalTotal = total + shipping;

  return (
    <div className="fixed inset-0 z-[80] flex" dir="rtl">
      <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm" onClick={closeDrawer} aria-hidden="true" />
      <div className="relative mr-auto w-full max-w-[420px] bg-paper h-full flex flex-col shadow-[-8px_0_24px_rgba(0,0,0,0.2)] border-l-2 border-charcoal">
        {/* Header */}
        <div className="p-5 border-b border-border-paper flex items-center justify-between bg-[#EFE9DD]">
          <div>
            <h2 className="font-black text-[18px] tracking-tight flex items-center gap-2">
              سبد خرید
              <span className="bg-charcoal text-paper text-[11px] px-2 py-0.5 rounded-[4px]">{count.toLocaleString('fa-IR')} مورد</span>
            </h2>
            <div className="text-[11px] text-muted font-bold mt-1">پیش‌نمایش سبد · ارسال ۲۴ ساعته تهران</div>
          </div>
          <button
            onClick={closeDrawer}
            aria-label="بستن سبد"
            className="w-9 h-9 border border-border-paper rounded-[4px] bg-paper flex items-center justify-center font-black hover:bg-charcoal hover:text-paper transition"
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-[11px] tracking-[0.3em] font-black text-muted uppercase">Empty</div>
              <h3 className="font-black text-[16px] mt-2">سبد خالی است</h3>
              <p className="text-[12px] text-muted mt-2 leading-5">هنوز محصولی اضافه نکرده‌اید.</p>
              <Link to="/shop" onClick={closeDrawer} className="inline-block mt-4"><Button size="sm">رفتن به فروشگاه →</Button></Link>
            </div>
          ) : (
            items.map(item => (
              <div key={`${item.product.id}-${item.size}-${item.color.name}`} className="flex gap-3 border border-border-paper rounded-[4px] p-3 bg-paper">
                <Link to={`/product/${item.product.id}`} onClick={closeDrawer} className="w-20 h-24 bg-[#DDD7C7] rounded-[4px] overflow-hidden border border-border-paper shrink-0">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover object-center" loading="lazy" />
                </Link>
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <Link to={`/product/${item.product.id}`} onClick={closeDrawer} className="font-black text-[13px] leading-tight line-clamp-2 hover:text-accent">
                      {item.product.name}
                    </Link>
                    <div className="flex gap-1.5 mt-1">
                      <span className="text-[10px] font-bold border border-border-paper px-1.5 py-0.5 rounded-[4px]">{item.size}</span>
                      <span className="text-[10px] font-bold border border-border-paper px-1.5 py-0.5 rounded-[4px] flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: item.color.hex }} />
                        {item.color.label}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-border-paper rounded-[4px] h-7 bg-[#EFE9DD]">
                      <button aria-label="کاهش" onClick={() => updateQuantity(item.product.id, item.size, item.color.name, item.quantity-1)} className="w-7 h-full font-black text-[12px]">−</button>
                      <span className="w-7 text-center font-black text-[11px]">{item.quantity.toLocaleString('fa-IR')}</span>
                      <button aria-label="افزایش" disabled={item.quantity >= item.product.stock} onClick={() => updateQuantity(item.product.id, item.size, item.color.name, item.quantity+1)} className="w-7 h-full font-black text-[12px] disabled:opacity-30">+</button>
                    </div>
                    <span className="font-black text-[12px]">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                </div>
                <button aria-label="حذف" onClick={() => removeFromCart(item.product.id, item.size, item.color.name)} className="self-start w-6 h-6 border border-border-paper rounded-[4px] flex items-center justify-center text-[10px] hover:bg-accent hover:text-white hover:border-accent">
                  ×
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer summary */}
        {items.length > 0 && (
          <div className="border-t-2 border-charcoal bg-[#EFE9DD] p-5 space-y-4">
            <div className="space-y-2 text-[12px] font-bold">
              <div className="flex justify-between"><span className="text-muted">جمع کل</span><span>{formatPrice(total)}</span></div>
              <div className="flex justify-between"><span className="text-muted">ارسال</span><span className={shipping===0 ? 'text-success' : ''}>{shipping===0 ? 'رایگان' : formatPrice(shipping)}</span></div>
              <Rule />
              <div className="flex justify-between text-[15px] font-black"><span>قابل پرداخت</span><span className="text-accent">{formatPrice(finalTotal)}</span></div>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Link to="/cart" onClick={closeDrawer} className="block"><Button fullWidth size="lg">مشاهده سبد خرید →</Button></Link>
              <div className="grid grid-cols-2 gap-2">
                <Link to="/shop" onClick={closeDrawer} className="block"><Button fullWidth variant="paper" size="sm">ادامه خرید</Button></Link>
                <Link to="/checkout" onClick={closeDrawer} className="block"><Button fullWidth variant="secondary" size="sm">تسویه حساب</Button></Link>
              </div>
            </div>
            <div className="text-[10px] text-muted font-medium text-center">✓ اصالت · ↩ ۷ روز بازگشت · ✦ پرداخت امن</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;

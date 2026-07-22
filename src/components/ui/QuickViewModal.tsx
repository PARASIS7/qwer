import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product, formatPrice } from '../../data/products';
import Button from './Button';
import Rule from './Rule';
import { useCart } from '../../context/CartContext';

interface Props {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const QuickViewModal: React.FC<Props> = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('L');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || 'L');
      setSelectedColor(product.colors[0]);
      setQty(1);
      setAdded(false);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const outOfStock = product.status === 'ناموجود' || product.stock <= 0;

  const handleAdd = () => {
    if (outOfStock || !selectedColor) return;
    addToCart(product, selectedSize, selectedColor, qty);
    setAdded(true);
    setTimeout(() => {
      onClose();
      setAdded(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" dir="rtl">
      <div className="absolute inset-0 bg-charcoal/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="relative bg-paper border-2 border-charcoal rounded-[4px] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-[8px_8px_0_#1F1D1B] animate-[fadeIn_0.2s_ease-out]">
        <div className="sticky top-0 bg-paper border-b border-border-paper p-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <span className="bg-accent text-white px-2 py-1 text-[10px] font-black tracking-[0.2em] rounded-[4px]">QUICK VIEW</span>
            <span className="text-[11px] font-bold text-muted">نمایش سریع محصول</span>
          </div>
          <button
            onClick={onClose}
            aria-label="بستن"
            className="w-8 h-8 border border-border-paper rounded-[4px] flex items-center justify-center font-black hover:bg-charcoal hover:text-paper transition"
          >
            ×
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          <div className="aspect-[3/4] bg-[#DDD7C7] rounded-[4px] overflow-hidden border border-border-paper">
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover object-center" decoding="async" />
          </div>

          <div className="space-y-5">
            <div>
              <div className="text-[11px] tracking-[0.15em] font-black text-muted uppercase">{product.category} · شماره {product.id}</div>
              <h2 className="font-black text-[22px] leading-[1.1] tracking-tight mt-1">{product.name}</h2>
              <p className="text-[12px] text-muted mt-2 leading-6">{product.description}</p>
            </div>

            <div className="flex items-baseline gap-3 border-y border-border-paper py-3">
              <span className="font-black text-[22px]">{formatPrice(product.price)}</span>
              <span className="text-[11px] font-bold text-success bg-success/10 border border-success/20 px-2 py-0.5 rounded-[4px]">{product.stock} موجود</span>
            </div>

            <div>
              <h4 className="font-black text-[11px] tracking-[0.15em] uppercase mb-2">سایز: {selectedSize}</h4>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map(s => (
                  <button
                    key={s}
                    aria-pressed={selectedSize===s}
                    onClick={() => setSelectedSize(s)}
                    className={`h-10 rounded-[4px] border text-[13px] font-black transition ${selectedSize===s ? 'bg-charcoal text-paper border-charcoal' : 'bg-paper border-border-paper hover:border-ink'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-black text-[11px] tracking-[0.15em] uppercase mb-2">رنگ: {selectedColor?.label}</h4>
              <div className="flex gap-2">
                {product.colors.map(c => (
                  <button
                    key={c.name}
                    aria-label={`رنگ ${c.label}`}
                    onClick={() => setSelectedColor(c)}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition ${selectedColor?.name===c.name ? 'border-ink scale-110' : 'border-border-paper hover:border-muted'}`}
                  >
                    <span className="w-7 h-7 rounded-full border border-black/10 block" style={{ background: c.hex }} />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-black text-[11px] uppercase">تعداد</span>
              <div className="flex items-center border border-border-paper rounded-[4px] h-10 bg-[#EFE9DD]">
                <button onClick={() => setQty(Math.max(1, qty-1))} className="w-10 h-full font-black">−</button>
                <span className="w-10 text-center font-black text-[13px]">{qty.toLocaleString('fa-IR')}</span>
                <button onClick={() => setQty(Math.min(product.stock, qty+1))} className="w-10 h-full font-black">+</button>
              </div>
            </div>

            <div className="space-y-2">
              <Button fullWidth size="lg" disabled={outOfStock} onClick={handleAdd} className={`${added ? '!bg-success !border-success' : ''}`}>
                {outOfStock ? 'ناموجود' : added ? '✓ افزوده شد' : 'افزودن به سبد خرید'}
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Link to={`/product/${product.id}`} onClick={onClose} className="block">
                  <Button fullWidth variant="ghost" size="sm">مشاهده کامل</Button>
                </Link>
                <Link to="/shop" onClick={onClose} className="block">
                  <Button fullWidth variant="paper" size="sm">ادامه خرید →</Button>
                </Link>
              </div>
              <div className="text-[10px] text-muted font-medium text-center mt-1">✓ ضمانت اصالت · ↩ ۷ روز بازگشت · ✦ پرداخت امن</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;

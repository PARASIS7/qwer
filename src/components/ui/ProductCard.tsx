import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product, formatPrice } from '../../data/products';
import QuickViewModal from './QuickViewModal';

interface Props {
  product: Product;
  hideDiscountBadge?: boolean;
}

const ProductCard: React.FC<Props> = ({ product, hideDiscountBadge = false }) => {
  const [hovered, setHovered] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [thumbStart, setThumbStart] = useState(0);
  const outOfStock = product.status === 'ناموجود' || product.stock <= 0;
  const rating = 4.5 + (parseInt(product.id) % 5) * 0.1;

  const visibleThumbs = 3;
  const canSlideLeft = thumbStart + visibleThumbs < product.images.length;
  const canSlideRight = thumbStart > 0;
  const thumbsToShow = product.images.slice(thumbStart, thumbStart + visibleThumbs);

  return (
    <>
      <div 
        className="group relative bg-white border border-gray-100 rounded-[16px] overflow-hidden flex flex-col w-full hover:border-gray-200 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-500"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image with improved hover - not simple fade, slide + scale */}
        <Link to={`/product/${product.id}`} className="relative block w-full aspect-[3/4] overflow-hidden bg-[#F8F5EE] shrink-0">
          <img
            src={product.images[activeImg]}
            alt={product.name}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-[600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${hovered ? 'scale-[1.06] -translate-y-[1%]' : 'scale-100 translate-y-0'}`}
            loading="lazy"
            decoding="async"
          />
          
          {/* Second image on hover with different effect */}
          {hovered && (
            <img
              src={product.images[(activeImg + 1) % product.images.length]}
              alt={`${product.name} hover`}
              className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"
              loading="lazy"
              decoding="async"
            />
          )}

          {!hideDiscountBadge && product.discount && !outOfStock && (
            <span className="absolute top-3 right-3 bg-[#953026] text-white text-[11px] font-black px-3 py-1 rounded-full shadow-[0_2px_8px_rgba(149,48,38,0.3)] z-10">
              ٪{product.discount}
            </span>
          )}

          {outOfStock && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] flex items-center justify-center z-20">
              <span className="bg-black text-white px-4 py-2 text-[11px] font-black rounded-full shadow-lg">ناموجود</span>
            </div>
          )}

          {/* Hover: thumbnails strip below image + popup button */}
          <div className={`absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 p-2.5 transition-all duration-500 ${hovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'} hidden md:block z-20`}>
            {/* Thumbnails row with slide */}
            <div className="flex items-center gap-2 mb-2.5">
              <button
                disabled={!canSlideLeft}
                onClick={(e) => { e.preventDefault(); if (canSlideLeft) setThumbStart(s => s + 1); }}
                className={`w-6 h-6 rounded-full bg-white border flex items-center justify-center text-[10px] shrink-0 shadow-sm transition ${canSlideLeft ? 'border-gray-300 hover:bg-black hover:text-white' : 'border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50'}`}
              >
                ‹
              </button>
              <div className="flex-1 flex gap-1.5 justify-center overflow-hidden">
                {thumbsToShow.map((img, idx) => {
                  const realIdx = thumbStart + idx;
                  return (
                    <button
                      key={realIdx}
                      onClick={(e) => { e.preventDefault(); setActiveImg(realIdx); }}
                      className={`w-10 h-12 rounded-[8px] overflow-hidden border-2 shrink-0 transition-all ${activeImg === realIdx ? 'border-black scale-105 shadow-md' : 'border-gray-200 hover:border-gray-400'}`}
                    >
                      <img src={img} alt={`thumb ${realIdx}`} className="w-full h-full object-cover" />
                    </button>
                  );
                })}
              </div>
              <button
                disabled={!canSlideRight}
                onClick={(e) => { e.preventDefault(); if (canSlideRight) setThumbStart(s => Math.max(0, s - 1)); }}
                className={`w-6 h-6 rounded-full bg-white border flex items-center justify-center text-[10px] shrink-0 shadow-sm transition ${canSlideRight ? 'border-gray-300 hover:bg-black hover:text-white' : 'border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50'}`}
              >
                ›
              </button>
            </div>
            {/* Popup size/color selection button - no arrow per request, orange-brown bg */}
            <button
              onClick={(e) => { e.preventDefault(); if (!outOfStock) setShowQuickView(true); }}
              disabled={outOfStock}
              className="w-full bg-[#953026] text-white rounded-full py-2.5 text-[12px] font-black hover:bg-[#7A251E] hover:shadow-[0_4px_12px_rgba(149,48,38,0.3)] transition-all duration-300 shadow-sm disabled:opacity-40 flex items-center justify-center"
            >
              انتخاب سایز و رنگ
            </button>
          </div>
        </Link>

        {/* Info minimal */}
        <div className="p-4 flex flex-col flex-1 gap-2">
          <Link to={`/product/${product.id}`} className="flex-1">
            <h3 className="font-medium text-[14px] leading-[1.4] tracking-tight text-black line-clamp-2 min-h-[40px] group-hover:text-gray-700 transition-colors">
              {product.name}
            </h3>
          </Link>
          
          <div className="flex items-center gap-1 mt-1">
            <span className="text-black text-[11px]">★</span>
            <span className="font-bold text-[12px]">{rating.toFixed(1)}</span>
          </div>

          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-black text-[16px] tracking-tight text-[#953026]">{formatPrice(product.price)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-[11px] text-gray-400 line-through font-medium">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>

        {/* Mobile quick view */}
        <div className="md:hidden px-3 pb-3">
          <button
            onClick={() => setShowQuickView(true)}
            disabled={outOfStock}
            className="w-full bg-[#953026] text-white rounded-full py-2.5 text-[11px] font-bold disabled:opacity-30"
          >
            انتخاب گزینه‌ها
          </button>
        </div>
      </div>

      <QuickViewModal product={product} isOpen={showQuickView} onClose={() => setShowQuickView(false)} />
    </>
  );
};

export default ProductCard;

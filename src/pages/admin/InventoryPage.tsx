import React from 'react';
import { products } from '../../data/products';

const InventoryPage: React.FC = () => {
  return (
    <div className="space-y-6" dir="rtl">
      <h1 className="font-black text-[22px]">انبار · Inventory</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-[20px] p-5 shadow-sm">
          <div className="text-[11px] font-black text-gray-500 uppercase">کل موجودی</div>
          <div className="font-black text-[28px] mt-2">{products.reduce((s,p)=>s+p.stock,0).toLocaleString('fa-IR')} عدد</div>
          <div className="text-[11px] text-amber-600 font-bold mt-1">۳ محصول در آستانه اتمام</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-[20px] p-5">
          <div className="text-[11px] font-black text-red-600 uppercase">هشدار کمبود</div>
          <div className="font-black text-[20px] mt-2">۲ محصول</div>
          <div className="text-[11px] text-gray-600 mt-1">بمبر مشکی (۴) · جین (۶)</div>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-[20px] p-5">
          <div className="text-[11px] font-black text-emerald-700 uppercase">ارزش انبار</div>
          <div className="font-black text-[18px] mt-2">۱۲۴,۵۰۰,۰۰۰ تومان</div>
        </div>
        <div className="bg-black text-white rounded-[20px] p-5">
          <div className="text-[11px] font-black text-white/60 uppercase">سفارش تامین</div>
          <div className="font-black text-[14px] mt-2">۲۱ تیر · پارچه پنبه‌ای ۵۰۰ متر</div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-[20px] overflow-hidden shadow-sm">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-black text-[14px]">وضعیت انبار بر اساس سایز L تا 3XL</h3>
          <span className="text-[11px] bg-black text-white px-3 py-1 rounded-full">۸ محصول بالا‌تنه</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead className="bg-gray-50 text-gray-500 text-[11px] font-black uppercase">
              <tr><th className="p-4 text-right">محصول</th><th className="p-4">L</th><th className="p-4">XL</th><th className="p-4">2XL</th><th className="p-4">3XL</th><th className="p-4">وضعیت</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="p-4 font-bold flex items-center gap-2"><img src={p.images[0]} alt={p.name} className="w-8 h-10 object-cover rounded-[8px] border" />{p.name.slice(0,20)}</td>
                  <td className="p-4">{Math.floor(p.stock/4)}</td>
                  <td className="p-4">{Math.floor(p.stock/3)}</td>
                  <td className="p-4">{Math.floor(p.stock/3)}</td>
                  <td className="p-4">{Math.floor(p.stock/4)}</td>
                  <td className="p-4"><span className={`px-2 py-1 rounded-full text-[11px] font-black ${p.stock < 5 ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>{p.stock < 5 ? 'کم' : 'موجود'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;

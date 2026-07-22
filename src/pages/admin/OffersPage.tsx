import React, { useState } from 'react';

const OffersPage: React.FC = () => {
  const [offers, setOffers] = useState([
    { id: 1, code: 'RZN15', discount: '۱۵٪', uses: 342, status: 'فعال', expires: '۱۴۰۴/۰۵/۱۵' },
    { id: 2, code: 'BAHAR04', discount: '۱۰٪', uses: 128, status: 'فعال', expires: '۱۴۰۴/۰۴/۳۰' },
    { id: 3, code: 'WELCOME', discount: '۲۰٪', uses: 89, status: 'غیرفعال', expires: '۱۴۰۴/۰۳/۱۵' },
  ]);

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <h1 className="font-black text-[22px]">آفرها · Offers</h1>
        <button className="bg-black text-white px-5 py-2.5 rounded-full text-[13px] font-black">+ آفر جدید</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {offers.map(o => (
          <div key={o.id} className="bg-white border border-gray-200 rounded-[20px] p-5 shadow-sm">
            <div className="flex justify-between items-start">
              <div className="bg-black text-white font-mono font-black px-3 py-1 rounded-full text-[13px]">{o.code}</div>
              <span className={`text-[11px] font-black px-2.5 py-1 rounded-full border ${o.status==='فعال' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>{o.status}</span>
            </div>
            <div className="font-black text-[28px] mt-4">{o.discount}</div>
            <div className="text-[12px] text-gray-500 font-bold mt-1">{o.uses} بار استفاده شده · انقضا {o.expires}</div>
            <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-black rounded-full" style={{ width: `${(o.uses/400)*100}%` }} /></div>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-[16px] p-4 text-[12px] font-bold text-amber-800">
        💡 پیشنهاد: کد RZN15 بیشترین استفاده را دارد — آن را در هدر شاپ به صورت بنر نازک نمایش بده (قبلاً اضافه شد).
      </div>
    </div>
  );
};

export default OffersPage;

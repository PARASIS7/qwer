import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'فروردین', فروش: 42, مرجوعی: 3 },
  { name: 'اردیبهشت', فروش: 58, مرجوعی: 5 },
  { name: 'خرداد', فروش: 84, مرجوعی: 7 },
  { name: 'تیر', فروش: 112, مرجوعی: 8 },
];

const SalesPage: React.FC = () => {
  return (
    <div className="space-y-6" dir="rtl">
      <h1 className="font-black text-[22px]">فروش · Sales</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border border-gray-200 rounded-[20px] p-6">
          <div className="text-[11px] font-black text-gray-500 uppercase">فروش کل ماه</div>
          <div className="font-black text-[28px] mt-2">۲۱۲ سفارش</div>
          <div className="text-[12px] text-emerald-600 font-bold mt-1">↗ ۲۴٪ نسبت به خرداد</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-[20px] p-6">
          <div className="text-[11px] font-black text-gray-500 uppercase">میانگین روزانه</div>
          <div className="font-black text-[28px] mt-2">۷.۳ سفارش</div>
        </div>
        <div className="bg-black text-white rounded-[20px] p-6">
          <div className="text-[11px] font-black text-white/60 uppercase">نرخ مرجوعی</div>
          <div className="font-black text-[28px] mt-2">۲.۱٪</div>
          <div className="text-[11px] text-white/70 mt-1">پایین‌تر از میانگین صنعت ۳.۵٪</div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-[20px] p-6 shadow-sm">
        <h3 className="font-black text-[16px]">روند فروش ۴ ماه اخیر</h3>
        <div className="h-[280px] mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid stroke="#F3F4F6" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700 }} />
              <YAxis hide />
              <Tooltip contentStyle={{ borderRadius: 12, fontFamily: 'Vazirmatn' }} />
              <Area type="monotone" dataKey="فروش" stroke="#000" fill="#000" fillOpacity={0.08} strokeWidth={2.5} />
              <Area type="monotone" dataKey="مرجوعی" stroke="#EF4444" fill="#FEE2E2" strokeWidth={1.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SalesPage;

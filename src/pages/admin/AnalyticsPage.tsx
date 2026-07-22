import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const data = [
  { name: 'شنبه', بازدید: 1200, فروش: 420 },
  { name: 'یکشنبه', بازدید: 1900, فروش: 620 },
  { name: 'دوشنبه', بازدید: 1500, فروش: 510 },
  { name: 'سه‌شنبه', بازدید: 2200, فروش: 780 },
  { name: 'چهارشنبه', بازدید: 1800, فروش: 650 },
  { name: 'پنجشنبه', بازدید: 2400, فروش: 920 },
  { name: 'جمعه', بازدید: 2100, فروش: 840 },
];

const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6" dir="rtl">
      <h1 className="font-black text-[22px]">آنالیتیکس · Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border border-gray-200 rounded-[20px] p-6 shadow-sm">
          <div className="text-[12px] font-bold text-gray-500">بازدید کل · این هفته</div>
          <div className="font-black text-[28px] mt-2">۱۲,۸۰۰</div>
          <div className="text-[11px] text-emerald-600 font-black mt-1">↗ ۱۸٪ نسبت به هفته قبل</div>
          <div className="h-[80px] mt-4"><ResponsiveContainer width="100%" height="100%"><AreaChart data={data}><Area type="monotone" dataKey="بازدید" stroke="#10B981" fill="#A7F3D0" /></AreaChart></ResponsiveContainer></div>
        </div>
        <div className="bg-white border border-gray-200 rounded-[20px] p-6 shadow-sm">
          <div className="text-[12px] font-bold text-gray-500">نرخ تبدیل</div>
          <div className="font-black text-[28px] mt-2">۴.۸٪</div>
          <div className="text-[11px] text-emerald-600 font-black mt-1">↗ ۰.۶٪</div>
          <div className="h-[80px] mt-4"><ResponsiveContainer width="100%" height="100%"><BarChart data={data}><Bar dataKey="فروش" fill="#000" radius={[6,6,0,0]} /></BarChart></ResponsiveContainer></div>
        </div>
        <div className="bg-black text-white rounded-[20px] p-6 shadow-sm">
          <div className="text-[12px] font-bold text-white/60">میانگین سبد خرید</div>
          <div className="font-black text-[28px] mt-2">۱,۲۴۰,۰۰۰ تومان</div>
          <div className="text-[11px] text-white/70 mt-1">۴۲٪ مشتریان باندل می‌خرند</div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-[20px] p-6 shadow-sm">
        <h3 className="font-black text-[16px]">ترافیک ورودی · بر اساس منبع</h3>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { s: 'اینستاگرام', p: '۴۲٪', c: 'bg-pink-500' },
            { s: 'جستجوی مستقیم', p: '۲۸٪', c: 'bg-black' },
            { s: 'گوگل', p: '۱۸٪', c: 'bg-blue-500' },
            { s: 'تلگرام', p: '۱۲٪', c: 'bg-sky-400' },
          ].map(i => (
            <div key={i.s} className="border border-gray-100 rounded-[16px] p-4 bg-gray-50">
              <div className="flex items-center gap-2"><span className={`w-3 h-3 rounded-full ${i.c}`} /><span className="font-bold text-[13px]">{i.s}</span></div>
              <div className="font-black text-[20px] mt-2">{i.p}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;

import React, { useState } from 'react';
import { salesAnalyticData, mockCustomers } from '../../data/mockAdmin';
import { products, formatPrice } from '../../data/products';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Sparkline: React.FC<{ data: number[]; color: string }> = ({ data, color }) => {
  const chartData = data.map((v, i) => ({ v }));
  return (
    <div className="h-[36px] w-[80px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const kpis = [
  { title: 'درآمد امروز', sub: 'Today Revenue', value: '۱۲,۴۵۰,۰۰۰', valueEn: '$82,650', change: '+۱۲٪', up: true, icon: '◍', color: '#10B981', spark: [4,7,3,8,5,9,6,10], bg: 'bg-emerald-50', iconBg: 'bg-emerald-100', textColor: 'text-emerald-700' },
  { title: 'درآمد ماه', sub: 'Monthly Revenue', value: '۳۴۲,۰۰۰,۰۰۰', valueEn: '$234k', change: '+۸٪', up: true, icon: '◫', color: '#3B82F6', spark: [2,4,6,3,7,5,8,6], bg: 'bg-blue-50', iconBg: 'bg-blue-100', textColor: 'text-blue-700' },
  { title: 'سفارشات جدید', sub: 'New Orders', value: '۴۲', valueEn: '1645', change: '+۱۱٪', up: true, icon: '☰', color: '#F59E0B', spark: [3,5,2,6,4,7,3,8], bg: 'bg-amber-50', iconBg: 'bg-amber-100', textColor: 'text-amber-700' },
  { title: 'در انتظار', sub: 'Pending Orders', value: '۱۲', valueEn: '12', change: '-۳٪', up: false, icon: '◷', color: '#EF4444', spark: [8,6,7,4,5,3,4,2], bg: 'bg-red-50', iconBg: 'bg-red-100', textColor: 'text-red-700' },
  { title: 'کاربران جدید', sub: 'New Users', value: '۱۲۸', valueEn: '128', change: '+۲۳٪', up: true, icon: '◍', color: '#8B5CF6', spark: [1,3,2,5,3,6,4,8], bg: 'bg-violet-50', iconBg: 'bg-violet-100', textColor: 'text-violet-700' },
  { title: 'نرخ تبدیل', sub: 'Conversion Rate', value: '۴.۲٪', valueEn: '4.2%', change: '+۰.۸٪', up: true, icon: '▅', color: '#06B6D4', spark: [2,3,4,3.5,4,4.2,3.8,4.2], bg: 'bg-cyan-50', iconBg: 'bg-cyan-100', textColor: 'text-cyan-700' },
];

const DashboardPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('ماه');
  const [compare, setCompare] = useState(false);

  return (
    <div className="space-y-6" dir="rtl">
      {/* KPI 6 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {kpis.map(k => (
          <div key={k.title} className="bg-white border border-gray-200 rounded-[20px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 group">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-[12px] ${k.iconBg} border flex items-center justify-center text-[16px] ${k.textColor} shadow-sm`}>{k.icon}</div>
                <div>
                  <div className="font-black text-[13px] tracking-tight">{k.title}</div>
                  <div className="text-[10px] text-gray-400 font-bold mt-0.5">{k.sub}</div>
                </div>
              </div>
              <span className={`text-[11px] font-black px-2.5 py-1 rounded-full border ${k.up ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                {k.up ? '↗' : '↘'} {k.change}
              </span>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <div className="font-black text-[28px] leading-none tracking-tight">{k.value}</div>
                <div className="text-[11px] text-gray-400 font-bold mt-2">{k.valueEn} · {k.sub}</div>
              </div>
              <Sparkline data={k.spark} color={k.color} />
            </div>
            <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${60 + Math.random()*30}%`, background: k.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* Sales Analytic Pro */}
      <div className="bg-white border border-gray-200 rounded-[20px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="font-black text-[18px] tracking-tight flex items-center gap-2">
              تحلیل فروش · Sales Analytic
              <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-black px-2 py-1 rounded-full">LIVE</span>
            </h3>
            <p className="text-[12px] text-gray-500 font-medium mt-1">نمای کلی درآمد، هزینه و سود با مقایسه دوره</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex bg-gray-50 border border-gray-200 rounded-full p-1">
              {['روز', 'هفته', 'ماه', 'سال'].map(r => (
                <button key={r} onClick={() => setTimeRange(r)} className={`px-4 py-1.5 rounded-full text-[12px] font-black transition ${timeRange===r ? 'bg-black text-white shadow-sm' : 'text-gray-500 hover:text-black'}`}>{r}</button>
              ))}
            </div>
            <label className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-1.5 text-[11px] font-bold cursor-pointer">
              <input type="checkbox" checked={compare} onChange={e=>setCompare(e.target.checked)} className="accent-black" />
              مقایسه با دوره قبل
            </label>
            <select className="bg-white border border-gray-200 rounded-full px-3 py-2 text-[12px] font-bold">
              <option>تیر ۱۴۰۴ · Jul 2023</option>
              <option>خرداد ۱۴۰۴</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { l: 'درآمد · Income', v: '۲۳,۲۶۲.۰۰', c: 'text-emerald-700', bg: 'bg-emerald-50', badge: '+۰.۰۵٪ ▲', badgeColor: 'bg-blue-50 text-blue-600' },
            { l: 'هزینه · Expenses', v: '۱۱,۱۳۵.۰۰', c: 'text-amber-700', bg: 'bg-amber-50', badge: '+۰.۰۵٪ ▲', badgeColor: 'bg-orange-50 text-orange-600' },
            { l: 'سود خالص · Balance', v: '۴۸,۱۳۵.۰۰', c: 'text-violet-700', bg: 'bg-violet-50', badge: '+۰.۰۵٪ ▲', badgeColor: 'bg-emerald-50 text-emerald-600' },
          ].map(item => (
            <div key={item.l} className={`${item.bg} border border-gray-200/50 rounded-[16px] p-4`}>
              <div className="text-[11px] font-black text-gray-500 tracking-wide uppercase">{item.l}</div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className={`font-black text-[20px] ${item.c}`}>{item.v}</span>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${item.badgeColor}`}>{item.badge}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesAnalyticData}>
              <defs>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#F3F4F6" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11, fontFamily: 'Vazirmatn', fontWeight: 700 }} />
              <YAxis hide />
              <Tooltip contentStyle={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: 16, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', fontFamily: 'Vazirmatn', fontSize: 12 }} cursor={{ stroke: '#E5E7EB', strokeDasharray: '4 4' }} />
              <Area type="monotone" dataKey="income" stroke="#10B981" fill="url(#incomeGrad)" strokeWidth={3} dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: '#10B981' }} />
              {compare && <Area type="monotone" dataKey="expenses" stroke="#F59E0B" fill="url(#expenseGrad)" strokeWidth={2} strokeDasharray="6 4" dot={false} />}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[11px] font-bold">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2"><span className="w-3 h-3 bg-emerald-400 rounded-full inline-block" /> درآمد اصلی</span>
            {compare && <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-amber-400 inline-block border-dashed border-t border-amber-400" /> دوره مقایسه</span>}
            <span className="flex items-center gap-2 text-gray-400"><span className="w-2 h-2 bg-gray-300 rounded-full animate-pulse" /> لایو آپدیت هر ۵ دقیقه</span>
          </div>
          <span className="text-gray-400">مقایسه: {compare ? 'فعال' : 'غیرفعال'} · بازه: {timeRange}</span>
        </div>
      </div>

      {/* Enriched product cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.slice(0,3).map(p => (
          <div key={p.id} className="bg-white border border-gray-200 rounded-[20px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex gap-4">
              <div className="w-20 h-24 bg-gray-50 rounded-[12px] overflow-hidden border border-gray-100">
                <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-black text-[13px] leading-tight truncate">{p.name}</div>
                <div className="text-[11px] text-gray-500 font-bold mt-1">L تا 3XL · {p.colors.length} رنگ</div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-black px-2 py-0.5 rounded-full">{p.stock} موجود</span>
                  <span className="bg-gray-900 text-white text-[10px] font-black px-2 py-0.5 rounded-full">{formatPrice(p.price)}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-[11px]">
              <div className="bg-gray-50 border border-gray-100 rounded-[12px] p-2.5 text-center">
                <div className="text-[10px] text-gray-400 font-bold">فروش</div>
                <div className="font-black text-[13px] mt-1">{(42 - parseInt(p.id)*3).toLocaleString('fa-IR')}</div>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-[12px] p-2.5 text-center">
                <div className="text-[10px] text-blue-600 font-bold">سود</div>
                <div className="font-black text-[13px] mt-1 text-blue-700">٪{(22+parseInt(p.id)*2).toLocaleString('fa-IR')}</div>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-[12px] p-2.5 text-center">
                <div className="text-[10px] text-amber-600 font-bold">عملکرد</div>
                <div className="font-black text-[13px] mt-1">A+</div>
              </div>
            </div>
            <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-black rounded-full" style={{ width: `${70 + parseInt(p.id)*5}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;

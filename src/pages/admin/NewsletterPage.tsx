import React from 'react';

const NewsletterPage: React.FC = () => {
  const subscribers = [
    { email: 'ali@example.com', date: '۱۴۰۴/۰۴/۲۸', status: 'فعال', source: 'پاپ‌آپ شگفت‌انگیز' },
    { email: 'sara@gmail.com', date: '۱۴۰۴/۰۴/۲۷', status: 'فعال', source: 'فوتر' },
    { email: 'mohammad@...', date: '۱۴۰۴/۰۴/۲۶', status: 'لغو شده', source: 'چک‌اوت' },
  ];

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <h1 className="font-black text-[22px]">خبرنامه · Newsletter</h1>
        <div className="flex gap-2">
          <span className="bg-black text-white px-4 py-2 rounded-full text-[12px] font-black">۳,۲۸۴ مشترک</span>
          <button className="bg-emerald-400 text-emerald-950 px-4 py-2 rounded-full text-[12px] font-black">+ کمپین جدید</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border border-gray-200 rounded-[20px] p-6">
          <div className="text-[11px] font-black text-gray-500 uppercase">نرخ باز شدن</div>
          <div className="font-black text-[28px] mt-2">۴۲.۳٪</div>
          <div className="text-[11px] text-emerald-600 font-bold mt-1">بالاتر از میانگین ۲۱٪</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-[20px] p-6">
          <div className="text-[11px] font-black text-gray-500 uppercase">کلیک</div>
          <div className="font-black text-[28px] mt-2">۱۸.۷٪</div>
        </div>
        <div className="bg-gradient-to-br from-violet-500 to-indigo-600 text-white rounded-[20px] p-6">
          <div className="text-[11px] font-black text-white/70 uppercase">آخرین کمپین</div>
          <div className="font-black text-[16px] mt-2">کالکشن تابستان ۱۴۰۴ · ۱۵٪ تخفیف</div>
          <div className="text-[11px] text-white/70 mt-1">ارسال شده به ۳,۲۸۴ نفر · دیروز</div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-[20px] overflow-hidden shadow-sm">
        <div className="p-5 border-b border-gray-100 flex justify-between">
          <h3 className="font-black text-[14px]">مشترکین اخیر</h3>
          <input placeholder="جستجوی ایمیل..." className="bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-[12px] w-64" />
        </div>
        <table className="w-full text-[13px]">
          <thead className="bg-gray-50 text-gray-500 text-[11px] font-black uppercase">
            <tr><th className="p-4 text-right">ایمیل</th><th className="p-4">تاریخ عضویت</th><th className="p-4">وضعیت</th><th className="p-4">منبع</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {subscribers.map((s,i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="p-4 font-bold" dir="ltr">{s.email}</td>
                <td className="p-4 text-gray-500">{s.date}</td>
                <td className="p-4"><span className={`px-2.5 py-1 rounded-full text-[11px] font-black border ${s.status==='فعال' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>{s.status}</span></td>
                <td className="p-4 text-[11px]">{s.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewsletterPage;

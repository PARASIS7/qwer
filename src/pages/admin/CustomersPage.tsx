import React from 'react';
import { mockCustomers } from '../../data/mockAdmin';
import { formatPrice } from '../../data/products';

const CustomersPage: React.FC = () => {
  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-black text-[22px] tracking-tight">مشتریان · Customer</h1>
          <p className="text-[12px] text-gray-500 font-bold mt-1">{mockCustomers.length} مشتری فعال · شامل شماره تماس · RTL فارسی</p>
        </div>
        <div className="flex gap-2">
          <input placeholder="جستجوی مشتری، ایمیل یا شماره..." className="bg-white border border-gray-200 rounded-[12px] px-4 py-2.5 text-[13px] font-medium w-[300px] focus:outline-none focus:border-emerald-300" />
          <button className="bg-emerald-400 text-emerald-950 px-5 py-2.5 rounded-[12px] text-[13px] font-black">+ افزودن مشتری</button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-[16px] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead className="bg-gray-50 text-gray-500 text-[11px] tracking-[0.1em] uppercase font-black">
              <tr>
                <th className="p-4 text-right">مشتری</th>
                <th className="p-4 text-right">ایمیل</th>
                <th className="p-4 text-right">شماره تماس</th>
                <th className="p-4 text-right">شهر</th>
                <th className="p-4 text-right">سفارشات</th>
                <th className="p-4 text-right">مجموع خرید</th>
                <th className="p-4 text-right">وضعیت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockCustomers.map(c => (
                <tr key={c.email} className="hover:bg-emerald-50/40 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center font-black text-[12px] text-emerald-700">
                        {c.name.charAt(0)}
                      </div>
                      <span className="font-black text-[13px]">{c.name}</span>
                    </div>
                  </td>
                  <td className="p-4 font-medium text-gray-600 text-[12px]" dir="ltr">{c.email}</td>
                  <td className="p-4">
                    <span className="font-black text-[12px] bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full" dir="ltr">{c.phone}</span>
                  </td>
                  <td className="p-4 font-bold text-[12px]">{c.city}</td>
                  <td className="p-4"><span className="font-black bg-gray-100 border border-gray-200 px-2.5 py-1 rounded-full text-[12px]">{c.orders.toLocaleString('fa-IR')}</span></td>
                  <td className="p-4 font-black text-[13px]">{formatPrice(c.total)}</td>
                  <td className="p-4"><span className="px-3 py-1 rounded-full text-[11px] font-black border bg-emerald-50 text-emerald-700 border-emerald-200">فعال ✓</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center text-[11px] font-bold text-gray-500">
          <span>نمایش {mockCustomers.length} مشتری با شماره تماس</span>
          <span>طراحی شبیه Pixel Commerce · فارسی و راستچین</span>
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;

import React from 'react';

const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl" dir="rtl">
      <h1 className="font-black text-[22px] tracking-tight">تنظیمات · Settings</h1>
      <p className="text-[12px] text-gray-500 font-bold">تمام تنظیمات نمایشی · فارسی راستچین</p>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-7 space-y-6">
          <div className="bg-white border border-gray-200 rounded-[16px] p-6 shadow-sm">
            <h3 className="font-black text-[14px]">اطلاعات فروشگاه</h3>
            <div className="mt-4 space-y-3">
              <div><label className="text-[11px] font-black">نام فروشگاه</label><input defaultValue="TpapaT · استودیو ۲۵" className="w-full border border-gray-200 rounded-[12px] px-3 py-2.5 text-[13px] bg-gray-50" /></div>
              <div><label className="text-[11px] font-black">توضیح کوتاه</label><input defaultValue="فروشگاه پوشاک مردانه مینیمال" className="w-full border border-gray-200 rounded-[12px] px-3 py-2.5 text-[13px] bg-gray-50" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-[11px] font-black">ایمیل پشتیبانی</label><input defaultValue="hello@tpapat.ir" className="w-full border border-gray-200 rounded-[12px] px-3 py-2.5 text-[13px] bg-gray-50" dir="ltr"/></div>
                <div><label className="text-[11px] font-black">شماره تماس</label><input defaultValue="۰۲۱-۶۶۹۵-۰۰۰۰" className="w-full border border-gray-200 rounded-[12px] px-3 py-2.5 text-[13px] bg-gray-50" /></div>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-[16px] p-6 shadow-sm">
            <h3 className="font-black text-[14px]">قوانین ارسال · L تا 3XL</h3>
            <div className="mt-4 space-y-3 text-[13px]">
              <label className="flex justify-between items-center bg-emerald-50 border border-emerald-200 rounded-[12px] p-3"><span className="font-bold">ارسال رایگان بالای ۱,۰۰۰,۰۰۰ تومان</span><input type="checkbox" defaultChecked className="accent-emerald-500" /></label>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-[11px] font-black">هزینه تهران</label><input defaultValue="۴۵,۰۰۰" className="w-full border border-gray-200 rounded-[12px] px-3 py-2 text-[13px]" /></div>
                <div><label className="text-[11px] font-black">هزینه شهرستان</label><input defaultValue="۶۵,۰۰۰" className="w-full border border-gray-200 rounded-[12px] px-3 py-2 text-[13px]" /></div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-5 space-y-6">
          <div className="bg-white border border-gray-200 rounded-[16px] p-6 shadow-sm">
            <h3 className="font-black text-[14px]">درگاه پرداخت</h3>
            <div className="mt-4 space-y-3">
              <label className="flex items-center gap-3 bg-gray-900 text-white rounded-[12px] p-3"><input type="radio" defaultChecked name="gateway"/><span className="font-black text-[12px]">زرین‌پال · فعال</span></label>
              <label className="flex items-center gap-3 border border-gray-200 rounded-[12px] p-3"><input type="radio" name="gateway"/><span className="font-bold text-[12px]">پرداخت در محل · تهران</span></label>
            </div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-[16px] p-5">
            <h4 className="font-black text-[13px] text-emerald-800">نسخه TpapaT v3</h4>
            <p className="text-[11px] leading-5 font-medium mt-2 text-emerald-700">پنل جدید با الهام از Pixel Commerce · فارسی و راستچین · شامل شماره تماس مشتریان</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

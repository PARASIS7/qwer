export const salesData = [
  { name: '۱ تیر', فروش: 4200000 },
  { name: '۳ تیر', فروش: 3800000 },
  { name: '۵ تیر', فروش: 5100000 },
  { name: '۷ تیر', فروش: 4700000 },
  { name: '۹ تیر', فروش: 6200000 },
  { name: '۱۱ تیر', فروش: 5800000 },
  { name: '۱۳ تیر', فروش: 7100000 },
  { name: '۱۵ تیر', فروش: 6500000 },
  { name: '۱۷ تیر', فروش: 8200000 },
  { name: '۱۹ تیر', فروش: 7900000 },
  { name: '۲۱ تیر', فروش: 9100000 },
  { name: '۲۳ تیر', فروش: 8700000 },
  { name: '۲۵ تیر', فروش: 10200000 },
  { name: '۲۷ تیر', فروش: 9800000 },
  { name: '۲۹ تیر', فروش: 11500000 },
];

export const bestSelling = [
  { name: 'تیشرت بیسیک مشکی', فروش: 42 },
  { name: 'هودی کلاسیک', فروش: 31 },
  { name: 'شلوار جین', فروش: 27 },
  { name: 'بمبر مشکی', فروش: 19 },
  { name: 'پولو سرمه‌ای', فروش: 16 },
];

export const mockOrders = [
  { id: '#۲۵۸۴۱', customer: 'آرش احمدی', date: '۱۴۰۴/۰۴/۲۸', amount: 1465000, status: 'تحویل داده شده' },
  { id: '#۲۵۸۴۰', customer: 'سارا رضایی', date: '۱۴۰۴/۰۴/۲۷', amount: 980000, status: 'ارسال شده' },
  { id: '#۲۵۸۳۹', customer: 'مهدی کریمی', date: '۱۴۰۴/۰۴/۲۷', amount: 2120000, status: 'در حال پردازش' },
  { id: '#۲۵۸۳۸', customer: 'نگار موسوی', date: '۱۴۰۴/۰۴/۲۶', amount: 590000, status: 'در حال پردازش' },
  { id: '#۲۵۸۳۷', customer: 'علی حسینی', date: '۱۴۰۴/۰۴/۲۵', amount: 1890000, status: 'لغو شده' },
  { id: '#۲۵۸۳۶', customer: 'پریا جعفری', date: '۱۴۰۴/۰۴/۲۵', amount: 1250000, status: 'تحویل داده شده' },
  { id: '#۲۵۸۳۵', customer: 'کیان تهرانی', date: '۱۴۰۴/۰۴/۲۴', amount: 670000, status: 'ارسال شده' },
];

export const mockCustomers = [
  { name: 'آرش احمدی', email: 'arash.a@example.com', phone: '۰۹۱۲-۳۴۵-۶۷۸۹', orders: 8, total: 7450000, city: 'تهران' },
  { name: 'سارا رضایی', email: 'sara.r@example.com', phone: '۰۹۳۵-۱۲۳-۴۵۶۷', orders: 5, total: 4320000, city: 'اصفهان' },
  { name: 'مهدی کریمی', email: 'mehdi.k@example.com', phone: '۰۹۱۳-۹۸۷-۶۵۴۳', orders: 12, total: 11200000, city: 'تهران' },
  { name: 'نگار موسوی', email: 'negar.m@example.com', phone: '۰۹۰۲-۲۳۴-۵۶۷۸', orders: 3, total: 1890000, city: 'شیراز' },
  { name: 'علی حسینی', email: 'ali.h@example.com', phone: '۰۹۱۰-۱۱۱-۲۲۲۲', orders: 2, total: 2100000, city: 'مشهد' },
  { name: 'پریا جعفری', email: 'paria.j@example.com', phone: '۰۹۳۸-۷۷۷-۸۸۸۸', orders: 6, total: 5600000, city: 'تبریز' },
  { name: 'کیان تهرانی', email: 'kian.t@example.com', phone: '۰۹۱۲-۰۰۰-۱۱۱۱', orders: 4, total: 3200000, city: 'تهران' },
];

export const statusColor: Record<string, string> = {
  'در حال پردازش': 'bg-amber-50 text-amber-700 border-amber-200',
  'ارسال شده': 'bg-blue-50 text-blue-700 border-blue-200',
  'تحویل داده شده': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'لغو شده': 'bg-red-50 text-red-700 border-red-200',
};

// For new Pixel Commerce style chart
export const salesAnalyticData = [
  { name: '۲۲', income: 12000, expenses: 4000 },
  { name: '۲۳', income: 28000, expenses: 8000 },
  { name: '۲۴', income: 8000, expenses: 12000 },
  { name: '۲۵', income: 15000, expenses: 18000 },
  { name: '۲۶', income: 35000, expenses: 15000 },
  { name: '۲۷', income: 20000, expenses: 10000 },
  { name: '۲۸', income: 12000, expenses: 8000 },
  { name: '۲۹', income: 32000, expenses: 12000 },
];

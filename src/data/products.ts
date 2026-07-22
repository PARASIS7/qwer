export type Size = 'L' | 'XL' | '2XL' | '3XL';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'تیشرت' | 'پیراهن' | 'هودی';
  images: string[];
  colorImages?: Record<string, string[]>;
  sizes: Size[];
  colors: { name: string; hex: string; label: string }[];
  description: string;
  longDescription: string;
  stock: number;
  status: 'موجود' | 'ناموجود';
  tagline?: string;
  featured?: boolean;
  isAmazing?: boolean;
  discount?: number;
}

const BASE = import.meta.env.BASE_URL;

export const products: Product[] = [
  {
    id: '1',
    name: 'تیشرت یقه گرد بیسیک مشکی',
    price: 485000,
    originalPrice: 620000,
    category: 'تیشرت',
    images: [
      `${BASE}images/product-1-black.webp`,
      `${BASE}images/product-1-white.webp`,
      `${BASE}images/product-1-gray.webp`,
      `${BASE}images/product-1-black.webp`,
    ],
    colorImages: {
      black: [`${BASE}images/product-1-black.webp`],
      white: [`${BASE}images/product-1-white.webp`],
      gray: [`${BASE}images/product-1-gray.webp`],
    },
    sizes: ['L', 'XL', '2XL', '3XL'],
    colors: [
      { name: 'black', hex: '#111111', label: 'مشکی' },
      { name: 'white', hex: '#f5f5f5', label: 'سفید' },
      { name: 'gray', hex: '#9ca3af', label: 'طوسی' },
    ],
    description: 'تیشرت بیسیک اورسایز با پنبه ارگانیک ۱۸۰ گرم.',
    longDescription: 'پنبه سوپیما با تراکم بالا.',
    stock: 24,
    status: 'موجود',
    tagline: 'بیسیک ضروری',
    featured: true,
    isAmazing: true,
    discount: 22,
  },
  {
    id: '2',
    name: 'تیشرت اورسایز طرح‌دار سفید',
    price: 590000,
    originalPrice: 750000,
    category: 'تیشرت',
    images: [
      `${BASE}images/product-2-white.webp`,
      `${BASE}images/product-2-cream.webp`,
      `${BASE}images/product-2-white.webp`,
      `${BASE}images/product-2-cream.webp`,
    ],
    colorImages: {
      white: [`${BASE}images/product-2-white.webp`],
      cream: [`${BASE}images/product-2-cream.webp`],
    },
    sizes: ['L', 'XL', '2XL', '3XL'],
    colors: [
      { name: 'white', hex: '#f5f5f5', label: 'سفید' },
      { name: 'cream', hex: '#F6F1E6', label: 'کرم' },
    ],
    description: 'تیشرت اورسایز با چاپ هنری اختصاصی TpapaT.',
    longDescription: 'طرح چاپی برگرفته از پوسترهای چاپ سنگی.',
    stock: 12,
    status: 'موجود',
    tagline: 'چاپ اختصاصی',
    featured: true,
    isAmazing: true,
    discount: 21,
  },
  {
    id: '3',
    name: 'هودی مشکی کلاسیک',
    price: 980000,
    originalPrice: 1250000,
    category: 'هودی',
    images: [
      `${BASE}images/product-3-black.webp`,
      `${BASE}images/product-3-charcoal.webp`,
      `${BASE}images/product-3-black.webp`,
      `${BASE}images/product-3-charcoal.webp`,
    ],
    colorImages: {
      black: [`${BASE}images/product-3-black.webp`],
      charcoal: [`${BASE}images/product-3-charcoal.webp`],
    },
    sizes: ['L', 'XL', '2XL', '3XL'],
    colors: [
      { name: 'black', hex: '#111111', label: 'مشکی' },
      { name: 'charcoal', hex: '#3A3A40', label: 'زغالی' },
    ],
    description: 'هودی کلاسیک با داخل کرکی ۳۸۰ گرم.',
    longDescription: 'جیب کانگورویی عمیق.',
    stock: 8,
    status: 'موجود',
    tagline: 'پرفروش هفته',
    featured: true,
    discount: 22,
  },
  {
    id: '4',
    name: 'هودی طوسی با پرینت مینیمال',
    price: 1050000,
    category: 'هودی',
    images: [
      `${BASE}images/product-4-gray.webp`,
      `${BASE}images/product-4-beige.webp`,
      `${BASE}images/product-4-gray.webp`,
      `${BASE}images/product-4-beige.webp`,
    ],
    colorImages: {
      gray: [`${BASE}images/product-4-gray.webp`],
      beige: [`${BASE}images/product-4-beige.webp`],
    },
    sizes: ['L', 'XL', '2XL', '3XL'],
    colors: [
      { name: 'gray', hex: '#9ca3af', label: 'طوسی' },
      { name: 'beige', hex: '#C9C2B0', label: 'بژ' },
    ],
    description: 'هودی طوسی با پرینت تایپوگرافی.',
    longDescription: 'پرینت پشت صفحه اول روزنامه TpapaT.',
    stock: 15,
    status: 'موجود',
    tagline: 'ادیتوریال',
  },
  {
    id: '5',
    name: 'تیشرت پولو سرمه‌ای',
    price: 670000,
    originalPrice: 850000,
    category: 'پیراهن',
    images: [
      `${BASE}images/product-5-navy.webp`,
      `${BASE}images/product-5-white.webp`,
      `${BASE}images/product-1-black.webp`,
      `${BASE}images/product-5-navy.webp`,
    ],
    colorImages: {
      navy: [`${BASE}images/product-5-navy.webp`],
      white: [`${BASE}images/product-5-white.webp`],
      black: [`${BASE}images/product-1-black.webp`],
    },
    sizes: ['L', 'XL', '2XL', '3XL'],
    colors: [
      { name: 'navy', hex: '#1e293b', label: 'سرمه‌ای' },
      { name: 'white', hex: '#f5f5f5', label: 'سفید' },
      { name: 'black', hex: '#111', label: 'مشکی' },
    ],
    description: 'پولوشرت کلاسیک با یقه ریب.',
    longDescription: 'بازتفسیر پولوشرت کلاسیک.',
    stock: 18,
    status: 'موجود',
    tagline: 'کلاسیک',
    isAmazing: true,
    discount: 21,
  },
  {
    id: '6',
    name: 'کاپشن بمبر مشکی',
    price: 1890000,
    category: 'هودی',
    images: [
      `${BASE}images/product-6-black.webp`,
      `${BASE}images/product-6-olive.webp`,
      `${BASE}images/product-6-black.webp`,
      `${BASE}images/product-6-olive.webp`,
    ],
    colorImages: {
      black: [`${BASE}images/product-6-black.webp`],
      olive: [`${BASE}images/product-6-olive.webp`],
    },
    sizes: ['L', 'XL', '2XL', '3XL'],
    colors: [
      { name: 'black', hex: '#111', label: 'مشکی' },
      { name: 'olive', hex: '#556b2f', label: 'زیتونی' },
    ],
    description: 'بمبر کلاسیک با آستر نارنجی.',
    longDescription: 'الهام از جکت‌های MA-1.',
    stock: 4,
    status: 'موجود',
    tagline: 'نسخه محدود',
    featured: true,
  },
  {
    id: '7',
    name: 'پیراهن آکسفورد سفید',
    price: 890000,
    originalPrice: 1120000,
    category: 'پیراهن',
    images: [
      `${BASE}images/product-7-white.webp`,
      `${BASE}images/product-7-blue.webp`,
      `${BASE}images/product-7-cream.webp`,
      `${BASE}images/product-7-white.webp`,
    ],
    colorImages: {
      white: [`${BASE}images/product-7-white.webp`],
      blue: [`${BASE}images/product-7-blue.webp`],
      cream: [`${BASE}images/product-7-cream.webp`],
    },
    sizes: ['L', 'XL', '2XL', '3XL'],
    colors: [
      { name: 'white', hex: '#ffffff', label: 'سفید' },
      { name: 'blue', hex: '#93c5fd', label: 'آبی روشن' },
      { name: 'cream', hex: '#F6F1E6', label: 'کرم' },
    ],
    description: 'پیراهن آکسفورد کلاسیک با دوخت ژاپنی.',
    longDescription: 'پارچه آکسفورد ۱۰۰٪ پنبه.',
    stock: 16,
    status: 'موجود',
    tagline: 'آکسفورد کلاسیک',
    featured: true,
    isAmazing: true,
    discount: 20,
  },
  {
    id: '8',
    name: 'تیشرت لانگ اسلیو طوسی',
    price: 620000,
    originalPrice: 790000,
    category: 'تیشرت',
    images: [
      `${BASE}images/product-8-gray.webp`,
      `${BASE}images/product-8-black.webp`,
      `${BASE}images/product-8-beige.webp`,
      `${BASE}images/product-8-gray.webp`,
    ],
    colorImages: {
      gray: [`${BASE}images/product-8-gray.webp`],
      black: [`${BASE}images/product-8-black.webp`],
      beige: [`${BASE}images/product-8-beige.webp`],
    },
    sizes: ['L', 'XL', '2XL', '3XL'],
    colors: [
      { name: 'gray', hex: '#9ca3af', label: 'طوسی' },
      { name: 'black', hex: '#111', label: 'مشکی' },
      { name: 'beige', hex: '#D6C7B8', label: 'بژ' },
    ],
    description: 'لانگ اسلیو مینیمال با آستین رگلان.',
    longDescription: 'برای لایه‌بندی پاییزی.',
    stock: 20,
    status: 'موجود',
    tagline: 'لانگ اسلیو',
    isAmazing: true,
    discount: 22,
  },
];

export const categories = ['همه', 'تیشرت', 'پیراهن', 'هودی'] as const;
export const sizes: Size[] = ['L', 'XL', '2XL', '3XL'];

export const formatPrice = (price: number): string => {
  return price.toLocaleString('fa-IR') + ' تومان';
};

export const getProductImage = (product: Product, index = 0) => product.images[index] || product.images[0];
export const getDiscountedProducts = () => products.filter(p => p.isAmazing);

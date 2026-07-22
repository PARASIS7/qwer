import React, { useState } from 'react';
import { products as initialProducts, formatPrice, Product } from '../../data/products';

const ProductsPage: React.FC = () => {
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({ name: '', price: '', category: 'تیشرت' as Product['category'], stock: '', description: '', image: '' });

  const openAdd = () => {
    setEditingProduct(null);
    setForm({ name: '', price: '', category: 'تیشرت', stock: '', description: '', image: '' });
    setShowModal(true);
  };

  const openEdit = (p: Product) => {
    setEditingProduct(p);
    setForm({
      name: p.name,
      price: p.price.toString(),
      category: p.category,
      stock: p.stock.toString(),
      description: p.description,
      image: p.images[0] || '',
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('حذف این محصول؟')) {
      setProductList(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleSave = () => {
    if (!form.name.trim()) { alert('نام الزامی است'); return; }
    const priceNum = parseInt(form.price.replace(/\D/g,'')) || 0;
    const stockNum = parseInt(form.stock.replace(/\D/g,'')) || 0;

    const imageUrl = form.image.trim() || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop';
    if (editingProduct) {
      setProductList(prev => prev.map(p => p.id === editingProduct.id ? {
        ...p,
        name: form.name,
        price: priceNum,
        category: form.category,
        stock: stockNum,
        description: form.description || p.description,
        images: [imageUrl, ...p.images.slice(1)],
        status: stockNum > 0 ? 'موجود' : 'ناموجود' as const,
      } : p));
    } else {
      const newProduct: Product = {
        id: (productList.length + 1).toString(),
        name: form.name,
        price: priceNum || 500000,
        category: form.category,
        images: [imageUrl],
        sizes: ['L', 'XL', '2XL', '3XL'],
        colors: [{ name: 'black', hex: '#111', label: 'مشکی' }],
        description: form.description || 'توضیحات محصول جدید',
        longDescription: form.description || 'توضیحات',
        stock: stockNum,
        status: stockNum > 0 ? 'موجود' : 'ناموجود',
      };
      setProductList(prev => [newProduct, ...prev]);
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-black text-[22px] tracking-tight">محصولات · Products</h1>
          <p className="text-[12px] text-gray-500 font-bold mt-1">{productList.length} محصول · {productList.filter(p=>p.status==='موجود').length} موجود</p>
        </div>
        <button onClick={openAdd} className="bg-emerald-400 text-emerald-950 px-5 py-2.5 rounded-[12px] text-[13px] font-black shadow-sm hover:bg-emerald-500 transition">+ افزودن محصول جدید</button>
      </div>

      <div className="bg-white border border-gray-200 rounded-[16px] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead className="bg-gray-50 text-gray-500 text-[11px] tracking-[0.1em] uppercase font-black">
              <tr>
                <th className="p-4 text-right">تصویر</th>
                <th className="p-4 text-right">نام</th>
                <th className="p-4 text-right">دسته</th>
                <th className="p-4 text-right">قیمت</th>
                <th className="p-4 text-right">موجودی</th>
                <th className="p-4 text-right">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {productList.map(p => (
                <tr key={p.id} className="hover:bg-emerald-50/30 transition">
                  <td className="p-3"><img src={p.images[0]} alt={p.name} className="w-12 h-14 object-cover rounded-[12px] border border-gray-200" loading="lazy" /></td>
                  <td className="p-3"><div className="font-black leading-tight">{p.name}</div><div className="text-[11px] text-gray-500">RN-{p.id.padStart(4,'0')}</div></td>
                  <td className="p-3"><span className="bg-gray-50 border border-gray-200 rounded-full px-3 py-1 text-[11px] font-bold">{p.category}</span></td>
                  <td className="p-3 font-black">{formatPrice(p.price)}</td>
                  <td className="p-3"><span className={`px-3 py-1 rounded-full text-[11px] font-black border ${p.status==='موجود' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>{p.stock} · {p.status}</span></td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(p)} className="px-4 py-2 bg-gray-900 text-white rounded-full text-[11px] font-bold hover:bg-black">ویرایش</button>
                      <button onClick={() => handleDelete(p.id)} className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-full text-[11px] font-bold hover:bg-red-50">حذف</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="bg-white border border-gray-200 rounded-[16px] w-full max-w-lg p-6 shadow-xl max-h-[90vh] overflow-y-auto" onClick={e=>e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-[18px]">{editingProduct ? `ویرایش محصول` : 'افزودن محصول'}</h3>
              <button onClick={()=>setShowModal(false)} className="w-8 h-8 bg-gray-100 rounded-full">×</button>
            </div>
            <div className="space-y-3">
              <div><label className="text-[11px] font-black">نام *</label><input value={form.name} onChange={e=>setForm({ ...form, name: e.target.value })} className="w-full border border-gray-200 rounded-[12px] px-3 py-2.5 text-[13px] bg-gray-50" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-[11px] font-black">قیمت</label><input value={form.price} onChange={e=>setForm({ ...form, price: e.target.value })} className="w-full border border-gray-200 rounded-[12px] px-3 py-2.5 text-[13px] bg-gray-50" /></div>
                <div><label className="text-[11px] font-black">موجودی</label><input value={form.stock} onChange={e=>setForm({ ...form, stock: e.target.value })} className="w-full border border-gray-200 rounded-[12px] px-3 py-2.5 text-[13px] bg-gray-50" /></div>
              </div>
              <div><label className="text-[11px] font-black">دسته (فقط بالا‌تنه)</label><select value={form.category} onChange={e=>setForm({ ...form, category: e.target.value as any })} className="w-full border border-gray-200 rounded-[12px] px-3 py-2.5 text-[13px] bg-gray-50"><option>تیشرت</option><option>پیراهن</option><option>هودی</option></select></div>
              <div><label className="text-[11px] font-black">لینک عکس اصلی * (قابل ادیت شد)</label><input value={form.image} onChange={e=>setForm({ ...form, image: e.target.value })} placeholder="https://..." className="w-full border border-gray-200 rounded-[12px] px-3 py-2.5 text-[12px] bg-gray-50" dir="ltr" />
                {form.image && (
                  <div className="mt-2 w-full h-32 bg-gray-50 rounded-[12px] overflow-hidden border border-gray-200">
                    <img src={form.image} alt="preview" className="w-full h-full object-cover" onError={(e)=>{(e.target as HTMLImageElement).style.display='none'}} />
                  </div>
                )}
              </div>
              <div><label className="text-[11px] font-black">توضیحات</label><textarea value={form.description} onChange={e=>setForm({ ...form, description: e.target.value })} rows={3} className="w-full border border-gray-200 rounded-[12px] px-3 py-2.5 text-[13px] bg-gray-50" /></div>
            </div>
            <div className="mt-6 flex gap-2">
              <button onClick={handleSave} className="flex-1 bg-emerald-400 text-emerald-950 py-3 rounded-full font-black text-[13px]">{editingProduct ? 'ذخیره' : 'افزودن'}</button>
              <button onClick={()=>setShowModal(false)} className="flex-1 bg-gray-100 py-3 rounded-full font-bold text-[13px]">لغو</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;

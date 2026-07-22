import React, { useState, useMemo } from 'react';
import { mockOrders, statusColor } from '../../data/mockAdmin';
import { products, formatPrice } from '../../data/products';

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('همه');
  const [selectedOrder, setSelectedOrder] = useState<(typeof mockOrders)[0] | null>(null);

  const filtered = useMemo(() => {
    return orders.filter(o => {
      const matchSearch = search ? (o.customer.includes(search) || o.id.includes(search)) : true;
      const matchStatus = filterStatus === 'همه' ? true : o.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [orders, search, filterStatus]);

  const updateStatus = (id: string, newStatus: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h1 className="font-black text-[22px] tracking-tight">سفارشات · Orders</h1>
          <p className="text-[12px] text-gray-500 font-bold mt-1">{filtered.length} سفارش · مشاهده و ویرایش وضعیت فعال</p>
        </div>
        <div className="flex gap-2">
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="bg-white border border-gray-200 rounded-[12px] px-4 py-2.5 text-[12px] font-bold">
            <option>همه</option>
            <option>در حال پردازش</option>
            <option>ارسال شده</option>
            <option>تحویل داده شده</option>
            <option>لغو شده</option>
          </select>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="جستجو مشتری..." className="bg-white border border-gray-200 rounded-[12px] px-4 py-2.5 text-[12px] w-64" />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-[16px] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead className="bg-gray-50 text-gray-500 text-[11px] tracking-[0.1em] uppercase font-black">
              <tr>
                <th className="p-4 text-right">شماره</th>
                <th className="p-4 text-right">مشتری</th>
                <th className="p-4 text-right">تاریخ</th>
                <th className="p-4 text-right">مبلغ</th>
                <th className="p-4 text-right">وضعیت</th>
                <th className="p-4 text-right">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(o => (
                <tr key={o.id} className="hover:bg-gray-50 transition">
                  <td className="p-4 font-black">{o.id}</td>
                  <td className="p-4 font-bold">{o.customer}</td>
                  <td className="p-4 text-gray-500 font-bold">{o.date}</td>
                  <td className="p-4 font-black">{formatPrice(o.amount)}</td>
                  <td className="p-4"><span className={`px-3 py-1 rounded-full text-[11px] font-black border ${statusColor[o.status]}`}>{o.status}</span></td>
                  <td className="p-4">
                    <button onClick={() => setSelectedOrder(o)} className="px-4 py-2 bg-gray-900 text-white rounded-full text-[11px] font-bold hover:bg-black">مشاهده</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { k: 'در حال پردازش', v: orders.filter(o=>o.status==='در حال پردازش').length, c: 'bg-amber-50 text-amber-800 border-amber-200' },
          { k: 'ارسال شده', v: orders.filter(o=>o.status==='ارسال شده').length, c: 'bg-blue-50 text-blue-800 border-blue-200' },
          { k: 'تحویل شده', v: orders.filter(o=>o.status==='تحویل داده شده').length, c: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
          { k: 'لغو شده', v: orders.filter(o=>o.status==='لغو شده').length, c: 'bg-red-50 text-red-800 border-red-200' },
        ].map(s => (
          <div key={s.k} className={`border rounded-[16px] p-4 flex justify-between items-center ${s.c}`}>
            <span className="text-[12px] font-black">{s.k}</span><span className="font-black text-[20px]">{s.v.toLocaleString('fa-IR')}</span>
          </div>
        ))}
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedOrder(null)}>
          <div className="bg-white border border-gray-200 rounded-[16px] w-full max-w-lg p-6 shadow-xl max-h-[90vh] overflow-y-auto" onClick={e=>e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-[18px]">سفارش {selectedOrder.id}</h3>
              <button onClick={()=>setSelectedOrder(null)} className="w-8 h-8 bg-gray-100 rounded-full">×</button>
            </div>
            <div className="space-y-4 text-[13px]">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 border border-gray-200 rounded-[12px] p-3"><div className="text-[10px] text-gray-500 font-black uppercase">مشتری</div><div className="font-black mt-1">{selectedOrder.customer}</div></div>
                <div className="bg-gray-50 border border-gray-200 rounded-[12px] p-3"><div className="text-[10px] text-gray-500 font-black uppercase">مبلغ</div><div className="font-black mt-1">{formatPrice(selectedOrder.amount)}</div></div>
              </div>
              <div className="bg-white border border-gray-200 rounded-[12px] p-3">
                <div className="font-black text-[12px] mb-2">اقلام</div>
                {products.slice(0,2).map(p => (
                  <div key={p.id} className="flex gap-2 items-center border-b border-gray-100 pb-2 mb-2 last:border-0 last:mb-0 last:pb-0">
                    <img src={p.images[0]} alt={p.name} className="w-12 h-14 object-cover rounded-[10px] border" />
                    <div className="flex-1"><div className="font-bold text-[12px]">{p.name}</div><div className="text-[11px] text-gray-500">L · مشکی × ۱</div></div>
                    <div className="font-black text-[12px]">{formatPrice(p.price)}</div>
                  </div>
                ))}
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-[12px] p-3">
                <div className="font-black text-[11px] uppercase mb-2">تغییر وضعیت</div>
                <div className="grid grid-cols-2 gap-2">
                  {['در حال پردازش','ارسال شده','تحویل داده شده','لغو شده'].map(st => (
                    <button key={st} onClick={() => updateStatus(selectedOrder.id, st)} className={`px-3 py-2 rounded-full text-[11px] font-black border ${selectedOrder.status===st ? 'bg-gray-900 text-white border-gray-900' : 'bg-white border-gray-200'}`}>{st}</button>
                  ))}
                </div>
              </div>
              <button onClick={()=>setSelectedOrder(null)} className="w-full bg-gray-900 text-white py-3 rounded-full font-black text-[13px]">بستن</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;

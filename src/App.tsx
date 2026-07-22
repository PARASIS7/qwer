import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AboutPage from './pages/AboutPage';
import JournalPage from './pages/JournalPage';
import ContactPage from './pages/ContactPage';
import AdminLayout from './components/admin/AdminLayout';

// Lazy load admin (heavy Recharts) to split bundle
const DashboardPage = lazy(() => import('./pages/admin/DashboardPage'));
const ProductsPage = lazy(() => import('./pages/admin/ProductsPage'));
const OrdersPage = lazy(() => import('./pages/admin/OrdersPage'));
const CustomersPage = lazy(() => import('./pages/admin/CustomersPage'));
const SettingsPage = lazy(() => import('./pages/admin/SettingsPage'));
const AnalyticsPage = lazy(() => import('./pages/admin/AnalyticsPage'));
const OffersPage = lazy(() => import('./pages/admin/OffersPage'));
const InventoryPage = lazy(() => import('./pages/admin/InventoryPage'));
const SalesPage = lazy(() => import('./pages/admin/SalesPage'));
const NewsletterPage = lazy(() => import('./pages/admin/NewsletterPage'));

const CollectionsPage: React.FC = () => <ShopPage />;

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0,0);
  }, [pathname]);
  return null;
};

const LoadingFallback: React.FC = () => (
  <div className="min-h-[60vh] flex items-center justify-center bg-paper">
    <div className="border border-border-paper rounded-[4px] p-6 bg-[#EFE9DD] text-center">
      <div className="font-black text-[14px] tracking-[0.2em]">LOADING · در حال بارگذاری آرشیو</div>
      <div className="mt-3 w-32 h-1 bg-border-paper mx-auto overflow-hidden rounded-full">
        <div className="h-full bg-accent animate-pulse w-full" />
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Admin routes - lazy loaded - all active now with dummy data */}
          <Route path="/admin" element={<AdminLayout><DashboardPage /></AdminLayout>} />
          <Route path="/admin/products" element={<AdminLayout><ProductsPage /></AdminLayout>} />
          <Route path="/admin/orders" element={<AdminLayout><OrdersPage /></AdminLayout>} />
          <Route path="/admin/customers" element={<AdminLayout><CustomersPage /></AdminLayout>} />
          <Route path="/admin/analytics" element={<AdminLayout><AnalyticsPage /></AdminLayout>} />
          <Route path="/admin/offers" element={<AdminLayout><OffersPage /></AdminLayout>} />
          <Route path="/admin/inventory" element={<AdminLayout><InventoryPage /></AdminLayout>} />
          <Route path="/admin/sales" element={<AdminLayout><SalesPage /></AdminLayout>} />
          <Route path="/admin/newsletter" element={<AdminLayout><NewsletterPage /></AdminLayout>} />
          <Route path="/admin/settings" element={<AdminLayout><SettingsPage /></AdminLayout>} />

          {/* Store routes */}
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/shop" element={<Layout><ShopPage /></Layout>} />
          <Route path="/collections" element={<Layout><CollectionsPage /></Layout>} />
          <Route path="/product/:id" element={<Layout><ProductDetailPage /></Layout>} />
          <Route path="/cart" element={<Layout><CartPage /></Layout>} />
          <Route path="/checkout" element={<Layout><CheckoutPage /></Layout>} />
          <Route path="/about" element={<Layout><AboutPage /></Layout>} />
          <Route path="/journal" element={<Layout><JournalPage /></Layout>} />
          <Route path="/contact" element={<Layout><ContactPage /></Layout>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;

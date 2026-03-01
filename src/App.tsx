import { Toaster } from "@/components/ui/toaster";
import { Toaster as ToasterSonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import Wholesale from "./pages/Wholesale";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLayout from "./components/admin/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import ManageProducts from "./pages/admin/ManageProducts";
import ManageInquiries from "./pages/admin/ManageInquiries";
import AdminSettings from "./pages/admin/AdminSettings";
import ManageWholesale from "./pages/admin/ManageWholesale";
import ManageB2BContent from "./pages/admin/ManageB2BContent";
import ManageCategories from "./pages/admin/ManageCategories";
import ManageSEO from "./pages/admin/ManageSEO";
import ManageHomepage from "./pages/admin/ManageHomepage";
import ManageLogs from "./pages/admin/ManageLogs";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <ToasterSonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/wholesale" element={<Wholesale />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Admin Portal Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<ManageProducts />} />
              <Route path="wholesale" element={<ManageWholesale />} />
              <Route path="inquiries" element={<ManageInquiries />} />
              <Route path="categories" element={<ManageCategories />} />
              <Route path="seo" element={<ManageSEO />} />
              <Route path="editorial" element={<ManageHomepage />} />
              <Route path="logs" element={<ManageLogs />} />
              <Route path="b2b-content" element={<ManageB2BContent />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;

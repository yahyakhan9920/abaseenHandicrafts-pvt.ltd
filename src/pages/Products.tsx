import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHeader } from "@/components/Section";
import { Link, useSearchParams } from "react-router-dom";
import SEO from "@/components/SEO";
import { Truck, Package, Clock, ShieldCheck, Factory } from "lucide-react";
import winterImg from "@/assets/category-winter.jpg";
import embroideredImg from "@/assets/category-embroidered.jpg";
import pashminaImg from "@/assets/category-pashmina.jpg";
import customImg from "@/assets/category-custom.jpg";
import bulkImg from "@/assets/category-bulk.jpg";

import { useProducts, useCategories } from "@/hooks/use-store";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [activeCategory, setActiveCategory] = useState(categoryParam || "All");
  const { data: products = [] } = useProducts();
  const { data: categories = [] } = useCategories();

  // Sync state with URL params
  useEffect(() => {
    setActiveCategory(categoryParam || "All");
  }, [categoryParam]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    if (cat === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams);
  };

  const allCategories = [
    "All",
    ...categories
      .filter((c: any) => c.status === "Active")
      .map((c: any) => c.name)
  ];

  const filtered = activeCategory === "All"
    ? products
    : products.filter((p: any) => p.category === activeCategory);

  return (
    <>
      <SEO
        title="Premium B2B Product Catalog | Wholesale Shawls"
        description="Browse our high-capacity production catalog. Pure wool, pashmina, and embroidered shawls available for bulk wholesale and international export."
        keywords="wholesale shawl catalog, bulk pashmina supplier, embroidery shawl manufacturer, custom design shawls"
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={embroideredImg} alt="Abaseen Product Catalog" className="w-full h-full object-cover scale-110" />
          <div className="absolute inset-0 bg-charcoal/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/40 to-transparent" />
        </div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10 pt-20">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <span className="text-accent text-[10px] font-bold uppercase tracking-[0.5em] mb-4 block">International Inventory</span>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-cream mb-8">Product <span className="text-gradient-gold">Catalog</span></h1>
            <p className="text-cream/70 text-xl leading-relaxed max-w-xl">
              Precision-crafted textiles for global retail brands and wholesale distributors. Explore our export-grade collections.
            </p>
          </motion.div>
        </div>
      </section>

      <Section>
        {/* Filter Tabs - Luxury Styled */}
        <div className="flex flex-wrap gap-4 mb-16 justify-center">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-500 rounded-sm relative group ${activeCategory === cat
                ? "text-charcoal"
                : "text-muted-foreground hover:text-accent"
                }`}
            >
              <span className="relative z-10">{cat}</span>
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-accent rounded-sm shadow-luxury"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {activeCategory !== cat && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                layout
                key={p.sku}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group bg-white border border-secondary/30 rounded-sm overflow-hidden hover:shadow-luxury transition-all duration-700"
              >
                {/* Image Wrap */}
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover grayscale-[0.2] transition-transform duration-1000 group-hover:scale-110 group-hover:grayscale-0" />
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-charcoal to-transparent opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <div className="flex justify-between items-center text-cream">
                      <span className="text-[10px] font-bold uppercase tracking-widest">In Stock</span>
                      <span className="text-accent text-[10px] font-bold uppercase tracking-widest">{p.moq} MOQ</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[10px] tracking-widest uppercase text-accent font-bold mb-1 block">{p.category}</span>
                      <h3 className="font-heading text-xl font-bold text-charcoal">{p.name}</h3>
                    </div>
                    <span className="text-[10px] bg-charcoal text-cream px-2 py-1 rounded-sm">{p.sku}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-secondary/20 mb-8 text-[11px] text-muted-foreground uppercase tracking-widest font-bold">
                    <div className="flex items-center gap-2">
                      <Factory size={14} className="text-accent" />
                      <span>{p.capacity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-accent" />
                      <span>{p.leadTime}</span>
                    </div>
                  </div>

                  <Link
                    to="/contact"
                    className="flex items-center justify-center w-full py-4 bg-charcoal text-cream text-[10px] uppercase tracking-[0.3em] font-bold rounded-sm border border-charcoal hover:bg-transparent hover:text-charcoal transition-all duration-500 group/btn"
                  >
                    Request B2B Quote
                    <div className="ml-2 w-0 overflow-hidden group-hover/btn:w-4 transition-all duration-300">→</div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Section>

      {/* Bulk Customization CTA */}
      <Section className="bg-secondary/30 py-24">
        <div className="max-w-4xl mx-auto glass-premium p-12 text-center border border-accent/10">
          <h2 className="font-heading text-3xl font-bold mb-6">Need a Custom Design?</h2>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            As a direct manufacturer, we offer full private labeling and custom design services.
            Send us your patterns, and our master artisans will bring them to life using traditional handlooms or modern machinery.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-accent" size={20} />
              <span className="text-xs font-bold uppercase tracking-widest">Quality Guaranteed</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="text-accent" size={20} />
              <span className="text-xs font-bold uppercase tracking-widest">Private Labeling</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="text-accent" size={20} />
              <span className="text-xs font-bold uppercase tracking-widest">Worldwide Shipping</span>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Products;

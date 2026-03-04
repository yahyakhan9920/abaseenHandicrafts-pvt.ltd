import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/Section";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Package, Paintbrush, FileText, CreditCard, Truck, ShieldCheck, Download, Globe, BarChart3, Users, Factory, Award } from "lucide-react";
import bulkImg from "@/assets/category-bulk.jpg";
import { cn } from "@/lib/utils";
import { getWholesaleTiers } from "@/lib/mockStore";

import { useB2BStats } from "@/hooks/use-store";

const Wholesale = () => {
  const tiers = getWholesaleTiers();
  const { data: stats = [] } = useB2BStats();

  const activeStats = stats.filter((s: any) => s.active !== false);
  const gridCols = activeStats.length >= 4 ? "md:grid-cols-4" :
    activeStats.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2";

  return (
    <>
      <SEO
        title="B2B Wholesale & Global Export Partner Portal"
        description="Official B2B partner portal for Abaseen Handi Crafts. Access factory-direct wholesale pricing, private labeling services, and global export logistics."
        keywords="b2b shawl wholesale, export partner textile, private label shawl manufacturer, bulk export pakistan"
      />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={bulkImg} alt="Corporate Partnership" className="w-full h-full object-cover grayscale-[0.4]" />
          <div className="absolute inset-0 bg-charcoal/85" />
        </div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center pt-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="max-w-4xl mx-auto">
            <span className="text-accent text-[10px] font-bold uppercase tracking-[0.6em] mb-6 block">Strategic Partnership</span>
            <h1 className="font-heading text-5xl md:text-8xl font-bold text-cream mb-8">Corporate <span className="text-gradient-gold">Partner</span> Portal</h1>
            <p className="text-cream/60 text-xl leading-relaxed max-w-2xl mx-auto">
              Empowering global retailers and distributors with high-capacity manufacturing excellence and seamless export logistics.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust Stats */}
      <div className="bg-white border-b border-secondary/20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className={cn("grid grid-cols-2 gap-0 divide-x divide-secondary/20 border-x border-secondary/20", gridCols)}>
            {activeStats.map((stat: any, i: number) => (
              <div key={i} className="py-12 px-8 flex flex-col items-center text-center group hover:bg-secondary/5 transition-colors">
                {stat.id === "experience" && <Award className="text-accent mb-4 group-hover:scale-110 transition-transform" size={24} />}
                {stat.id === "export" && <Globe className="text-accent mb-4 group-hover:scale-110 transition-transform" size={24} />}
                {stat.id === "capacity" && <BarChart3 className="text-accent mb-4 group-hover:scale-110 transition-transform" size={24} />}
                {stat.id === "craftsmen" && <Users className="text-accent mb-4 group-hover:scale-110 transition-transform" size={24} />}
                {stat.id === "factory" && <Factory className="text-accent mb-4 group-hover:scale-110 transition-transform" size={24} />}
                {stat.id === "compliance" && <ShieldCheck className="text-accent mb-4 group-hover:scale-110 transition-transform" size={24} />}
                <p className="font-heading text-2xl font-bold text-charcoal">{stat.value}</p>
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tiered Wholesale Strategy */}
      <Section className="py-32">
        <SectionHeader
          subtitle="Partnership Tiers"
          title="Designed for Your Scale"
          description="We offer flexible engagement models tailored to boutique retailers and international distributors alike."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-10 border rounded-sm flex flex-col transition-all duration-700 ${tier.highlight
                ? "bg-charcoal border-accent shadow-luxury scale-105 z-10"
                : "bg-white border-secondary/30 hover:border-accent/40"
                }`}
            >
              <div className="mb-8">
                <h3 className={`font-heading text-2xl font-bold mb-2 ${tier.highlight ? "text-cream" : "text-charcoal"}`}>{tier.name}</h3>
                <p className="text-accent text-[10px] font-bold uppercase tracking-widest">{tier.moq} MOQ</p>
              </div>

              <div className={`text-4xl font-heading font-bold mb-8 ${tier.highlight ? "text-accent" : "text-charcoal"}`}>
                {tier.discount}
              </div>

              <div className="space-y-4 mb-12 flex-grow">
                {tier.features.map(feat => (
                  <div key={feat} className="flex items-center gap-3">
                    <ShieldCheck size={14} className="text-accent shrink-0" />
                    <span className={`text-[11px] font-bold uppercase tracking-widest ${tier.highlight ? "text-cream/60" : "text-muted-foreground"}`}>{feat}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/contact"
                className={`w-full py-4 text-center text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-500 rounded-sm ${tier.highlight
                  ? "bg-accent text-charcoal hover:bg-gold-light"
                  : "bg-charcoal text-cream hover:bg-accent hover:text-charcoal"
                  }`}
              >
                Apply for Partnership
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Logistics & Support */}
      <Section className="bg-secondary/30">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-accent text-xs font-bold uppercase tracking-[0.4em] mb-4 block">End-to-End Solutions</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-charcoal mb-8 leading-tight">Export Logistics <br /> Without Borders</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Our dedicated export department handles 100% of the documentation, customs clearance, and global shipping logistics.
              Whether it's Air Freight for boutique drops or Sea Cargo for container-sized orders, we ensure your inventory arrives safely and on time.
            </p>
            <ul className="space-y-4">
              {[
                { icon: FileText, text: "Automated Export Documentation" },
                { icon: Truck, text: "Real-time Supply Chain Tracking" },
                { icon: CreditCard, text: "Multiple International Payment Channels" },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-charcoal">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                    <item.icon size={14} className="text-accent" />
                  </div>
                  {item.text}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative lg:p-12"
          >
            <div className="glass-premium p-12 border border-accent/20 text-center relative z-10">
              <Download className="mx-auto text-accent mb-6" size={48} />
              <h3 className="font-heading text-2xl font-bold text-charcoal mb-4">Enterprise Catalog</h3>
              <p className="text-muted-foreground mb-8 text-sm uppercase tracking-widest font-bold">2026 Wholesale Edition (PDF, 45MB)</p>
              <Link
                to="/contact"
                className="inline-block px-12 py-5 bg-charcoal text-cream text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-accent hover:text-charcoal transition-all duration-500 rounded-sm"
              >
                Request Partner Access
              </Link>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 -z-0 rounded-full blur-[80px]" />
          </motion.div>
        </div>
      </Section>
    </>
  );
};

export default Wholesale;

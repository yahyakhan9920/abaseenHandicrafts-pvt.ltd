import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Section, SectionHeader } from "@/components/Section";
import {
  Factory, Package, Paintbrush, ShieldCheck, Truck, Globe,
  Scissors, Palette, CheckCircle, Box, ArrowRight, Star, Phone
} from "lucide-react";
import heroImg from "@/assets/hero-shawl.jpg";
import winterImg from "@/assets/category-winter.jpg";
import embroideredImg from "@/assets/category-embroidered.jpg";
import pashminaImg from "@/assets/category-pashmina.jpg";
import customImg from "@/assets/category-custom.jpg";
import bulkImg from "@/assets/category-bulk.jpg";
import factoryImg from "@/assets/factory.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

const strengths = [
  { icon: Factory, label: "Direct Manufacturer", desc: "Factory-direct pricing with no middlemen" },
  { icon: Package, label: "Bulk Orders Accepted", desc: "Flexible MOQ for wholesale partners" },
  { icon: Paintbrush, label: "Custom Branding", desc: "Private labeling & custom designs" },
  { icon: ShieldCheck, label: "Quality Control", desc: "Multi-stage inspection process" },
  { icon: Truck, label: "On-Time Delivery", desc: "Reliable production timelines" },
  { icon: Globe, label: "International Shipping", desc: "Export documentation support" },
];

const processSteps = [
  { icon: Factory, label: "Direct Manufacturer", desc: "Factory-Direct Pricing", img: factoryImg },
  { icon: Palette, label: "Designing & Embroidery", desc: "MOQ Requirements Met", img: embroideredImg },
  { icon: Scissors, label: "Sewing & Crafting", desc: "Luxurious & Durable Textiles", img: pashminaImg },
  { icon: CheckCircle, label: "Quality Control", desc: "Private Label / Branding Support", img: customImg },
  { icon: Box, label: "Packaging & Dispatch", desc: "Global Export Capability", img: bulkImg },
];

const testimonials = [];

import SEO from "@/components/SEO";
import { useB2BStats, useAddInquiry, useHomepageContent, useCategories } from "@/hooks/use-store";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const { data: stats = [] } = useB2BStats();
  const { data: homeContent } = useHomepageContent();
  const { data: categoriesData = [] } = useCategories();
  const { mutate: addInquiryMutation } = useAddInquiry();

  // Filter active categories for display
  const categories = categoriesData
    .filter((cat: any) => cat.status === "Active")
    .map((cat: any) => ({
      name: cat.name,
      img: cat.image || "https://images.unsplash.com/photo-1520903074185-8ec362b39c67?auto=format&fit=crop&q=80",
      description: `Premium ${cat.name} batch for global wholesale.`
    }));

  if (!homeContent) return null; // Or a luxury skeleton

  const hero = homeContent.hero[0];
  const about = homeContent.about;

  const exportStat = stats.find(s => s.id === "export")?.value || "15+";
  const capacityStat = stats.find(s => s.id === "capacity")?.value || "20k+";

  return (
    <>
      <SEO
        title="Premium Handcrafted Shawls | Wholesale Manufacturer & Exporter"
        description="Abaseen Handi Crafts (Pvt) Ltd: Global authority in luxury textiles. Premier wholesale manufacturer & exporter of premium handcrafted shawls to 15+ countries."
        keywords="luxury shawls, pashmina wholesale, embroidered shawls exporter, textile manufacturer pakistan, bulk shawls"
      />
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt={hero.title}
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/40 to-transparent" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-sm mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-accent text-[10px] uppercase tracking-[0.3em] font-bold">Trusted by Global Retailers & Wholesale Distributors</span>
            </motion.div>

            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-cream leading-[1.1] tracking-tight mb-8">
              {hero.title.includes('. ') ? (
                <>
                  {hero.title.split('. ')[0]}. <br />
                  <span className="text-gradient-gold">{hero.title.split('. ')[1]}</span>
                </>
              ) : (
                <span className="text-gradient-gold">{hero.title}</span>
              )}
            </h1>

            <p className="text-cream/70 text-lg md:text-xl leading-relaxed mb-10 max-w-xl font-body">
              {hero.subtitle}
            </p>

            <div className="flex flex-wrap gap-5 mb-16">
              <Link
                to="/wholesale"
                className="px-10 py-4 bg-accent text-accent-foreground font-bold tracking-widest uppercase text-xs rounded-sm hover:bg-gold-dark transition-all duration-300 hover:shadow-[0_10px_30px_rgba(200,155,60,0.4)] ripple"
              >
                {hero.ctaText}
              </Link>
              <Link
                to="/products"
                className="px-10 py-4 border border-cream/30 text-cream font-bold tracking-widest uppercase text-xs rounded-sm hover:bg-cream/10 transition-all duration-300"
              >
                Export Catalog
              </Link>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-10 max-w-xl">
              {[
                { label: "Years Experience", value: "20+" },
                { label: "Monthly Units", value: capacityStat },
                { label: "Export Countries", value: exportStat },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                >
                  <p className="text-3xl font-heading font-bold text-accent mb-1">{stat.value}</p>
                  <p className="text-[10px] uppercase tracking-widest text-cream/40 font-semibold">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-cream">Discover</span>
          <div className="w-px h-12 bg-cream" />
        </motion.div>
      </section>

      {/* About Section Upgrade */}
      <Section className="py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative z-10">
              <img
                src={about.image || factoryImg}
                alt="Abaseen high-capacity manufacturing facility"
                className="rounded-sm shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 w-full aspect-[4/5] object-cover"
              />
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-accent/5 -z-10" />
            </div>
            {/* Manufacturing Badge */}
            <div className="absolute top-10 -right-4 bg-charcoal p-8 shadow-luxury z-20 border border-accent/20">
              <Factory className="text-accent mb-4" size={32} />
              <p className="text-cream font-heading text-xl font-bold">Factory Direct</p>
              <p className="text-accent text-[10px] uppercase tracking-widest font-bold">Manufacturing Authority</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-accent text-xs font-bold uppercase tracking-[0.4em]">{about.subheading}</span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight">
                {about.heading.includes(' at ') ? (
                  <>
                    {about.heading.split(' at ')[0]} <br /> <span className="text-accent italic">{about.heading.split(' at ')[1]}</span>
                  </>
                ) : (
                  about.heading
                )}
              </h2>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed italic">
              "{about.quote}"
            </p>

            <p className="text-muted-foreground leading-relaxed">
              {about.description}
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
              {[
                { title: "Direct Factory", desc: "No Middlemen", icon: ShieldCheck },
                { title: "Private Label", desc: "Custom Branding", icon: Package },
                { title: "Export Grade", desc: "Strict Quality", icon: Globe },
              ].map((item) => (
                <div key={item.title} className="p-4 bg-secondary/50 border border-accent/10 rounded-sm">
                  <item.icon className="text-accent mb-3" size={20} />
                  <p className="text-xs font-bold uppercase tracking-wider mb-1">{item.title}</p>
                  <p className="text-[10px] text-muted-foreground uppercase">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-8 flex items-center gap-6">
              <Link
                to="/about"
                className="px-8 py-3 bg-charcoal text-white text-xs font-bold uppercase tracking-widest hover:bg-accent transition-colors"
              >
                Company Profile
              </Link>
              <div className="flex flex-col">
                <span className="font-heading text-lg font-bold">Zeb Abaseen</span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Managing Director</span>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Why Choose Us - Category Cards */}
      <Section className="bg-secondary/30 relative py-24">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        <SectionHeader
          subtitle="B2B Collections"
          title="Wholesale Category Focus"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-sm mb-6 relative shadow-lg">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-500" />

                {/* B2B Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-accent text-[8px] font-bold text-accent-foreground uppercase tracking-[0.2em] shadow-lg">
                    Bulk Only
                  </span>
                </div>

                {/* Hover Quick Action */}
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-charcoal to-transparent">
                  <p className="text-[10px] text-accent font-bold uppercase tracking-widest mb-1">Inquire Now</p>
                  <p className="text-cream text-xs font-medium">MOQ Starting from 50 Units</p>
                </div>
              </div>

              <div className="text-center group">
                <h3 className="font-heading text-lg font-bold text-foreground mb-4 transition-colors group-hover:text-accent">
                  {cat.name}
                </h3>
                <Link
                  to={`/products?category=${encodeURIComponent(cat.name)}`}
                  className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground hover:text-accent transition-all duration-300"
                >
                  Explore Batch <ArrowRight size={12} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Manufacturing Process Timeline */}
      <Section className="py-24 overflow-hidden">
        <SectionHeader
          subtitle="Production Pipeline"
          title="Mastering the Craft"
        />
        <div className="relative mt-20">
          {/* Timeline Line */}
          <div className="absolute top-[4.5rem] left-0 w-full h-px bg-border hidden lg:block" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 relative z-10">
            {[
              { label: "Fabric Sourcing", desc: "Sourcing premium wool & pashmina directly from heritage regions.", num: "01" },
              { label: "Artistic Design", desc: "Collaborating with master designers for unique pattern creation.", num: "02" },
              { label: "Precision Weaving", desc: "Skilled artisans using semi-automatic weaving for peak quality.", num: "03" },
              { label: "Quality Audit", desc: "Strict 4-stage inspection for every international shipment.", num: "04" },
              { label: "Global Dispatch", desc: "Export-compliant packaging for worldwide delivery.", num: "05" },
            ].map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 text-center lg:text-left"
              >
                <div className="relative inline-block lg:block mb-8">
                  <div className="w-10 h-10 rounded-full bg-charcoal border-2 border-accent flex items-center justify-center text-accent text-xs font-bold font-heading mx-auto lg:mx-0 group-hover:scale-110 transition-transform">
                    {step.num}
                  </div>
                </div>
                <h4 className="font-heading text-xl font-bold text-foreground mb-4">{step.label}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="bg-charcoal py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -mr-64 -mt-64" />
        <SectionHeader
          subtitle="Global Reputation"
          title="Trusted by Industry Leaders"
          light
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-10 bg-white/5 border border-white/10 rounded-sm hover:border-accent/40 transition-colors group"
            >
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} size={14} className="text-accent fill-accent" />
                ))}
              </div>
              <p className="text-cream/70 text-[15px] leading-relaxed mb-8 italic italic font-body">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent flex items-center justify-center font-heading font-bold text-accent">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-heading font-bold text-cream group-hover:text-accent transition-colors">{t.name}</p>
                  <p className="text-[10px] text-accent uppercase tracking-widest font-bold">{t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-20 text-center">
          <p className="text-accent text-xs font-bold uppercase tracking-[0.4em]">Certified Textile Manufacturer – Export Compliant</p>
        </div>
      </Section>

      {/* Production Capacity - Info Numbers */}
      <Section className="py-24 bg-cream">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((item: any, i: number) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center space-y-2 border-r border-accent/10 last:border-0"
            >
              <p className="text-4xl md:text-5xl font-heading font-bold text-charcoal">{item.value}</p>
              <p className="text-[10px] text-accent font-bold uppercase tracking-widest">{item.label}</p>
              <p className="text-[10px] text-muted-foreground uppercase">{item.description || item.sub}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Wholesale Policy & Lead Gen */}
      <Section className="bg-secondary/20 py-24 border-t border-accent/10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="font-heading text-4xl font-bold text-foreground">Strategic Wholesale <br /><span className="text-accent underline decoration-1 underline-offset-8">Partnership</span></h2>
            <div className="space-y-6">
              {[
                { title: "MOQ Policy", text: "Minimum 50 units for domestic, 200 for international export." },
                { title: "Lead Time", text: "4-6 weeks for bulk orders, depending on customization depth." },
                { title: "Private Label", text: "End-to-end design, branding, and packaging support." },
                { title: "Export Logistics", text: "Door-to-door delivery with full insurance and documentation." },
              ].map((policy) => (
                <div key={policy.title} className="flex gap-4 group">
                  <div className="mt-1 w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0 group-hover:bg-accent transition-colors">
                    <CheckCircle size={12} className="text-accent group-hover:text-charcoal transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest mb-1">{policy.title}</p>
                    <p className="text-sm text-muted-foreground">{policy.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-premium p-10 shadow-luxury border border-accent/20 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-[8px] font-bold text-accent-foreground uppercase tracking-widest">
              Partner Portal
            </div>
            <h3 className="font-heading text-2xl font-bold text-center mb-8">Request Catalog & Pricing</h3>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const data = {
                  name: formData.get("name") as string,
                  company: formData.get("company") as string,
                  email: formData.get("email") as string,
                  subject: formData.get("interest") as string,
                  message: `New catalog request for ${formData.get("interest")}`
                };
                addInquiryMutation(data, {
                  onSuccess: () => {
                    (e.target as HTMLFormElement).reset();
                    toast({
                      title: "Transmission Secure",
                      description: "Your inquiry has been logged. Our export team will contact you within 24 hours.",
                    });
                  }
                });
              }}
            >
              <div className="grid grid-cols-2 gap-4">
                <input name="name" type="text" placeholder="Full Name" className="w-full bg-white px-4 py-3 border border-border text-xs focus:ring-1 focus:ring-accent outline-none" required />
                <input name="company" type="text" placeholder="Company Name" className="w-full bg-white px-4 py-3 border border-border text-xs focus:ring-1 focus:ring-accent outline-none" required />
              </div>
              <input name="email" type="email" placeholder="Business Email" className="w-full bg-white px-4 py-3 border border-border text-xs focus:ring-1 focus:ring-accent outline-none" required />
              <select name="interest" className="w-full bg-white px-4 py-3 border border-border text-xs focus:ring-1 focus:ring-accent outline-none text-muted-foreground">
                <option value="General Inquiry">Interested Collection</option>
                <option value="Winter Shawls">Winter Shawls</option>
                <option value="Embroidered Collection">Embroidered Collection</option>
                <option value="Custom Designs">Custom Designs</option>
              </select>
              <button type="submit" className="w-full py-4 bg-charcoal text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-accent hover:text-charcoal transition-all duration-300">
                Download Wholesale Catalog (PDF)
              </button>
            </form>
            <p className="text-[10px] text-center text-muted-foreground mt-4 italic">
              Your data is protected under our global privacy & export policy.
            </p>
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-10"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Ready to Secure Your <br /> <span className="text-accent italic">Global Supply Chain?</span>
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link
              to="/contact"
              className="px-12 py-5 bg-accent text-accent-foreground font-bold tracking-widest uppercase text-xs rounded-sm hover:translate-y--1 hover:shadow-xl transition-all duration-300"
            >
              Schedule Board Meeting
            </Link>
            <a
              href="tel:+923001234567"
              className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-charcoal transition-colors px-12 py-5 border border-border"
            >
              <Phone size={16} /> Fast Track Inquiry
            </a>
          </div>
        </motion.div>
      </Section>
    </>
  );
};

export default Index;

import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/Section";
import { Target, Eye, Heart, Award, ShieldCheck, Globe, History, Factory } from "lucide-react";
import SEO from "@/components/SEO";
import { useB2BStats } from "@/hooks/use-store";
import factoryImg from "@/assets/factory.jpg";
import embroideredImg from "@/assets/category-embroidered.jpg";
import pashminaImg from "@/assets/category-pashmina.jpg";

const values = [
  { icon: ShieldCheck, label: "Quality Audit", desc: "Strict 4-stage inspection for every international shipment." },
  { icon: History, label: "Heritage", desc: "Preserving generations of Swat textile artistry." },
  { icon: Factory, label: "Direct Factory", desc: "Vertically integrated manufacturing without middlemen." },
  { icon: Globe, label: "Global Reach", desc: "Exporting to over 15 countries with full logistics support." },
];

const About = () => {
  const { data: stats = [] } = useB2BStats();

  return (
    <>
      <SEO
        title="Our Legacy & Manufacturing Excellence"
        description="Discover the history of Abaseen Handi Crafts. From traditional Swat artistry to a global high-capacity manufacturing facility."
        keywords="shawl manufacturing history, abaseen handicrafts legacy, textile artisans pakistan, factory direct shawls"
      />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={pashminaImg} alt="Luxury shawl craftsmanship" className="w-full h-full object-cover scale-105 transition-transform duration-[10s] hover:scale-100" />
          <div className="absolute inset-0 bg-charcoal/80 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-charcoal/20 to-charcoal" />
        </div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto"
          >
            <motion.span
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              animate={{ opacity: 1, letterSpacing: "0.5em" }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-[10px] uppercase text-accent font-bold"
            >
              The Abaseen Legacy
            </motion.span>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-cream mt-6 mb-8 tracking-tight">
              Crafting Heritage for <br /> <span className="text-gradient-gold">Global Markets</span>
            </h1>
            <div className="w-20 h-px bg-accent/40 mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Corporate Profile Section */}
      <Section className="py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-accent text-xs font-bold uppercase tracking-[0.4em]">Company Profile</span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Bridging Tradition <br /> & Global Demands
              </h2>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed first-letter:text-5xl first-letter:font-heading first-letter:float-left first-letter:mr-3 first-letter:text-accent">
              Abaseen Handi Crafts (Pvt) Ltd was founded with a singular vision: to elevate the rich textile heritage of Pakistan to a global enterprise standard. Operating from our hub in the Swat region, we have transformed local artistry into a high-capacity manufacturing powerhouse.
            </p>

            <div className="p-8 bg-secondary/50 border-l-2 border-accent italic text-muted-foreground relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 -mr-12 -mt-12 rounded-full transition-transform group-hover:scale-150" />
              "Our facility integrates the soul of hand-loomed traditions with the precision of modern quality control, ensuring every piece meets international luxury benchmarks."
            </div>

            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <p className="font-heading text-3xl font-bold text-charcoal">{stats.find((s: any) => s.id === "factory")?.value || "25,000"}</p>
                <p className="text-[10px] uppercase tracking-widest text-accent font-bold">Square Feet Facility</p>
              </div>
              <div>
                <p className="font-heading text-3xl font-bold text-charcoal">{stats.find((s: any) => s.id === "craftsmen")?.value || "150+"}</p>
                <p className="text-[10px] uppercase tracking-widest text-accent font-bold">Master Artisans</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-luxury">
              <img src={factoryImg} alt="Abaseen Manufacturing Hub" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
            </div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-accent/10 -z-10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-10 -right-4 glass-premium p-6 border border-accent/20 z-20 hidden md:block">
              <p className="font-heading text-lg font-bold">ISO Compliance</p>
              <p className="text-[8px] uppercase tracking-widest font-bold text-accent">Export Registered (Pvt) Ltd</p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Strategic Vision - Glass Cards */}
      <Section className="bg-charcoal py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="grid md:grid-cols-2 gap-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-premium p-12 border border-white/10"
          >
            <h3 className="font-heading text-3xl font-bold text-cream mb-6">Global Vision</h3>
            <p className="text-cream/60 leading-relaxed text-lg">
              To be the most trusted and innovative shawl manufacturer in South Asia, recognized globally for our commitment to scale, sustainability, and high-end B2B textile precision.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-premium p-12 border border-accent/20 bg-accent/5"
          >
            <h3 className="font-heading text-3xl font-bold text-accent mb-6">Quality Mission</h3>
            <p className="text-cream/60 leading-relaxed text-lg">
              To deliver export-grade handcrafted shawls that consistently exceed international quality benchmarks, fostering lasting global wholesale partnerships through transparency and artisanal excellence.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Core Values - Premium Grid */}
      <Section className="py-24">
        <SectionHeader subtitle="Operational Values" title="The Abaseen Standards" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <motion.div
              key={v.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 border border-secondary bg-secondary/20 hover:bg-white hover:shadow-luxury transition-all duration-500 group"
            >
              <div className="w-16 h-16 rounded-full bg-charcoal flex items-center justify-center mb-6 group-hover:bg-accent transition-colors">
                <v.icon className="text-accent group-hover:text-charcoal transition-colors" size={28} />
              </div>
              <h4 className="font-heading text-xl font-bold text-foreground mb-4">{v.label}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Call to Trust */}
      <Section className="bg-cream py-24 text-center border-t border-accent/10">
        <span className="text-accent text-[10px] font-bold uppercase tracking-[0.6em] mb-4 block">Official Partnership</span>
        <h2 className="font-heading text-4xl font-bold text-charcoal mb-8 italic">Validated Production Authority</h2>
        <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale font-heading font-bold text-xs tracking-widest">
          <span>CERTIFIED QUALITY</span>
          <span>GLOBAL EXPORT LOGIC</span>
          <span>SUSTAINABLE B2B</span>
        </div>
      </Section>
    </>
  );
};

export default About;

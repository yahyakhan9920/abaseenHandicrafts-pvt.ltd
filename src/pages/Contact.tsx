import { useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import SEO from "@/components/SEO";
import { Mail, Phone, MapPin, Clock, Send, Globe, MessageSquare, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSiteSettings } from "@/hooks/use-store";
import heroImg from "@/assets/hero-shawl.jpg";

const Contact = () => {
  const { toast } = useToast();
  const { data: settings } = useSiteSettings();
  const [form, setForm] = useState({ name: "", email: "", company: "", volume: "", country: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast({ title: "Strategic Inquiry Received", description: "An account manager will respond within 12 business hours." });
      setForm({ name: "", email: "", company: "", volume: "", country: "", subject: "", message: "" });
    }, 1200);
  };

  const contactDetails = [
    { icon: MapPin, label: "Registered Office", value: settings?.contact?.address || "Swat Valley, Khyber Pakhtunkhwa, Pakistan", href: null },
    { icon: Mail, label: "B2B Sales", value: settings?.contact?.email || "orders@abaseen.com", href: `mailto:${settings?.contact?.email || 'orders@abaseen.com'}` },
    { icon: Phone, label: "Direct Line", value: settings?.contact?.phone || "+92 300 123 4567", href: `tel:${settings?.contact?.phone?.replace(/\s/g, '') || '+923001234567'}` },
    { icon: Clock, label: "Logistics Support", value: "Mon – Sat: 09:00 – 18:00 (PKT)", href: null },
  ];

  return (
    <>
      <SEO
        title="Enterprise Inquiries & Global Sales"
        description="Contact our B2B sales department for wholesale accounts, custom manufacturing projects, and global export partnerships. Priority support for enterprise partners."
        keywords="contact textile manufacturer, wholesale shawl inquiry, b2b export contact, abaseen handicrafts support"
      />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Strategic Contact" className="w-full h-full object-cover grayscale" />
          <div className="absolute inset-0 bg-charcoal/90" />
        </div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center pt-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto">
            <span className="text-accent text-[10px] font-bold uppercase tracking-[0.5em] mb-4 block">Official Communication</span>
            <h1 className="font-heading text-5xl md:text-8xl font-bold text-cream mb-8">Global <span className="text-gradient-gold">Sales</span> Hub</h1>
            <div className="flex flex-wrap justify-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-cream/40">
              <span className="flex items-center gap-2 px-4 py-2 border border-white/5 rounded-full"><Globe size={12} /> Global Export Desk</span>
              <span className="flex items-center gap-2 px-4 py-2 border border-white/5 rounded-full"><MessageSquare size={12} /> B2B Strategic Support</span>
              <span className="flex items-center gap-2 px-4 py-2 border border-white/5 rounded-full"><ShieldCheck size={12} /> Verified Manufacturing</span>
            </div>
          </motion.div>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-3 gap-20">
          {/* Contact Info - Corporate Style */}
          <div className="space-y-12">
            <div className="space-y-8">
              <h2 className="font-heading text-3xl font-bold text-charcoal leading-tight">Corporate <br /> Headquarters</h2>
              <div className="space-y-6">
                {contactDetails.map((item) => (
                  <div key={item.label} className="group flex items-start gap-4 p-4 hover:bg-secondary/10 rounded-sm transition-colors cursor-default">
                    <div className="w-10 h-10 rounded-full bg-charcoal flex items-center justify-center shrink-0 group-hover:bg-accent transition-colors">
                      <item.icon className="text-accent group-hover:text-charcoal transition-colors" size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-charcoal font-bold text-sm hover:text-accent transition-colors">{item.value}</a>
                      ) : (
                        <p className="text-charcoal font-bold text-sm leading-relaxed">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 glass-premium border border-accent/20 bg-accent/5">
              <p className="font-heading text-lg font-bold mb-2">Priority Response</p>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Enterprise partners receive a dedicated account manager within 12 hours of inquiry validation.</p>
            </div>
          </div>

          {/* Inquiry Suite Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="bg-white border border-secondary/30 rounded-sm p-10 lg:p-16 shadow-luxury">
              <div className="space-y-4 mb-12">
                <h3 className="font-heading text-4xl font-bold text-charcoal">Strategic Inquiry</h3>
                <div className="w-12 h-1 bg-accent" />
                <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Please provide your corporate details for prioritized vetting.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {[
                  { key: "name", label: "Principal Contact Name", type: "text", required: true },
                  { key: "email", label: "Corporate Email Address", type: "email", required: true },
                  { key: "company", label: "Legal Entity/Company Name", type: "text", required: true },
                  { key: "country", label: "Country of Operation", type: "text", required: true },
                ].map((field) => (
                  <div key={field.key} className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-charcoal font-bold block">{field.label}</label>
                    <input
                      type={field.type}
                      required={field.required}
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      className="w-full px-5 py-4 bg-secondary/5 border-b border-charcoal/10 focus:border-accent text-sm text-charcoal placeholder:text-muted-foreground/30 focus:outline-none transition-all"
                      placeholder={`Enter ${field.label.toLowerCase()}...`}
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-charcoal font-bold block">Annual Volume Estimate</label>
                  <select
                    value={form.volume}
                    onChange={(e) => setForm({ ...form, volume: e.target.value })}
                    className="w-full px-5 py-4 bg-secondary/5 border-b border-charcoal/10 focus:border-accent text-sm text-charcoal focus:outline-none appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Select Tier</option>
                    <option value="low">100 - 500 Pcs/Year</option>
                    <option value="mid">500 - 2000 Pcs/Year</option>
                    <option value="high">2000+ Pcs/Year (High Volume)</option>
                    <option value="one">One-time / Boutique Project</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-charcoal font-bold block">Core Subject</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-5 py-4 bg-secondary/5 border-b border-charcoal/10 focus:border-accent text-sm text-charcoal focus:outline-none appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Select Priority</option>
                    <option value="wholesale">B2B Wholesale Account</option>
                    <option value="custom">OEM / Private Label Project</option>
                    <option value="export">Export Logistics Partnership</option>
                    <option value="catalog">Full Technical Catalog Access</option>
                  </select>
                </div>
              </div>

              <div className="mb-12 space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-charcoal font-bold block">Project Brief / Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  required
                  className="w-full px-5 py-4 bg-secondary/5 border-b border-charcoal/10 focus:border-accent text-sm text-charcoal placeholder:text-muted-foreground/30 focus:outline-none resize-none transition-all"
                  placeholder="Tell us about your requirements, target deadlines, or specific customization needs..."
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="group relative flex items-center justify-center w-full md:w-auto px-16 py-5 bg-charcoal text-cream text-[10px] font-bold uppercase tracking-[0.4em] overflow-hidden rounded-sm transition-all hover:bg-accent hover:text-charcoal disabled:opacity-50"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {sending ? "Processing Access..." : "Initialize Strategic Partnership"}
                  {!sending && <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </span>
              </button>
            </form>
          </motion.div>
        </div>
      </Section>

      {/* Map - Luxury Editorial Version */}
      <div className="w-full h-[500px] relative mt-12 bg-charcoal grayscale-[0.8] contrast-125">
        <div className="absolute inset-0 pointer-events-none z-10 border-[30px] border-white/5" />
        <iframe
          title="Abaseen Handi Crafts Headquarters"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105655.85023946263!2d72.30825916053427!3d34.7717462445163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d91024847e3379%3A0xe9f000787e9ec8c6!2sSwat%2C%20Khyber%20Pakhtunkhwa%2C%20Pakistan!5e0!3m2!1sen!2sus!4v1709260000000"
          width="100%"
          height="100%"
          style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </>
  );
};

export default Contact;

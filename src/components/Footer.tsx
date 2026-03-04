import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, ShieldCheck, Globe, Truck } from "lucide-react";
import { useSiteSettings } from "@/hooks/use-store";

const Footer = () => {
  const { data: settings } = useSiteSettings();

  const socialLinks = [
    { label: "Facebook", href: settings?.socials?.facebook || "#", icon: Facebook },
    { label: "Instagram", href: settings?.socials?.instagram || "#", icon: Instagram },
    { label: "LinkedIn", href: settings?.socials?.linkedin || "#", icon: Linkedin },
  ];

  return (
    <footer className="bg-charcoal text-cream border-t border-accent/20">
      <div className="container mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Brand & badges */}
          <div className="space-y-6">
            <div>
              <h3 className="font-heading text-3xl font-bold mb-1 tracking-tight">Abaseen</h3>
              <p className="text-[10px] tracking-[0.3em] uppercase text-accent font-bold">
                Handi Crafts (Pvt) Ltd
              </p>
            </div>
            <p className="text-cream/60 text-sm leading-relaxed max-w-xs">
              {settings?.description || "Luxury textile manufacturer specializing in premium handcrafted shawls for global export. Certified quality, factory-direct."}
            </p>
            {/* Social Icons with Glow */}
            <div className="flex gap-4">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-charcoal-light border border-white/10 flex items-center justify-center text-cream/60 hover:border-accent hover:text-accent hover:shadow-[0_0_15px_rgba(200,155,60,0.3)] transition-all duration-300"
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-8">
            <h4 className="font-heading text-lg font-semibold mb-8 relative inline-block">
              Navigation
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-accent"></span>
            </h4>
            <div className="flex flex-col gap-4">
              {[
                { label: "Our Heritage", to: "/about" },
                { label: "Shawl Collection", to: "/products" },
                { label: "B2B Wholesale", to: "/wholesale" },
                { label: "Export Policy", to: "/wholesale" },
                { label: "Contact Global Sales", to: "/contact" },
              ].map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-sm text-cream/60 hover:text-accent hover:translate-x-1 transition-all duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact & Global Presence */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-8 relative inline-block">
              Global Support
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-accent"></span>
            </h4>
            <div className="flex flex-col gap-5">
              <a
                href={`tel:${settings?.contact?.phone?.replace(/\s/g, '') || '+923001234567'}`}
                className="flex items-center gap-3 text-sm text-cream/60 hover:text-accent transition-colors group"
              >
                <div className="w-8 h-8 rounded-sm bg-charcoal-light flex items-center justify-center group-hover:bg-accent transition-colors">
                  <Phone size={14} className="group-hover:text-charcoal" />
                </div>
                {settings?.contact?.phone || "+92 300 1234567"}
              </a>
              <a
                href={`mailto:${settings?.contact?.email || 'sales@abaseen.global'}`}
                className="flex items-center gap-3 text-sm text-cream/60 hover:text-accent transition-colors group"
              >
                <div className="w-8 h-8 rounded-sm bg-charcoal-light flex items-center justify-center group-hover:bg-accent transition-colors">
                  <Mail size={14} className="group-hover:text-charcoal" />
                </div>
                {settings?.contact?.email || "sales@abaseen.global"}
              </a>
              <div className="flex items-center gap-3 text-sm text-cream/60 group">
                <div className="w-8 h-8 rounded-sm bg-charcoal-light flex items-center justify-center">
                  <MapPin size={14} />
                </div>
                {settings?.contact?.address || "Swat Valley, KPK, Pakistan"}
              </div>
            </div>
          </div>

          {/* Trust Badges Section */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-8 relative inline-block">
              Compliance
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-accent"></span>
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center p-3 bg-charcoal-light rounded-sm border border-white/5">
                <ShieldCheck size={24} className="text-accent mb-2" />
                <span className="text-[10px] text-center uppercase tracking-tighter">Certified Quality</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-charcoal-light rounded-sm border border-white/5">
                <Globe size={24} className="text-accent mb-2" />
                <span className="text-[10px] text-center uppercase tracking-tighter">Global Export</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-charcoal-light rounded-sm border border-white/5">
                <Truck size={24} className="text-accent mb-2" />
                <span className="text-[10px] text-center uppercase tracking-tighter">Secure Logistics</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-charcoal-light rounded-sm border border-white/5">
                <ShieldCheck size={24} className="text-accent mb-2" />
                <span className="text-[10px] text-center uppercase tracking-tighter">B2B Verified</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-cream/40 font-medium">
            © {new Date().getFullYear()} Abaseen Handi Crafts (Pvt) Ltd. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] text-cream/40 uppercase tracking-widest">Server Secure (SSL)</span>
            </div>
            <Link to="/contact" className="text-[10px] text-cream/40 uppercase tracking-widest hover:text-accent transition-colors">
              Terms of Export
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

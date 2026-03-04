import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Products", path: "/products" },
  { label: "Wholesale & B2B", path: "/wholesale" },
  { label: "Contact Us", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "h-16 glass-premium shadow-luxury"
          : "h-20 bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-accent flex items-center justify-center rounded-sm transition-transform duration-500 group-hover:scale-110">
            <span className="text-accent-foreground font-heading font-bold text-xl">A</span>
          </div>
          <span className={cn(
            "font-heading font-bold text-xl tracking-tight transition-colors duration-300",
            scrolled ? "text-foreground" : "text-white"
          )}>
            Abaseen <span className="text-accent">Global</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-[13px] tracking-wide transition-colors duration-300 relative group/link",
                location.pathname === item.path
                  ? "text-accent font-semibold"
                  : scrolled ? "text-muted-foreground hover:text-foreground" : "text-white/80 hover:text-white"
              )}
            >
              {item.label}
              <span className={cn(
                "absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover/link:w-full",
                location.pathname === item.path && "w-full"
              )} />
            </Link>
          ))}
          <Link
            to="/contact"
            className="ml-2 px-6 py-2.5 bg-accent text-accent-foreground text-xs font-semibold tracking-wider uppercase rounded-sm hover:bg-gold-dark transition-all duration-300 hover:shadow-lg ripple"
          >
            Request Quote
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "lg:hidden transition-colors",
            scrolled ? "text-foreground" : "text-white"
          )}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 glass-premium border-t border-border overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6 shadow-luxury">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg tracking-wide border-b border-border pb-2",
                    location.pathname === item.path
                      ? "text-accent font-semibold"
                      : "text-foreground/80"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="mt-2 px-6 py-4 bg-accent text-accent-foreground text-sm font-semibold tracking-wide uppercase rounded-sm text-center shadow-lg"
              >
                Request Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

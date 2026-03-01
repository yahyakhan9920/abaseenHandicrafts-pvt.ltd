import { useState, useEffect } from "react";
import { MessageCircle, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const FloatingActions = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const phoneNumber = "923001234567";
    const message = encodeURIComponent(
        "Hello Abaseen Handi Crafts, I'm interested in your luxury shawl collection for wholesale/export. Please share your catalog."
    );

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
            {/* Scroll to Top */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 20 }}
                        onClick={scrollToTop}
                        className="w-12 h-12 bg-charcoal text-white rounded-full flex items-center justify-center shadow-luxury border border-white/10 hover:bg-accent hover:text-charcoal transition-all duration-300 group"
                        aria-label="Scroll to top"
                    >
                        <ChevronUp size={24} className="group-hover:-translate-y-1 transition-transform" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* WhatsApp Button */}
            <motion.a
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                href={`https://wa.me/${phoneNumber}?text=${message}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-110 transition-all duration-300 group relative"
                aria-label="Chat on WhatsApp"
            >
                <MessageCircle size={30} fill="currentColor" className="text-white" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-white/20"></span>
                </span>
            </motion.a>
        </div>
    );
};

export default FloatingActions;

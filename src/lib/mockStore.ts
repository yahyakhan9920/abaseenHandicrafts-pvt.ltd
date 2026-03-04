// Simple Mock Store for Demonstration
// In a real app, this would be an API or a proper state management library (Zustand/Redux)

export const getB2BStats = () => {
    const saved = localStorage.getItem("abaseen_b2b_stats_v2");
    if (saved) return JSON.parse(saved);

    return [
        { id: "experience", label: "Industry Presence", value: "20+ Years", description: "Technical Expertise", active: true },
        { id: "capacity", label: "Annual Production", value: "20,000 Units/Mo", description: "Units", active: true },
        { id: "craftsmen", label: "Skilled Craftsmen", value: "150+", description: "Artisans", active: true },
        { id: "export", label: "Global Reach", value: "15+ Countries", description: "Established export network.", active: true },
        { id: "clients", label: "Satisfied Clients", value: "500+", description: "Global Partners", active: false },
        { id: "factory", label: "Production Space", value: "25,000 Sq Ft", description: "Manufacturing Hub", active: false },
    ];
};

export const saveB2BStats = (stats: any) => {
    localStorage.setItem("abaseen_b2b_stats_v2", JSON.stringify(stats));
};

export const getWholesaleTiers = () => {
    const saved = localStorage.getItem("abaseen_wholesale_tiers");
    if (saved) return JSON.parse(saved);

    return [
        {
            id: 1,
            name: "Boutique Wholesale",
            moq: "50 - 200 Pcs",
            discount: "Standard",
            features: ["Stock Designs", "Standard Packaging", "Air Freight Shipping", "Sample Support"],
            highlight: false,
            active: true
        },
        {
            id: 2,
            name: "Enterprise Export",
            moq: "200 - 1000 Pcs",
            discount: "Volume Tier",
            features: ["Custom Branding", "Private Labeling", "Dedicated Account Manager", "Custom Packaging", "Sea/Air Logistics"],
            highlight: true,
            active: true
        },
        {
            id: 3,
            name: "OEM/Manufacturing",
            moq: "1000+ Pcs",
            discount: "Direct Factory",
            features: ["Bespoke Designs", "Fabric Sourcing", "Global Distribution", "Raw Material Quality Audit", "Advanced L/C Terms"],
            highlight: false,
            active: true
        }
    ];
};

export const saveWholesaleTiers = (tiers: any) => {
    localStorage.setItem("abaseen_wholesale_tiers", JSON.stringify(tiers));
};

export const getProducts = () => {
    const saved = localStorage.getItem("abaseen_products");
    if (saved) return JSON.parse(saved);

    return [];
};

export const saveProducts = (products: any) => {
    localStorage.setItem("abaseen_products", JSON.stringify(products));
};

export const getCategories = () => {
    const saved = localStorage.getItem("abaseen_categories");
    if (saved) return JSON.parse(saved);

    return [];
};

export const saveCategories = (categories: any) => {
    localStorage.setItem("abaseen_categories", JSON.stringify(categories));
};

export const getInquiries = () => {
    const saved = localStorage.getItem("abaseen_inquiries");
    if (saved) return JSON.parse(saved);

    return [];
};

export const saveInquiries = (inquiries: any) => {
    localStorage.setItem("abaseen_inquiries", JSON.stringify(inquiries));
};

export const addInquiry = (inquiry: any) => {
    const inquiries = getInquiries();
    const newInquiry = {
        id: `INQ-${Math.floor(2000 + Math.random() * 8000)}`,
        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        status: "Priority",
        priority: "Medium",
        volume: "TBD",
        country: "International",
        ...inquiry
    };
    const updated = [newInquiry, ...inquiries];
    saveInquiries(updated);
    return newInquiry;
};

export const deleteInquiry = (id: string) => {
    const inquiries = getInquiries();
    const updated = inquiries.filter((inq: any) => inq.id !== id);
    saveInquiries(updated);
};

export const getLogs = () => {
    const saved = localStorage.getItem("abaseen_logs");
    if (saved) return JSON.parse(saved);
    return [];
};

export const saveLogs = (logs: any) => {
    localStorage.setItem("abaseen_logs", JSON.stringify(logs.slice(0, 100))); // Keep last 100
};

export const addLog = (log: any) => {
    const logs = getLogs();
    const newLog = {
        id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        ip: "Internal",
        status: "Success",
        impact: "Low",
        ...log
    };
    saveLogs([newLog, ...logs]);
};

export const clearLogs = () => {
    localStorage.removeItem("abaseen_logs");
};

export const getSEOData = () => {
    const saved = localStorage.getItem("abaseen_seo");
    if (saved) return JSON.parse(saved);

    return [
        { id: "1", path: "/", title: "Premium Handcrafted Shawls | Abaseen Global", description: "Global authority in luxury textiles. Wholesale manufacturer & exporter of premium shawls.", keywords: "luxury shawls, pashmina wholesale, textile exporter", status: "Optimized", lastUpdated: "2026-02-28" },
        { id: "2", path: "/about", title: "Our Legacy | Manufacturing Excellence", description: "Crafting excellence at enterprise scale. Company profile and manufacturing history.", keywords: "textile factory, abaseen legacy", status: "Warning", lastUpdated: "2026-01-15" },
    ];
};

export const saveSEOData = (data: any) => {
    localStorage.setItem("abaseen_seo", JSON.stringify(data));
};

export const getHomepageContent = () => {
    const saved = localStorage.getItem("abaseen_homepage");
    if (saved) return JSON.parse(saved);

    return {
        hero: [
            { id: "1", title: "Luxury Textiles. Global Authority.", subtitle: "Premier wholesale manufacturer & exporter of premium handcrafted shawls.", ctaText: "Wholesale Inquiry", image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80" }
        ],
        about: {
            heading: "Crafting Excellence at Enterprise Scale",
            subheading: "Our Legacy",
            description: "With over two decades of technical expertise, Abaseen Handi Crafts (Pvt) Ltd operates a vertically integrated manufacturing facility.",
            quote: "Our mission is to bridge the gap between traditional Pakistani craftsmanship and the demands of the global luxury market."
        }
    };
};

export const saveHomepageContent = (content: any) => {
    localStorage.setItem("abaseen_homepage", JSON.stringify(content));
};

export const getSiteSettings = () => {
    const saved = localStorage.getItem("abaseen_site_config");
    if (saved) return JSON.parse(saved);

    return {
        brandName: "Abaseen Handi Crafts (Pvt) Ltd",
        description: "Official portal for the global textile manufacturer and exporter of premium handcrafted shawls, rooted in the heritage of Swat Valley.",
        contact: {
            email: "orders@abaseen.com",
            phone: "+92 91 1234567",
            whatsapp: "https://wa.me/923001234567",
            address: "Swat Valley, Khyber Pakhtunkhwa, Pakistan"
        },
        socials: {
            facebook: "https://facebook.com/abaseen",
            instagram: "https://instagram.com/abaseen",
            linkedin: "https://linkedin.com/company/abaseen"
        }
    };
};

export const saveSiteSettings = (settings: any) => {
    localStorage.setItem("abaseen_site_config", JSON.stringify(settings));
};

export const resetStorage = () => {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("abaseen_")) {
            keysToRemove.push(key);
        }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
};

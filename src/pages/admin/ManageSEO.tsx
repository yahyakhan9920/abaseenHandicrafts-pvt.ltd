import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Globe,
    Search,
    Save,
    Eye,
    Link as LinkIcon,
    AlertCircle,
    CheckCircle2,
    FileText,
    Share2,
    Key
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSEOData, useSaveSEOData } from "@/hooks/use-store";
import { useToast } from "@/hooks/use-toast";

interface SEOPage {
    id: string;
    path: string;
    title: string;
    description: string;
    keywords: string;
    status: "Optimized" | "Warning" | "Missing";
    lastUpdated: string;
}

const initialPages: SEOPage[] = [
    { id: "1", path: "/", title: "Premium Handcrafted Shawls | Abaseen Global", description: "Global authority in luxury textiles. Wholesale manufacturer & exporter of premium shawls.", keywords: "luxury shawls, pashmina wholesale, textile exporter", status: "Optimized", lastUpdated: "2026-02-28" },
    { id: "2", path: "/about", title: "Our Legacy | Manufacturing Excellence", description: "Crafting excellence at enterprise scale. Company profile and manufacturing history.", keywords: "textile factory, abaseen legacy", status: "Warning", lastUpdated: "2026-01-15" },
    { id: "3", path: "/products", title: "Export Catalog | Global Textile Collection", description: "Browse our international catalog of premium textiles and handcrafted winter shawls.", keywords: "winter catalog, export shawls", status: "Optimized", lastUpdated: "2026-02-20" },
    { id: "4", path: "/wholesale", title: "B2B Partnership | Wholesale Inquiry", description: "", keywords: "", status: "Missing", lastUpdated: "Never" },
];

const ManageSEO = () => {
    const { data: seoData = [] } = useSEOData();
    const saveSEOMutation = useSaveSEOData();
    const [selectedPage, setSelectedPage] = useState<SEOPage | null>(null);
    const [search, setSearch] = useState("");
    const { toast } = useToast();

    const handleSave = () => {
        if (!selectedPage) return;
        const updated = seoData.map(p => p.id === selectedPage.id ? { ...selectedPage, status: (selectedPage.description ? "Optimized" : "Missing") as "Optimized" | "Missing", lastUpdated: new Date().toISOString().split('T')[0] } : p);

        saveSEOMutation.mutate(updated, {
            onSuccess: () => {
                setSelectedPage(null);
                toast({
                    title: "Metadata Synchronized",
                    description: `SEO settings for ${selectedPage.path} are now live.`,
                });
            }
        });
    };

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex justify-between items-end border-b border-secondary/10 pb-8">
                <div>
                    <span className="text-accent text-[9px] font-bold uppercase tracking-[0.4em] block mb-2">Search Engine Authority</span>
                    <h1 className="font-heading text-4xl font-bold text-charcoal tracking-tight">SEO <span className="text-accent underline decoration-accent/20">Editorial</span></h1>
                </div>
                <div className="flex gap-4">
                    <button className="bg-white border border-charcoal/10 text-charcoal px-6 py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:border-accent transition-all flex items-center gap-2">
                        <Share2 size={14} />
                        Update Sitemap
                    </button>
                    <button className="bg-charcoal text-accent px-8 py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-accent hover:text-charcoal transition-all shadow-luxury flex items-center gap-2">
                        <Globe size={14} />
                        Live Preview
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left: Page List */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="relative mb-6">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40" size={14} />
                        <input
                            type="text"
                            placeholder="FILTER PAGES..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-white border border-secondary/20 pl-12 pr-4 py-4 text-[9px] font-bold uppercase tracking-widest outline-none focus:border-accent transition-all"
                        />
                    </div>

                    {seoData.filter(p => p.path.includes(search)).map(page => (
                        <button
                            key={page.id}
                            onClick={() => setSelectedPage(page)}
                            className={cn(
                                "w-full text-left p-6 border transition-all flex flex-col gap-3 group",
                                selectedPage?.id === page.id
                                    ? "bg-charcoal border-charcoal shadow-xl"
                                    : "bg-white border-secondary/10 hover:border-accent/40"
                            )}
                        >
                            <div className="flex justify-between items-center">
                                <span className={cn("text-[9px] font-bold uppercase tracking-widest",
                                    selectedPage?.id === page.id ? "text-accent" : "text-muted-foreground")}>
                                    {page.path === "/" ? "Index Node" : page.path.replace('/', '') + " Node"}
                                </span>
                                {page.status === "Optimized" ? <CheckCircle2 size={12} className="text-green-500" /> : <AlertCircle size={12} className="text-orange-500" />}
                            </div>
                            <p className={cn("font-heading font-bold text-sm",
                                selectedPage?.id === page.id ? "text-white" : "text-charcoal group-hover:text-accent")}>
                                {page.path}
                            </p>
                            <div className="flex justify-between items-center mt-2">
                                <span className={cn("text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-xs",
                                    page.status === "Optimized" ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600")}>
                                    {page.status}
                                </span>
                                <span className="text-[7px] text-muted-foreground uppercase font-medium">Updated: {page.lastUpdated}</span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Right: Editor */}
                <div className="lg:col-span-2">
                    <AnimatePresence mode="wait">
                        {selectedPage ? (
                            <motion.div
                                key={selectedPage.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-white border border-secondary/20 p-10 shadow-luxury space-y-8 sticky top-10"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="font-heading text-2xl font-bold text-charcoal">Meta Configuration</h2>
                                        <p className="text-[10px] uppercase font-bold text-accent tracking-[0.3em] mt-1">Direct Node Override: {selectedPage.path}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-3 border border-charcoal/5 rounded-sm hover:border-accent hover:text-accent transition-all">
                                            <Eye size={16} />
                                        </button>
                                        <button className="p-3 border border-charcoal/5 rounded-sm hover:border-accent hover:text-accent transition-all">
                                            <LinkIcon size={16} />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <label className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest flex items-center gap-2">
                                                <FileText size={12} className="text-accent" />
                                                Meta Title
                                            </label>
                                            <span className={cn("text-[9px] font-bold", selectedPage.title.length > 60 ? "text-red-500" : "text-accent/40")}>
                                                {selectedPage.title.length}/60
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            value={selectedPage.title}
                                            onChange={(e) => setSelectedPage({ ...selectedPage, title: e.target.value })}
                                            className="w-full bg-secondary/5 border-b border-charcoal/10 px-4 py-4 text-sm font-medium focus:border-accent outline-none transition-all"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <label className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest flex items-center gap-2">
                                                <FileText size={12} className="text-accent" />
                                                Meta Description
                                            </label>
                                            <span className={cn("text-[9px] font-bold", selectedPage.description.length > 160 ? "text-red-500" : "text-accent/40")}>
                                                {selectedPage.description.length}/160
                                            </span>
                                        </div>
                                        <textarea
                                            rows={4}
                                            value={selectedPage.description}
                                            onChange={(e) => setSelectedPage({ ...selectedPage, description: e.target.value })}
                                            className="w-full bg-secondary/5 border-b border-charcoal/10 px-4 py-4 text-sm font-medium focus:border-accent outline-none transition-all resize-none"
                                            placeholder="Introduce the page to search engines..."
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest flex items-center gap-2">
                                            <Key size={12} className="text-accent" />
                                            Primary Keywords (Comma Separated)
                                        </label>
                                        <input
                                            type="text"
                                            value={selectedPage.keywords}
                                            onChange={(e) => setSelectedPage({ ...selectedPage, keywords: e.target.value })}
                                            className="w-full bg-secondary/5 border-b border-charcoal/10 px-4 py-4 text-sm font-medium focus:border-accent outline-none transition-all"
                                            placeholder="e.g. pashmina, wholesale, textile manufacturer"
                                        />
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-secondary/10 flex justify-end gap-4">
                                    <button
                                        onClick={() => setSelectedPage(null)}
                                        className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-charcoal transition-all"
                                    >
                                        Cancel Changes
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="bg-accent text-accent-foreground px-12 py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-charcoal hover:text-accent transition-all shadow-luxury flex items-center gap-2"
                                    >
                                        <Save size={14} />
                                        Commit Metadata
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-[600px] border-2 border-dashed border-secondary/20 rounded-sm flex flex-col items-center justify-center text-center p-10">
                                <Globe className="text-secondary/20 mb-6" size={64} />
                                <h3 className="font-heading text-xl font-bold text-charcoal">Node Not Selected</h3>
                                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-[0.2em] mt-2 max-w-xs">
                                    Select a page from the transmission log to modify its search engine appearance.
                                </p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default ManageSEO;

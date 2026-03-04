import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Image as ImageIcon,
    Upload,
    Search,
    Grid,
    List,
    Trash2,
    Download,
    Info,
    CheckCircle2,
    Filter,
    HardDrive,
    Cloud
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface MediaAsset {
    id: string;
    name: string;
    url: string;
    size: string;
    dimensions: string;
    type: "Image" | "Document";
    date: string;
    category: "Product" | "Hero" | "About";
}

const mockAssets: MediaAsset[] = [
    { id: "1", name: "hero-winter-26.jpg", url: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d", size: "1.2 MB", dimensions: "1920x1080", type: "Image", date: "2026-02-28", category: "Hero" },
    { id: "2", name: "pashmina-shawl-01.jpg", url: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e", size: "850 KB", dimensions: "1200x1200", type: "Image", date: "2026-02-27", category: "Product" },
    { id: "3", name: "wholesale-catalog-q1.pdf", url: "#", size: "4.5 MB", dimensions: "N/A", type: "Document", date: "2026-02-25", category: "About" },
    { id: "4", name: "factory-main.jpg", url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158", size: "2.1 MB", dimensions: "2400x1600", type: "Image", date: "2026-02-20", category: "About" },
];

const ManageMedia = () => {
    const [assets, setAssets] = useState<MediaAsset[]>(mockAssets);
    const [view, setView] = useState<"Grid" | "List">("Grid");
    const [search, setSearch] = useState("");
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const { toast } = useToast();

    const selectedAsset = assets.find(a => a.id === selectedId);

    const handleDelete = (id: string) => {
        setAssets(prev => prev.filter(a => a.id !== id));
        if (selectedId === id) setSelectedId(null);
        toast({
            title: "Asset Purged",
            description: "Binary data has been removed from the authorized cluster.",
            variant: "destructive"
        });
    };

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex justify-between items-end border-b border-secondary/10 pb-8">
                <div>
                    <span className="text-accent text-[9px] font-bold uppercase tracking-[0.4em] block mb-2">Digital Asset Repository</span>
                    <h1 className="font-heading text-4xl font-bold text-charcoal tracking-tight">Media <span className="text-accent underline decoration-accent/20">Intelligence</span></h1>
                </div>
                <div className="flex gap-4">
                    <div className="flex bg-white border border-secondary/10 p-1 rounded-sm gap-1">
                        <button
                            onClick={() => setView("Grid")}
                            className={cn("p-2 rounded-sm transition-all", view === "Grid" ? "bg-charcoal text-accent" : "text-muted-foreground hover:bg-secondary/5")}
                        >
                            <Grid size={16} />
                        </button>
                        <button
                            onClick={() => setView("List")}
                            className={cn("p-2 rounded-sm transition-all", view === "List" ? "bg-charcoal text-accent" : "text-muted-foreground hover:bg-secondary/5")}
                        >
                            <List size={16} />
                        </button>
                    </div>
                    <button className="bg-charcoal text-accent px-8 py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-accent hover:text-charcoal transition-all shadow-luxury flex items-center gap-2">
                        <Upload size={14} />
                        Upload Assets
                    </button>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 border border-secondary/10 flex items-center gap-6">
                    <div className="w-12 h-12 bg-accent/5 flex items-center justify-center text-accent rounded-full"><HardDrive size={20} /></div>
                    <div>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Storage Used</p>
                        <p className="text-xl font-heading font-bold text-charcoal">8.6 GB / 50 GB</p>
                    </div>
                </div>
                <div className="bg-white p-6 border border-secondary/10 flex items-center gap-6">
                    <div className="w-12 h-12 bg-accent/5 flex items-center justify-center text-accent rounded-full"><ImageIcon size={20} /></div>
                    <div>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Total Assets</p>
                        <p className="text-xl font-heading font-bold text-charcoal">{assets.length} Nodes</p>
                    </div>
                </div>
                <div className="bg-white p-6 border border-secondary/10 flex items-center gap-6">
                    <div className="w-12 h-12 bg-accent/5 flex items-center justify-center text-accent rounded-full"><Cloud size={20} /></div>
                    <div>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">CDN Status</p>
                        <p className="text-xl font-heading font-bold text-green-600 flex items-center gap-2">
                            Operational
                            <CheckCircle2 size={16} />
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
                {/* Search & Filter - Left (optional if we want sidebar) or Top */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="flex gap-4">
                        <div className="relative flex-grow">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40" size={16} />
                            <input
                                type="text"
                                placeholder="SEARCH ARCHIVE..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-white border border-secondary/20 pl-12 pr-4 py-4 text-[9px] font-bold uppercase tracking-widest focus:border-accent outline-none"
                            />
                        </div>
                        <button className="px-6 py-4 bg-white border border-secondary/10 text-muted-foreground flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                            <Filter size={14} /> Filter
                        </button>
                    </div>

                    {view === "Grid" ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {assets.filter(a => a.name.toLowerCase().includes(search.toLowerCase())).map(asset => (
                                <motion.div
                                    key={asset.id}
                                    layoutId={asset.id}
                                    onClick={() => setSelectedId(asset.id)}
                                    className={cn(
                                        "aspect-square bg-secondary/5 border-2 rounded-sm overflow-hidden cursor-pointer relative group",
                                        selectedId === asset.id ? "border-accent" : "border-transparent"
                                    )}
                                >
                                    {asset.type === "Image" ? (
                                        <img src={asset.url} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-muted-foreground/40">
                                            <FileText size={48} />
                                            <span className="text-[10px] font-bold uppercase">{asset.type}</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-charcoal to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                        <p className="text-[8px] font-bold text-white truncate uppercase tracking-widest">{asset.name}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white border border-secondary/10 rounded-sm divide-y divide-secondary/10">
                            {assets.filter(a => a.name.toLowerCase().includes(search.toLowerCase())).map(asset => (
                                <div
                                    key={asset.id}
                                    onClick={() => setSelectedId(asset.id)}
                                    className={cn(
                                        "p-4 flex items-center justify-between cursor-pointer hover:bg-secondary/5 transition-all text-[10px] font-bold uppercase tracking-widest",
                                        selectedId === asset.id && "bg-accent/5 border-l-2 border-accent"
                                    )}
                                >
                                    <div className="flex items-center gap-4 w-64">
                                        <div className="w-10 h-10 bg-secondary/10 rounded-sm overflow-hidden shrink-0">
                                            {asset.type === "Image" ? <img src={asset.url} className="w-full h-full object-cover" /> : <Info size={20} className="m-2" />}
                                        </div>
                                        <span className="truncate">{asset.name}</span>
                                    </div>
                                    <span className="text-muted-foreground">Type: {asset.type}</span>
                                    <span className="text-muted-foreground">Size: {asset.size}</span>
                                    <span className="text-muted-foreground">Date: {asset.date}</span>
                                    <span className="text-accent">{asset.category}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Info Panel - Right */}
                <div className="lg:col-span-1">
                    <AnimatePresence mode="wait">
                        {selectedAsset ? (
                            <motion.div
                                key={selectedAsset.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="bg-white border border-secondary/20 p-8 shadow-luxury space-y-8 sticky top-10"
                            >
                                <div className="aspect-[4/3] bg-secondary/5 rounded-sm overflow-hidden border border-secondary/10">
                                    {selectedAsset.type === "Image" ? (
                                        <img src={selectedAsset.url} className="w-full h-full object-contain p-4" />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-accent/20">
                                            <Cloud size={64} />
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4 pb-6 border-b border-secondary/10">
                                    <h3 className="font-heading text-lg font-bold text-charcoal break-all">{selectedAsset.name}</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <p className="text-[8px] uppercase font-bold text-muted-foreground tracking-widest">Dimension</p>
                                            <p className="text-[10px] font-bold text-charcoal">{selectedAsset.dimensions}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[8px] uppercase font-bold text-muted-foreground tracking-widest">Format</p>
                                            <p className="text-[10px] font-bold text-charcoal">{selectedAsset.type}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[8px] uppercase font-bold text-muted-foreground tracking-widest">Data Weight</p>
                                            <p className="text-[10px] font-bold text-charcoal">{selectedAsset.size}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[8px] uppercase font-bold text-muted-foreground tracking-widest">Transmission</p>
                                            <p className="text-[10px] font-bold text-accent">{selectedAsset.date}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">Assigned Mapping</label>
                                    <select className="w-full bg-secondary/5 border-b border-charcoal/10 py-3 text-[10px] font-bold uppercase transition-all outline-none focus:border-accent">
                                        <option>Hero Master Slide</option>
                                        <option>Product SKU Feed</option>
                                        <option>About Editorial</option>
                                        <option>Generic CDN</option>
                                    </select>
                                </div>

                                <div className="pt-4 grid grid-cols-2 gap-4">
                                    <button className="py-4 border border-charcoal/10 text-[9px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-charcoal hover:text-white transition-all">
                                        <Download size={14} /> Download
                                    </button>
                                    <button
                                        onClick={() => handleDelete(selectedAsset.id)}
                                        className="py-4 border border-red-500/20 text-[9px] font-bold uppercase tracking-widest text-red-500 flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition-all shadow-red-500/10 shadow-lg"
                                    >
                                        <Trash2 size={14} /> Purge
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-[500px] border-2 border-dashed border-secondary/20 rounded-sm flex flex-col items-center justify-center text-center p-10">
                                <HardDrive className="text-secondary/20 mb-4" size={48} />
                                <h3 className="font-heading text-lg font-bold text-charcoal">Cluster Standby</h3>
                                <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest mt-2 max-w-[200px]">
                                    Select an asset node from the repository to view metadata and perform binary operations.
                                </p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default ManageMedia;

import { FileText } from "lucide-react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    ChevronRight,
    Folder,
    LayoutGrid,
    Save,
    X,
    FolderPlus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Reorder } from "framer-motion";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useCategories, useSaveCategories } from "@/hooks/use-store";

interface Category {
    id: string;
    name: string;
    count: number;
    status: "Active" | "Draft";
    subcategories: string[];
    image?: string;
}

const ManageCategories = () => {
    const { data: categories = [] } = useCategories();
    const saveCategoriesMutation = useSaveCategories();
    const [search, setSearch] = useState("");
    const [editingCategory, setEditingCategory] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newSub, setNewSub] = useState("");
    const { toast } = useToast();

    const handleAddSub = () => {
        if (!newSub.trim()) return;
        setEditingCategory({
            ...editingCategory,
            subcategories: [...editingCategory.subcategories, newSub.trim()]
        });
        setNewSub("");
    };

    const handleRemoveSub = (sub: string) => {
        setEditingCategory({
            ...editingCategory,
            subcategories: editingCategory.subcategories.filter((s: string) => s !== sub)
        });
    };

    const handleDelete = (id: string) => {
        const newCategories = categories.filter((c: any) => c.id !== id);
        saveCategoriesMutation.mutate(newCategories, {
            onSuccess: () => {
                toast({ title: "Node Decommissioned", description: "Category removed from global architecture." });
            }
        });
    };

    const handleEditClick = (cat: any) => {
        setEditingCategory({ ...cat });
        setIsModalOpen(true);
    };

    const handleAddClick = () => {
        setEditingCategory({
            id: Date.now().toString(),
            name: "",
            count: 0,
            status: "Active",
            subcategories: [],
            image: ""
        });
        setIsModalOpen(true);
    };

    const handleSave = () => {
        if (!editingCategory.name) {
            toast({ title: "Error", description: "Category name is required", variant: "destructive" });
            return;
        }
        let updated;
        const index = categories.findIndex((c: any) => c.id === editingCategory.id);
        if (index > -1) {
            updated = [...categories];
            updated[index] = editingCategory;
        } else {
            updated = [editingCategory, ...categories];
        }

        saveCategoriesMutation.mutate(updated, {
            onSuccess: () => {
                toast({ title: "Architecture Committed", description: "Structural node has been updated and synchronized." });
                setIsModalOpen(false);
            }
        });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditingCategory({ ...editingCategory, image: reader.result as string });
                toast({ title: "Visual Binary Mapped", description: "Category banner successfully injected." });
            };
            reader.readAsDataURL(file);
        }
    };

    const filtered = categories.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex justify-between items-end border-b border-secondary/10 pb-8">
                <div>
                    <span className="text-accent text-[9px] font-bold uppercase tracking-[0.4em] block mb-2">Structure & Navigation</span>
                    <h1 className="font-heading text-4xl font-bold text-charcoal tracking-tight">Category <span className="text-accent underline decoration-accent/20">Architecture</span></h1>
                </div>
                <button
                    onClick={handleAddClick}
                    className="bg-charcoal text-accent px-8 py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-accent hover:text-charcoal transition-all shadow-luxury flex items-center gap-3"
                >
                    <Plus size={14} />
                    New Category
                </button>
            </div>

            {/* Search & Stats */}
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white p-6 border border-secondary/10 rounded-sm shadow-sm">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40" size={16} />
                    <input
                        type="text"
                        placeholder="SEARCH ARCHITECTURE..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-secondary/5 border-b border-charcoal/10 pl-12 pr-4 py-3 text-[10px] font-bold uppercase tracking-widest focus:border-accent outline-none transition-all"
                    />
                </div>
                <div className="flex gap-8">
                    <div className="text-center">
                        <p className="text-[8px] uppercase font-bold text-muted-foreground tracking-widest">Total Nodes</p>
                        <p className="text-xl font-heading font-bold text-charcoal">{categories.length}</p>
                    </div>
                    <div className="border-r border-charcoal/5" />
                    <div className="text-center">
                        <p className="text-[8px] uppercase font-bold text-muted-foreground tracking-widest">Live Categories</p>
                        <p className="text-xl font-heading font-bold text-accent">{categories.filter(c => c.status === "Active").length}</p>
                    </div>
                </div>
            </div>

            {/* Categories List */}
            <Reorder.Group axis="y" values={categories} onReorder={(newOrder) => saveCategoriesMutation.mutate(newOrder)} className="space-y-4">
                <AnimatePresence mode="popLayout">
                    {filtered.map((cat, i) => (
                        <Reorder.Item
                            key={cat.id}
                            value={cat}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            whileDrag={{ scale: 1.01, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
                            className="bg-white border border-secondary/20 p-8 rounded-sm shadow-sm flex items-center justify-between group hover:border-accent/40 transition-all cursor-grab active:cursor-grabbing"
                        >
                            <div className="flex items-center gap-8">
                                <div className="w-16 h-16 bg-secondary/5 rounded-sm border border-secondary/10 flex items-center justify-center text-accent/40 group-hover:text-accent group-hover:bg-accent/5 transition-all relative overflow-hidden">
                                    {cat.image ? (
                                        <img src={cat.image} className="w-full h-full object-cover" />
                                    ) : (
                                        <Folder size={24} />
                                    )}
                                    <div className="absolute bottom-0 right-0 p-1 bg-charcoal text-[6px] font-bold text-accent">ID:{cat.id.substring(0, 4)}</div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="font-heading text-xl font-bold text-charcoal">{cat.name}</h3>
                                        <span className={cn(
                                            "text-[7px] font-bold uppercase px-2 py-0.5 rounded-xs tracking-tighter",
                                            cat.status === "Active" ? "bg-green-50 text-green-600" : "bg-charcoal/5 text-muted-foreground"
                                        )}>
                                            {cat.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                                        <span className="flex items-center gap-1.5"><LayoutGrid size={10} className="text-accent" /> {cat.count} Products</span>
                                        <span className="w-1 h-1 rounded-full bg-charcoal/10" />
                                        <span className="flex items-center gap-1.5"><ChevronRight size={10} className="text-accent" /> {cat.subcategories.length} Sub-links</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="hidden md:flex flex-wrap items-center gap-2 justify-end max-w-md">
                                    {cat.subcategories.map(sub => (
                                        <Badge key={sub} variant="secondary" className="text-[7px] font-bold uppercase tracking-widest px-2 py-1 bg-secondary/5 border border-secondary/10 rounded-xs">
                                            {sub}
                                        </Badge>
                                    ))}
                                </div>
                                <div className="flex gap-2 ml-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleEditClick(cat); }}
                                        className="p-3 bg-white border border-charcoal/5 rounded-sm hover:border-accent hover:text-accent transition-all"
                                    >
                                        <Edit2 size={14} />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleDelete(cat.id); }}
                                        className="p-3 bg-white border border-charcoal/5 rounded-sm hover:border-red-500 hover:text-red-500 transition-all"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        </Reorder.Item>
                    ))}
                </AnimatePresence>
            </Reorder.Group>

            {/* Empty State */}
            {categories.length === 0 && (
                <div className="py-20 text-center border-2 border-dashed border-secondary/20 rounded-sm">
                    <LayoutGrid className="mx-auto text-secondary/20 mb-4" size={48} />
                    <p className="font-heading text-lg font-bold text-charcoal">No Structural Nodes Found</p>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-2">Begin by establishing your first product category.</p>
                </div>
            )}

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-2xl bg-white border-secondary/20 p-10 shadow-2xl">
                    <DialogHeader className="mb-8">
                        <DialogTitle className="font-heading text-3xl font-bold text-charcoal">
                            {categories.some((c: any) => c.id === editingCategory?.id) ? "Modify Structural Node" : "Initialize New Category"}
                        </DialogTitle>
                    </DialogHeader>

                    {editingCategory && (
                        <div className="space-y-8">
                            <div className="grid lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-1 space-y-4">
                                    <Label className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground">Category Banner</Label>
                                    <div className="aspect-[3/4] bg-secondary/10 border border-secondary/20 rounded-sm relative group overflow-hidden cursor-pointer">
                                        {editingCategory.image ? (
                                            <img src={editingCategory.image} className="w-full h-full object-cover group-hover:opacity-80 transition-opacity" />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-full gap-2 text-center p-4">
                                                <Folder className="text-secondary/40" size={32} />
                                                <span className="text-[7px] font-bold uppercase tracking-widest text-muted-foreground">No Media Linked</span>
                                            </div>
                                        )}
                                        <label className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer bg-charcoal/40 backdrop-blur-sm">
                                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                            <Edit2 size={24} className="text-accent" />
                                        </label>
                                    </div>
                                </div>

                                <div className="lg:col-span-2 space-y-8">
                                    <div className="grid grid-cols-1 gap-8">
                                        <div className="space-y-2">
                                            <Label className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground">Category Name</Label>
                                            <Input
                                                value={editingCategory.name}
                                                onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                                                className="bg-secondary/5 border-b border-transparent focus:border-accent rounded-none px-4 py-6 font-medium"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground">Lifecycle Status</Label>
                                            <Select
                                                value={editingCategory.status}
                                                onValueChange={(v: any) => setEditingCategory({ ...editingCategory, status: v })}
                                            >
                                                <SelectTrigger className="bg-secondary/5 border-b border-transparent focus:border-accent rounded-none h-14">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Active">Public / Active</SelectItem>
                                                    <SelectItem value="Draft">Internal / Draft</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Label className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground">Subcategories / Sub-links</Label>
                                <div className="flex gap-2">
                                    <Input
                                        value={newSub}
                                        onChange={(e) => setNewSub(e.target.value)}
                                        placeholder="Add subcategory..."
                                        className="bg-secondary/5 border-b border-transparent focus:border-accent rounded-none px-4"
                                        onKeyDown={(e) => e.key === 'Enter' && handleAddSub()}
                                    />
                                    <button
                                        onClick={handleAddSub}
                                        className="p-4 bg-charcoal text-accent hover:bg-accent hover:text-charcoal transition-all shrink-0"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {editingCategory.subcategories.map((sub: string) => (
                                        <Badge key={sub} variant="secondary" className="px-3 py-1 bg-secondary/10 text-charcoal border-none flex gap-2 items-center">
                                            {sub}
                                            <button onClick={() => handleRemoveSub(sub)} className="hover:text-red-500"><X size={10} /></button>
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <DialogFooter className="mt-12 pt-8 border-t border-secondary/10 flex justify-between">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="bg-secondary/10 text-charcoal px-8 py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-secondary/20 transition-all flex items-center gap-2"
                        >
                            <X size={14} />
                            Discard
                        </button>
                        <button
                            onClick={handleSave}
                            className="bg-charcoal text-accent px-12 py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-accent hover:text-charcoal transition-all shadow-luxury flex items-center gap-2"
                        >
                            <Save size={14} />
                            Commit Architecture
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ManageCategories;

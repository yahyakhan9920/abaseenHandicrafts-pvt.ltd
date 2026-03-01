import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Search,
    Filter,
    Edit3,
    Trash2,
    MoreVertical,
    CheckCircle2,
    AlertCircle,
    Package,
    ArrowUpDown,
    X,
    Save,
    Image as ImageIcon,
    Upload,
    Camera
} from "lucide-react";
import { cn } from "@/lib/utils";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useProducts, useSaveProducts, useCategories } from "@/hooks/use-store";
import { useToast } from "@/hooks/use-toast";

const ManageProducts = () => {
    const { data: products = [] } = useProducts();
    const { data: categories = [] } = useCategories();
    const saveProductsMutation = useSaveProducts();

    const [search, setSearch] = useState("");
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { toast } = useToast();

    const handleDelete = (id: number) => {
        const newProducts = products.filter((p: any) => p.id !== id);
        saveProductsMutation.mutate(newProducts, {
            onSuccess: () => {
                toast({
                    title: "SKU Decommissioned",
                    description: "Product has been removed from the active catalog.",
                });
            }
        });
    };

    const handleEditClick = (product: any) => {
        setEditingProduct({ ...product });
        setIsModalOpen(true);
    };

    const handleAddClick = () => {
        setEditingProduct({
            id: Date.now(),
            name: "",
            sku: `AHC-${Math.floor(1000 + Math.random() * 9000)}`,
            category: categories[0]?.name || "Uncategorized",
            moq: "50 pcs",
            stock: 0,
            status: "Pending",
            image: ""
        });
        setIsModalOpen(true);
    };

    const handleSaveProduct = () => {
        if (!editingProduct.name) {
            toast({ title: "Error", description: "Product name is required", variant: "destructive" });
            return;
        }

        let updated;
        const index = products.findIndex((p: any) => p.id === editingProduct.id);

        if (index > -1) {
            updated = [...products];
            updated[index] = editingProduct;
        } else {
            updated = [editingProduct, ...products];
        }

        saveProductsMutation.mutate(updated, {
            onSuccess: () => {
                setIsModalOpen(false);
                setEditingProduct(null);
                toast({
                    title: index > -1 ? "SKU Updated" : "SKU Initialized",
                    description: `Product ${editingProduct.sku} has been synchronized.`,
                });
            }
        });
    };

    const filtered = products.filter((p: any) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-10">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                {/* Header */}
                <div className="flex justify-between items-end">
                    <div>
                        <span className="text-accent text-[10px] font-bold uppercase tracking-[0.3em] block mb-2">Inventory Control</span>
                        <h1 className="font-heading text-4xl font-bold text-charcoal">Manage <span className="text-accent underline">Products</span></h1>
                    </div>
                    <button
                        onClick={handleAddClick}
                        className="flex items-center gap-3 px-8 py-4 bg-charcoal text-cream text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm hover:bg-accent hover:text-charcoal transition-all shadow-luxury group"
                    >
                        <Plus size={14} className="group-hover:rotate-90 transition-transform" />
                        Add New SKU
                    </button>
                </div>

                {/* Toolbar */}
                <div className="flex flex-wrap gap-4 items-center justify-between p-6 bg-white border border-secondary/20 rounded-sm shadow-sm">
                    <div className="relative flex-grow max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                        <input
                            type="text"
                            placeholder="Search SKUs, names, categories..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-secondary/5 border-b border-transparent focus:border-accent text-sm focus:outline-none transition-all"
                        />
                    </div>
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 px-6 py-3 border border-secondary/30 text-[10px] font-bold uppercase tracking-widest text-charcoal hover:bg-secondary/10 transition-colors">
                            <Filter size={14} />
                            Filter
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 border border-secondary/30 text-[10px] font-bold uppercase tracking-widest text-charcoal hover:bg-secondary/10 transition-colors">
                            <ArrowUpDown size={14} />
                            Sort
                        </button>
                    </div>
                </div>

                {/* Table Area */}
                <div className="bg-white border border-secondary/20 rounded-sm shadow-luxury overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-secondary/5 border-b border-secondary/20">
                                <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground w-12">
                                    <Package size={14} />
                                </th>
                                <th className="px-6 py-6 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Product Details</th>
                                <th className="px-6 py-6 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Category</th>
                                <th className="px-6 py-6 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">MOQ</th>
                                <th className="px-6 py-6 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Stock Volume</th>
                                <th className="px-6 py-6 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Lifecycle</th>
                                <th className="px-6 py-6 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence mode="popLayout">
                                {filtered.map((product, i) => (
                                    <motion.tr
                                        key={product.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="border-b border-secondary/10 hover:bg-secondary/5 transition-colors group"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="w-12 h-12 bg-secondary/10 rounded-sm border border-secondary/10 overflow-hidden flex items-center justify-center shrink-0">
                                                {product.image ? (
                                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <ImageIcon className="text-secondary/30" size={20} />
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <p className="font-heading text-sm font-bold text-charcoal leading-tight">{product.name}</p>
                                            <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-1">{product.sku}</p>
                                        </td>
                                        <td className="px-6 py-6 font-bold text-[10px] uppercase tracking-widest text-muted-foreground">
                                            {product.category}
                                        </td>
                                        <td className="px-6 py-6 font-bold text-[10px] uppercase tracking-widest text-charcoal">
                                            {product.moq}
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-2">
                                                <div className="flex-grow bg-secondary/10 h-1.5 rounded-full overflow-hidden max-w-[100px]">
                                                    <div
                                                        className={cn(
                                                            "h-full rounded-full transition-all duration-1000",
                                                            product.stock > 100 ? "bg-green-500 w-full" : product.stock > 0 ? "bg-orange-500 w-1/3" : "bg-red-500 w-0"
                                                        )}
                                                        style={{ width: `${Math.min((product.stock / 1000) * 100, 100)}%` }}
                                                    />
                                                </div>
                                                <span className="text-[10px] font-bold text-charcoal">{product.stock.toLocaleString()} Units</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className={cn(
                                                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest",
                                                product.status === "Active" ? "bg-green-100 text-green-700" :
                                                    product.status === "Low Stock" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"
                                            )}>
                                                {product.status === "Active" ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                                                {product.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleEditClick(product)}
                                                    className="p-2 hover:bg-charcoal hover:text-accent rounded-sm transition-all shadow-sm"
                                                >
                                                    <Edit3 size={14} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="p-2 hover:bg-red-500 hover:text-white rounded-sm transition-all shadow-sm"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                                <button className="p-2 hover:bg-secondary/20 rounded-sm transition-all">
                                                    <MoreVertical size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                    {filtered.length === 0 && (
                        <div className="py-20 text-center">
                            <AlertCircle size={48} className="mx-auto text-muted-foreground/30 mb-4" />
                            <p className="font-heading text-xl font-bold text-muted-foreground">No SKUs matched your search</p>
                            <button onClick={() => setSearch("")} className="text-accent font-bold uppercase tracking-widest text-[10px] mt-4 hover:underline">Clear all filters</button>
                        </div>
                    )}
                </div>

                <DialogContent className="max-w-2xl bg-white border-secondary/20 p-10 shadow-2xl">
                    <DialogHeader className="mb-8">
                        <DialogTitle className="font-heading text-3xl font-bold text-charcoal">
                            {products.some((p: any) => p.id === editingProduct?.id) ? "Modify Item Metadata" : "Initialize New SKU"}
                        </DialogTitle>
                    </DialogHeader>

                    {editingProduct && (
                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground">Product Identity</Label>
                                    <Input
                                        value={editingProduct.name}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                        placeholder="e.g. Royal Winter Shawl"
                                        className="bg-secondary/5 border-b border-transparent focus:border-accent rounded-none px-4 py-6 font-medium"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground">SKU Reference</Label>
                                    <Input
                                        value={editingProduct.sku}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                                        className="bg-secondary/5 border-b border-transparent focus:border-accent rounded-none px-4 py-6 font-mono text-xs"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground">Classification</Label>
                                    <Select
                                        value={editingProduct.category}
                                        onValueChange={(v) => setEditingProduct({ ...editingProduct, category: v })}
                                    >
                                        <SelectTrigger className="bg-secondary/5 border-b border-transparent focus:border-accent rounded-none h-14">
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((cat: any) => (
                                                <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                                            ))}
                                            <SelectItem value="Uncategorized">Uncategorized</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground">Stock Volume</Label>
                                    <Input
                                        type="number"
                                        value={editingProduct.stock}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) || 0 })}
                                        className="bg-secondary/5 border-b border-transparent focus:border-accent rounded-none px-4 py-6"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground">Lifecycle Status</Label>
                                    <Select
                                        value={editingProduct.status}
                                        onValueChange={(v) => setEditingProduct({ ...editingProduct, status: v })}
                                    >
                                        <SelectTrigger className="bg-secondary/5 border-b border-transparent focus:border-accent rounded-none h-14">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Active">Operational / Active</SelectItem>
                                            <SelectItem value="Low Stock">Critical / Low Stock</SelectItem>
                                            <SelectItem value="Pending">Initialized / Pending</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground">Wholesale MOQ</Label>
                                    <Input
                                        value={editingProduct.moq}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, moq: e.target.value })}
                                        className="bg-secondary/5 border-b border-transparent focus:border-accent rounded-none px-4 py-6"
                                    />
                                </div>
                            </div>

                            {/* Local Image Upload */}
                            <div className="col-span-2 pt-6 border-t border-secondary/10">
                                <Label className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground block mb-4">Product Visuals</Label>
                                <div className="flex gap-8 items-start">
                                    <div className="w-48 h-48 bg-secondary/5 border-2 border-dashed border-secondary/20 rounded-sm flex flex-col items-center justify-center relative group overflow-hidden">
                                        {editingProduct.image ? (
                                            <>
                                                <img src={editingProduct.image} alt="Preview" className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => setEditingProduct({ ...editingProduct, image: "" })}
                                                        className="p-2 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-center p-6">
                                                <ImageIcon size={32} className="text-muted-foreground/30 mx-auto mb-3" />
                                                <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">No Visual <br /> Synchronized</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-grow space-y-4">
                                        <div className="p-8 bg-secondary/5 rounded-sm border border-secondary/10">
                                            <p className="text-[9px] font-bold text-charcoal uppercase tracking-[0.2em] mb-4">Local Media Terminal</p>
                                            <div className="flex flex-col gap-3">
                                                <input
                                                    type="file"
                                                    id="product-image-upload"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            const reader = new FileReader();
                                                            reader.onloadend = () => {
                                                                setEditingProduct({ ...editingProduct, image: reader.result as string });
                                                                toast({
                                                                    title: "Binary Node Loaded",
                                                                    description: "Local file has been successfully mapped to SKU metadata.",
                                                                });
                                                            };
                                                            reader.readAsDataURL(file);
                                                        }
                                                    }}
                                                />
                                                <label
                                                    htmlFor="product-image-upload"
                                                    className="flex items-center justify-center gap-3 px-8 py-4 bg-charcoal text-cream text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm hover:bg-accent hover:text-charcoal transition-all cursor-pointer shadow-luxury group"
                                                >
                                                    <Upload size={14} className="group-hover:-translate-y-1 transition-transform" />
                                                    Browse Computer
                                                </label>
                                                <p className="text-[7px] text-muted-foreground font-bold uppercase tracking-widest text-center mt-2">
                                                    Supported Assets: JPG, PNG, WEBP (Maximum Resolution Recommended)
                                                </p>
                                            </div>
                                        </div>
                                    </div>
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
                            onClick={handleSaveProduct}
                            className="bg-charcoal text-accent px-12 py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-accent hover:text-charcoal transition-all shadow-luxury flex items-center gap-2"
                        >
                            <Save size={14} />
                            Commit Changes
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ManageProducts;

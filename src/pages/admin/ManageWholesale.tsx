import { useState } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import {
    Users,
    ShieldCheck,
    Plus,
    Edit3,
    Trash2,
    Star,
    CheckCircle2,
    Info,
    Save,
    GripVertical,
    ChevronUp,
    ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";

const initialTiers = [
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

import { useWholesaleTiers, useSaveWholesaleTiers } from "@/hooks/use-store";
import { useToast } from "@/hooks/use-toast";

const ManageWholesale = () => {
    const { data: tiers = [] } = useWholesaleTiers();
    const saveTiersMutation = useSaveWholesaleTiers();
    const { toast } = useToast();

    const handleSaveAll = () => {
        saveTiersMutation.mutate(tiers, {
            onSuccess: () => {
                toast({
                    title: "Deployment Successful",
                    description: "Partnership tiers have been updated across the global portal.",
                });
            }
        });
    };

    const handleAddTier = () => {
        const newTier = {
            id: Date.now(),
            name: "New Partnership Model",
            moq: "TBD",
            discount: "Negotiable",
            features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
            highlight: false,
            active: false
        };
        const updated = [newTier, ...tiers];
        saveTiersMutation.mutate(updated, {
            onSuccess: () => {
                toast({
                    title: "Model Provisioned",
                    description: "A new wholesale tier has been created in draft mode.",
                });
            }
        });
    };

    const handleToggleActive = (id: number) => {
        const updated = tiers.map((t: any) =>
            t.id === id ? { ...t, active: !t.active } : t
        );
        saveTiersMutation.mutate(updated);
    };

    const handleDelete = (id: number) => {
        const updated = tiers.filter((t: any) => t.id !== id);
        saveTiersMutation.mutate(updated, {
            onSuccess: () => {
                toast({
                    title: "Model Decommissioned",
                    description: "Partnership tier has been removed.",
                });
            }
        });
    };

    const handleSaveOrder = () => {
        saveTiersMutation.mutate(tiers, {
            onSuccess: () => {
                toast({
                    title: "Architecture Synchronized",
                    description: "Global wholesale tiers have been updated.",
                });
            }
        });
    };

    const handleUpdateTierField = (id: number, field: string, value: any) => {
        const updatedTiers = tiers.map(tier =>
            tier.id === id ? { ...tier, [field]: value } : tier
        );
        saveTiersMutation.mutate(updatedTiers);
    };

    const handleUpdateTierFeatures = (id: number, features: string[]) => {
        const updatedTiers = tiers.map(tier =>
            tier.id === id ? { ...tier, features: features } : tier
        );
        saveTiersMutation.mutate(updatedTiers);
    };

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <span className="text-accent text-[10px] font-bold uppercase tracking-[0.3em] block mb-2">Partnership Logic</span>
                    <h1 className="font-heading text-4xl font-bold text-charcoal">Wholesale <span className="text-accent underline">Tiers</span></h1>
                </div>
                <button
                    onClick={handleAddTier}
                    className="flex items-center gap-3 px-8 py-4 bg-charcoal text-cream text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm hover:bg-accent hover:text-charcoal transition-all shadow-luxury group"
                >
                    <Plus size={14} className="group-hover:rotate-90 transition-transform" />
                    Add New Model
                </button>
            </div>

            {/* Grid of Tiers */}
            <Reorder.Group
                axis="y"
                values={tiers}
                onReorder={(newOrder) => {
                    saveTiersMutation.mutate(newOrder);
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                <AnimatePresence mode="popLayout">
                    {tiers.map((tier, i) => (
                        <Reorder.Item
                            key={tier.id}
                            value={tier}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            whileDrag={{
                                scale: 1.05,
                                boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                                cursor: "grabbing"
                            }}
                            className={cn(
                                "relative bg-white border p-8 rounded-sm shadow-sm flex flex-col transition-all group cursor-grab active:cursor-grabbing",
                                tier.highlight ? "border-accent ring-1 ring-accent/20" : "border-secondary/20"
                            )}
                        >
                            {/* Priority Rank & Drag Handle Area */}
                            <div className="absolute left-3 top-0 bottom-0 w-8 flex flex-col items-center justify-between py-8 opacity-0 group-hover:opacity-100 transition-opacity border-r border-secondary/10 bg-secondary/[0.02]">
                                <button
                                    onClick={() => {
                                        if (i === 0) return;
                                        const newOrder = [...tiers];
                                        [newOrder[i - 1], newOrder[i]] = [newOrder[i], newOrder[i - 1]];
                                        saveTiersMutation.mutate(newOrder);
                                    }}
                                    className="p-1 hover:text-accent transition-colors disabled:opacity-10"
                                    disabled={i === 0}
                                >
                                    <ChevronUp size={14} />
                                </button>
                                <GripVertical size={16} className="text-muted-foreground/40" />
                                <button
                                    onClick={() => {
                                        if (i === tiers.length - 1) return;
                                        const newOrder = [...tiers];
                                        [newOrder[i + 1], newOrder[i]] = [newOrder[i], newOrder[i + 1]];
                                        saveTiersMutation.mutate(newOrder);
                                    }}
                                    className="p-1 hover:text-accent transition-colors disabled:opacity-10"
                                    disabled={i === tiers.length - 1}
                                >
                                    <ChevronDown size={14} />
                                </button>
                            </div>

                            <div className="flex justify-end mb-4 -mt-4 -mr-4">
                                <div className="bg-charcoal text-accent text-[8px] font-bold px-3 py-1 rounded-bl-sm flex items-center gap-2">
                                    <span>PRIORITY #</span>
                                    <input
                                        type="number"
                                        min="1"
                                        max={tiers.length}
                                        value={i + 1}
                                        onChange={(e) => {
                                            const targetRank = parseInt(e.target.value);
                                            if (isNaN(targetRank) || targetRank < 1 || targetRank > tiers.length) return;

                                            const newOrder = [...tiers];
                                            const [movedItem] = newOrder.splice(i, 1);
                                            newOrder.splice(targetRank - 1, 0, movedItem);

                                            saveTiersMutation.mutate(newOrder, {
                                                onSuccess: () => {
                                                    toast({
                                                        title: "Rank Reassigned",
                                                        description: `${movedItem.name} moved to Position #${targetRank}`,
                                                    });
                                                }
                                            });
                                        }}
                                        className="bg-accent/10 border border-accent/20 w-8 text-center focus:bg-accent focus:text-charcoal outline-none transition-colors rounded-xs"
                                    />
                                </div>
                            </div>

                            {tier.highlight && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-charcoal text-[9px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-lg z-10">
                                    Recommended Model
                                </div>
                            )}

                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <input
                                        className="font-heading text-xl font-bold text-charcoal bg-transparent border-b border-transparent focus:border-accent w-full outline-none"
                                        value={tier.name}
                                        onChange={(e) => handleUpdateTierField(tier.id, 'name', e.target.value)}
                                    />
                                    <input
                                        className="text-accent text-[10px] font-bold uppercase tracking-widest mt-1 bg-transparent border-b border-transparent focus:border-accent w-full outline-none"
                                        value={tier.moq}
                                        onChange={(e) => handleUpdateTierField(tier.id, 'moq', e.target.value)}
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleUpdateTierField(tier.id, 'highlight', !tier.highlight)}
                                        className={cn("p-2 rounded-sm transition-colors", tier.highlight ? "text-accent" : "text-muted-foreground hover:text-charcoal")}
                                    >
                                        <Star size={14} fill={tier.highlight ? "currentColor" : "none"} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(tier.id)}
                                        className="p-2 hover:bg-red-50/10 rounded-sm text-muted-foreground hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>

                            <div className="mb-8">
                                <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest mb-1">Pricing Strategy</p>
                                <input
                                    className="text-2xl font-heading font-bold text-charcoal bg-transparent border-b border-transparent focus:border-accent w-full outline-none"
                                    value={tier.discount}
                                    onChange={(e) => handleUpdateTierField(tier.id, 'discount', e.target.value)}
                                />
                            </div>

                            <div className="space-y-3 mb-10 flex-grow">
                                <div className="flex justify-between items-center mb-1">
                                    <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest text-accent">Provisions & Logistics</p>
                                    <button
                                        onClick={() => {
                                            const newFeatures = [...tier.features, "New Service Provision"];
                                            handleUpdateTierFeatures(tier.id, newFeatures);
                                        }}
                                        className="text-accent hover:text-charcoal transition-colors p-1"
                                    >
                                        <Plus size={12} />
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {tier.features.map((feat, fIndex) => (
                                        <div key={fIndex} className="flex items-center gap-3 group/feat">
                                            <CheckCircle2 size={12} className="text-accent shrink-0" />
                                            <input
                                                className="text-[10px] font-bold uppercase tracking-widest text-charcoal/70 bg-transparent border-b border-transparent focus:border-accent w-full outline-none"
                                                value={feat}
                                                onChange={(e) => {
                                                    const newFeatures = [...tier.features];
                                                    newFeatures[fIndex] = e.target.value;
                                                    handleUpdateTierFeatures(tier.id, newFeatures);
                                                }}
                                            />
                                            <button
                                                onClick={() => {
                                                    const newFeatures = tier.features.filter((_, index) => index !== fIndex);
                                                    handleUpdateTierFeatures(tier.id, newFeatures);
                                                }}
                                                className="opacity-0 group-hover/feat:opacity-40 hover:!opacity-100 transition-opacity p-1 text-red-500"
                                            >
                                                <Trash2 size={10} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-secondary/10 flex justify-between items-center">
                                <button
                                    onClick={() => {
                                        const newTiers = [...tiers];
                                        newTiers[i].active = !newTiers[i].active;
                                        saveTiersMutation.mutate(newTiers);
                                    }}
                                    className="flex items-center gap-2"
                                >
                                    <div className={cn("w-2 h-2 rounded-full", tier.active ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-red-500")} />
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">{tier.active ? "Portal Active" : "Internal Only"}</span>
                                </button>
                                <button
                                    onClick={() => {
                                        saveTiersMutation.mutate(tiers, {
                                            onSuccess: () => {
                                                toast({
                                                    title: "Tier Metadata Persisted",
                                                    description: "Technical specifications have been synchronized.",
                                                });
                                            }
                                        });
                                    }}
                                    className="p-2 bg-charcoal text-accent rounded-sm hover:scale-110 transition-transform shadow-luxury"
                                    title="Save Changes"
                                >
                                    <Save size={14} />
                                </button>
                            </div>
                        </Reorder.Item>
                    ))}
                </AnimatePresence>
            </Reorder.Group>

            {/* Info Card */}
            <div className="bg-charcoal p-10 rounded-sm border border-white/5 flex items-start gap-6 shadow-luxury">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center shrink-0">
                    <Info className="text-accent" size={24} />
                </div>
                <div>
                    <h4 className="font-heading text-xl font-bold text-cream mb-2">Automated Tier Sync</h4>
                    <p className="text-cream/40 text-sm max-w-2xl leading-relaxed">
                        Changes made to partnership tiers are instantly reflected on the public <span className="text-accent italic">Wholesale & Export</span> portal.
                        Ensure MOQs and features are verified before persisting changes to the global production environment.
                    </p>
                </div>
            </div>
        </div >
    );
};

export default ManageWholesale;

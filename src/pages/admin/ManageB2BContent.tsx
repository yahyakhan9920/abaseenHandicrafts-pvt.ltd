import { useState } from "react";
import { motion, Reorder } from "framer-motion";
import {
    BarChart3,
    Globe,
    Users,
    ShieldCheck,
    Save,
    RefreshCw,
    Trophy,
    Activity,
    Plus,
    GripVertical,
    ChevronUp,
    ChevronDown,
    Factory,
    Award,
    Eye,
    EyeOff
} from "lucide-react";
import { cn } from "@/lib/utils";

import { useB2BStats, useSaveB2BStats } from "@/hooks/use-store";
import { useToast } from "@/hooks/use-toast";

const iconMap: Record<string, any> = {
    export: Globe,
    capacity: BarChart3,
    craftsmen: Users,
    experience: Trophy,
    factory: Factory,
    clients: Award,
    compliance: ShieldCheck,
};

const ManageB2BContent = () => {
    const { data: stats = [] } = useB2BStats();
    const saveB2BStatsMutation = useSaveB2BStats();

    const [editingStat, setEditingStat] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { toast } = useToast();

    const handleDelete = (id: string) => {
        const updated = stats.filter((s: any) => s.id !== id);
        saveB2BStatsMutation.mutate(updated, {
            onSuccess: () => {
                toast({ title: "Metric Purged", description: "B2B statistic has been removed from live visibility." });
            }
        });
    };

    const handleEditClick = (stat: any) => {
        setEditingStat({ ...stat });
        setIsModalOpen(true);
    };

    const handleAddClick = () => {
        setEditingStat({ id: "", label: "", value: "", icon: "Globe" });
        setIsModalOpen(true);
    };

    const handleSave = () => {
        if (!editingStat.label || !editingStat.value) return;
        let updated;
        const index = stats.findIndex((s: any) => s.id === editingStat.id);
        if (index > -1) {
            updated = [...stats];
            updated[index] = editingStat;
        } else {
            const newId = editingStat.label.toLowerCase().replace(/\s+/g, '-');
            updated = [...stats, { ...editingStat, id: newId }];
        }

        saveB2BStatsMutation.mutate(updated, {
            onSuccess: () => {
                setIsModalOpen(false);
                setEditingStat(null);
                toast({ title: "Portal Synchronized", description: "Global B2B metrics have been updated." });
            }
        });
    };

    const handlePublishAllStats = () => {
        saveB2BStatsMutation.mutate(stats, {
            onSuccess: () => {
                toast({
                    title: "Signals Updated",
                    description: "Trust metrics and statistics are now live on public routes.",
                });
            }
        });
    };

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <span className="text-accent text-[10px] font-bold uppercase tracking-[0.3em] block mb-2">Digital Authority</span>
                    <h1 className="font-heading text-4xl font-bold text-charcoal">B2B <span className="text-accent underline">Content</span></h1>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => {
                            const newStat = {
                                id: `custom-${Date.now()}`,
                                label: "New Tech Signal",
                                value: "0 Units",
                                description: "Technical capability metric",
                                icon: "Activity"
                            };
                            const updated = [...stats, newStat];
                            saveB2BStatsMutation.mutate(updated, {
                                onSuccess: () => {
                                    toast({ title: "Metric Initialized", description: "New trust signal added to the portal." });
                                }
                            });
                        }}
                        className="flex items-center gap-3 px-8 py-4 bg-secondary/10 text-charcoal text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm hover:bg-secondary/20 transition-all border border-secondary/20"
                    >
                        <Plus size={14} />
                        Add New Metric
                    </button>
                    <button
                        onClick={handlePublishAllStats}
                        disabled={saveB2BStatsMutation.isPending}
                        className="flex items-center gap-3 px-10 py-4 bg-charcoal text-cream text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm hover:bg-accent hover:text-charcoal transition-all shadow-luxury disabled:opacity-50"
                    >
                        {saveB2BStatsMutation.isPending ? <RefreshCw className="animate-spin" size={14} /> : <Save size={14} />}
                        {saveB2BStatsMutation.isPending ? "Updating..." : "Publish Stats"}
                    </button>
                </div>
            </div>

            <Reorder.Group
                axis="y"
                values={stats}
                onReorder={(newOrder) => {
                    saveB2BStatsMutation.mutate(newOrder);
                }}
                className="grid lg:grid-cols-2 gap-8"
            >
                {stats.map((stat, i) => {
                    const Icon = iconMap[stat.id] || Activity;
                    return (
                        <Reorder.Item
                            key={stat.id}
                            value={stat}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileDrag={{
                                scale: 1.02,
                                boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                                zIndex: 50
                            }}
                            className="bg-white border border-secondary/20 p-10 rounded-sm shadow-sm space-y-8 group hover:border-accent/30 transition-all cursor-grab active:cursor-grabbing relative overflow-hidden"
                        >
                            {/* Priority Rank & Drag Handle Area */}
                            <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col items-center justify-between py-10 opacity-0 group-hover:opacity-100 transition-opacity border-r border-secondary/10 bg-secondary/[0.02]">
                                <button
                                    onClick={() => {
                                        if (i === 0) return;
                                        const newOrder = [...stats];
                                        [newOrder[i - 1], newOrder[i]] = [newOrder[i], newOrder[i - 1]];
                                        saveB2BStatsMutation.mutate(newOrder);
                                    }}
                                    className="p-1 hover:text-accent transition-colors disabled:opacity-10"
                                    disabled={i === 0}
                                >
                                    <ChevronUp size={16} />
                                </button>
                                <GripVertical size={18} className="text-muted-foreground/40" />
                                <button
                                    onClick={() => {
                                        if (i === stats.length - 1) return;
                                        const newOrder = [...stats];
                                        [newOrder[i + 1], newOrder[i]] = [newOrder[i], newOrder[i + 1]];
                                        saveB2BStatsMutation.mutate(newOrder);
                                    }}
                                    className="p-1 hover:text-accent transition-colors disabled:opacity-10"
                                    disabled={i === stats.length - 1}
                                >
                                    <ChevronDown size={16} />
                                </button>
                            </div>

                            <div className="flex justify-between items-start pl-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-charcoal group-hover:bg-accent/10 transition-colors">
                                        <Icon size={22} className="text-accent" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <div className="bg-charcoal text-accent text-[8px] font-bold px-2 py-0.5 rounded-sm flex items-center gap-1">
                                                <span>RANK #</span>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    max={stats.length}
                                                    value={i + 1}
                                                    onChange={(e) => {
                                                        const targetRank = parseInt(e.target.value);
                                                        if (isNaN(targetRank) || targetRank < 1 || targetRank > stats.length) return;

                                                        const newOrder = [...stats];
                                                        const [movedItem] = newOrder.splice(i, 1);
                                                        newOrder.splice(targetRank - 1, 0, movedItem);

                                                        saveB2BStatsMutation.mutate(newOrder, {
                                                            onSuccess: () => {
                                                                toast({
                                                                    title: "Hierarchy Updated",
                                                                    description: `${movedItem.label} shifted to Rank #${targetRank}`,
                                                                });
                                                            }
                                                        });
                                                    }}
                                                    className="bg-accent/10 border border-accent/20 w-6 text-center focus:bg-accent focus:text-charcoal outline-none transition-colors rounded-xs"
                                                />
                                            </div>
                                            <h3 className="font-heading text-xl font-bold text-charcoal">{stat.label}</h3>
                                        </div>
                                        <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">{stat.description || "System Metric"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => {
                                            const newStats = [...stats];
                                            newStats[i].active = !newStats[i].active;
                                            saveB2BStatsMutation.mutate(newStats, {
                                                onSuccess: () => {
                                                    toast({
                                                        title: newStats[i].active ? "Visibility Restored" : "Metric Hidden",
                                                        description: `${stat.label} is now ${newStats[i].active ? "visible" : "hidden"} on the portal.`
                                                    });
                                                }
                                            });
                                        }}
                                        className={cn(
                                            "flex flex-col items-center gap-1 transition-all",
                                            stat.active === false ? "opacity-40 grayscale" : "opacity-100"
                                        )}
                                        title={stat.active === false ? "Show on Portal" : "Hide from Portal"}
                                    >
                                        {stat.active === false ? <EyeOff size={16} className="text-muted-foreground" /> : <Eye size={16} className="text-accent" />}
                                        <span className={cn(
                                            "text-[8px] font-bold uppercase tracking-tighter",
                                            stat.active === false ? "text-muted-foreground" : "text-green-600"
                                        )}>
                                            {stat.active === false ? "Hidden" : "Public"}
                                        </span>
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-accent pl-1">Display Value</label>
                                    <input
                                        type="text"
                                        value={stat.value}
                                        onChange={(e) => {
                                            const newStats = [...stats];
                                            newStats[i].value = e.target.value;
                                            saveB2BStatsMutation.mutate(newStats);
                                        }}
                                        className="w-full bg-secondary/5 border-b border-charcoal/10 px-4 py-4 text-2xl font-heading font-bold text-charcoal focus:outline-none focus:border-accent transition-all placeholder:opacity-20"
                                        placeholder="e.g. 50+ Countries"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-charcoal/40 pl-1">Label / Context</label>
                                    <input
                                        type="text"
                                        value={stat.label}
                                        onChange={(e) => {
                                            const newStats = [...stats];
                                            newStats[i].label = e.target.value;
                                            saveB2BStatsMutation.mutate(newStats);
                                        }}
                                        className="w-full bg-transparent border-b border-charcoal/5 px-4 py-2 text-sm font-bold text-muted-foreground focus:outline-none focus:border-accent transition-all"
                                    />
                                </div>
                            </div>

                            <div className="pt-6 border-t border-secondary/10 flex justify-between items-center bg-secondary/[0.02] -mx-10 -mb-10 p-6 px-10">
                                <span className="text-[9px] font-bold uppercase tracking-widest flex items-center gap-2 text-charcoal/60">
                                    <Activity size={10} className="text-accent" />
                                    Metric ID: <span className="text-accent">{stat.id}</span>
                                </span>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => handleDelete(stat.id)}
                                        className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground hover:text-red-500 transition-colors"
                                    >
                                        Archive
                                    </button>
                                    <Trophy size={14} className="text-accent/40" />
                                </div>
                            </div>
                        </Reorder.Item>
                    );
                })}
            </Reorder.Group>

        </div >
    );
};

export default ManageB2BContent;

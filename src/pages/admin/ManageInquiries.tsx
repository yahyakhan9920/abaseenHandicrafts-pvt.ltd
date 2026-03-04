import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Mail,
    User,
    MapPin,
    Calendar,
    ExternalLink,
    Search,
    CheckCircle,
    Clock,
    MessageSquare,
    Building2,
    Phone,
    Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";

const initialInquiries = [
    {
        id: 1,
        company: "Luxury Boutique London",
        contact: "Sophie Turner",
        subject: "B2B Wholesale Account",
        volume: "500 - 2000 Pcs/Year",
        country: "United Kingdom",
        date: "2026-02-28",
        status: "Priority"
    },
    {
        id: 2,
        company: "Silk Road Textiles",
        contact: "Ahmed Al-Farsi",
        subject: "OEM / Private Label Project",
        volume: "2000+ Pcs/Year",
        country: "UAE",
        date: "2026-02-27",
        status: "Processing"
    },
    {
        id: 3,
        company: "Heritage Wraps Co.",
        contact: "John Doe",
        subject: "Full Technical Catalog Access",
        volume: "100 - 500 Pcs/Year",
        country: "Canada",
        date: "2026-02-26",
        status: "Completed"
    },
];

import { useInquiries, useSaveInquiries, useDeleteInquiry } from "@/hooks/use-store";
import { useToast } from "@/hooks/use-toast";

const ManageInquiries = () => {
    const { data: inquiries = [] } = useInquiries();
    const saveInquiriesMutation = useSaveInquiries();
    const deleteInquiryMutation = useDeleteInquiry();
    const [activeTab, setActiveTab] = useState("All");
    const [search, setSearch] = useState("");
    const { toast } = useToast();

    const handleUpdateStatus = (id: string, newStatus: string) => {
        const updated = inquiries.map((inq: any) =>
            inq.id === id ? { ...inq, status: newStatus } : inq
        );
        saveInquiriesMutation.mutate(updated, {
            onSuccess: () => {
                toast({
                    title: "Status Synchronized",
                    description: `Inquiry ${id} has been marked as ${newStatus}.`,
                });
            }
        });
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to permanently delete this inquiry?")) {
            deleteInquiryMutation.mutate(id, {
                onSuccess: () => {
                    toast({
                        title: "Inquiry Deleted",
                        description: `Inquiry ${id} has been permanently removed from the system.`,
                        variant: "destructive",
                    });
                }
            });
        }
    };

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <span className="text-accent text-[10px] font-bold uppercase tracking-[0.3em] block mb-2">Deal Pipeline</span>
                    <h1 className="font-heading text-4xl font-bold text-charcoal">B2B <span className="text-accent underline">Inquiries</span></h1>
                </div>
                <div className="flex gap-4 p-1 bg-white border border-secondary/20 rounded-sm">
                    {["All", "Priority", "Processing", "Completed"].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "px-6 py-2 text-[9px] uppercase font-bold tracking-widest rounded-sm transition-all",
                                activeTab === tab ? "bg-charcoal text-accent" : "text-muted-foreground hover:bg-secondary/5"
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Inquiry Grid */}
            <div className="grid gap-6">
                <AnimatePresence mode="popLayout">
                    {inquiries.filter(iq => activeTab === "All" || iq.status === activeTab).map((iq, i) => (
                        <motion.div
                            key={iq.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white border border-secondary/20 shadow-sm hover:shadow-luxury hover:border-accent/30 transition-all group overflow-hidden"
                        >
                            <div className="flex flex-wrap lg:flex-nowrap">
                                {/* Left: Metadata */}
                                <div className="w-full lg:w-80 p-10 bg-secondary/5 border-b lg:border-b-0 lg:border-r border-secondary/20 shrink-0 flex flex-col justify-between">
                                    <div>
                                        <div className={cn(
                                            "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest mb-8 shadow-sm",
                                            iq.status === "Priority" ? "bg-red-50 text-red-600 border border-red-200" :
                                                iq.status === "Processing" ? "bg-orange-50 text-orange-600 border border-orange-200" : "bg-green-50 text-green-600 border border-green-200"
                                        )}>
                                            <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse",
                                                iq.status === "Priority" ? "bg-red-500" : iq.status === "Processing" ? "bg-orange-500" : "bg-green-500"
                                            )} />
                                            {iq.status}
                                        </div>
                                        <div className="space-y-5">
                                            <div className="flex items-center gap-4 text-muted-foreground group/meta">
                                                <div className="w-8 h-8 rounded-full bg-white border border-secondary/10 flex items-center justify-center text-accent group-hover/meta:bg-accent group-hover/meta:text-white transition-colors">
                                                    <Calendar size={12} />
                                                </div>
                                                <div>
                                                    <p className="text-[8px] uppercase font-bold text-charcoal/30 tracking-tighter">Inquiry Date</p>
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal">{iq.date}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 text-muted-foreground group/meta">
                                                <div className="w-8 h-8 rounded-full bg-white border border-secondary/10 flex items-center justify-center text-accent group-hover/meta:bg-accent group-hover/meta:text-white transition-colors">
                                                    <MapPin size={12} />
                                                </div>
                                                <div>
                                                    <p className="text-[8px] uppercase font-bold text-charcoal/30 tracking-tighter">Export Region</p>
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal">{iq.country}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-8 mt-8 border-t border-secondary/10">
                                        <p className="text-[8px] uppercase font-bold text-charcoal/20 mb-2">Lead Trust Score</p>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map(s => <div key={s} className={cn("h-1 flex-grow rounded-full", s <= 4 ? "bg-accent" : "bg-secondary/20")} />)}
                                        </div>
                                    </div>
                                </div>

                                {/* Middle: Content */}
                                <div className="flex-grow p-10">
                                    <div className="flex justify-between items-start mb-8">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <Building2 size={16} className="text-accent" />
                                                <h3 className="font-heading text-2xl font-bold text-charcoal tracking-tight">{iq.company}</h3>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <p className="flex items-center gap-2 text-accent text-[10px] font-bold uppercase tracking-widest bg-accent/5 px-3 py-1 rounded-sm">
                                                    <User size={12} /> {iq.name}
                                                </p>
                                                <div className="flex items-center gap-2 text-muted-foreground text-[10px] font-bold uppercase tracking-widest">
                                                    <Mail size={12} className="text-secondary/40" /> {iq.email}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right bg-charcoal/5 p-4 rounded-sm border border-charcoal/5">
                                            <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-[0.2em] mb-1">Request Type</p>
                                            <p className="text-xs font-bold text-charcoal">{iq.subject}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 pt-10 border-t border-secondary/10">
                                        <div className="space-y-1 group/data">
                                            <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest group-hover/data:text-accent transition-colors">Proj. Annual Volume</p>
                                            <p className="text-sm font-bold text-charcoal">{iq.volume}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">Entity Verification</p>
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-white scale-75">
                                                    <CheckCircle size={10} />
                                                </div>
                                                <p className="text-[11px] font-bold text-charcoal">Global Dun & Bradstreet Verified</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Actions */}
                                <div className="w-full lg:w-56 p-10 flex lg:flex-col gap-4 justify-center border-t lg:border-t-0 lg:border-l border-secondary/20 bg-secondary/[0.02]">
                                    <button
                                        onClick={() => handleUpdateStatus(iq.id, "Processing")}
                                        className="flex-grow flex items-center justify-center gap-3 px-8 py-4 bg-charcoal text-accent text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-accent hover:text-charcoal transition-all shadow-luxury disabled:opacity-50"
                                        disabled={iq.status === "Processing" || iq.status === "Completed"}
                                    >
                                        Process Lead
                                        <Clock size={12} />
                                    </button>
                                    <button
                                        onClick={() => handleUpdateStatus(iq.id, "Completed")}
                                        className="flex-grow flex items-center justify-center gap-3 px-8 py-4 border border-charcoal/10 text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-green-600 hover:text-white transition-all text-charcoal shadow-sm disabled:opacity-50"
                                        disabled={iq.status === "Completed"}
                                    >
                                        Mark Done
                                        <CheckCircle size={12} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(iq.id)}
                                        className="flex-grow flex items-center justify-center gap-3 px-8 py-4 border border-red-200 text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all text-red-600 shadow-sm"
                                    >
                                        Remove
                                        <Trash2 size={12} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Empty State */}
            {false && (
                <div className="py-32 text-center opacity-30">
                    <MessageSquare size={64} className="mx-auto mb-6" />
                    <h2 className="font-heading text-2xl font-bold">Inbox Cleared</h2>
                    <p className="text-sm uppercase tracking-widest font-bold mt-2">No active inquiries in this filter</p>
                </div>
            )}
        </div>
    );
};

export default ManageInquiries;

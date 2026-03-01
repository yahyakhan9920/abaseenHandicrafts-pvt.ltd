import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
    TrendingUp,
    Users,
    Package,
    MessageSquare,
    ArrowUpRight,
    Globe,
    Clock,
    RefreshCcw,
    TrendingDown,
    Zap,
    ArrowUpDown,
    X,
    Save,
    CheckCircle2,
    AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

import { useInquiries, useProducts, useCategories } from "@/hooks/use-store"; // Changed import

const Dashboard = () => {
    const [lastSync, setLastSync] = useState(new Date());
    const [isSyncing, setIsSyncing] = useState(false);
    const [activeTab, setActiveTab] = useState("Inquiries");

    // Replaced data fetching with hooks
    const { data: inquiries = [], refetch: refetchInquiries } = useInquiries();
    const { data: products = [] } = useProducts();
    const { data: categories = [] } = useCategories();

    useEffect(() => {
        const interval = setInterval(() => {
            setIsSyncing(true);
            setTimeout(() => {
                setLastSync(new Date());
                setIsSyncing(false);
            }, 800);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    // Derived stats for new stats array
    const totalInquiries = inquiries.length; // Keep this for chartData
    const totalStock = products.reduce((acc: number, p: any) => acc + (p.stock || 0), 0);
    const activeInquiries = inquiries.filter((inq: any) => inq.status === "Priority").length;

    const stats = [
        { label: "Total Inquiries", value: inquiries.length.toLocaleString(), icon: MessageSquare, change: `+${activeInquiries}`, trend: "up", color: "text-accent" },
        { label: "Inventory Units", value: totalStock.toLocaleString(), icon: Package, change: "Current", trend: "up", color: "text-orange-500" },
        { label: "Live Categories", value: categories.filter((c: any) => c.status === "Active").length.toString(), icon: Globe, change: "Live", trend: "up", color: "text-accent" },
    ];

    // Updated chartData array
    const chartData = [
        { month: "Jan", value: 0 },
        { month: "Feb", value: 0 },
        { month: "Mar", value: 0 },
        { month: "Apr", value: 0 },
        { month: "May", value: 0 },
        { month: "Jun", value: totalInquiries > 0 ? 100 : 0 },
    ];

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex justify-between items-end border-b border-secondary/10 pb-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Zap size={14} className="text-accent fill-accent/20" />
                        <span className="text-accent text-[9px] font-bold uppercase tracking-[0.4em] block">Admin Intelligence Engine</span>
                    </div>
                    <h1 className="font-heading text-4xl font-bold text-charcoal tracking-tight">System <span className="text-accent underline decoration-accent/20">Executive</span></h1>
                </div>
                <div className="text-right">
                    <div className="flex items-center justify-end gap-2 text-[10px] uppercase font-bold text-muted-foreground tracking-widest leading-none mb-1">
                        {isSyncing ? "Establishing Secure Link..." : "Protocol Synchronized"}
                        <RefreshCcw size={10} className={cn("text-accent", isSyncing && "animate-spin")} />
                    </div>
                    <p className="text-xs font-bold text-charcoal flex items-center justify-end gap-2">
                        <Clock size={12} className="text-accent" />
                        {lastSync.toLocaleTimeString()}
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-white p-8 border border-secondary/20 rounded-sm shadow-sm hover:shadow-xl hover:border-accent/40 transition-all group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full translate-x-8 -translate-y-8 group-hover:bg-accent/10 transition-colors" />
                        <div className="flex justify-between items-start mb-8 relative z-10">
                            <div className="w-12 h-12 bg-secondary/5 rounded-full flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-charcoal transition-all shadow-inner">
                                <stat.icon size={20} />
                            </div>
                            <div className={cn("px-2 py-1 rounded-sm text-[8px] font-bold flex items-center gap-1",
                                stat.trend === "up" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600")}>
                                {stat.change}
                                {stat.trend === "up" ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                            </div>
                        </div>
                        <div className="relative z-10">
                            <p className="text-3xl font-heading font-bold text-charcoal mb-1 tracking-tight">{stat.value}</p>
                            <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-[0.2em]">{stat.label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-charcoal p-10 rounded-sm shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8">
                        <div className="flex gap-4">
                            {["Inquiries", "Conversion", "Export"].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={cn("text-[9px] uppercase font-bold tracking-widest transition-colors",
                                        activeTab === tab ? "text-accent" : "text-white/20 hover:text-white/40")}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-12">
                        <h3 className="font-heading text-xl font-bold text-white mb-2">Performance Analytics</h3>
                        <p className="text-[10px] uppercase font-bold text-accent tracking-[0.3em]">Monthly Growth Trajectory</p>
                    </div>

                    <div className="h-[240px] flex items-end justify-between gap-4 px-4 relative">
                        {/* Fake Grid Lines */}
                        <div className="absolute inset-0 border-b border-white/5 flex flex-col justify-between py-2 pointer-events-none">
                            {[1, 2, 3, 4].map(line => <div key={line} className="w-full border-t border-white/5" />)}
                        </div>

                        {chartData.map((d, i) => (
                            <div key={d.month} className="flex-1 flex flex-col items-center gap-4 relative z-10">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${d.value}%` }}
                                    transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                                    className="w-full max-w-[40px] bg-gradient-to-t from-accent/20 to-accent rounded-t-xs relative group/bar"
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-charcoal text-[9px] font-bold px-2 py-1 rounded-xs opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
                                        {d.value}% Growth
                                    </div>
                                </motion.div>
                                <span className="text-[9px] uppercase font-bold text-white/30 tracking-widest">{d.month}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-10 border border-secondary/20 shadow-luxury flex flex-col">
                    <div className="flex justify-between items-center mb-10 border-b border-secondary/10 pb-6">
                        <h3 className="font-heading text-lg font-bold text-charcoal flex items-center gap-3">
                            <RefreshCcw size={16} className="text-accent" />
                            Live Signals
                        </h3>
                        <ArrowUpRight size={16} className="text-secondary/40" />
                    </div>
                    <div className="space-y-8 flex-grow">
                        {inquiries.slice(0, 4).map((inq: any, i: number) => (
                            <motion.div
                                key={inq.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1 + (i * 0.1) }}
                                className="flex gap-4 items-start group"
                            >
                                <div className={cn(
                                    "w-2 h-2 rounded-full mt-1.5 animate-pulse shadow-[0_0_8px_rgba(197,165,114,0.5)]",
                                    inq.status === "Unread" ? "bg-accent" : "bg-muted-foreground/30"
                                )} />
                                <div className="overflow-hidden">
                                    <p className="text-[11px] font-bold text-charcoal group-hover:text-accent transition-colors truncate">{inq.subject}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={cn(
                                            "text-[8px] font-bold px-1.5 py-0.5 rounded-xs uppercase tracking-tighter",
                                            inq.status === "Unread" ? "text-green-600 bg-green-50" : "text-muted-foreground bg-secondary/10"
                                        )}>{inq.status}</span>
                                        <p className="text-[8px] uppercase tracking-widest text-muted-foreground whitespace-nowrap">{inq.name} • {inq.date.split(' ')[1]}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <Link to="/admin/logs" className="w-full py-4 mt-10 border border-charcoal/10 text-[9px] font-bold uppercase tracking-[0.3em] text-charcoal hover:bg-charcoal hover:text-accent transition-all text-center block">
                        View Audit Log
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

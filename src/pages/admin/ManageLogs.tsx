import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Terminal,
    Shield,
    Search,
    Filter,
    Download,
    Clock,
    AlertTriangle,
    CheckCircle2,
    Fingerprint,
    Cpu,
    ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

import { useLogs, useClearLogs } from "@/hooks/use-store";

const ManageLogs = () => {
    const { data: logs = [] } = useLogs();
    const clearLogsMutation = useClearLogs();
    const [search, setSearch] = useState("");
    const { toast } = useToast();

    const handleExport = () => {
        toast({
            title: "Logs Exported",
            description: "Encrypted audit trail has been sent to the authorized endpoint.",
        });
    };

    const handleClear = () => {
        if (window.confirm("Are you sure you want to clear all non-critical logs? Critical system trace will be archived.")) {
            clearLogsMutation.mutate(undefined, {
                onSuccess: () => {
                    toast({
                        title: "Audit Trail Purged",
                        description: "Temporary activity records have been cleared.",
                    });
                }
            });
        }
    };

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex justify-between items-end border-b border-secondary/10 pb-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Fingerprint size={14} className="text-accent" />
                        <span className="text-accent text-[9px] font-bold uppercase tracking-[0.4em] block">ISO 27001 Audit Protocol</span>
                    </div>
                    <h1 className="font-heading text-4xl font-bold text-charcoal tracking-tight">Activity <span className="text-accent underline decoration-accent/20">Telemetry</span></h1>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={handleExport}
                        className="bg-white border border-charcoal/10 text-charcoal px-8 py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:border-accent transition-all flex items-center gap-2 shadow-sm"
                    >
                        <Download size={14} />
                        Export Audit Trail
                    </button>
                    <button
                        onClick={handleClear}
                        className="bg-charcoal text-accent px-8 py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-accent hover:text-charcoal transition-all shadow-luxury flex items-center gap-2"
                    >
                        <Cpu size={14} />
                        Clear Non-Critical
                    </button>
                </div>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Stability", value: "99.98%", icon: Shield, color: "text-green-600" },
                    { label: "Active Logs", value: `${logs.length} Entries`, icon: AlertTriangle, color: "text-orange-500" },
                    { label: "Sync Latency", value: "14ms", icon: Clock, color: "text-blue-500" },
                    { label: "Security Tier", value: "Level 4", icon: Terminal, color: "text-accent" },
                ].map((stat, i) => (
                    <div key={stat.label} className="bg-white p-6 border border-secondary/10 flex flex-col justify-between h-32">
                        <stat.icon size={16} className={stat.color} />
                        <div>
                            <p className="text-2xl font-bold text-charcoal">{stat.value}</p>
                            <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Logs Table */}
            <div className="bg-charcoal p-10 rounded-sm shadow-2xl relative overflow-hidden group">
                <div className="flex justify-between items-center mb-8">
                    <div className="relative w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={14} />
                        <input
                            type="text"
                            placeholder="FILTER TELEMETRY..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-white/5 border-b border-white/10 pl-12 pr-4 py-3 text-[10px] font-bold text-white uppercase tracking-widest outline-none focus:border-accent"
                        />
                    </div>
                    <button className="text-[9px] font-bold text-white/30 hover:text-accent uppercase tracking-widest flex items-center gap-2 transition-colors">
                        <Filter size={14} /> Advanced Filter
                    </button>
                </div>

                <div className="overflow-x-auto min-h-[400px]">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="pb-4 text-[8px] uppercase font-bold text-white/40 tracking-[0.3em] pl-2">Timestamp</th>
                                <th className="pb-4 text-[8px] uppercase font-bold text-white/40 tracking-[0.3em]">Authorized Agent</th>
                                <th className="pb-4 text-[8px] uppercase font-bold text-white/40 tracking-[0.3em]">Action Logic</th>
                                <th className="pb-4 text-[8px] uppercase font-bold text-white/40 tracking-[0.3em]">Impact</th>
                                <th className="pb-4 text-[8px] uppercase font-bold text-white/40 tracking-[0.3em]">Relay Status</th>
                                <th className="pb-4 text-[8px] uppercase font-bold text-white/40 tracking-[0.3em]">Source IP</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {logs.filter((l: any) => l.action.toLowerCase().includes(search.toLowerCase())).map((log: any) => (
                                <tr key={log.id} className="group hover:bg-white/5 transition-colors">
                                    <td className="py-5 pl-2">
                                        <p className="text-[10px] font-bold text-accent">{log.timestamp.split(' ')[1]}</p>
                                        <p className="text-[8px] text-white/30">{log.timestamp.split(' ')[0]}</p>
                                    </td>
                                    <td className="py-5">
                                        <p className="text-[11px] font-bold text-white uppercase">{log.user}</p>
                                        <p className="text-[8px] text-accent/60 uppercase tracking-widest">{log.role}</p>
                                    </td>
                                    <td className="py-5">
                                        <p className="text-[10px] font-medium text-white/70 max-w-xs">{log.action}</p>
                                    </td>
                                    <td className="py-5">
                                        <span className={cn("text-[8px] font-bold px-2 py-0.5 rounded-xs uppercase tracking-tighter",
                                            log.impact === "High" ? "bg-red-500/10 text-red-500" : log.impact === "Medium" ? "bg-orange-500/10 text-orange-500" : "bg-green-500/10 text-green-500")}>
                                            {log.impact}
                                        </span>
                                    </td>
                                    <td className="py-5">
                                        <div className="flex items-center gap-2">
                                            {log.status === "Success" ? <CheckCircle2 size={12} className="text-green-500" /> : <AlertTriangle size={12} className="text-red-500" />}
                                            <span className={cn("text-[9px] font-bold uppercase", log.status === "Success" ? "text-green-600" : "text-red-600")}>{log.status}</span>
                                        </div>
                                    </td>
                                    <td className="py-5">
                                        <div className="flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity">
                                            <span className="text-[10px] font-mono text-white/60">{log.ip}</span>
                                            <ExternalLink size={10} className="text-accent" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {logs.length === 0 && (
                        <div className="py-32 text-center opacity-20">
                            <Fingerprint size={48} className="mx-auto mb-4 text-white" />
                            <p className="text-[10px] font-bold text-white uppercase tracking-[0.5em]">No Cryptographic Trace Found</p>
                        </div>
                    )}
                </div>

                {/* Footer Trace */}
                <div className="mt-10 pt-6 border-t border-white/5 flex justify-between items-center text-[7px] text-white/10 uppercase font-black tracking-[0.5em]">
                    <span>Encryption: AES-256-GCM</span>
                    <span>Verified By Abaseen Security Node #4421</span>
                    <span>Session: ACTIVE_TRACE_PROTO_v5</span>
                </div>
            </div>
        </div>
    );
};

export default ManageLogs;

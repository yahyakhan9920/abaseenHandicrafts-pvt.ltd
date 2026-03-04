import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Globe,
    Settings,
    ShieldCheck,
    Mail,
    MapPin,
    Save,
    RefreshCw,
    MessageCircle,
    Phone,
    Facebook,
    Instagram,
    Linkedin,
    Trash2,
    Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSiteSettings, useSaveSiteSettings, useResetData } from "@/hooks/use-store";
import { useToast } from "@/hooks/use-toast";

const AdminSettings = () => {
    const { data: settings } = useSiteSettings();
    const saveSettingsMutation = useSaveSiteSettings();
    const resetDataMutation = useResetData();
    const { toast } = useToast();

    const [activeSection, setActiveSection] = useState("Global");
    const [localSettings, setLocalSettings] = useState<any>(null);
    const [confirmReset, setConfirmReset] = useState(false);

    useEffect(() => {
        if (settings) {
            setLocalSettings(settings);
            setConfirmReset(false);
        }
    }, [settings]);

    if (!localSettings) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-pulse text-accent font-bold uppercase tracking-widest text-xs">Accessing System Configuration...</div>
        </div>
    );

    const sections = [
        { id: "Global", icon: Settings },
        { id: "Connectivity", icon: MessageCircle },
        { id: "SEO", icon: Globe },
        { id: "Security", icon: ShieldCheck },
    ];

    const handleSave = () => {
        saveSettingsMutation.mutate(localSettings, {
            onSuccess: () => {
                toast({
                    title: "System Config Synchronized",
                    description: "Global site settings have been updated and cached.",
                    className: "bg-charcoal text-accent border-accent/20"
                });
            }
        });
    };

    const updateContact = (field: string, value: string) => {
        setLocalSettings({
            ...localSettings,
            contact: { ...localSettings.contact, [field]: value }
        });
    };

    const updateSocials = (field: string, value: string) => {
        setLocalSettings({
            ...localSettings,
            socials: { ...localSettings.socials, [field]: value }
        });
    };

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="flex justify-between items-end border-b border-secondary/10 pb-8">
                <div>
                    <span className="text-accent text-[9px] font-bold uppercase tracking-[0.4em] block mb-2">Central Logic Control</span>
                    <h1 className="font-heading text-4xl font-bold text-charcoal tracking-tight">System <span className="text-accent underline decoration-accent/20">Configuration</span></h1>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saveSettingsMutation.isPending}
                    className="flex items-center gap-3 px-10 py-4 bg-charcoal text-accent text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-accent hover:text-charcoal transition-all shadow-luxury disabled:opacity-50"
                >
                    {saveSettingsMutation.isPending ? <RefreshCw className="animate-spin" size={14} /> : <Save size={14} />}
                    {saveSettingsMutation.isPending ? "Establishing Persistence..." : "Persist Changes"}
                </button>
            </div>

            <div className="grid lg:grid-cols-4 gap-12">
                {/* Navigation */}
                <div className="space-y-2">
                    {sections.map(s => (
                        <button
                            key={s.id}
                            onClick={() => setActiveSection(s.id)}
                            className={cn(
                                "w-full flex items-center gap-4 px-6 py-4 rounded-sm transition-all text-[10px] font-bold uppercase tracking-widest",
                                activeSection === s.id ? "bg-charcoal text-accent shadow-luxury" : "text-muted-foreground hover:bg-secondary/5 hover:text-charcoal"
                            )}
                        >
                            <s.icon size={16} className={cn(activeSection === s.id ? "text-accent" : "text-accent/40")} />
                            {s.id}
                        </button>
                    ))}

                    <div className="mt-12 p-8 bg-secondary/5 rounded-sm border border-secondary/10 relative overflow-hidden group">
                        <Zap size={40} className="absolute -right-4 -bottom-4 text-accent/5 transition-transform group-hover:scale-110" />
                        <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest mb-6 border-b border-accent/10 pb-2">Core Telemetry</p>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-[8px] font-bold text-charcoal uppercase tracking-tighter">Database Node</span>
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                            </div>
                            <div className="flex justify-between items-center opacity-40">
                                <span className="text-[8px] font-bold text-charcoal uppercase tracking-tighter">Cache Interface</span>
                                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[8px] font-bold text-charcoal uppercase tracking-tighter">Sync Protocol</span>
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="lg:col-span-3 space-y-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-white border border-secondary/20 rounded-sm shadow-luxury p-10 lg:p-16 min-h-[500px]"
                        >
                            {activeSection === "Global" && (
                                <div className="space-y-12">
                                    <div className="space-y-2 border-b border-secondary/10 pb-6">
                                        <h3 className="font-heading text-2xl font-bold text-charcoal tracking-tight text-gradient-gold inline-block">Global Metadata</h3>
                                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Master site identity and primary SEO fallbacks.</p>
                                    </div>
                                    <div className="space-y-8">
                                        <div className="space-y-3">
                                            <label className="text-[9px] uppercase font-bold tracking-[0.2em] text-muted-foreground block pl-1">Primary Brand Title</label>
                                            <input
                                                type="text"
                                                value={localSettings.brandName}
                                                onChange={(e) => setLocalSettings({ ...localSettings, brandName: e.target.value })}
                                                className="w-full bg-secondary/5 border-b border-charcoal/10 px-5 py-4 text-sm font-bold focus:outline-none focus:border-accent focus:bg-white transition-all"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[9px] uppercase font-bold tracking-[0.2em] text-muted-foreground block pl-1">Global Site Description</label>
                                            <textarea
                                                rows={4}
                                                value={localSettings.description}
                                                onChange={(e) => setLocalSettings({ ...localSettings, description: e.target.value })}
                                                className="w-full bg-secondary/5 border-b border-charcoal/10 px-5 py-4 text-sm font-medium leading-relaxed focus:outline-none focus:border-accent focus:bg-white transition-all resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeSection === "Connectivity" && (
                                <div className="space-y-12">
                                    <div className="space-y-2 border-b border-secondary/10 pb-6">
                                        <h3 className="font-heading text-2xl font-bold text-charcoal tracking-tight text-gradient-gold inline-block">Primary Touchpoints</h3>
                                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Manage WhatsApp, Direct Dial, and Global Email channels.</p>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-10">
                                        <div className="space-y-6">
                                            <div className="space-y-3">
                                                <label className="text-[9px] uppercase font-bold tracking-[0.2em] text-muted-foreground block pl-1 flex items-center gap-2">
                                                    <MessageCircle size={12} className="text-green-500" /> WhatsApp Direct Link
                                                </label>
                                                <input
                                                    type="url"
                                                    value={localSettings.contact.whatsapp}
                                                    onChange={(e) => updateContact('whatsapp', e.target.value)}
                                                    placeholder="https://wa.me/number"
                                                    className="w-full bg-secondary/5 border-b border-charcoal/10 px-5 py-4 text-sm focus:outline-none focus:border-accent focus:bg-white transition-all"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[9px] uppercase font-bold tracking-[0.2em] text-muted-foreground block pl-1 flex items-center gap-2">
                                                    <Mail size={12} className="text-accent" /> Official Email
                                                </label>
                                                <input
                                                    type="email"
                                                    value={localSettings.contact.email}
                                                    onChange={(e) => updateContact('email', e.target.value)}
                                                    className="w-full bg-secondary/5 border-b border-charcoal/10 px-5 py-4 text-sm focus:outline-none focus:border-accent focus:bg-white transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="space-y-3">
                                                <label className="text-[9px] uppercase font-bold tracking-[0.2em] text-muted-foreground block pl-1 flex items-center gap-2">
                                                    <Phone size={12} className="text-accent" /> Customer Support Dial
                                                </label>
                                                <input
                                                    type="text"
                                                    value={localSettings.contact.phone}
                                                    onChange={(e) => updateContact('phone', e.target.value)}
                                                    className="w-full bg-secondary/5 border-b border-charcoal/10 px-5 py-4 text-sm focus:outline-none focus:border-accent focus:bg-white transition-all"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[9px] uppercase font-bold tracking-[0.2em] text-muted-foreground block pl-1 flex items-center gap-2">
                                                    <MapPin size={12} className="text-accent" /> HQ Physical Address
                                                </label>
                                                <input
                                                    type="text"
                                                    value={localSettings.contact.address}
                                                    onChange={(e) => updateContact('address', e.target.value)}
                                                    className="w-full bg-secondary/5 border-b border-charcoal/10 px-5 py-4 text-sm focus:outline-none focus:border-accent focus:bg-white transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-10 border-t border-secondary/10">
                                        <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-[0.3em] mb-8">Social Ecosystem Connectivity</p>
                                        <div className="grid grid-cols-3 gap-6">
                                            {[
                                                { icon: Facebook, field: 'facebook', color: 'text-blue-600' },
                                                { icon: Instagram, field: 'instagram', color: 'text-pink-600' },
                                                { icon: Linkedin, field: 'linkedin', color: 'text-blue-700' },
                                            ].map(social => (
                                                <div key={social.field} className="space-y-2">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <social.icon size={14} className={social.color} />
                                                        <span className="text-[8px] font-bold uppercase tracking-widest">{social.field}</span>
                                                    </div>
                                                    <input
                                                        type="url"
                                                        value={localSettings.socials[social.field]}
                                                        onChange={(e) => updateSocials(social.field, e.target.value)}
                                                        className="w-full bg-secondary/5 border-b border-charcoal/10 px-4 py-2 text-[10px] focus:outline-none focus:border-accent"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeSection === "SEO" && (
                                <div className="space-y-12">
                                    <div className="space-y-2 border-b border-secondary/10 pb-6">
                                        <h3 className="font-heading text-2xl font-bold text-charcoal tracking-tight text-gradient-gold inline-block">Crawl Optimization</h3>
                                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Global indexing protocols and sitemap generation directives.</p>
                                    </div>
                                    <div className="space-y-4">
                                        {[
                                            { label: "Search Engine Indexing", status: "Active", desc: "Allowing robots to parse brand data." },
                                            { label: "Sitemap Auto-Generation", status: "Enabled", desc: "Rebuilding sitemap nodes on content change." },
                                            { label: "Google Console Data Link", status: "Operational", desc: "GSC API handshake established." },
                                        ].map(item => (
                                            <div key={item.label} className="flex justify-between items-center p-6 border border-secondary/10 rounded-sm hover:border-accent/20 transition-all">
                                                <div className="space-y-1">
                                                    <span className="text-[10px] font-bold text-charcoal uppercase tracking-widest block">{item.label}</span>
                                                    <p className="text-[8px] text-muted-foreground uppercase tracking-widest">{item.desc}</p>
                                                </div>
                                                <span className="text-[9px] font-bold uppercase px-4 py-1.5 rounded-full bg-green-50 text-green-700 border border-green-100 shadow-sm">
                                                    {item.status}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeSection === "Security" && (
                                <div className="space-y-12">
                                    <div className="space-y-2 border-b border-secondary/10 pb-6">
                                        <h3 className="font-heading text-2xl font-bold text-charcoal tracking-tight text-gradient-gold inline-block">Infrastructure Integrity</h3>
                                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Enterprise-grade security and SSL link management.</p>
                                    </div>
                                    <div className="bg-charcoal p-12 rounded-sm relative overflow-hidden">
                                        <Zap size={100} className="absolute -right-10 -bottom-10 text-white/5" />
                                        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                                            <ShieldCheck size={48} className="text-accent" />
                                            <div className="space-y-2">
                                                <p className="text-cream text-lg font-heading font-bold">Standard SSL/TLS Active</p>
                                                <p className="text-accent/60 text-[10px] uppercase tracking-[0.3em] font-bold">All client-server transmission is industry-standard encrypted.</p>
                                            </div>
                                            <div className="flex gap-4 pt-4">
                                                <div className="px-6 py-2 border border-white/10 rounded-full text-[8px] font-bold text-cream uppercase tracking-widest">v1.3 TLS</div>
                                                <div className="px-6 py-2 border border-white/10 rounded-full text-[8px] font-bold text-cream uppercase tracking-widest">AES-256 Bit</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Footer Utility */}
                    <div className="flex justify-between items-center p-8 bg-secondary/5 border border-secondary/10 rounded-sm">
                        <div className="flex items-center gap-4">
                            <Trash2 size={24} className={cn("transition-colors", confirmReset ? "text-red-600" : "text-red-500/40")} />
                            <div>
                                <h4 className="text-xs font-bold text-charcoal uppercase tracking-widest uppercase">Emergency System Reset</h4>
                                <p className="text-[8px] text-muted-foreground uppercase tracking-widest font-bold mt-1">
                                    {confirmReset ? "Are you sure? This will wipe all changes and reload the site." : "Clear all local caches and return to factory state."}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            {confirmReset && (
                                <button
                                    onClick={() => setConfirmReset(false)}
                                    className="px-6 py-4 text-[9px] font-bold uppercase tracking-widest text-muted-foreground hover:text-charcoal transition-all"
                                >
                                    Cancel
                                </button>
                            )}
                            <button
                                onClick={() => {
                                    if (confirmReset) {
                                        resetDataMutation.mutate();
                                    } else {
                                        setConfirmReset(true);
                                    }
                                }}
                                disabled={resetDataMutation.isPending}
                                className={cn(
                                    "px-10 py-4 border text-[9px] font-bold uppercase tracking-widest transition-all",
                                    confirmReset
                                        ? "bg-red-600 text-white border-red-600 hover:bg-red-700"
                                        : "border-red-500/20 text-red-600 hover:bg-red-500 hover:text-white"
                                )}
                            >
                                {resetDataMutation.isPending ? "Restoring..." : confirmReset ? "Confirm Reset" : "Initiate Protocol"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;

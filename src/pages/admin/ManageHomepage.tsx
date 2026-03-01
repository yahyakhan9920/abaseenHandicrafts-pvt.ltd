import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Layout,
    Image as ImageIcon,
    Type,
    Save,
    Eye,
    Plus,
    Trash2,
    MoveUp,
    MoveDown,
    Sparkles,
    Settings2,
    Upload,
    ChevronUp,
    ChevronDown
} from "lucide-react";
import { useHomepageContent, useSaveHomepageContent } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface HeroSlide {
    id: string;
    title: string;
    subtitle: string;
    ctaText: string;
    image: string;
}

const ManageHomepage = () => {
    const { data: homeContent } = useHomepageContent();
    const saveHomeMutation = useSaveHomepageContent();
    const { toast } = useToast();

    const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
    const [aboutContent, setAboutContent] = useState<any>(null);
    const [activeSection, setActiveSection] = useState<"Hero" | "About">("Hero");

    // Sync local state when remote data arrives
    useEffect(() => {
        if (homeContent) {
            setHeroSlides(homeContent.hero);
            setAboutContent(homeContent.about);
        }
    }, [homeContent]);

    if (!homeContent || !aboutContent) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-pulse text-accent font-bold uppercase tracking-widest text-xs">Synchronizing Core Narrative...</div>
        </div>
    );

    const handleAddSlide = () => {
        const newSlide: HeroSlide = {
            id: Date.now().toString(),
            title: "New Architectural Vision",
            subtitle: "Enter description here...",
            ctaText: "Discover More",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80"
        };
        setHeroSlides([...heroSlides, newSlide]);
        toast({ title: "Storyboard Node Initialized", description: "A new slide has been added to your draft." });
    };

    const handleDeleteSlide = (id: string) => {
        setHeroSlides(heroSlides.filter(s => s.id !== id));
        toast({ title: "Slide Decommissioned", description: "The storyboard node has been removed." });
    };

    const handleMoveSlide = (index: number, direction: 'up' | 'down') => {
        const newSlides = [...heroSlides];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex >= 0 && newIndex < newSlides.length) {
            [newSlides[index], newSlides[newIndex]] = [newSlides[newIndex], newSlides[index]];
            setHeroSlides(newSlides);
        }
    };

    const handleSave = () => {
        saveHomeMutation.mutate({
            ...homeContent,
            hero: heroSlides,
            about: aboutContent
        }, {
            onSuccess: () => {
                toast({
                    title: "Visual Identity Deployed",
                    description: "Homepage refinements are now live and synchronized globally.",
                    className: "bg-charcoal text-accent border-accent/20"
                });
            }
        });
    };

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex justify-between items-end border-b border-secondary/10 pb-8">
                <div>
                    <span className="text-accent text-[9px] font-bold uppercase tracking-[0.4em] block mb-2">Visual Identity Control</span>
                    <h1 className="font-heading text-4xl font-bold text-charcoal tracking-tight">Homepage <span className="text-accent underline decoration-accent/20">Editorial</span></h1>
                </div>
                <div className="flex gap-4">
                    <button className="bg-white border border-charcoal/10 text-charcoal px-6 py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:border-accent transition-all flex items-center gap-2">
                        <Eye size={14} />
                        Preview Draft
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-charcoal text-accent px-8 py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-accent hover:text-charcoal transition-all shadow-luxury flex items-center gap-2"
                    >
                        <Save size={14} />
                        Publish Changes
                    </button>
                </div>
            </div>

            {/* Section Switcher */}
            <div className="flex gap-1 border-b border-secondary/10 pb-px">
                {["Hero", "About"].map((sec) => (
                    <button
                        key={sec}
                        onClick={() => setActiveSection(sec as any)}
                        className={cn(
                            "px-8 py-4 text-[10px] font-bold uppercase tracking-[0.3em] transition-all relative",
                            activeSection === sec ? "text-accent" : "text-muted-foreground hover:text-charcoal"
                        )}
                    >
                        {sec} Section
                        {activeSection === sec && (
                            <motion.div layoutId="sec-tab" className="absolute bottom-0 left-0 w-full h-0.5 bg-accent" />
                        )}
                    </button>
                ))}
            </div>

            <div className="bg-white border border-secondary/20 p-10 shadow-luxury">
                <AnimatePresence mode="wait">
                    {activeSection === "Hero" ? (
                        <motion.div
                            key="hero-editor"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-10"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-heading text-xl font-bold text-charcoal flex items-center gap-2">
                                        <Sparkles size={18} className="text-accent" />
                                        Hero Storyboards
                                    </h3>
                                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-1">Manage slides and lead copy</p>
                                </div>
                                <button
                                    onClick={handleAddSlide}
                                    className="text-[9px] font-bold uppercase tracking-widest text-accent hover:underline flex items-center gap-1 transition-all"
                                >
                                    <Plus size={12} /> Add New Slide
                                </button>
                            </div>

                            <div className="space-y-6">
                                {heroSlides.map((slide, i) => (
                                    <div key={slide.id} className="grid lg:grid-cols-2 gap-10 p-8 border border-secondary/10 bg-secondary/5 rounded-sm relative group transition-all hover:border-accent/20">
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest flex items-center gap-2">
                                                    <Type size={12} className="text-accent" /> Main Headline
                                                </label>
                                                <input
                                                    type="text"
                                                    value={slide.title}
                                                    onChange={(e) => setHeroSlides(prev => prev.map(s => s.id === slide.id ? { ...s, title: e.target.value } : s))}
                                                    className="w-full bg-white border-b border-charcoal/10 px-4 py-3 text-sm font-bold focus:border-accent outline-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">Subline / Description</label>
                                                <textarea
                                                    value={slide.subtitle}
                                                    onChange={(e) => setHeroSlides(prev => prev.map(s => s.id === slide.id ? { ...s, subtitle: e.target.value } : s))}
                                                    className="w-full bg-white border-b border-charcoal/10 px-4 py-3 text-sm font-medium focus:border-accent outline-none resize-none"
                                                    rows={3}
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">CTA Text</label>
                                                    <input
                                                        type="text"
                                                        value={slide.ctaText}
                                                        onChange={(e) => setHeroSlides(prev => prev.map(s => s.id === slide.id ? { ...s, ctaText: e.target.value } : s))}
                                                        className="w-full bg-white border-b border-charcoal/10 px-4 py-3 text-sm focus:border-accent outline-none"
                                                    />
                                                </div>
                                                <div className="flex items-end gap-2">
                                                    <button
                                                        onClick={() => handleMoveSlide(i, 'up')}
                                                        disabled={i === 0}
                                                        className="p-3 bg-white border border-charcoal/5 rounded-sm hover:border-charcoal hover:bg-charcoal hover:text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                                                        title="Move Up"
                                                    >
                                                        <ChevronUp size={14} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleMoveSlide(i, 'down')}
                                                        disabled={i === heroSlides.length - 1}
                                                        className="p-3 bg-white border border-charcoal/5 rounded-sm hover:border-charcoal hover:bg-charcoal hover:text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                                                        title="Move Down"
                                                    >
                                                        <ChevronDown size={14} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteSlide(slide.id)}
                                                        className="p-3 bg-white border border-charcoal/5 rounded-sm hover:bg-red-500 hover:text-white transition-all"
                                                        title="Delete Slide"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest flex items-center gap-2">
                                                <ImageIcon size={12} className="text-accent" /> Backdrop Media
                                            </label>
                                            <div className="aspect-video bg-charcoal rounded-sm overflow-hidden relative group/img cursor-pointer">
                                                <img src={slide.image} className="w-full h-full object-cover opacity-60 group-hover/img:opacity-100 transition-opacity" />
                                                <label className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity cursor-pointer">
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                const reader = new FileReader();
                                                                reader.onloadend = () => {
                                                                    setHeroSlides(prev => prev.map(s => s.id === slide.id ? { ...s, image: reader.result as string } : s));
                                                                    toast({ title: "Binary Resource Mapped", description: "Local image has been injected into slide metadata." });
                                                                };
                                                                reader.readAsDataURL(file);
                                                            }
                                                        }}
                                                    />
                                                    <span className="bg-white text-charcoal px-6 py-3 text-[9px] font-bold uppercase tracking-widest shadow-luxury flex items-center gap-2">
                                                        <Upload size={14} />
                                                        Replace Local Asset
                                                    </span>
                                                </label>
                                            </div>
                                            <p className="text-[7px] text-muted-foreground uppercase tracking-widest text-center">Contextual Local Upload Enabled</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="about-editor"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="grid lg:grid-cols-2 gap-16"
                        >
                            <div className="space-y-10">
                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest flex items-center gap-2"><Settings2 size={12} className="text-accent" /> Section Subtitle</label>
                                    <input
                                        type="text"
                                        value={aboutContent.subheading}
                                        onChange={(e) => setAboutContent({ ...aboutContent, subheading: e.target.value })}
                                        className="w-full bg-secondary/5 border-b border-charcoal/10 px-4 py-4 text-sm font-bold focus:border-accent outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">Main Heading</label>
                                    <input
                                        type="text"
                                        value={aboutContent.heading}
                                        onChange={(e) => setAboutContent({ ...aboutContent, heading: e.target.value })}
                                        className="w-full bg-secondary/5 border-b border-charcoal/10 px-4 py-4 text-xl font-heading font-bold focus:border-accent outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">Body Copy</label>
                                    <textarea
                                        value={aboutContent.description}
                                        onChange={(e) => setAboutContent({ ...aboutContent, description: e.target.value })}
                                        className="w-full bg-secondary/5 border-b border-charcoal/10 px-4 py-4 text-sm font-medium leading-relaxed focus:border-accent outline-none resize-none"
                                        rows={6}
                                    />
                                </div>
                            </div>
                            <div className="space-y-10 pt-10 lg:pt-0">
                                <div className="p-10 border border-accent/20 bg-accent/5 rounded-sm relative italic">
                                    <label className="absolute -top-3 left-6 px-3 py-1 bg-accent text-[8px] font-bold text-accent-foreground uppercase tracking-widest">Editorial Quote</label>
                                    <textarea
                                        value={aboutContent.quote}
                                        onChange={(e) => setAboutContent({ ...aboutContent, quote: e.target.value })}
                                        className="w-full bg-transparent border-none p-0 text-charcoal font-medium italic focus:ring-0 outline-none resize-none"
                                        rows={4}
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest flex items-center gap-2">
                                        <ImageIcon size={12} className="text-accent" /> About Media Backdrop
                                    </label>
                                    <div className="aspect-[4/5] bg-secondary/10 rounded-sm border border-secondary/20 relative group overflow-hidden">
                                        {aboutContent.image ? (
                                            <img src={aboutContent.image} className="w-full h-full object-cover group-hover:opacity-80 transition-opacity" />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-full gap-4">
                                                <ImageIcon className="text-secondary/40" size={48} />
                                                <span className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground">No Media Synchronized</span>
                                            </div>
                                        )}
                                        <label className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer bg-charcoal/40 backdrop-blur-sm">
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            setAboutContent({ ...aboutContent, image: reader.result as string });
                                                            toast({ title: "Narrative Backdrop Loaded", description: "Local asset successfully mapped to About section." });
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}
                                            />
                                            <span className="bg-white text-charcoal px-6 py-3 text-[9px] font-bold uppercase tracking-widest shadow-luxury flex items-center gap-2">
                                                <Upload size={14} />
                                                Replace Asset
                                            </span>
                                        </label>
                                    </div>
                                    <p className="text-[7px] text-muted-foreground uppercase tracking-widest text-center mt-2">Binary Serialization Active</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ManageHomepage;

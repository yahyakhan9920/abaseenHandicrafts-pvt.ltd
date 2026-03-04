import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    MessageSquare,
    Settings,
    LogOut,
    Globe,
    PlusCircle,
    Users,
    Layers,
    Shield,
    Layout,
    Image as ImageIcon,
    Terminal
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin", roles: ["Super Admin", "Sales Manager", "Content Editor", "Product Manager"] },
    { icon: Package, label: "Products", path: "/admin/products", roles: ["Super Admin", "Product Manager"] },
    { icon: Layers, label: "Categories", path: "/admin/categories", roles: ["Super Admin", "Product Manager", "Content Editor"] },
    { icon: Users, label: "Wholesale Tiers", path: "/admin/wholesale", roles: ["Super Admin", "Sales Manager"] },
    { icon: MessageSquare, label: "Inquiries", path: "/admin/inquiries", roles: ["Super Admin", "Sales Manager"] },
    { icon: Globe, label: "SEO Editorial", path: "/admin/seo", roles: ["Super Admin", "Content Editor"] },
    { icon: Layout, label: "Home Editorial", path: "/admin/editorial", roles: ["Super Admin", "Content Editor"] },
    { icon: Globe, label: "B2B Content", path: "/admin/b2b-content", roles: ["Super Admin", "Content Editor"] },
    { icon: Terminal, label: "Security Logs", path: "/admin/logs", roles: ["Super Admin"] },
    { icon: Settings, label: "Site Config", path: "/admin/settings", roles: ["Super Admin"] },
];

const AdminSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const role = localStorage.getItem("adminRole") || "Super Admin";
    const user = localStorage.getItem("adminUser") || "Admin User";

    const handleLogout = () => {
        localStorage.removeItem("abaseen_admin_auth");
        localStorage.removeItem("adminRole");
        localStorage.removeItem("adminUser");
        navigate("/admin/login");
    };

    const filteredMenu = menuItems.filter(item => item.roles.includes(role));

    return (
        <aside className="w-72 bg-charcoal border-r border-white/5 flex flex-col fixed left-0 top-0 bottom-0 z-50">
            {/* Logo Area */}
            <div className="p-8 border-b border-white/5">
                <Link to="/" className="block">
                    <h2 className="font-heading text-xl font-bold text-cream tracking-tighter">
                        ABASEEN <span className="text-accent underline decoration-gold/30">GLOBAL</span>
                    </h2>
                    <p className="text-[9px] uppercase tracking-[0.3em] text-accent font-bold mt-1">Authorized Management</p>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-grow p-6 space-y-1 overflow-y-auto">
                <div className="mb-4">
                    <p className="text-[8px] uppercase tracking-[0.2em] text-accent/40 font-bold mb-2 pl-4">Main Navigation</p>
                </div>
                {filteredMenu.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex items-center gap-4 px-4 py-3.5 rounded-sm transition-all duration-300 group",
                                isActive
                                    ? "bg-accent/10 border-l-2 border-accent text-accent font-bold"
                                    : "text-cream/40 hover:text-cream hover:bg-white/5"
                            )}
                        >
                            <item.icon size={16} className={cn("transition-transform group-hover:scale-110", isActive ? "text-accent" : "text-accent/40")} />
                            <span className="text-[10px] uppercase tracking-widest leading-none">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile & Footer Actions */}
            <div className="p-6 border-t border-white/5 bg-black/20">
                <div className="flex items-center gap-3 mb-6 px-2">
                    <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/20 flex items-center justify-center text-accent">
                        <Shield size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-cream uppercase tracking-wider">{user}</p>
                        <p className="text-[8px] text-accent/60 font-bold uppercase tracking-[0.2em]">{role}</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 px-4 py-3.5 w-full bg-white/5 rounded-sm text-cream/60 hover:text-white hover:bg-red-500/20 transition-all group"
                    >
                        <LogOut size={16} />
                        <span className="text-[10px] uppercase tracking-widest font-bold">System Exit</span>
                    </button>
                    <p className="text-[7px] text-center text-cream/10 uppercase tracking-[0.2em] mt-4">V5.3.0 SECURITY PROTOCOL</p>
                </div>
            </div>
        </aside>
    );
};

export default AdminSidebar;

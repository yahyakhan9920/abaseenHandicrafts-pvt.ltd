import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, User, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAddLog } from "@/hooks/use-store";

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();
    const { mutate: addLog } = useAddLog();
    const [role, setRole] = useState("Super Admin");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulated validation
        setTimeout(() => {
            if (credentials.username === "admin@abaseen.com" && credentials.password === "abaseen2026@") {
                localStorage.setItem("abaseen_admin_auth", "true");
                localStorage.setItem("adminRole", role);
                localStorage.setItem("adminUser", "Abaseen Executive");

                // Record Audit Log
                addLog({
                    user: "Abaseen Executive",
                    role: role,
                    action: `Successful Secure Authentication [Terminal: ${role}]`,
                    impact: "Medium",
                    status: "Success"
                });

                toast({
                    title: "Access Granted",
                    description: `Welcome back, ${role}. System initialized.`,
                });
                navigate("/admin");
            } else {
                // Record Failure Audit
                addLog({
                    user: "Unauthorized",
                    role: "None",
                    action: `Failed Authentication Attempt [User: ${credentials.username}]`,
                    impact: "High",
                    status: "Flagged"
                });
                toast({
                    variant: "destructive",
                    title: "Access Denied",
                    description: "Invalid corporate credentials.",
                });
            }
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-charcoal flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-accent/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-accent/5 rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white p-12 rounded-sm shadow-2xl relative z-10 border border-white/10"
            >
                <div className="text-center mb-10">
                    <span className="text-accent text-[10px] font-bold uppercase tracking-[0.4em] block mb-4">Secure Terminal</span>
                    <h1 className="font-heading text-3xl font-bold text-charcoal">Abaseen <span className="text-accent italic">Global</span></h1>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest pl-1">Authorized User</label>
                        <input
                            type="text"
                            value={credentials.username}
                            onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                            placeholder="admin@abaseen.com"
                            className="w-full bg-secondary/10 border-b border-charcoal/10 px-4 py-4 text-sm focus:outline-none focus:border-accent transition-all placeholder:opacity-30"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest pl-1">Access Key</label>
                        <input
                            type="password"
                            value={credentials.password}
                            onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                            placeholder="••••••••"
                            className="w-full bg-secondary/10 border-b border-charcoal/10 px-4 py-4 text-sm focus:outline-none focus:border-accent transition-all placeholder:opacity-30"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest pl-1">Access Tier</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full bg-secondary/10 border-b border-charcoal/10 px-4 py-4 text-sm focus:outline-none focus:border-accent transition-all appearance-none cursor-pointer"
                        >
                            <option>Super Admin</option>
                            <option>Sales Manager</option>
                            <option>Content Editor</option>
                            <option>Product Manager</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-charcoal text-accent py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-accent hover:text-charcoal transition-all shadow-luxury mt-4 flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                        {loading ? "Authenticating..." : "Initialize Session"}
                        {!loading && <ShieldCheck size={14} />}
                    </button>
                </form>

                <p className="text-center mt-12 text-[9px] uppercase tracking-widest text-charcoal/20 leading-relaxed font-bold">
                    All access attempts are logged per ISO 27001 <br /> Abaseen Handi Crafts Security Protocol
                </p>
                <div className="mt-8 text-center">
                    <p className="text-[8px] text-accent/50 font-bold uppercase tracking-widest">Demo: admin@abaseen.com / abaseen2026@</p>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;

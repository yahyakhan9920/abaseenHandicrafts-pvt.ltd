import { Outlet, Navigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useEffect, useState } from "react";

const AdminLayout = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        // Simple mock auth check
        const auth = localStorage.getItem("abaseen_admin_auth");
        setIsAuthenticated(auth === "true");
    }, []);

    if (isAuthenticated === null) return null; // Wait for check

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return (
        <div className="flex bg-neutral-100 min-h-screen" style={{ zoom: 0.8 }}>
            <AdminSidebar />
            <main className="flex-grow ml-72 p-12 transition-all duration-500">
                <div className="w-full">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as store from "@/lib/mockStore";

// Products
export const useProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: () => Promise.resolve(store.getProducts()),
        staleTime: 5000,
        refetchInterval: 10000,
    });
};

export const useSaveProducts = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => Promise.resolve(store.saveProducts(data)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });
};

// Categories
export const useCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: () => Promise.resolve(store.getCategories()),
        staleTime: 5000,
        refetchInterval: 10000,
    });
};

export const useSaveCategories = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => Promise.resolve(store.saveCategories(data)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
};

// Inquiries
export const useInquiries = () => {
    return useQuery({
        queryKey: ["inquiries"],
        queryFn: () => Promise.resolve(store.getInquiries()),
        staleTime: 5000,
        refetchInterval: 5000,
    });
};

export const useAddInquiry = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => Promise.resolve(store.addInquiry(data)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["inquiries"] });
        },
    });
};

export const useSaveInquiries = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => Promise.resolve(store.saveInquiries(data)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["inquiries"] });
        },
    });
};

export const useDeleteInquiry = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => Promise.resolve(store.deleteInquiry(id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["inquiries"] });
        },
    });
};

export const useLogs = () => {
    return useQuery({
        queryKey: ["logs"],
        queryFn: () => Promise.resolve(store.getLogs()),
        staleTime: 5000,
    });
};

export const useAddLog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => Promise.resolve(store.addLog(data)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["logs"] });
        },
    });
};

export const useClearLogs = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => Promise.resolve(store.clearLogs()),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["logs"] });
        },
    });
};

// B2B Stats
export const useB2BStats = () => {
    return useQuery({
        queryKey: ["b2bStats"],
        queryFn: () => Promise.resolve(store.getB2BStats()),
        staleTime: 30000,
    });
};

export const useSaveB2BStats = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => Promise.resolve(store.saveB2BStats(data)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["b2bStats"] });
        },
    });
};

// Wholesale Tiers
export const useWholesaleTiers = () => {
    return useQuery({
        queryKey: ["wholesaleTiers"],
        queryFn: () => Promise.resolve(store.getWholesaleTiers()),
        staleTime: 30000,
    });
};

export const useSaveWholesaleTiers = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => Promise.resolve(store.saveWholesaleTiers(data)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wholesaleTiers"] });
        },
    });
};

// SEO Data
export const useSEOData = () => {
    return useQuery({
        queryKey: ["seoData"],
        queryFn: () => Promise.resolve(store.getSEOData()),
        staleTime: 60000,
    });
};

export const useSaveSEOData = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => Promise.resolve(store.saveSEOData(data)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["seoData"] });
        },
    });
};

// Homepage Content
export const useHomepageContent = () => {
    return useQuery({
        queryKey: ["homepageContent"],
        queryFn: () => Promise.resolve(store.getHomepageContent()),
        staleTime: 60000,
    });
};

export const useSaveHomepageContent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => Promise.resolve(store.saveHomepageContent(data)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["homepageContent"] });
        },
    });
};

// Site Settings
export const useSiteSettings = () => {
    return useQuery({
        queryKey: ["siteSettings"],
        queryFn: () => Promise.resolve(store.getSiteSettings()),
        staleTime: 60000,
    });
};

export const useSaveSiteSettings = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => Promise.resolve(store.saveSiteSettings(data)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["siteSettings"] });
        },
    });
};

export const useResetData = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => {
            store.resetStorage();
            return Promise.resolve();
        },
        onSuccess: () => {
            queryClient.clear();
            // Force a hard navigation to the homepage to ensure a clean state
            window.location.href = "/";
        },
    });
};

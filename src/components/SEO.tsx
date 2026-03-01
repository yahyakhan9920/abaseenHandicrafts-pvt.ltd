import { Helmet } from "react-helmet-async";

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
    ogType?: "website" | "article";
    canonical?: string;
}

const SEO = ({
    title,
    description,
    keywords,
    ogImage = "https://abaseenhandicrafts.com/og-image.jpg",
    ogType = "website",
    canonical,
}: SEOProps) => {
    const siteName = "Abaseen Handi Crafts (Pvt) Ltd";
    const fullTitle = title ? `${title} | ${siteName}` : siteName;
    const defaultDescription =
        "Premium handcrafted shawls from Pakistan. Wholesale manufacturer & exporter of luxury textiles, pashmina, and embroidered shawls to 15+ countries.";

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            {keywords && <meta name="keywords" content={keywords} />}
            {canonical && <link rel="canonical" href={canonical} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:url" content={window.location.href} />
            <meta property="og:site_name" content={siteName} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
            <meta name="twitter:image" content={ogImage} />
        </Helmet>
    );
};

export default SEO;

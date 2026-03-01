import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const Section = ({ children, className = "", id }: SectionProps) => (
  <section id={id} className={`py-20 lg:py-28 ${className}`}>
    <div className="container mx-auto px-6 lg:px-12">{children}</div>
  </section>
);

export const SectionHeader = ({
  subtitle,
  title,
  description,
  light = false,
}: {
  subtitle?: string;
  title: string;
  description?: string;
  light?: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-center mb-16 max-w-2xl mx-auto"
  >
    {subtitle && (
      <span
        className={`text-xs tracking-[0.3em] uppercase font-medium ${
          light ? "text-accent" : "text-accent"
        }`}
      >
        {subtitle}
      </span>
    )}
    <h2
      className={`font-heading text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4 ${
        light ? "text-primary-foreground" : "text-foreground"
      }`}
    >
      {title}
    </h2>
    {description && (
      <p
        className={`text-base leading-relaxed ${
          light ? "text-primary-foreground/70" : "text-muted-foreground"
        }`}
      >
        {description}
      </p>
    )}
  </motion.div>
);

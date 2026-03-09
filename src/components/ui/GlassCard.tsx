import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface IGlassCardProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    hover?: boolean;
}

export const GlassCard = ({
    children,
    className,
    onClick,
    hover = true
}: IGlassCardProps) => {
    return (
        <motion.div
            whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : {}}
            onClick={onClick}
            className={cn(
                'glass-card p-4 transition-all duration-300',
                hover && 'hover:bg-white/90 hover:shadow-2xl cursor-pointer',
                className
            )}
        >
            {children}
        </motion.div>
    );
};

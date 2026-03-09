import { useEffect, useCallback, useRef } from 'react';
import { useCharacterStore } from '@/store/useCharacterStore';
import { CharacterCard } from './CharacterCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export const CharacterList = () => {
    const { characters, loading, fetchCharacters, filters, totalPages } = useCharacterStore();
    const loaderRef = useRef<HTMLDivElement>(null);

    // Initial fetch
    useEffect(() => {
        fetchCharacters(1);
    }, [fetchCharacters]);

    // Intersection Observer for Infinite Scroll - Highly Performant
    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const target = entries[0];
            if (target.isIntersecting && !loading && filters.page < totalPages) {
                fetchCharacters(filters.page + 1);
            }
        },
        [loading, filters.page, totalPages, fetchCharacters]
    );

    useEffect(() => {
        const option = {
            root: null,
            rootMargin: '20px',
            threshold: 1.0,
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [handleObserver]);

    return (
        <div className="flex flex-col gap-12 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                <AnimatePresence mode="popLayout">
                    {characters.map((character, index) => (
                        <motion.div
                            key={`${character.id}-${index}`}
                            layout // smooth grid layout changes
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                            transition={{
                                duration: 0.4,
                                ease: [0.23, 1, 0.32, 1],
                                delay: (index % 15) * 0.03 // staggered entry only for first visible items
                            }}
                            className="h-full"
                        >
                            <CharacterCard character={character} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Performance-optimized Loader with Intersection Observer */}
            <div ref={loaderRef} className="flex flex-col items-center justify-center py-20 gap-4">
                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center gap-3"
                    >
                        <div className="relative">
                            <Loader2 className="w-10 h-10 animate-spin text-primary relative z-10" />
                            <div className="absolute inset-0 w-10 h-10 bg-primary/20 blur-xl rounded-full animate-pulse" />
                        </div>
                        <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">Synchronizing Reality...</span>
                    </motion.div>
                )}

                {!loading && characters.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-40 text-slate-400">
                        <div className="p-6 rounded-full bg-slate-100/50 mb-6 border border-slate-200">
                            <Loader2 className="w-8 h-8 opacity-20" />
                        </div>
                        <p className="text-xl font-black text-slate-800 uppercase tracking-tight">Timeline is empty</p>
                        <p className="text-sm font-medium text-slate-400">Adjust your neural filters to find characters</p>
                    </div>
                )}

                {!loading && filters.page >= totalPages && characters.length > 0 && (
                    <div className="text-center py-10">
                        <span className="text-[10px] uppercase font-black tracking-[0.3em] text-slate-300">End of Observable Universe</span>
                    </div>
                )}
            </div>
        </div>
    );
};

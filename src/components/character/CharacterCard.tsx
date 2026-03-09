import { useState } from 'react';
import { Heart, Copy, Check } from 'lucide-react';
import { ICharacter } from '@/interfaces/character.interface';
import { GlassCard } from '@/components/ui/GlassCard';
import { useCharacterStore } from '@/store/useCharacterStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ICharacterCardProps {
    character: ICharacter;
}

export const CharacterCard = ({ character }: ICharacterCardProps) => {
    const toggleFavorite = useCharacterStore((state) => state.toggleFavorite);
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(`https://rickandmortyapi.com/api/character/${character.id}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const statusColor = {
        Alive: 'bg-emerald-500',
        Dead: 'bg-rose-500',
        unknown: 'bg-slate-400',
    }[character.status];

    const isFavorite = character.isFavorite;

    return (
        <GlassCard
            onClick={() => navigate(`/character/${character.id}`)}
            className="group relative overflow-hidden flex flex-col h-full bg-white/40 hover:bg-white/90 transition-all duration-500 cursor-pointer border-transparent hover:border-white/40 shadow-sm hover:shadow-2xl hover:shadow-primary/10 rounded-[2.5rem] p-5"
            hover={false}
        >
            <motion.div
                className="flex flex-col h-full w-full"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] mb-6 bg-slate-200/50">
                    <motion.img
                        src={character.image}
                        alt={character.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                    />

                    {/* Status Badge */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/40 backdrop-blur-xl border border-white/10">
                        <span className={cn("w-2 h-2 rounded-full", statusColor)} />
                        <span className="text-[10px] font-black text-white uppercase tracking-wider">{character.status}</span>
                    </div>

                    {/* Like Button */}
                    <div className="absolute top-4 right-4 z-20">
                        <motion.button
                            whileTap={{ scale: 0.6 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(character);
                            }}
                            className="relative flex items-center justify-center p-2 rounded-full active:outline-none"
                        >
                            <AnimatePresence>
                                {isFavorite && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 2 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 bg-rose-500/20 shadow-[0_0_30px_rgba(244,63,94,0.4)] blur-xl rounded-full"
                                    />
                                )}
                            </AnimatePresence>

                            <Heart
                                size={28}
                                className={cn(
                                    "transition-all duration-500 relative z-10",
                                    isFavorite
                                        ? "fill-rose-500 stroke-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]"
                                        : "text-white/90 drop-shadow-lg hover:text-white"
                                )}
                            />
                        </motion.button>
                    </div>
                </div>

                {/* Info Container */}
                <div className="flex flex-col flex-grow px-2">
                    <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-2xl font-black text-slate-800 leading-tight tracking-tight group-hover:text-primary transition-colors duration-300">
                            {character.name}
                        </h3>
                        <button
                            onClick={handleCopy}
                            className={cn(
                                'p-1.5 rounded-xl transition-all duration-300 flex items-center justify-center shrink-0 mt-0.5',
                                copied
                                    ? 'text-emerald-500 bg-emerald-50 scale-110 shadow-inner'
                                    : 'text-slate-400 bg-slate-100 hover:text-primary hover:bg-primary/10 active:scale-90'
                            )}
                            title="Copy API Endpoint"
                        >
                            {copied ? <Check size={15} strokeWidth={3} /> : <Copy size={15} strokeWidth={2.5} />}
                        </button>
                    </div>

                    <div className="flex items-center gap-2 mb-6">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">{character.species}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-200" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">{character.gender}</span>
                    </div>

                    <div className="mt-auto pt-5 border-t border-slate-100 flex flex-col gap-1.5 pb-2">
                        <span className="text-[9px] text-slate-300 uppercase font-bold tracking-[0.2em]">Primary Location</span>
                        <span className="text-sm font-bold text-slate-600 truncate group-hover:text-slate-900 transition-colors">
                            {character.location.name}
                        </span>
                    </div>
                </div>
            </motion.div>
        </GlassCard>
    );
};

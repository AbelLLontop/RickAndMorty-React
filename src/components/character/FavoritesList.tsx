import { useCharacterStore } from '@/store/useCharacterStore';
import { CharacterCard } from './CharacterCard';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartOff, ArrowRight } from 'lucide-react';
import { Button } from '@heroui/react';
import { useNavigate } from 'react-router-dom';

export const FavoritesList = () => {
    const favorites = useCharacterStore((state) => state.favorites);
    const navigate = useNavigate();

    if (favorites.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-40 text-slate-400 text-center"
            >
                <div className="relative p-8 rounded-full bg-slate-50 mb-8 border border-slate-100 shadow-sm group">
                    <HeartOff size={40} className="text-slate-300 group-hover:scale-110 transition-transform" />
                    <div className="absolute inset-0 bg-rose-500/5 blur-3xl rounded-full" />
                </div>
                <h2 className="text-3xl font-black text-slate-800 mb-2 uppercase tracking-tight">Timeline Sanitized</h2>
                <p className="text-slate-500 max-w-sm mb-10 text-lg font-medium">No favorite beings detected in your memory bank.</p>
                <Button
                    onPress={() => navigate('/')}
                    variant="primary"
                    className="h-[60px] px-10 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl flex gap-2 items-center"
                >
                    Initialize Discovery
                    <ArrowRight size={20} />
                </Button>
            </motion.div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            <AnimatePresence mode="popLayout">
                {favorites.map((character) => (
                    <motion.div
                        key={`fav-${character.id}`}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    >
                        <CharacterCard character={character} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ICharacter, IEpisode } from '@/interfaces/character.interface';
import { Button } from '@heroui/react';
import { Heart, Info, Calendar, Tv, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCharacterStore } from '@/store/useCharacterStore';
import { motion, AnimatePresence } from 'framer-motion';
import { CharacterCard } from '@/components/character/CharacterCard';
import { ApiEndpointBadge } from '@/components/ui/ApiEndpointBadge';
import { cn } from '@/lib/utils';

export default function CharacterPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [character, setCharacter] = useState<ICharacter | null>(null);
    const [episodes, setEpisodes] = useState<IEpisode[]>([]);
    const [loading, setLoading] = useState(true);
    const { favorites, toggleFavorite, characters } = useCharacterStore();

    const isFavorite = favorites.some(f => f.id === Number(id));

    const [suggestionIds, setSuggestionIds] = useState<number[]>([]);

    // Pick suggestion IDs only once when ID changes or characters are loaded
    useEffect(() => {
        if (characters.length > 0) {
            const currentIds = characters
                .filter(c => c.id !== Number(id))
                .sort(() => 0.5 - Math.random())
                .slice(0, 4)
                .map(c => c.id);
            setSuggestionIds(currentIds);
        }
    }, [id, characters.length > 0]);

    // Map the stable IDs back to current character objects from the store
    const suggestions = useMemo(() => {
        return suggestionIds
            .map(sid => characters.find(c => c.id === sid))
            .filter((c): c is ICharacter => !!c);
    }, [suggestionIds, characters]);

    const currentId = Number(id);

    const handleNext = () => {
        navigate(`/character/${currentId + 1}`);
    };

    const handlePrev = () => {
        if (currentId > 1) {
            navigate(`/character/${currentId - 1}`);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const charRes = await axios.get<ICharacter>(`https://rickandmortyapi.com/api/character/${id}`);
                setCharacter(charRes.data);

                const episodeUrls = charRes.data.episode.slice(-3);
                const epPromises = episodeUrls.map(url => axios.get<IEpisode>(url));
                const epResponses = await Promise.all(epPromises);
                setEpisodes(epResponses.map(r => r.data));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id]);



    if (loading) return (
        <div className="flex flex-col items-center justify-center py-40 gap-4 animate-pulse">
            <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-t-primary animate-spin" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Accessing Neural Link...</span>
        </div>
    );

    if (!character) return <div className="text-center py-20 font-black text-slate-400 uppercase">Subject not found in this dimension.</div>;

    return (
        <div className="flex flex-col gap-12 md:gap-20 pb-20 max-w-7xl mx-auto w-full px-4 sm:px-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-10 max-w-5xl mx-auto w-full pt-10"
            >
                <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-4">
                    <div className="flex flex-col gap-2 min-w-0 w-full sm:w-auto">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Portal Unit #{id}</span>
                        <ApiEndpointBadge url={`https://rickandmortyapi.com/api/character/${id}`} />
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto">
                        <Button
                            variant="ghost"
                            isDisabled={currentId <= 1}
                            onPress={handlePrev}
                            className="w-10 h-10 min-w-0 p-0 rounded-full bg-white/50 backdrop-blur-md border border-white/20 shadow-sm"
                        >
                            <ChevronLeft size={20} />
                        </Button>
                        <Button
                            variant="ghost"
                            onPress={handleNext}
                            className="w-10 h-10 min-w-0 p-0 rounded-full bg-white/50 backdrop-blur-md border border-white/20 shadow-sm"
                        >
                            <ChevronRight size={20} />
                        </Button>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                    {/* Visual Section */}
                    <div className="relative group">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: "circOut" }}
                            className="relative"
                        >
                            <img
                                src={character.image}
                                alt={character.name}
                                className="w-full aspect-[4/5] object-cover rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] border-8 border-white/50"
                            />

                            {/* Like Button Overlay */}
                            <div className="absolute top-8 right-8 z-20">
                                <motion.button
                                    whileTap={{ scale: 0.6 }}
                                    onClick={() => toggleFavorite(character)}
                                    className="relative flex items-center justify-center p-4 rounded-full bg-white/40 backdrop-blur-3xl border border-white/30 shadow-2xl"
                                >
                                    <AnimatePresence>
                                        {isFavorite && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 2 }}
                                                exit={{ opacity: 0 }}
                                                className="absolute inset-0 bg-rose-500/20 shadow-[0_0_40px_rgba(244,63,94,0.4)] blur-2xl rounded-full"
                                            />
                                        )}
                                    </AnimatePresence>
                                    <Heart
                                        className={cn(
                                            "transition-all duration-500 relative z-10",
                                            isFavorite ? "fill-rose-500 stroke-rose-500 scale-125" : "text-white"
                                        )}
                                        size={32}
                                    />
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col gap-10 justify-center py-6">
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-3"
                            >
                                <span className={cn("px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border",
                                    character.status === 'Alive' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                        character.status === 'Dead' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                                            'bg-slate-50 text-slate-500 border-slate-100'
                                )}>
                                    {character.status}
                                </span>
                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Target Identified</span>
                            </motion.div>

                            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 leading-[0.95] tracking-tighter">
                                {character.name}
                            </h1>

                            <p className="text-lg sm:text-2xl font-bold text-slate-400 capitalize">
                                {character.species} — {character.gender}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                            <div className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-white/40 border border-white/60 shadow-sm">
                                <Info size={20} className="text-primary mb-3" />
                                <span className="block text-[10px] uppercase font-black tracking-widest text-slate-300 mb-1">Origin Dimension</span>
                                <span className="text-base md:text-lg font-bold text-slate-700">{character.origin.name}</span>
                            </div>
                            <div className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-white/40 border border-white/60 shadow-sm">
                                <Sparkles size={20} className="text-amber-400 mb-3" />
                                <span className="block text-[10px] uppercase font-black tracking-widest text-slate-300 mb-1">Current Sector</span>
                                <span className="text-base md:text-lg font-bold text-slate-700">{character.location.name}</span>
                            </div>
                        </div>

                        <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-150 transition-transform duration-1000">
                                <Tv size={120} />
                            </div>
                            <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-6 md:mb-8 flex items-center gap-3">
                                <Tv size={16} /> Timeline Occurrences
                            </h3>
                            <div className="flex flex-col gap-4 md:gap-6">
                                {episodes.map(ep => (
                                    <div key={ep.id} className="flex justify-between items-center border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                        <div className="flex flex-col">
                                            <span className="text-lg font-black tracking-tight">{ep.name}</span>
                                            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">{ep.episode}</span>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                <Calendar size={12} />
                                                {ep.air_date}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Suggestions Section */}
            {suggestions.length > 0 && (
                <div className="w-full space-y-12 pt-10 border-t border-slate-100">
                    <div className="space-y-2">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">Nexus Suggestions</h2>
                        <p className="text-[10px] sm:text-xs md:text-sm font-bold text-slate-400 tracking-widest uppercase ml-1">Other beings detected in this reality</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                        {suggestions.map((item) => (
                            <CharacterCard key={item.id} character={item} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

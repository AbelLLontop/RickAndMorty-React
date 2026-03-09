import { Github, Twitter, Heart } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="w-full mt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="p-12 rounded-[3.5rem] bg-white/40 backdrop-blur-3xl border border-white/60 shadow-sm flex flex-col md:flex-row justify-between items-center gap-10 overflow-hidden relative group">
                    {/* Abstract background glow */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-3xl rounded-full -mr-20 -mt-20 group-hover:bg-primary/10 transition-colors duration-1000" />

                    <div className="space-y-4 relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-xl italic shadow-lg">R</div>
                            <span className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Rick & Morty <span className="text-slate-300">Hub</span></span>
                        </div>
                        <p className="max-w-xs text-sm font-bold text-slate-400 leading-relaxed uppercase tracking-widest">
                            The ultimate multi-dimensional character database for citizens of the Citadel.
                        </p>
                    </div>

                    <div className="flex gap-4 relative z-10">
                        <a href="#" className="p-4 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group/link">
                            <Github size={20} className="group-hover/link:text-primary transition-colors" />
                        </a>
                        <a href="#" className="p-4 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group/link">
                            <Twitter size={20} className="group-hover/link:text-sky-500 transition-colors" />
                        </a>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-2 relative z-10">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Crafted with neural link</span>
                        <div className="flex items-center gap-2 text-sm font-black text-slate-800 uppercase tracking-tighter">
                            Built by Antigravity <Heart size={14} className="fill-rose-500 stroke-rose-500" /> 2026
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

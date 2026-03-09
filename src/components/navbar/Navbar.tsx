import { NavLink } from 'react-router-dom';
import { Ghost, Heart, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCharacterStore } from '@/store/useCharacterStore';

export const Navbar = () => {
  const favoritesCount = useCharacterStore((state) => state.favorites.length);

  const navItemStyles = ({ isActive }: { isActive: boolean }) =>
    cn(
      "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
      isActive
        ? "bg-slate-900 text-white shadow-lg"
        : "text-slate-500 hover:bg-slate-100/80 hover:text-slate-900"
    );

  return (
    <nav className="fixed top-0 inset-x-0 z-50 h-20 flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-5xl h-full flex items-center justify-between px-6 rounded-full border-white/40">
        <NavLink to="/" className="flex items-center gap-3 group min-w-0 shrink-0">
          <div className="p-2 bg-slate-900 rounded-xl group-hover:scale-110 transition-transform shrink-0">
            <Ghost className="text-white" size={20} />
          </div>
          <span className="text-sm sm:text-lg font-black tracking-tight text-slate-900 whitespace-nowrap">
            RICK & MORTY <span className="text-slate-400">DB</span>
          </span>
        </NavLink>

        <div className="flex items-center gap-2">
          <NavLink to="/" className={navItemStyles}>
            <LayoutGrid size={18} />
            <span className="hidden sm:inline">Explore</span>
          </NavLink>

          <NavLink to="/favorites" className={navItemStyles}>
            <Heart size={18} className={favoritesCount > 0 ? "fill-rose-500 stroke-rose-500" : ""} />
            <span className="hidden sm:inline">Favorites</span>
            {favoritesCount > 0 && (
              <span className="flex items-center justify-center w-5 h-5 bg-rose-500 text-[10px] text-white rounded-full">
                {favoritesCount}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

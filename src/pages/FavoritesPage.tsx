import { FavoritesList } from '@/components/character/FavoritesList';

export default function FavoritesPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          Your <span className="text-rose-500">Favorites</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl">
          A curated collection of your most beloved multidimensional beings.
        </p>
      </header>

      <FavoritesList />
    </div>
  );
}

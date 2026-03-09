import { useMemo } from 'react';
import { CharacterFilters } from '@/components/character/CharacterFilters';
import { CharacterList } from '@/components/character/CharacterList';
import { ApiEndpointBadge } from '@/components/ui/ApiEndpointBadge';
import { useCharacterStore } from '@/store/useCharacterStore';

export default function App() {
  const { filters } = useCharacterStore();

  const apiUrl = useMemo(() => {
    const base = 'https://rickandmortyapi.com/api/character';
    const params = new URLSearchParams();
    if (filters.name) params.append('name', filters.name);
    if (filters.status) params.append('status', filters.status);
    if (filters.species) params.append('species', filters.species);
    if (filters.gender) params.append('gender', filters.gender);
    params.append('page', String(filters.page ?? 1));
    return `${base}?${params.toString()}`;
  }, [filters]);

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <header className="flex flex-col gap-3">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
          Find your favorite <span className="text-primary">Characters</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl">
          Explore the vast universe of Rick and Morty. Filter by status, gender, or species and save your top picks.
        </p>
        <ApiEndpointBadge url={apiUrl} />
      </header>

      <CharacterFilters />

      <CharacterList />
    </div>
  );
}

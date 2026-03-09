import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import {
    ICharacter,
    ICharacterFilter,
    ICharacterResponse
} from '@/interfaces/character.interface';

interface ICharacterState {
    characters: ICharacter[];
    favorites: ICharacter[];
    loading: boolean;
    error: string | null;
    totalPages: number;
    totalCount: number;
    filters: ICharacterFilter;

    // Actions
    fetchCharacters: (page?: number) => Promise<void>;
    setFilters: (filters: Partial<ICharacterFilter>) => void;
    toggleFavorite: (character: ICharacter) => void;
    resetFilters: () => void;
}

const API_URL = 'https://rickandmortyapi.com/api/character';

export const useCharacterStore = create<ICharacterState>()(
    persist(
        (set, get) => ({
            characters: [],
            favorites: [],
            loading: false,
            error: null,
            totalPages: 0,
            totalCount: 0,
            filters: {
                status: '',
                species: '',
                gender: '',
                name: '',
                page: 1,
            },

            fetchCharacters: async (page) => {
                const { filters, favorites } = get();
                const currentPage = page ?? filters.page;

                set({ loading: true, error: null });

                try {
                    const params = new URLSearchParams();
                    if (filters.name) params.append('name', filters.name);
                    if (filters.status) params.append('status', filters.status);
                    if (filters.species) params.append('species', filters.species);
                    if (filters.gender) params.append('gender', filters.gender);
                    params.append('page', currentPage.toString());

                    const response = await axios.get<ICharacterResponse>(`${API_URL}?${params.toString()}`);

                    // Validate if the current filters still match the request (simple anti-race condition)
                    const currentFilters = get().filters;
                    if (currentPage === 1 && currentFilters.name !== filters.name) {
                        return;
                    }

                    const charactersWithFavorites = response.data.results.map(char => ({
                        ...char,
                        isFavorite: favorites.some(f => f.id === char.id)
                    }));

                    set({
                        characters: currentPage === 1
                            ? charactersWithFavorites
                            : [...get().characters, ...charactersWithFavorites],
                        totalPages: response.data.info.pages,
                        totalCount: response.data.info.count,
                        loading: false,
                        filters: { ...get().filters, page: currentPage } // Always use latest filters but update page
                    });
                } catch (error) {
                    // Check if it's a 404 which is common for "no characters found" in this API
                    const is404 = axios.isAxiosError(error) && error.response?.status === 404;

                    set({
                        error: is404 ? null : (axios.isAxiosError(error) ? error.message : 'An error occurred'),
                        loading: false,
                        characters: page === 1 ? [] : get().characters,
                        totalPages: is404 ? 0 : get().totalPages,
                        totalCount: is404 ? 0 : get().totalCount,
                    });
                }
            },

            setFilters: (newFilters) => {
                set((state) => ({
                    filters: { ...state.filters, ...newFilters, page: 1 }
                }));
                get().fetchCharacters(1);
            },

            resetFilters: () => {
                set({
                    filters: {
                        status: '',
                        species: '',
                        gender: '',
                        name: '',
                        page: 1,
                    }
                });
                get().fetchCharacters(1);
            },

            toggleFavorite: (character) => {
                const { favorites, characters } = get();
                const isFav = favorites.some(f => f.id === character.id);

                const newFavorites = isFav
                    ? favorites.filter(f => f.id !== character.id)
                    : [...favorites, { ...character, isFavorite: true }];

                const newCharacters = characters.map(char =>
                    char.id === character.id ? { ...char, isFavorite: !isFav } : char
                );

                set({ favorites: newFavorites, characters: newCharacters });
            }
        }),
        {
            name: 'rick-and-morty-favorites',
            partialize: (state) => ({ favorites: state.favorites }),
        }
    )
);

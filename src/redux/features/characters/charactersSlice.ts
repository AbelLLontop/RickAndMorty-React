import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ICharacter,
  ICharacterComplete,
} from "@/interfaces/character.interface";
import { IEpisode } from "@/interfaces/character.interface";
import {
  fetchCharactersByFilters,
  fetchCharactersByPage,
  fetchGetCharacterById,
  fetchGetEpisodeById,
} from "./thunks";

const initialState = {
  characters: [] as ICharacter[],
  favorites: [] as ICharacter[],
  loading: false,
  error: null as string | null,
  count: 0,
  pages: 0,
  characterSelected: {
    loading: false,
    data: null as ICharacterComplete | null,
  },
  episodeSelected: {
    loading: false,
    data: null as IEpisode | null,
  },
  filter: {
    currentPage: 1,
    name: "",
    status: "",
    species: "",
    gender: "",
  },
};

const searchCharacterById = (character: ICharacter, listCharacters: ICharacter[]) => {
  return listCharacters.find((favorite) => favorite.id === character.id);
};
const filterCharacterById = (character: ICharacter, listCharacters: ICharacter[]) => {
  return listCharacters.filter((favorite) => favorite.id !== character.id);
};

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: { 
    addFavoriteCharacter: (state, action: PayloadAction<ICharacter>) => {
      const character = action.payload;
      const existFavorite = searchCharacterById(character, state.favorites);
      if(!existFavorite) {
        const foundCharacter = searchCharacterById(character, state.characters);
        if(foundCharacter) {
          foundCharacter.star = true;
          state.favorites.push(foundCharacter);
        }
      }
    },
    removeFavoriteCharacter: (state, action: PayloadAction<ICharacter>) => {
      const character = action.payload;
      const existFavorite = searchCharacterById(character, state.favorites);
      if(existFavorite) {
        state.favorites = filterCharacterById(character, state.favorites);
        const characterInCharacters = searchCharacterById(character, state.characters);
        if(characterInCharacters) {
          characterInCharacters.star = false;
        }
      }
    }
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharactersByFilters.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCharactersByFilters.fulfilled, (state, action) => {
        state.characters = [...action.payload.charactersResponse];
        state.characters.forEach((character) => {
          const found = state.favorites.find(
            (favorite) => favorite.id === character.id
          );
          if (found) {
            character.star = true;
          }
        });
        state.count = action.payload.count;
        state.pages = action.payload.pages;
        state.filter = { ...action.payload.filters, currentPage: 1 };
        state.loading = false;
      });

    builder
      .addCase(fetchCharactersByPage.fulfilled, (state, action) => {
        const newCharacters = [...action.payload.charactersResponse];
        newCharacters.forEach((character) => {
          const found = state.favorites.find(
            (favorite) => favorite.id === character.id
          );
          if (found) {
            character.star = true;
          }
        });
        state.characters.push(...newCharacters);
        state.count = action.payload.count;
        state.pages = action.payload.pages;
        state.filter.currentPage = action.payload.currentPage;
        state.loading = false;
      })
      .addCase(fetchCharactersByPage.rejected, (state, action) => {
        state.loading = false;
        state.characters = [];
        state.error = action.error.message || null;
        state.loading = false;
      });
    //fetchGetCharacterById
    builder.addCase(fetchGetCharacterById.pending, (state, action) => {
      state.characterSelected.loading = true;
    });
    builder.addCase(fetchGetCharacterById.fulfilled, (state, action) => {
      state.characterSelected.loading = false;
      state.characterSelected.data = action.payload;
    });
    //fetchGetEpisodeById
    builder.addCase(fetchGetEpisodeById.pending, (state, action) => {
      state.episodeSelected.loading = true;
    });
    builder.addCase(fetchGetEpisodeById.fulfilled, (state, action) => {
      state.episodeSelected.loading = false;
      state.episodeSelected.data = action.payload;
    });
  },
});

export const { addFavoriteCharacter ,removeFavoriteCharacter} = charactersSlice.actions;
export default charactersSlice;

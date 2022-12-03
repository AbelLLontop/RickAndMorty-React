import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ICharacter, ICharacterComplete } from "@/interfaces/character.interface";
import { IEpisode } from '@/interfaces/character.interface';

const initialState = {
  characters: [] as ICharacter[],
  favorites: [] as ICharacter[],
  loading: false,
  error: null as string | null,
  count: 0,
  pages: 0,
  characterSelected: {
    loading:false,
    data:null as ICharacterComplete | null
  } ,
  episodeSelected:{
    loading:false,
    data:null as IEpisode|null
  },
  filter: {
    currentPage: 1,
    name: "",
    status: "",
    species: "",
    gender: "",
  },
};

interface IFilterCharacter {
  status: string;
  species: string;
  gender: string;
  name: string;
  currentPage: number;
}

const adapterCharacters = (characters: []): ICharacter[] => {
  return characters.map((itemCharacter: any) => {
    let character: ICharacter = {
      id: itemCharacter.id,
      name: itemCharacter.name,
      status: itemCharacter.status,
      species: itemCharacter.species,
      type: itemCharacter.type,
      created: itemCharacter.created,
      gender: itemCharacter.gender,
      image: itemCharacter.image,
      location: itemCharacter.location.name,
      star: false,
    };
    return character;
  });
};

export const fetchGetCharacterById = createAsyncThunk(
  "characters/fetchGetCharacterById",
  async (id: string) => {
    try{
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/${id}`
      );
      const character: ICharacterComplete = response.data;
      return character;
    }catch(e){
      return null;
    }
  }
);

export const fetchGetEpisodeById = createAsyncThunk(
  "characters/fetchGetEpisodeById",
  async (id: string) => {
    try{
      const response = await axios.get(
        `https://rickandmortyapi.com/api/episode/${id}`
      );
      const episode: IEpisode = response.data;
      return episode;
    }catch(e){
      return null;
    }
  }
);

export const fetchCharactersByFilters = createAsyncThunk(
  "characters/fetchCharactersByFilters",
  async (params: IFilterCharacter) => {
    const { status, species, name, gender } = params;
    try{
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/?name=${name}&status=${status}&species=${species}&gender=${gender}`
      );
      const charactersAdapted = adapterCharacters(response.data.results);
      return {
        charactersResponse: charactersAdapted,
        filters: { status, species, name, gender },
        count: response.data.info.count,
        pages: response.data.info.pages,
      };
    }catch(e){
      return {
        charactersResponse: [],
        filters: { status, species, name, gender },
        count: 1,
        pages: 1,
      };
    }
   
  }
);

export const fetchCharactersByPage = createAsyncThunk(
  "characters/fetchCharactersByPage",
  async (currentPage: number, { getState }) => {
    const { characters } = getState() as { characters: any };

    const { filter } = characters as { filter: IFilterCharacter };
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/?name=${filter.name}&status=${filter.status}&species=${filter.species}&gender=${filter.gender}&page=${currentPage}`
    );
    const charactersAdapted = adapterCharacters(response.data.results);
    return {
      charactersResponse: charactersAdapted,
      currentPage: currentPage,
      count: response.data.info.count,
      pages: response.data.info.pages,
    };
  }
);





const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    addFavoriteCharacter: (state, action: PayloadAction<ICharacter>) => {
      const foundFavorite = state.favorites.find(
        (character) => character.id === action.payload.id
      );
      const foundCharacter = state.characters.find(
        (character) => character.id === action.payload.id
      );
      if (foundFavorite) {
        if(foundCharacter){
          foundCharacter.star = false;
        }
        state.favorites = state.favorites.filter(
          (character) => character.id !== action.payload.id
        );
      }
      if (!foundFavorite && foundCharacter) {
        foundCharacter.star = true;
        state.favorites.push(foundCharacter);
      }
    },
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
      })

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
      builder.addCase(fetchGetCharacterById.pending,(state,action)=>{
        state.characterSelected.loading = true;
      })
      builder.addCase(fetchGetCharacterById.fulfilled,(state,action)=>{
        state.characterSelected.loading = false;
        state.characterSelected.data = action.payload;
      });
  //fetchGetEpisodeById
      builder.addCase(fetchGetEpisodeById.pending,(state,action)=>{
        state.episodeSelected.loading = true;
      }
      )
      builder.addCase(fetchGetEpisodeById.fulfilled,(state,action)=>{
        state.episodeSelected.loading = false;
        state.episodeSelected.data = action.payload;
      }
      )
  },
});
export const { addFavoriteCharacter } = charactersSlice.actions;
export default charactersSlice.reducer;

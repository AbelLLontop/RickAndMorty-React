import { characterApi } from "@/services/axios/characterApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ICharacterComplete,
  IEpisode,
  IFilterCharacter,
} from "@/interfaces/character.interface";
import { adapterCharacters } from "./adapter";


export const fetchGetCharacterById = createAsyncThunk(
  "characters/fetchGetCharacterById",
  async (id: string) => {
    try {
      const response = await characterApi.get(`/character/${id}`);
      const character: ICharacterComplete = response.data;
      return character;
    } catch (e) {
      return null;
    }
  }
);

export const fetchGetEpisodeById = createAsyncThunk(
  "characters/fetchGetEpisodeById",
  async (id: string) => {
    try {
      const response = await characterApi.get(`/episode/${id}`);
      const episode: IEpisode = response.data;
      return episode;
    } catch (e) {
      return null;
    }
  }
);

export const fetchCharactersByFilters = createAsyncThunk(
  "characters/fetchCharactersByFilters",
  async (params: IFilterCharacter) => {
    const { status, species, name, gender } = params;
    try {
      const response = await characterApi.get(
        `/character/?name=${name}&status=${status}&species=${species}&gender=${gender}`
      );
      const charactersAdapted = adapterCharacters(response.data.results);
      return {
        charactersResponse: charactersAdapted,
        filters: { status, species, name, gender },
        count: response.data.info.count,
        pages: response.data.info.pages,
      };
    } catch (e) {
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
    const response = await characterApi.get(
      `/character/?name=${filter.name}&status=${filter.status}&species=${filter.species}&gender=${filter.gender}&page=${currentPage}`
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

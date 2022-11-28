import {createSlice,PayloadAction,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { ICharacter } from '../../../interfaces/character.interface';

const initialState = {
    characters:[] as ICharacter[],
    loading:false,
    error:null as string | null,
    selectedCharacter:null as ICharacter | null,
    favorites:[] as ICharacter[],
    count: 0,
    pages:0,
    next:null as string | null,
    prev:null as string | null,
    filter:{
        currentPage:1,
        name:'',
        status:'',
        species:'',
        gender:'',
    }
}

interface IFilterCharacter{
    status:string;
    species:string;
    gender:string;
    name:string;
    currentPage:number;
}


export const fetchCharactersByFilters = createAsyncThunk('characters/fetchCharactersByFilters',async(params:IFilterCharacter)=>{
    const {status,species,name,gender}=params;
    const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}&status=${status}&species=${species}&gender=${gender}`);
    return {response:response.data,filters:{status,species,name,gender}};
})

export const fetchCharactersByPage = createAsyncThunk('characters/fetchCharactersByPage',async(currentPage:number,{getState})=>{
    const {characters} = getState() as {characters:any};

    const {filter} = characters  as {filter:IFilterCharacter};
    const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${filter.name}&status=${filter.status}&species=${filter.species}&gender=${filter.gender}&page=${currentPage}`);
    return {response:response.data,currentPage:currentPage};
});




const charactersSlice = createSlice({
    name:'characters',
    initialState,
    reducers:{
        addFavoriteCharacter:(state,action:PayloadAction<ICharacter>)=>{
            const found = state.favorites.find(character=>character.id === action.payload.id);             
            if(!found){
                state.favorites.push(action.payload);
            }
        },
        selectedCharacter:(state,action:PayloadAction<ICharacter>)=>{
            state.selectedCharacter = action.payload;
        }
    },
    extraReducers:(builder)=> {
        builder.addCase(fetchCharactersByFilters.pending,(state,action)=>{
            state.loading = true;
        })
        .addCase(fetchCharactersByFilters.fulfilled,(state,action)=>{
            state.characters = [...action.payload.response.results];
            state.count = action.payload.response.info.count;
            state.pages = action.payload.response.info.pages;
            state.next = action.payload.response.info.next;
            state.prev = action.payload.response.info.prev;
            state.filter = {...action.payload.filters,currentPage:1};
            state.loading = false;
        })
        .addCase(fetchCharactersByFilters.rejected,(state,action)=>{
            state.loading = false;
            state.characters = [];
            state.error = action.error.message || null;
            
        })
        builder.addCase(fetchCharactersByPage.pending,(state,action)=>{
            // state.loading = true;
        }).
        addCase(fetchCharactersByPage.fulfilled,(state,action)=>{
            state.characters.push(...action.payload.response.results);
            state.count = action.payload.response.info.count;
            state.pages = action.payload.response.info.pages;
            state.next = action.payload.response.info.next;
            state.prev = action.payload.response.info.prev;
            state.filter.currentPage = action.payload.currentPage;
            state.loading = false;
        }).
        addCase(fetchCharactersByPage.rejected,(state,action)=>{
            state.loading = false;
            state.characters = [];
            state.error = action.error.message || null;
            state.loading = false;
        })
    },
})
export const {addFavoriteCharacter,selectedCharacter} = charactersSlice.actions;
export default charactersSlice.reducer;
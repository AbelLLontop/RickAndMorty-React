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


export const fetchCharacters = createAsyncThunk('characters/fetchCharacters',async(params:IFilterCharacter)=>{
    const {status,species,name,gender,currentPage}=params;
    const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}&status=${status}&species=${species}&gender=${gender}&page=${currentPage}`);
    return {response:response.data,filters:{status,species,name,gender,currentPage}};
})


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
        },
        resetCharacters:(state)=>{
            state.characters = [];
            state.count=0;
            state.pages=1;
            state.filter.currentPage=1;
            state.loading=false;
            state.error=null;

            
        }
    },
    extraReducers:(builder)=> {
        builder.addCase(fetchCharacters.pending,(state,action)=>{
            state.loading = true;
        })
        .addCase(fetchCharacters.fulfilled,(state,action)=>{
            state.characters.push(...action.payload.response.results);
            state.count = action.payload.response.info.count;
            state.pages = action.payload.response.info.pages;
            state.next = action.payload.response.info.next;
            state.prev = action.payload.response.info.prev;
            state.filter = {...action.payload.filters};
            state.loading = false;
        })
        .addCase(fetchCharacters.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message || null;
            
        })
    },
})
export const {addFavoriteCharacter,selectedCharacter,resetCharacters} = charactersSlice.actions;
export default charactersSlice.reducer;
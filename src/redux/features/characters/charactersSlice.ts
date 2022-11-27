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
    pages:1,
    currentPage:0,
    next:null as string | null,
    prev:null as string | null,
}


export const fetchCharacters = createAsyncThunk('characters/fetchCharacters',async(id:number|string=1)=>{
    const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${id}`);
    console.log(response.data.results)
    return {...response.data,currentPage:id};
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
        }
    },
    extraReducers:(builder)=> {
        builder.addCase(fetchCharacters.pending,(state,action)=>{
            console.log('pending')
            state.loading = true;
        })
        .addCase(fetchCharacters.fulfilled,(state,action)=>{
            console.log('fulfilled')
            state.characters.push(...action.payload.results);
            state.count = action.payload.info.count;
            state.pages = action.payload.info.pages;
            state.next = action.payload.info.next;
            state.prev = action.payload.info.prev;
            state.currentPage = action.payload.currentPage;
            state.loading = false;
        })
        .addCase(fetchCharacters.rejected,(state,action)=>{
            console.log('rejected')
            state.loading = false;
            state.error = action.error.message || null;
        })
    },
})
export const {addFavoriteCharacter,selectedCharacter} = charactersSlice.actions;
export default charactersSlice.reducer;
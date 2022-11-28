import { useAppSelector, useAppDispatch } from "../hooks/useStore";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchCharactersByFilters, fetchCharactersByPage } from "../redux/features/characters/charactersSlice";
import { CharacterCard } from "./CharacterCard";
import {  useLoaderData } from 'react-router-dom';
import { useEffect } from 'react';
import { ILoaderParams } from "../App";


const ListCharacters = () => {
  const characters = useAppSelector((state) => state.characters.characters);
  const loading = useAppSelector((state) => state.characters.loading);
  const filters = useAppSelector((state) => state.characters.filter);
  const totalPages = useAppSelector((state) => state.characters.pages);
  const dispatch = useAppDispatch();
  const responseParamsLoader = useLoaderData() as ILoaderParams;

  useEffect(()=>{
    window.scrollTo({
      top: 0,
    })
      dispatch(fetchCharactersByFilters({...filters,...responseParamsLoader}));
    
  },[responseParamsLoader])


  const fetchMoreData = () => {
    dispatch(fetchCharactersByPage(filters.currentPage +1));
  };
  if(loading){
    return <div className="loader">
      <h1>CARGANDO!</h1>
    </div>
  }
  if(characters.length === 0){
    return <div className="loader">
      <h1>NO SE ENCONTRARON RESULTADOS!</h1>
    </div>
  }
  return (
   
      <InfiniteScroll
        className="listCharacters"
        dataLength={characters.length}
        next={fetchMoreData}
        hasMore={filters.currentPage < totalPages}
        loader={<h1>Loading...</h1>}
        
      >
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </InfiniteScroll>
 
  );
};




export default ListCharacters;

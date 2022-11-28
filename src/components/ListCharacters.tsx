import { useAppSelector, useAppDispatch } from "../hooks/useStore";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchCharacters, resetCharacters } from "../redux/features/characters/charactersSlice";
import { CharacterCard } from "./CharacterCard";
import { LoaderFunction, useLoaderData } from 'react-router-dom';
import { useEffect } from 'react';

interface ILoaderParams{
  status: string;
  species: string;
  gender:string;
}
export const loader:LoaderFunction= async ({request,params})=>{
  const url = new URL(request.url);
  const status = url.searchParams.get('status')||'';
  const species = url.searchParams.get('species')||'';
  const gender = url.searchParams.get('gender')||'';
  
  return {
    status,
    species,
    gender
  }
  
}


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
      behavior: "smooth",
    });
    dispatch(resetCharacters());
    dispatch(fetchCharacters({...filters,...responseParamsLoader,currentPage:1}));
  },[responseParamsLoader])


  const fetchMoreData = () => {
    dispatch(fetchCharacters({
      ...filters,
      currentPage: filters.currentPage + 1,
    }));
  };
  if(loading&& characters.length===0){
    return <div className="loader">
      <h1>CARGANDO!</h1>
    </div>
  }
  if(!loading && characters.length===0){
    return <div className="loader">
      <h1>No se encontraron resultados</h1>
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

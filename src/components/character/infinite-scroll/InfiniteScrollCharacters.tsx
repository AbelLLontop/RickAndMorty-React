import { useAppSelector, useAppDispatch } from "../../../hooks/useStore";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchCharactersByFilters, fetchCharactersByPage } from "@/redux/features/characters/charactersSlice";
import {  useLoaderData } from 'react-router-dom';
import { useEffect } from 'react';
import { ILoaderParams } from "@/pages/App";
import ListCharacters from "../card/ListCharacters";



const InfiniteScrollCharacters = () => {
    const characters = useAppSelector((state) => state.characters.characters);
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
  
      return (
          <InfiniteScroll
            className="listCharacters"
            dataLength={characters.length}
            next={fetchMoreData}
            hasMore={filters.currentPage < totalPages}
            loader={<h1>Loading...</h1>}
            
          >
            <ListCharacters characters={characters}/>
          </InfiniteScroll>
      );
}

export default InfiniteScrollCharacters
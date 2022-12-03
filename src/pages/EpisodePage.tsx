import { useAppDispatch } from "@/hooks/useStore";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchGetEpisodeById } from "../redux/features/characters/charactersSlice";
import { useAppSelector } from "../hooks/useStore";
import {ListMiniCharacterCard,Loader} from "@/components";

const EpisodePage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const episode = useAppSelector(
    (state) => state.characters.episodeSelected.data
  );
  const loading = useAppSelector(
    (state) => state.characters.episodeSelected.loading
  );

  useEffect(()=>{
    window.scrollTo({
      top: 0,
    })
  },[])
  const characters = episode?.characters || [];
  useEffect(() => {
    dispatch(fetchGetEpisodeById(id || ""));
  }, [id]);

  console.log(loading)
  if (loading) {
    return <Loader/>;
  }

  return (
    <div>
        <header className="episodesHeader">
        <p>Episode #{id}</p>
        <h2>{episode?.name}</h2>
        <p>{episode?.air_date}</p>
        <p>{episode?.episode}</p>
        <p>characters in this chapter</p>
        </header>

    <ListMiniCharacterCard characters={characters} />
    </div>
  );
};



export default EpisodePage;

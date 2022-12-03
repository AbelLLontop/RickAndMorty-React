import { useAppDispatch } from "@/hooks/useStore";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchGetEpisodeById } from "../redux/features/characters/charactersSlice";
import { useAppSelector } from "../hooks/useStore";

const EpisodePage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const episode = useAppSelector(
    (state) => state.characters.episodeSelected.data
  );
  const loading = useAppSelector(
    (state) => state.characters.episodeSelected.loading
  );

  const characters = episode?.characters;
  useEffect(() => {
    dispatch(fetchGetEpisodeById(id || ""));
  }, [id]);
  console.log(episode);

  if (loading) {
    return <div>Loading...</div>;
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

    <div className="charactersByEpisode">
      {characters?.map((characterUrl) => {
        const characterId = getNameIdUrlCharacter(characterUrl);
        return (
          <div className="episodeCardCharacter" key={characterId}>
            <Link to={`/character/${characterId}`}>
            <img
              src={`https://rickandmortyapi.com/api/character/avatar/${characterId}.jpeg`}
              alt=""
            />
            </Link>
          </div>
        );
      })}
    </div>
    </div>
  );
};

const getNameIdUrlCharacter = (url: string) => {
  const urlSplited = url.split("/");
  const id = urlSplited[urlSplited.length - 1];
  return id;
};

export default EpisodePage;

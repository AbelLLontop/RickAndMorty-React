import React from 'react'
import { Link } from 'react-router-dom';

const ListMiniCharacterCard = ({characters}:{characters:string[]}) => {
  return (
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
  )
}

const getNameIdUrlCharacter = (url: string) => {
  const urlSplited = url.split("/");
  const id = urlSplited[urlSplited.length - 1];
  return id;
};

export default ListMiniCharacterCard
import { ICharacterComplete } from '@/interfaces/character.interface';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface Props{
    character:ICharacterComplete;

}

const EpisodesList:FC<Props> = ({character}) => {
  return (
    <div className="episodes_container">
        <h3>Episodes</h3>
        <ul className="episodes card-shadow">
          {character?.episode.map((episode) => {
            const nameEpisode = getNameEpisode(episode);
            return (<Link key={episode} to={`/episode/${nameEpisode}`} className="episode">Episode {nameEpisode}</Link>)
          })}
        </ul>
      </div>
  )
}
const getNameEpisode = (episode: string) => {
    const episodeName = episode.split("/");
    return episodeName[episodeName.length - 1];
  };
  
export default EpisodesList
import { AiFillHeart } from 'react-icons/ai';
import { FaQuestion } from 'react-icons/fa';
import { GiDeathSkull, GiHomeGarage, GiHouse, GiPerson, GiAlienSkull } from 'react-icons/gi';
import { FC } from 'react';
import { ICharacterComplete } from '../../../interfaces/character.interface';
import { IoFemaleSharp, IoMaleSharp } from 'react-icons/io5';

interface Props{
  character:ICharacterComplete;
}

const CardDetail:FC<Props> = ({character}) => {
  return (
    <div className="main card-shadow">
        <img src={character?.image} alt="" />
        <div className="characterPage_info">
          <h2 className="characterPage_title">{character?.name}</h2>

          <div className="characterPage_status_content ">
            {getStatucIconComponent(character?.status || "")}
            <img src={character?.image} alt="" />
          </div>
          <div>
            <h3>Info</h3>
            <p> {iconComponentGender(character?.gender || "")} gender:{character?.gender}</p>
            <p>
              {iconComponentSpecie(character?.species || "")} species: {character?.species}
            </p>
            <p>
              <GiHomeGarage /> Origin: {character?.origin.name}
            </p>
            <p>
              <GiHouse /> location: {character?.location.name}
            </p>
          </div>
        </div>
      </div>
  )
}


const getStatucIconComponent = (status: string) => {
  switch (status) {
    case "Alive":
      return (
        <span className="characterPage_status span-live status_live">
          <AiFillHeart />
          Vivo
        </span>
      );
    case "Dead":
      return (
        <span className="characterPage_status  status_dead">
          <GiDeathSkull />
          Muerto
        </span>
      );
    default:
      return (
        <span className="characterPage_status ">
          <FaQuestion />
          Desconocido
        </span>
      );
  }
};

const iconComponentGender = (gender: string) => {
  switch (gender) {
    case "Female":
      return <IoFemaleSharp />;
    case "Male":
      return <IoMaleSharp />;
    default:
      return <FaQuestion />;
  }
};

const iconComponentSpecie = (species: string) => {
  return species === "Human" ? <GiPerson /> : <GiAlienSkull />;
};


export default CardDetail
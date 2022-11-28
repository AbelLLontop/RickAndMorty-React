import { useState,FC } from "react";
import { ICharacter } from "../interfaces/character.interface";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { GiDeathSkull } from "react-icons/gi";
import { FaQuestion } from "react-icons/fa";
import { IoMaleSharp, IoFemaleSharp } from "react-icons/io5";
import { GiAlienSkull } from "react-icons/gi";
import { GiPerson } from "react-icons/gi";
import { useAppDispatch } from '../hooks/useStore';
import { addFavoriteCharacter } from "../redux/features/characters/charactersSlice";

interface Props{
  character: ICharacter;
}

export const CharacterCard:FC<Props> = ({ character }) => {
  const [star, setStar] = useState(false);
  const dispatch =useAppDispatch();
  const startIcon = iconComponentStar(star);
  const iconSpecies = iconComponentSpecie(character.species);
  const iconStatus = iconComponentStatus(character.status);
  const iconGender = iconComponentGender(character.gender);

  const handleStar = () => {
    setStar(!star);
      dispatch(addFavoriteCharacter(character));
  }

  return (
    <div className="card" onClick={handleStar}>
      <span>
        {iconStatus}
        {character.status}
      </span>
      <div className="card_container_image">
        {star && (
          <span className="card_ticket_favorite">{startIcon} Favorito</span>
        )}
        <img
          key={character.id}
          className="characterCardImage shadow"
          src={character.image}
          alt=""
        />
      </div>
      <div className="card_container_info">
        <h4>{character.name}</h4>
        <span>{character.location.name}</span>
        <p>
          {iconSpecies} {character.species}
        </p>
        <p>
          {iconGender}
          {character.gender}
        </p>
        {startIcon}
      </div>
    </div>
  );
};

const iconComponentSpecie = (species: string) => {
  return species === "Human" ? <GiPerson /> : <GiAlienSkull />;
};
const iconComponentStar = (isFavorite: boolean) => {
  return isFavorite ? <AiFillStar /> : <AiOutlineStar />;
};
const iconComponentStatus = (status: string) => {
  switch (status) {
    case "Alive":
      return <AiFillHeart color="red" />;
    case "Dead":
      return <GiDeathSkull />;
    default:
      return <FaQuestion color="gray" />;
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

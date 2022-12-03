import { FC, memo, useState } from "react";
import { ICharacter } from "@/interfaces/character.interface";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { GiDeathSkull } from "react-icons/gi";
import { FaQuestion } from "react-icons/fa";
import { IoMaleSharp, IoFemaleSharp } from "react-icons/io5";
import { GiAlienSkull } from "react-icons/gi";
import { GiPerson } from "react-icons/gi";
import { useAppDispatch } from "@/hooks/useStore";
import { addFavoriteCharacter } from "@/redux/features/characters/charactersSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface Props {
  character: ICharacter;
}

const CharacterCard: FC<Props> = ({ character }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { startIcon, iconSpecies, iconStatus, iconGender }  = getIcons(character);

  const handleStar = (e:any) => {
    e.stopPropagation();
    showToast(character.star, character.name);
    dispatch(addFavoriteCharacter(character));
  };
  
  const handleClick = () => {
    navigate(`/character/${character.id}`);
  }

  return (
   
    <div className="card card-shadow rounded" onClick={handleClick} >
      
      <span className="card_header-spans">
       
        <div className="span idCard">
        #{character.id}
        </div>
        <div className={`span ${nameClassStatusColor(character.status)}`}>
        {iconStatus}
        {character.status}
        </div>
      </span>
      <div className="card_container_image" onClick={handleStar}>
        <div className="card_hover">
        {character.star?(
          <AiFillStar/>
        ): <AiOutlineStar/>}
        </div>
        {character.star && (
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
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div>
            <span className="text-secondary" style={{ fontSize: "12px" }}>
              {iconSpecies} especie
            </span>
            <br />
            <p>{character.species}</p>
          </div>
          <div>
            <span className="text-secondary" style={{ fontSize: "12px" }}>
              genero
            </span>
            <p>
              {iconGender}
              {character.gender}
            </p>
          </div>
        </div>
        <span className="text-secondary" style={{ fontSize: "12px" }}>
          origen
        </span>
        <br />
        <span>{character.location}</span>
        <br />

        <div className="starContent">
          <span className="text-secondary" style={{ fontSize: "12px" }}>
            Star
          </span>
          {startIcon}
        </div>
      </div>
    </div>
  );
};

export default memo(CharacterCard);


const getIcons = (character: ICharacter) => {
  const startIcon = iconComponentStar(character.star);
  const iconSpecies = iconComponentSpecie(character.species);
  const iconStatus = iconComponentStatus(character.status);
  const iconGender = iconComponentGender(character.gender);
  return { startIcon, iconSpecies, iconStatus, iconGender };
}


const nameClassStatusColor = (status:string)=>{
  switch(status){
    case 'Alive':
      return 'span-live'
    case 'Dead':
      return 'span-dead'
    default:
      return 'span-unknow'
  }
  }


const showToast = (star: boolean, name: string) => {
  if (!star) {
    toast(`agregando ${name} a favoritos`, {
      icon: "😎",
    });
  } else {
    toast(`removiendo ${name} de favoritos`, {
      icon: "😥",
    });
  }
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
      return <AiFillHeart />;
    case "Dead":
      return <GiDeathSkull />;
    default:
      return <FaQuestion />;
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

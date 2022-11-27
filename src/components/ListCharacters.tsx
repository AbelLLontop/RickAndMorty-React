import React, { useState, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/useStore";
import { ICharacter } from "../interfaces/character.interface";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { GiDeathSkull } from "react-icons/gi";
import { FaQuestion } from "react-icons/fa";
import { IoMaleSharp, IoFemaleSharp } from "react-icons/io5";

import { GiAlienSkull } from "react-icons/gi";
import { GiPerson } from "react-icons/gi";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchCharacters } from "../redux/features/characters/charactersSlice";

const CharacterCard = ({ character }: { character: ICharacter }) => {
  const [star, setStar] = useState(false);
  const startIcon = !star ? <AiOutlineStar /> : <AiFillStar />;

  const iconSpecies =
    character.species === "Human" ? <GiPerson /> : <GiAlienSkull />;
  const iconStatus = () => {
    switch (character.status) {
      case "Alive":
        return <AiFillHeart color="red" />;
      case "Dead":
        return <GiDeathSkull />;
      default:
        return <FaQuestion color="gray" />;
    }
  };

  const iconGender = () => {
    switch (character.gender) {
      case "Female":
        return <IoFemaleSharp />;
      case "Male":
        return <IoMaleSharp />;
      default:
        return <FaQuestion />;
    }
  };

  return (
    <div className="card" onClick={() => setStar(!star)}>
      <span>
        {iconStatus()}
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
          {iconGender()}
          {character.gender}
        </p>
        {startIcon}
      </div>
    </div>
  );
};

const ListCharacters = () => {
  const characters = useAppSelector((state) => state.characters.characters);
  const currentPage = useAppSelector((state) => state.characters.currentPage);
  const totalPages = useAppSelector((state) => state.characters.pages);
  const dispatch = useAppDispatch();
  console.log(characters);
  // return (
  //   <div className="listCharacters">
  //     {characters.map((character) => (
  //       <CharacterCard key={character.id} character={character} />
  //     ))}
  //   </div>
  // );



  const fetchMoreData = () => {
    console.log("fetchMoreData");
      dispatch(fetchCharacters(currentPage + 1));
  };

  return (
    <div> 
    <InfiniteScroll
     className="listCharacters"
      dataLength={characters.length}
      next={fetchMoreData}
      hasMore={currentPage < totalPages}
      loader={<h4>Loading...</h4>}
    >
     
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
   
    </InfiniteScroll>
     </div>
  );
};

export default ListCharacters;

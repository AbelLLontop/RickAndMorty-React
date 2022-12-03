import { AiFillHeart } from "react-icons/ai";
import { FaQuestion } from "react-icons/fa";
import {
  GiAlienSkull,
  GiDeathSkull,
  GiPerson,
  GiHomeGarage,
  GiHouse,
} from "react-icons/gi";
import { IoFemaleSharp, IoMaleSharp } from "react-icons/io5";
import "./CharacterPage.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useStore";
import { fetchGetCharacterById } from "../redux/features/characters/charactersSlice";

const CharacterPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const character = useAppSelector(
    (state) => state.characters.characterSelected.data
  );
  const loading = useAppSelector(
    (state) => state.characters.characterSelected.loading
  );

  useEffect(() => {
    dispatch(fetchGetCharacterById(id || ""));
  }, [id]);

  if (loading || !character) {
    return <div>Loading...</div>;
  }
  return (
    <div className="characterPage">
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
      <div className="episodes_container">
        <h3>Episodes</h3>
        <ul className="episodes card-shadow">
          {character?.episode.map((episode) => {
            const nameEpisode = getNameEpisode(episode);
            return (<Link key={episode} to={`/episode/${nameEpisode}`} className="episode">Episode {nameEpisode}</Link>)
          })}
        </ul>
      </div>
    </div>
  );
};

const getNameEpisode = (episode: string) => {
  const episodeName = episode.split("/");
  return episodeName[episodeName.length - 1];
};

const iconComponentSpecie = (species: string) => {
  return species === "Human" ? <GiPerson /> : <GiAlienSkull />;
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

export default CharacterPage;

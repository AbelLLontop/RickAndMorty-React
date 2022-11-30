
import { CharacterCard } from "@/components";
import { useAppSelector } from "@/hooks/useStore";
import { useEffect } from 'react';

const FavoritesPage = () => {
  const favorites = useAppSelector((state) => state.characters.favorites);
  useEffect(()=>{
    window.scrollTo({
      top: 0,
    })
  },[])
  return (
    <section>
      <h1 style={{ padding: "1rem" }}>Favoritos </h1>
      <div style={{ display: "flex" }} className="listCharacters">
        {favorites.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </section>
  );
};

export default FavoritesPage;
